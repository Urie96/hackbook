export PORT=8080
export SSO=https://sso.sweetlove.top
export JWT_SECRET=Fwet)9243?
export TYPEORM_HOST=localhost
export TYPEORM_PASSWORD=youling
export TYPEORM_USERNAME=root

.PHONY: all start install clean

all: front-end back-end
	@echo all done

back-end: back-end/node_modules $(shell find back-end -path 'back-end/node_modules' -prune -o -type f -print)
	lsof -i:$(PORT) -t | xargs kill -9
	rm -f back-end/nohup.out
	cd back-end && nohup npm start &
	touch back-end

back-end/node_modules: back-end/package-lock.json back-end/package.json
	cd back-end && npm ci
	touch back-end/node_modules

front-end: front-end/dist

front-end/dist: front-end/node_modules $(shell find front-end -path 'front-end/node_modules' -prune -o -type f -print)
	cd front-end && npm run build
	touch front-end/dist
	
front-end/node_modules: front-end/package-lock.json front-end/package.json
	cd front-end && npm ci
	touch front-end/node_modules