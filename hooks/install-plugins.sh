#!/usr/bin/env bash
cordova plugin add cordova-plugin-whitelist@1.3.4
# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save

# install google maps plugin
cordova plugin add https://github.com/mapsplugin/cordova-plugin-googlemaps.git#a9088cf \
    --variable PLAY_SERVICES_VERSION=15.0.1 \
    --variable ANDROID_SUPPORT_V4_VERSION=27.+
