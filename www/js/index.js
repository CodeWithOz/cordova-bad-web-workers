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
        const div = document.getElementById("map");
        const map = plugin.google.maps.Map.getMap(div);
        const latLngPair = [
            new plugin.google.maps.LatLng(33.982, -118.476),
            new plugin.google.maps.LatLng(51.1784, -115.5708)
        ];
        let mapShown = true, markersShown = false, lastMarker = 0;

        map.on(plugin.google.maps.event.MAP_READY, initMap);

        // event listeners
        document.querySelector('.visibility').addEventListener('click', node => {
            mapShown = !mapShown;
            map.setVisible(mapShown);
        });

        document.querySelector('.marker').addEventListener('click', node => {
            if (markersShown) {
                map.clear();
            } else {
                if (lastMarker === 0) {
                    // currently at location 0, add marker at location 1
                    lastMarker = 1;
                } else {
                    // currently at location 1, add marker at location 0
                    lastMarker = 0;
                }
                map.addMarker({
                    position: latLngPair[lastMarker],
                }, function (marker) {
                    map.animateCamera({
                        target: latLngPair[lastMarker],
                        zoom: 15,
                        duration: 1000,
                    });
                });
            }
            markersShown = !markersShown;
        });

        function initMap(map) {
            // initialized in Venice, California
            map.setOptions({
                'backgroundColor': 'white',
                'controls': {
                    'compass': true,
                    'indoorPicker': true
                },
                'gestures': {
                    'scroll': true,
                    'tilt': true,
                    'rotate': true,
                    'zoom': true
                },
                'camera': {
                    'latLng': latLngPair[0],
                    'zoom': 15
                },
            });

            // now add a lot of dom nodes, in batches
            let batch = 0;
            const frag = document.createDocumentFragment();
            // break up the work to minimize freezing the app
            const shadowContainer = document.querySelector('#overlay').attachShadow({ mode: 'open' });
            const createAndAppend = function() {
                setTimeout(function() {
                    // create 1000 nodes every half second
                    for (let i = 0; i < 1000; i++) {
                        const node = document.createElement('div');
                        node.style.zIndex = i;
                        const background = [
                            Math.floor(Math.random() * 255),
                            Math.floor(Math.random() * 255),
                            Math.floor(Math.random() * 255)
                        ];
                        node.style.backgroundColor = `rgba(${background[0]},${background[1]},${background[2]},${Math.random() * 0.1})`;
                        frag.append(node);
                    }
                    batch++;
                    if (batch < 12) {
                        createAndAppend();
                    } else {
                        // add the nodes to the shadow dom
                        shadowContainer.append(frag);
                    }
                }, 500);
            };
            // createAndAppend();
        }
    },
};

app.initialize();