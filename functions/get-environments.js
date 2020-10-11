const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");
const { Octokit } = require("@octokit/rest");
const yaml = require('js-yaml');

const ALLOWED_AUD = ["00000003-0000-0000-c000-000000000000", "https://graph.microsoft.com"];
const REQUIRED_SCOPE = "User.Read";
const ISS = "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/";

exports.handler = async function(event, context, callback) {

  const publicKeys = (await axios.get("https://login.microsoftonline.com/common/discovery/keys")).data.keys;

  
  const token = event.headers["authorization"].replace("Bearer ", "");
  const {header, payload} = jwt.decode(token, {complete: true});
  
  const {kid} = header;

  if (!ALLOWED_AUD.includes(payload.aud)) throw new Error("invalid token");
  if (!payload.scp.includes(REQUIRED_SCOPE)) throw new Error("invalid token");
  if (ISS !== payload.iss) throw new Error("invalid token");
  if (!publicKeys.some(key => key.kid === kid)) throw new Error("invalid token");

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  console.log('will get environments from github')

  const environmentsFileResponse = await octokit.repos.getContent({repo: "environments", owner: "switchboard-tool", path: "environments.yaml"})
  const environments = environmentsFileResponse.data.content;

  const content = Buffer.from(environments, 'base64').toString()

  console.log(content);
  const contentObject = yaml.safeLoad(content);


  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(contentObject)
  });
}