const fs = require('fs');

function syncDB(dbPath) {
  const db = JSON.parse(fs.readFileSync(dbPath).toString());
  fs.copyFile(dbPath, `${dbPath}.bak`, () => {
    console.log('备份成功');
  });
  function autoSync() {
    setInterval(() => {
      if (db) {
        writeJson(dbPath, db);
      }
    }, 2000);
  }
  function writeJson(path, json) {
    const data = JSON.stringify(json);
    fs.writeFileSync(path, data);
    // console.log(`${path} 写入成功`);
  }
  autoSync();
  return db;
}

module.exports = syncDB;
