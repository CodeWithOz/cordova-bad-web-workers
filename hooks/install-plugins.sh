#!/usr/bin/env bash
# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save
cordova plugin add cordova-plugin-file
cordova plugin add https://github.com/apache/cordova-plugin-file-transfer#ec11d2fd0e87d7d9e0ba94b1989ffb71af1c3c96 --save
# install the native storage plugin
cordova plugin add https://github.com/CodeWithOz/cordova-plugin-nativestorage#0ccdd0d6f4a39ed0d95832fade6fc6ed1b09587b --save
