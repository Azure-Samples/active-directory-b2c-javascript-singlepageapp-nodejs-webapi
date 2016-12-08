 // Don't commit this file to your public repos. This config is for first-run
 exports.creds = {
     mongoose_auth_local: 'mongodb://localhost:27017/tasklist', // Your mongo auth uri goes here
     clientID: '2ea10cce-58f2-4b26-8b5a-65d75553aac1',
     //audience: 'http://kidventus.net/TodoListService',
     identityMetadata: 'https://login.microsoftonline.com/tenantazureb2c.onmicrosoft.com/v2.0/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
     tenantName:'tenantazureb2c.onmicrosoft.com',
     policyName:'B2C_1_b2c_1_sign_in_sign_up',
     validateIssuer: false,
     passReqToCallback: false
 };
