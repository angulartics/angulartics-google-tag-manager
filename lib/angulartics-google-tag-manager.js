/**
 * @license Angulartics v0.19.2
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Google Tag Manager Plugin Contributed by http://github.com/danrowe49
 * License: MIT
 */
(function(angular) {
    'use strict';

    /**
     * @ngdoc overview
     * @name angulartics.google.analytics
     * Enables analytics support for Google Tag Manager (http://google.com/tagmanager)
     */
    angular.module('angulartics.google.tagmanager', ['angulartics'])
        .config(['$analyticsProvider', function($analyticsProvider) {
            var superProperties = {};
			//backward compatibility with previous version
			if($analyticsProvider.settings.ga) {
				dataLayer.push({
                    'userId': $analyticsProvider.settings.ga.userId
                });
			}

            /**
             * Track pageview in GTM by sending to the dataLayer, GTM shall then convert them into events for Google Analytics
             *
             * @param {string} path Required 'content name' (string) describes the content loaded
             */
            $analyticsProvider.registerPageTrack(function(path, $location) {
                var properties = {
                    'event': 'pageview',
                    'page': path,
                    'hostname': $location.host()
                };
                properties = angular.extend({}, superProperties, properties);
                
                window.dataLayer.push(properties);
            });

            /**
             * Track hits/events in GTM (by sending them to the dataLayer),
             * GTM shall then convert them into hits/events for Google Analytics
             * @name eventTrack
             *
             * @param {string} eventName Required 'eventAction' (string) associated with the event
             * @param {object} properties Comprised of the mandatory fields:
             *   'hitType' (string default='event')
             *   'eventCategory' (string default=eventName)
             *  and the optional fields:
             *   'eventLabel' (string), 'eventValue' (integer), 'nonInteraction' (boolean),
             *  and any other Google analytics fields (see @link) as long as they are also defined in GTM
             *
             * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#hitType
             */
            $analyticsProvider.registerEventTrack(eventTrack);
			function eventTrack(eventName, properties) {
                properties = properties || {};
                var properties2 = {
                    'event': properties.hitType || 'event',
                    'eventCategory': properties.eventCategory || eventName,
                    'eventAction': eventName
                };
                properties = angular.extend({}, superProperties, properties, properties2);
                
                dataLayer.push(properties);
            }

            /**
             * Send exceptions to the dataLayer, reusing the existing Event Tracking tag in GTM
             * @name exceptionTrack
             *
             * @param {object} error An Error object to track: error.toString() used for 'eventAction', error.stack used for 'eventLabel'.
             * @param {object} cause The cause of the error given from $exceptionHandler, not used
             */
            $analyticsProvider.registerExceptionTrack(function(error, cause) {
                eventTrack(error.toString(), {
                    'eventCategory': 'Exceptions',
                    'eventLabel': error.stack
                });
            });
			
            /**
             * Set userId for use with Universal Analytics userId feature
             * @name setUsername
             * 
             * @param {string} userId Required 'userId' value (string) used to identify user cross-device in Google Analytics
             */
            $analyticsProvider.registerSetUsername(function(username) {
                dataLayer.push({
                    'userId': username
                });
            });

            /**
              * Set super properties to be added to all $analytics.pagetTrack and $analytics.eventTrack
              * To remove a property, set its value to null
              *
              * @param {object} properties = { superProperty1: value, superPropertyToRemove: null, superProperty2...}
              * properties like 'appName' (string) or any other Google analytics fields (see @link) as long as they are also defined in GTM
              *
              * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#hitType
              */
            $analyticsProvider.registerSetSuperProperties(function(properties) {
                for (var property in properties) {
                    if (properties.hasOwnProperty(property)) {
                        if (properties[property] == null) {
                            if (superProperties.hasOwnProperty(property))
                                delete superProperties[property];
                        } else {
                            superProperties[property] = properties[property];
                        }
                    }
                }
            });

        }]);

})(angular);
