export PORT=8080
export SSO=https://sso.sweetlove.top
export JWT_SECRET=Fwet)9243?
export TYPEORM_HOST=localhost
export TYPEORM_PASSWORD=youling
export TYPEORM_USERNAME=root

.PHONY: start stop

start: .make/started
	@echo back end done

.make/started: node_modules $(shell find ./src -type f -print)
	@make stop
	nohup npm start &
	touch .make/started

node_modules: package-lock.json package.json
	npm ci
	touch node_modules

stop:
	-lsof -i:$(PORT) -t | xargs kill -9
	-rm -f nohup.out