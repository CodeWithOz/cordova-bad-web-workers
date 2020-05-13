#!/usr/bin/env bash
cordova plugin add cordova-plugin-whitelist@1.3.4
# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save

# install google maps plugin
cordova plugin add cordova-plugin-googlemaps
