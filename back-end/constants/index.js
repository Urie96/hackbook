const path = require('path');

const root = path.join(__dirname, '..');

function getAbsolutePath(relativePath) {
  return path.join(root, relativePath);
}

const constant = {
  BLUE_PATH: getAbsolutePath('data/blue.json'),
  USERSERVICE_PATH: getAbsolutePath('data/userservice-db.json'),
};

module.exports = constant;
