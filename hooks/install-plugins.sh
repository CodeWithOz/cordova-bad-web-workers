#!/usr/bin/env bash
# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save
# install the sqlite plugin
cordova plugin add cordova-sqlite-storage@6.0.0 --save
# install the native storage plugin
cordova plugin add https://github.com/CodeWithOz/cordova-plugin-nativestorage#0ccdd0d6f4a39ed0d95832fade6fc6ed1b09587b --save
