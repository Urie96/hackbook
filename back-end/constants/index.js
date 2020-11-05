const ssoHost = process.env.SSO;
const dataDir = process.env.DATA_DIR || '/root/data';

module.exports = {
  BLUE_PATH: `${dataDir}/blue.json`,
  USERSERVICE_PATH: `${dataDir}/userservice-db.json`,
  GEEK_PATH: `${dataDir}/geek-db.json`,
  LAGOU_PATH: `${dataDir}/lagou-db.json`,
  JWT_SECRET: process.env.JWT_SECRET || '1996',
  SSO_VERIFYCODE: `${ssoHost}/verifycode`,
  SSO_AUTH: `${ssoHost}/auth`,
};
