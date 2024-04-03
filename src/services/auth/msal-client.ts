import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: "1076b242-f01e-42de-bf8d-9c2807e1196d",
    authority: "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/",
    redirectUri: `${location.protocol}//${location.host}`,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string) => {
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

// Add here scopes for access token to be used at MS Graph API endpoints.
// Add here the scopes that you would like the user to consent during sign-in
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add here scopes for access token to be used at MS Graph API endpoints.
// Add here the scopes that you would like the user to consent during sign-in
export const tokenRequest = {
  scopes: ["User.Read"],
};

export const msalClient = new PublicClientApplication(msalConfig);
