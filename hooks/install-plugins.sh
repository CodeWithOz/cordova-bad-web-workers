#!/usr/bin/env bash
# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save

# install google maps plugin
cordova plugin add cordova-plugin-googlemaps@2.7.1 --save