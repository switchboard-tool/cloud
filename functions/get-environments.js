const { default: axios } = require("axios");
const { Octokit } = require("@octokit/rest");
const yaml = require('js-yaml');

exports.handler = async function(event, context, callback) {
  
  let isValid = true;

  const graphUserResponse = await axios.get("https://graph.microsoft.com/v1.0/me", {headers: {
    "Authorization": event.headers["authorization"],
  }});

  if (graphUserResponse.status !== 200) isValid = false;
  if (!graphUserResponse.data.userPrincipalName.includes("@microsoft.com")) isValid = false;

  if (!isValid) throw new Error("invalid token");

  console.log('Access token is valid');

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const environmentsFileResponse = await octokit.repos.getContent({repo: "environments", owner: "switchboard-tool", path: "environments.yaml"})
  const environments = environmentsFileResponse.data.content;

  const timestamp = (new Date(environmentsFileResponse.headers["last-modified"]).toISOString());

  const content = Buffer.from(environments, 'base64').toString();
  const contentObject = yaml.safeLoad(content);

  console.log(`received ${contentObject.length} environments, last modified: ${timestamp}`);

  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type" : "application/json",
      "Last-Modified": timestamp,
    },
    body: JSON.stringify(contentObject)
  });
}