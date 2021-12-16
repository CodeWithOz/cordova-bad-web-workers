#!/usr/bin/env bash
# install androidx adapter plugins to workaround build failures
cordova plugin add cordova-plugin-androidx --save
cordova plugin add cordova-plugin-androidx-adapter --save
# install the sqlite plugin
cordova plugin add cordova-sqlite-storage@6.0.0 --save
# install the native storage plugin
cordova plugin add https://github.com/CodeWithOz/cordova-plugin-nativestorage#0ccdd0d6f4a39ed0d95832fade6fc6ed1b09587b --save

# plugins to maybe trigger app resume flicker
cordova plugin add cordova-sqlite-storage@6.0.0 --save
cordova plugin add cordova-plugin-purchase@10.5.0 --save
cordova plugin add cordova-plugin-inappbrowser@5.0.0 --save
cordova plugin add cordova-plugin-x-socialsharing@6.0.3 --save
cordova plugin add branch-cordova-sdk@4.2.4 --save
cordova plugin add https://github.com/timkellypa/cordova-plugin-local-notifications.git --save
cordova plugin add cordova-plugin-camera@6.0.0 --save
cordova plugin add https://github.com/apache/cordova-plugin-file-transfer#ec11d2fd0e87d7d9e0ba94b1989ffb71af1c3c96 --save
cordova plugin add https://github.com/CodeWithOz/cordova-plugin-statusbar#61aee05 --save
cordova plugin add cordova-plugin-contacts --save
cordova plugin add cordova-plugin-actionsheet
cordova plugin add cordova-plugin-datepicker
cordova plugin add cordova-plugin-dialogs
cordova plugin add cordova-plugin-ios-camera-permissions --save
cordova plugin add cordova-plugin-media-capture
cordova plugin add cordova-plugin-video-editor
