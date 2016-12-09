# Application built on Hello.js with Azure AD B2C and REST API Service for Node.js using MongoDB and Restify

This sample shows how to build a web application using Hello.js that performs identity management with Azure AD B2C . It assumes you have some familiarity with Azure AD B2C. If you'd like to learn all that B2C has to offer, start with our documentation at aka.ms/aadb2c.

The app is a simple web application that performs sign-in, sign-up, and sign-out functions with sign-in and signIn-signUp policies and also edit profile using EditProfile Policy. Once the user signed in sample GET/POST requests can be made to **Node.js** task service secured by Azure AD B2C. It is intended to help get you started with Azure AD B2C in a simple webapplication built on hello.js, giving you the necessary tools to execute Azure AD B2C policies & securely identify users in your application.  

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
Getting started is simple! To run this sample you will need:

- Visual Studio 2015
- An Internet connection
- An Azure subscription (a free trial is sufficient)
- Node.js and MongoDB (instructions in Step 6 and 7)

### Step 1:  Clone or download this repository

From your shell or command line:

`git clone https://github.com/Azure-Samples/active-directory-b2c-javascript-singlepageapp-nodejs-webapi.git` 

### Step 2: Get your own Azure AD B2C tenant

You can also modify the sample to use your own Azure AD B2C tenant.  First, you'll need to create an Azure AD B2C tenant by following [these instructions](https://azure.microsoft.com/documentation/articles/active-directory-b2c-get-started).

### Step 3: Create your own policies

This sample uses three types of policies: a sign-in policy, a sign-up policy & profile editing policy.  Create one policy of each type by following [the instructions here](https://azure.microsoft.com/documentation/articles/active-directory-b2c-reference-policies).  You may choose to include as many or as few identity providers as you wish.

If you already have existing policies in your Azure AD B2C tenant, feel free to re-use those.  No need to create new ones just for this sample.

### Step 4: Create your own applications

Now you need to create your own appliations in your B2C tenant, so that each of your app has its own Application ID.  You can do so following [the generic instructions here](https://azure.microsoft.com/documentation/articles/active-directory-b2c-app-registration).  Be sure to include the following information in your app registration:

##### Create application for the SPA App

- Enable the **Web App/Web API** setting for your application.
- Add **two** rediect_uris for your app.  Their values should take the form 
    - `http://localhost:65328/`
    - `http://localhost:65328/redirect.html`
- Copy the Application ID generated for your application, so you can use it in the next step.

##### Create one more application for the REST API

- Enable the **Web App/Web API** setting for your application.
- Enter `http://localhost/TodoListService` as a Reply URL. It is the default URL for this code sample.
- Copy the Application ID that is assigned to your app. You need this data later.

### Step 5: Configure the sample to use your Azure AD B2C tenant

Now you can replace the app's default configuration with your own.  

##### In the B2C-v2jsapp solution

open the index.html file and replace the applicationID with the SPA App applicationId and policy names

```javascript
    //applicaionID created in AD B2C portal
    var applicationId = '2ea10cce-58f2-4b26-8b5a-65d75553aac1';
    var scope = 'openid ' + applicationId;
    // ignore other code here

    var policies = {
    signInPolicy: "B2C_1_sign_in",
    editProfilePolicy: "B2C_1_edit_profile",
    signInSignUpPolicy: "B2C_1_b2c_1_sign_in_sign_up"
    };
```
open the aadb2c.js and replace the tenant name and policy names

```javascript
    var tenantName = 'tenantname.onmicrosoft.com';
    var signInPolicyName = 'b2c_1_sign_in';
    var signInSignUpPolicyName = 'B2C_1_b2c_1_sign_in_sign_up';
    var editProfilePolicyName = 'B2C_1_edit_profile';
    var redirect_uri = 'http://localhost:65328/';
```

### Step 6: Download node.js for your platform
To successfully use this sample, you need a working installation of Node.js.

Install Node.js from [http://nodejs.org](http://nodejs.org).

### Step 7: Install MongoDB on to your platform

To successfully use this sample, you must have a working installation of MongoDB. We will use MongoDB to make our REST API persistent across server instances.

Install MongoDB from [http://mongodb.org](http://www.mongodb.org).

**NOTE:** This walkthrough assumes that you use the default installation and server endpoints for MongoDB, which at the time of this writing is: mongodb://localhost. This should work locally without any configuration changes if you run this sample on the same machine as you've installed and ran mongodb.


### Step 8: Download the modules needed by REST API

Navigate to the node-server folder and run `npm install` command to download node modules.

From your shell or command line:

* `$ cd B2C-WebApi-Nodejs\node-server`
* `$ npm install`

### Step 9: Configure your server using config.js

You will need to update config.js in the node-server folder. make sure you copy the SPA app applicationID as the audience (calling application) and REST API aplicationId as applicationID.
update the tenant names and policyName with appropriate values.

```javascript
 exports.creds = {
     mongoose_auth_local: 'mongodb://localhost/tasklist', // Your mongo auth uri goes here
     applicationID: '2ad0ce46-7ee7-4705-a134-d86106a7f569', // your applicationID for this REST API created in the portal
     audience: '2ea10cce-58f2-4b26-8b5a-65d75553aac1', //the applicationID of the SPA WebApp created in the portal
     identityMetadata: 'https://login.microsoftonline.com/tenantazureb2c.onmicrosoft.com/v2.0/.well-known/openid-configuration', //replace the tenant name
     tenantName:'tenantazureb2c.onmicrosoft.com', //Azure AD B2C tenant name
     policyName:'B2C_1_sign_in', //This is the policy you'll want to validate against in B2C. Usually this is your Sign-in policy (as users sign in to this API)
     validateIssuer: true,
	 issuer: null, // Optional, we use the issuer from metadata by default
     passReqToCallback: false //This is a node.js construct that lets you pass the req all the way back to any upstream caller. We turn this off as there is no upstream caller.
 };
```


### Step 10: Run the application


* `$ cd node-server	`
* `$ node app.js`

**Is the server output hard to understand?:** We use `bunyan` for logging in this sample. The console won't make much sense to you unless you also install bunyan and run the server like above but pipe it through the bunyan binary:

* `$ node server.js | bunyan`

You will have a server successfully running on `http://localhost:3000`. Your REST / JSON API Endpoint will be `http://localhost:3000/api/tasks`

### Step 11:  Run the sample

- open the **B2C-v2jsapp.sln** in visual studio 2015. 
- Clean and rebuild the solution, and run it.  You can now sign up / sign in /edit profile to your application using the accounts you configured in your respective policies. 
- if a user is signed in using **SignIn policy**, user can POST a task to the Node.js Task service (which is already running) and GET the tasks already created.