#!/usr/bin/env bash
# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save
# install sqlite plugin
cordova plugin add cordova-sqlite-storage@6.0.0 --save
