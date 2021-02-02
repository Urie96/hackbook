.PHONY: all build

OUTPUT_DIR=dist
SRC_DIRS=src public
SRC_FILES=$(foreach src,$(SRC_DIRS),$(shell find $(src) -type f -print))

all: build

build: $(OUTPUT_DIR)
	@echo front end done

$(OUTPUT_DIR): node_modules $(SRC_FILES)
	npm run build
	touch dist
	
node_modules: package-lock.json package.json
	npm ci
	touch node_modules