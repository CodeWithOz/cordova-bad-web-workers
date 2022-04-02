#!/usr/bin/env bash

# install deps
npm install

# bundle js
npm run build

# copy over the src files
cp -r src/* www/

# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save
