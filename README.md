[![Netlify Status](https://api.netlify.com/api/v1/badges/e0daa35a-8356-4e03-b337-7ce79b55a758/deploy-status)](https://app.netlify.com/sites/switchboard-cloud/deploys)


# Maintainence guide

## Types of environments

- Demo: Used by Microsoft Sales org
- Trial: Realistic experience from viral adoption sign-ups
- Dev: Sandbox for testing

## Onboard a new environment

- Create environment
  - Demo environments and credentials can be found at https://cdx.transform.microsoft.com/
  - Trial environments can be created at https://dynamics.microsoft.com/en-us/dynamics-365-free-trial/
  - Dev environments are added ad-hoc
- Add icon
  - Find icon: https://www.figma.com/file/oTsMcgqutpfOMjNgDFNBIL/
  - Add to: https://github.com/switchboard-tool/assets
 
## Renew existing environments

- Trial environments
  - Managed at: https://admin.powerplatform.microsoft.com/environments
  - Extend trial at 30 days
  - Delete and re-create at 60 days
- Business central
  - Use it every 30 days
  - Re-create only when it is expired (after 45 days of idling) 

# Developer guide

## Local dev workflow

1. (One-time) Login `netlify login`.
2. (One-time) Get environment from Netlify `netlify link`.
3. `npm run dev`

## Architecture notes

1. During build time, request environments file from Github and we put its last modified timestamp the output html (with posthtml expression)
2. During run time, client checks the timestamp on the html to determine whether to make a request to the API
3. When the environments file in Github is modified, we trigger a netlify build to update the timestamp in the output html
   1. On Netlify we expose a build webhook (https://app.netlify.com/sites/switchboard-cloud/settings/deploys#build-hooks)
   2. On Github, subscribe push event and call the build webhook (https://github.com/switchboard-tool/environments/settings/hooks)

During build time we need to set GITHUB_TOKEN and NODE_VERSION in Netlify
