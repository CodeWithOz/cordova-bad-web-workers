#!/usr/bin/env bash
cordova plugin add cordova-plugin-whitelist@1.3.4
# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save
cordova plugin add cordova-plugin-file
cordova plugin add https://github.com/apache/cordova-plugin-file-transfer#ec11d2fd0e87d7d9e0ba94b1989ffb71af1c3c96 --save
# install the native logs plugin
cordova plugin add https://github.com/CodeWithOz/cordova-plugin-native-logs#dda6116 --save
