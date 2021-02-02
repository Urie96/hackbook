.PHONY: all start install clean

all: front-end back-end
	cd front-end && $(MAKE)
	cd back-end && $(MAKE)
	@echo all done