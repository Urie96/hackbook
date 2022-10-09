.PHONY: start

start: .make/started
	@echo back end done

.make/started: node_modules $(shell find ./src -type f -print) docker-compose.yml Dockerfile
	docker-compose up -d --build
	touch .make/started

node_modules: package-lock.json package.json
	npm ci
	touch node_modules

image:
	docker build -t hub.lubui.com/hackbook-server .
	docker push hub.lubui.com/hackbook-server