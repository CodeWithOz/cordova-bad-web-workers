#!/usr/bin/env bash
cordova plugin add cordova-plugin-whitelist@1.3.4
# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save

# install google maps plugin
cordova plugin add cordova-plugin-googlemaps@2.7.1 --save \
    --variable PLAY_SERVICES_VERSION=15.0.1 \
    --variable ANDROID_SUPPORT_V4_VERSION=27.+
