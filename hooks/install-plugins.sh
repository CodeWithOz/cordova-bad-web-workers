#!/usr/bin/env bash

# install deps
npm install

# bundle js
mkdir www/js
npm run build

# copy over the src files that don't need processing
cp -r src/index.html www/
cp -r src/js/index.js www/js
mkdir www/js/workers/deps
cp -r src/js/workers/deps/*.js www/js/workers/deps

# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save
