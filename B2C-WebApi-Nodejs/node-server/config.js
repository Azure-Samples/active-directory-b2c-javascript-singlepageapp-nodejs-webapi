 // Don't commit this file to your public repos. This config is for first-run
 exports.creds = {
     mongoose_auth_local: 'mongodb://localhost/tasklist', // Your mongo auth uri goes here
     applicationID: '2ad0ce46-7ee7-4705-a134-d86106a7f569', // your applicationID for this Web API created in the portal
     audience: '2ea10cce-58f2-4b26-8b5a-65d75553aac1', //the applicationID of the SPA WebApp created in the portal
     identityMetadata: 'https://login.microsoftonline.com/tenantazureb2c.onmicrosoft.com/v2.0/.well-known/openid-configuration', //replace the tenant name
     tenantName:'tenantazureb2c.onmicrosoft.com', //Azure AD B2C tenant name
     policyName:'B2C_1_sign_in', //This is the policy you'll want to validate against in B2C. Usually this is your Sign-in policy (as users sign in to this API)
     validateIssuer: true,
	 issuer: null, // Optional, we use the issuer from metadata by default
     passReqToCallback: false //This is a node.js construct that lets you pass the req all the way back to any upstream caller. We turn this off as there is no upstream caller.
 };