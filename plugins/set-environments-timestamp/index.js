const { Octokit } = require("@octokit/rest");

const KEY = "ENVIRONMENTS_LAST_MODIFIED";

module.exports = {
  onPreBuild: async () => {

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  
    const environmentsFileResponse = await octokit.repos.getContent({repo: "environments", owner: "switchboard-tool", path: "environments.yaml"})
  
    const timestamp = (new Date(environmentsFileResponse.headers["last-modified"]).toISOString());

    process.env[KEY] = timestamp;
    console.log(`SET process.env.${KEY} = ${process.env[KEY]}`);
  },
};