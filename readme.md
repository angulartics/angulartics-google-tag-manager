## angulartics-google-tag-manager

[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-downloads-url] [![Bower version][bower-image]][bower-url] [![Dependencies status][dep-status-image]][dep-status-url] [![MIT license][license-image]][license-url] [![Join the Slack chat][slack-image]][slack-url]

Google Tag Manager Google Analytics plugin for [Angulartics](http://github.com/luisfarzati/angulartics).

## Install

First make sure you've read installation and setup instructions for [Angulartics](https://github.com/luisfarzati/angulartics#install).

Then you can install this package either with `npm` or with `bower`.

### npm

```shell
npm install angulartics-google-tag-manager
```

Then add `angulartics.google.tagmanager` as a dependency for your app:

```javascript
require('angulartics')

angular.module('myApp', [
  'angulartics', 
  require('angulartics-google-tag-manager')
]);
```

> Please note that core Angulartics doesn't export the name yet, but it will once we move it into [the new organization](http://github.com/angulartics).

### bower

```shell
bower install angulartics-google-tag-manager
```

Add the `<script>` to your `index.html`:

```html
<script src="/bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js"></script>
```

Then add `angulartics.google.tagmanager` as a dependency for your app:

```javascript
angular.module('myApp', [
  'angulartics', 
  'angulartics.google.tagmanager'
]);
```

### Google Tag Manager

Once you've installed Angulartics into your application, you'll need to perform some configuration in the Google Tag Manager interface. There are two ways to do this; using Google Tag Manager's import functionality, or by manually configuring the required components in Google Tag Manager. To do either, you will need Edit permissions in the Google Tag Manager Container you'd like to use.

Before beginning configuration, confirm which version of Google Analytics you're using in your application. A simple way to test this is to check the Google Analytics snippet, if there is one. If the code looks like the below, you're using Universal Analytics:

```javascript
ga('create', 'UA-XXXXXX-YY', 'auto');
ga('send', 'pageview');
```

Alternatively, if the snippet looks like the below, you've got Classic Analytics installed, [which is in the process of being deprecated](https://support.google.com/analytics/answer/4457764?hl=en):
```javascript
_gaq.push(['_setAccount', 'UA-XXXXXX-YY']);
_gaq.push(['_trackPageview']);
```

> If possible, consider switching to Universal Analytics. If neither appear, or you do not have Google Analytics installed, use the Universal Analytics instructions.

#### Container Import Installation (recommended)

1. Determine which version of Google Analytics your site uses, Classic or Universal, and then locate the corresponding .json file in the /import directory.
2. In Google Tag Manager, navigate to the **Admin** tab.
3. Under the **Container** column, select **Import Container**.
4. Click **Choose Container File** and select the .json file you selected.
5. Select **Merge** from the radio selector beneath the Choose Container File button.
6. Select **Rename** from the radio selector that appears beneath the Merge selector.
7. Click Continue, then Confirm.
8. Click the **Variables** tab in the left-side navigation.
9. Scroll to the **User-Defined Variables** section at the bottom of the page and click the **Google Analytics Tracking ID - Angulartics** Variable. 
10. Edit the Value field by clicking on the Variable and replace it with your companies Google Analytics Tracking ID (a.k.a. UA Number). Save your changes.

#### Manual Installation

##### Universal Analytics

**6 Variables**

Naming and case must match.

* Name: **angulartics page path**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **content-name**
* Name: **angulartics event category**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **target**
* Name: **angulartics event action**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **action**
* Name: **angulartics event label**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **target-properties**
* Name: **angulartics event value**
  * Macro Type: **Data Layer Variable**
  * Data Layer Variable Name: **value**
* Name: **angulartics event interaction type**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **interaction-type**
* (OPTIONAL) **angulartics user id**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **userId**

**2 Triggers**

Name and case must match.

* Name: **Angulartics events**
  * Event: **Custom Event**
  * Event name: **interaction**
* Name: **Angulartics pageviews**
  * Event: **Custom Event**
  * Event name: **content-view**

**2 Tags**

Name and case must match.

* Name: **Angulartics Events**
  * Product: **Google Analytics**
  * Type: **Universal Analytics**
  * Tracking ID: **YourGoogleAnalyticsID**
  * Track Type: **Event**
  * Category: **{{angulartics event category}}**
  * Action: **{{angulartics event action}}**
  * Label: **{{angulartics event label}}**
  * Value: **{{angulartics event value}}**
  * Non-Interaction Hit: **{{angulartics event interaction type}}**
  * More settings > Fields to Set > name: **page**, value: **{{angulartics page path}}**
  * More settings > Fields to Set > name: **cookieDomain**, value: **auto**
  * More settings > Fields to Set > name: **userID**, value: **{{angulartics user id}}**
  * Fire On: **Angulartics events**

* Name: **Angulartics Pageviews**
  * Product: **Google Analytics**
  * Type: **Universal Analytics**
  * Tracking ID: **YourGoogleAnalyticsID**
  * Track Type: **Page View**
  * More settings > Field to Set > name: **page**, value: **{{angulartics page path}}**
  * More settings > Field to Set > name: **cookieDomain**, value: **auto**
  * More settings > Fields to Set > name: **userID**, value: **{{angulartics user id}}**
  * Fire On: **Angulartics pageviews**

##### Classic Analytics
**6 Variables**

Naming and case must match.

* Name: **angulartics page path**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **content-name**
* Name: **angulartics event category**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **target**
* Name: **angulartics event action**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **action**
* Name: **angulartics event label**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **target-properties**
* Name: **angulartics event value**
  * Macro Type: **Data Layer Variable**
  * Data Layer Variable Name: **value**
* Name: **angulartics event interaction type**
  * Type: **Data Layer Variable**
  * Data Layer Variable Name: **interaction-type**

**2 Triggers**

Name and case must match.

* Name: **Angulartics events**
  * Event: **Custom Event**
  * Event name: **interaction**
* Name: **Angulartics pageviews**
  * Event: **Custom Event**
  * Event name: **content-view**

**2 Tags**

Name and case must match.

* Name: **Angulartics Events**
  * Product: **Google Analytics**
  * Type: **Classic Analytics**
  * Tracking ID: **YourGoogleAnalyticsID**
  * Track Type: **Event**
  * Category: **{{angulartics event category}}**
  * Action: **{{angulartics event action}}**
  * Label: **{{angulartics event label}}**
  * Value: **{{angulartics event value}}**
  * Non-Interaction Hit: **{{angulartics event interaction type}}**
  * More settings > Basic Configuration > Virtual Page Path, value: **angulartics page path**
  * More settings > Domains and Directories > Domain Name, value: **YourDomainName**
  * Fire On: **Angulartics events**
* Name: **Angulartics Pageviews**
  * Product: **Google Analytics**
  * Type: **Universal Analytics**
  * Tracking ID: **YourGoogleAnalyticsID**
  * Track Type: **Page View**
  * More settings > Basic Configuration > Virtual Page Path, value: **angulartics page path**
  * More settings > Domains and Directories > Domain Name, value: **YourDomainName**
  * Fire On: **Angulartics pageviews**

## Documentation

### User ID Tracking
Universal Analytics, the newest version of Google Analytics, supports tracking users based of an ID that you provide. Typically, this ID is available after a user logs in to your application or service. Providing this ID allows Google Analytics to aggregate across multiple devices and browsers, providing a more holistic view of user interaction with your services. The [documentation](https://support.google.com/analytics/answer/6205850?hl=en&ref_topic=3123660) can provide more insight into the benefits of using the User ID feature. It also stipulates the following:
* The uid parameter must be set on **every hit** sent to Google Analytics
* The uid should be a completely anonymous value, and cannot be a username, or any personally identifiable information (PII); if PII is found in a property, the property will be completely destroyed. **This includes hashed email addresses**.
* The uid parameter should only be set while the user is logged in; once logged out, it should not be set on any hits sent to Google Analytics

To configure User ID Tracking, set the `$analyticsProvider.settings.ga.userId` property to your provided User ID in the module configuration settings.

```javascript
angular.module('myApp', ['angulartics', 'angulartics.google.tagmanager'])
  .config(['$analyticsProvider', function ($analyticsProvider) {

    $analyticsProvider.settings.ga = {
      userId: myUserIdValue
    };

    ...
  }]);
```
    
Alternatively, you may set your User ID by calling `$analytics.setUsername()` and providing it your userId

```javascript
$analytics.setUsername(myUserIdValue);
```

Additional documentation is available on the [Angulartics site](http://luisfarzati.github.io/angulartics).

## Development

```shell
npm run build
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/angulartics-google-analytics.svg
[npm-url]: https://npmjs.org/package/angulartics-google-analytics
[npm-downloads-image]: https://img.shields.io/npm/dm/angulartics-google-analytics.svg
[npm-downloads-url]: https://npmjs.org/package/angulartics-google-analytics
[bower-image]: https://img.shields.io/bower/v/angulartics-google-analytics.svg
[bower-url]: http://bower.io/search/?q=angulartics-google-analytics
[dep-status-image]: https://img.shields.io/david/angulartics/angulartics-google-analytics.svg
[dep-status-url]: https://david-dm.org/angulartics/angulartics-google-analytics
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
[slack-image]: https://angulartics.herokuapp.com/badge.svg
[slack-url]: https://angulartics.herokuapp.com
