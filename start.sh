cd front-end
npm ci
npm run build
cd ..
docker-compose up -d --build
docker rm $(docker ps -a | grep "Exited" | awk '{print $1 }')
docker rmi $(docker images | grep "none" | awk '{print $3}')
