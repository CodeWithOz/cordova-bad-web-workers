/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        (function() {
            var _Worker = window.Worker;
            window.inlineWorker = function (url, opts) {
                var blob = new Blob(["importScripts(" + JSON.stringify(url) + ")"], {
                    type: "text/javascript"
                });
                return new _Worker(URL.createObjectURL(blob), opts);
            }
        })();
        this.receivedEvent('deviceready');
        let bgGeo = window.BackgroundGeolocation;
        let geoDebugOptions = {};

        let DEBUG_BUILD = true;
        if (DEBUG_BUILD) {
            geoDebugOptions = {
                reset: true, // to ensure our debugging and log level config changes are picked up
                debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                logLevel: bgGeo.LOG_LEVEL_VERBOSE,
            };
        } else {
            geoDebugOptions = {
                reset: true,
                debug: false,
            };
        }

        const initGeoOptions = {
            // Geolocation config
            desiredAccuracy: 0,
            stationaryRadius: 50,
            distanceFilter: 50,
            disableElasticity: false, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
            locationUpdateInterval: 5000,
            minimumActivityRecognitionConfidence: 80, // 0-100%.  Minimum activity-confidence for a state-change
            fastestLocationUpdateInterval: 5000,
            activityRecognitionInterval: 10000,
            stopTimeout: 0,
            stopOnTerminate: false,
            startOnBoot: true,
            locationAuthorizationRequest: 'Any',
            // Default is "Always".  This will force a prompt and take user to device settings for iOS,
            // if the current location settings do not match.  Options: "Always", "WhenInUse", or "Any"
            // Application config
            url: 'https://fake.com', // <-- not the actual URL
            method: 'POST',
            batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
            autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
            // Debug config
            ...geoDebugOptions,
        };

        bgGeo.ready(initGeoOptions, async function (state) {
            console.log('bg-geo ready');
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
