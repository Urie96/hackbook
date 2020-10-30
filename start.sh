set -e
cd front-end
npm install
npm run build
cd ../back-end
npm install
export PORT=7122
lsof -i:7122 -t|xargs kill -9
nohup npm run start >> /root/hackbook/hackbook.log 2>&1 &