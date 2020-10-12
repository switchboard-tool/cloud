module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        ENVIRONMENTS_LAST_MODIFIED: process.env.ENVIRONMENTS_LAST_MODIFIED || new Date().toISOString(), // local env will use build timestamp
      }
    }
  }
};