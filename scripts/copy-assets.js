const fs = require('fs-extra');
const path = require('path');

const srcDir = path.resolve(__dirname, "../assets");
const distDir =path.resolve(__dirname, "../dist/assets");

fs.copySync(srcDir, distDir);