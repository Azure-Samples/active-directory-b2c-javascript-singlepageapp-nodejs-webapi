# Application built on Hello.js with Azure ADB2C

This sample shows how to build a web application using Hello.js that performs identity management with Azure AD B2C . It assumes you have some familiarity with Azure AD B2C. If you'd like to learn all that B2C has to offer, start with our documentation at aka.ms/aadb2c.

The app is a simple web application that performs sign-in, sign-up, and sign-out functions with sign-in and signIn-signUp policies and also edit profile using EditProfile Policy. Once the user signed in sample GET/POST requests can be made to task service. It is intended to help get you started with Azure AD B2C in a simple webapplication built on hello.js, giving you the necessary tools to execute Azure AD B2C policies & securely identify users in your application.  

##### Please note that this functionality is still in "preview"

## Hello.JS 

Hello.js is a client-side JavaScript SDK for authenticating with OAuth2 web services and querying their REST APIs. For more details about hello.js, check out their [documentation](https://adodson.com/hello.js/#hellojs).

Microsoft has tested the [hello.js](https://github.com/MrSwitch/hello.js) library in basic scenarios and confirmed that they work with Azure AD B2C (with documented fixes). Microsoft does not provide fixes for this library and has not done a review of the library. Issues and feature requests should be directed to the library’s open-source project.

##### Version Details

This application has been built with hello.js library version 1.14.0 (with documented fixes).

##### Local fixes made to the hello.js library

The following fixes were needed to make the hello.js library work with Azure AD B2C:

- Added the /authorize query string parameter "state" to local storage. There is a known issue with the Azure AD B2C /authorize endpoint returning an improper “state” value.
  * ` localStorage.setItem("b2cauthState", JSON.stringify(JSON.parse(decodeURIComponent(p.qs.state))));`

- Re-assigning the “state” parameter from the local storage where ever required.
  * `p.state = localStorage.getItem("b2cauthState");`
- Silent renewal of tokens fails with “X-Frame Options DENY” error, if tokens have already expired. Code from this github issue has been incorporated to fix this issue.


## Release Notes

- Silent renewing of access tokens is not supported by Amazon and Microsoft account.
- Local fixes have been made to the hello.js library to make it work with Azure AD B2C.


## How To Run This Sample
## WILL BE UPDATED