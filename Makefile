# Makefile for Byte-App

install:
	npm install

run:
	npx expo start

web:
	npx expo start --web

clean:
	rm -rf node_modules