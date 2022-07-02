#!/usr/bin/env bash

# install deps
npm install

# bundle js
CI_ENV=dev npm run build

# copy over the src files that don't need processing
cp -r src/index.html src/css src/img www/
cp -r src/js/index.js www/js
cp -r src/js/workers/deps/ www/js/workers/
rsync -a --prune-empty-dirs --include '*/' --exclude '*.js' src/js/ www/js

# install androidx adapter plugins to workaround build failures
# cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save
# install splashscreen plugin
cordova plugin add cordova-plugin-splashscreen@6.0.1 --save
