const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');


const distDir =path.resolve(__dirname, "../dist");
const srcPath = path.resolve(__dirname, "../environments.yaml");
const targetPath = path.join(distDir, "environments.json");

fs.mkdirSync(distDir, {recursive: true});


const content = fs.readFileSync(srcPath, "utf8");
const contentObject = yaml.safeLoad(content);

fs.writeFileSync(targetPath, JSON.stringify(contentObject, undefined, 2));

