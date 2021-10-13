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
        document.querySelector('.show').addEventListener('click', node => {
            if (mapShown) {
                // map is already shown
                return;
            }
            mapShown = !mapShown;
            map.setVisible(mapShown);
            requestAnimationFrame(() => {
                document.querySelector('.map').style.display = '';
            });
            // TODO: plot markers
            const markers = [
                {
                    title: 'Kevin Kimura',
                    name: 'Kevin Kimura',
                    address:
                        'Market St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+15109212664',
                    type: 'business',
                    website: '',
                    zIndex: 100,
                    lat: 37.77481,
                    lng: -122.41948,
                },
                {
                    title: 'A&J Auto Service',
                    name: 'A&J Auto Service',
                    address:
                        '74 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14156216288',
                    type: 'business',
                    website: 'http://www.alsbodyshop.net',
                    zIndex: 100,
                    lat: 37.7735,
                    lng: -122.41943,
                },
                {
                    title: 'Exec Cleaning and Maid Ser...',
                    name: 'Exec Cleaning and Maid Ser...',
                    address:
                        'S Van Ness Ave, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '',
                    type: 'business',
                    website: '',
                    zIndex: 100,
                    lat: 37.77445,
                    lng: -122.41956,
                },
                {
                    title: 'Rhea Adri Signs and Chalkb...',
                    name: 'Rhea Adri Signs and Chalkb...',
                    address:
                        '20 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+13238983708',
                    type: 'business',
                    website: 'http://www.rheaadrichalk.weebly.com',
                    zIndex: 100,
                    lat: 37.77392,
                    lng: -122.42003,
                },
                {
                    title: 'Golden Gate Urgent Care',
                    name: 'Golden Gate Urgent Care',
                    address:
                        '1600 Market St, San Francisco, CA 94102-5910, United States, San Francisco ',
                    phone: '+14157461812',
                    type: 'business',
                    website: 'http://goldengateurgentcare.com/market-street',
                    zIndex: 100,
                    lat: 37.77413,
                    lng: -122.42093,
                },
                {
                    title: "Shabnum's Cleaning Services",
                    name: "Shabnum's Cleaning Services",
                    address:
                        'Market St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14158521016',
                    type: 'business',
                    website: '',
                    zIndex: 100,
                    lat: 37.77476,
                    lng: -122.41954,
                },
                {
                    title: 'Fast Lube',
                    name: 'Fast Lube',
                    address:
                        '50 S Van Ness Ave, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14158630123',
                    type: 'business',
                    website: 'http://www.fastlubeusa.com',
                    zIndex: 100,
                    lat: 37.77425,
                    lng: -122.41948,
                },
                {
                    title: "Foon's Auto",
                    name: "Foon's Auto",
                    address:
                        '40 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14155527603',
                    type: 'business',
                    website: '',
                    zIndex: 100,
                    lat: 37.77367,
                    lng: -122.41973,
                },
                {
                    title: 'Ashbury Construction',
                    name: 'Ashbury Construction',
                    address:
                        '40 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14157564260',
                    type: 'business',
                    website: 'http://www.ashburyconstruction.com',
                    zIndex: 100,
                    lat: 37.773649999999996,
                    lng: -122.41975000000001,
                },
                {
                    title: 'Crossroad Pizzeria',
                    name: 'Crossroad Pizzeria',
                    address:
                        '1596 Market St, San Francisco, CA 94102, United States, San Francisco ',
                    phone: '+14155292983',
                    type: 'business',
                    website: '',
                    zIndex: 100,
                    lat: 37.77463,
                    lng: -122.42044,
                },
                {
                    title: 'David Andrew Golden Archit...',
                    name: 'David Andrew Golden Archit...',
                    address:
                        '45 Franklin St, San Francisco, CA 94102-6017, United States, ',
                    phone: '',
                    type: 'business',
                    website: '',
                    zIndex: 100,
                    lat: 37.77495,
                    lng: -122.42107,
                },
                {
                    title: 'R & M Auto Body Shop',
                    name: 'R & M Auto Body Shop',
                    address:
                        '74 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14152557628',
                    type: 'business',
                    website: 'http://www.randautomotive.com',
                    zIndex: 100,
                    lat: 37.773489999999995,
                    lng: -122.41942,
                },
                {
                    title: 'Metzel Auto Upholstery',
                    name: 'Metzel Auto Upholstery',
                    address:
                        '42 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14154315571',
                    type: 'business',
                    website: 'http://www.metzelauto.com',
                    zIndex: 100,
                    lat: 37.77356,
                    lng: -122.41962,
                },
                {
                    title: 'Waterfront Transportation ...',
                    name: 'Waterfront Transportation ...',
                    address:
                        '30 S Van Ness Ave, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14155584073',
                    type: 'business',
                    website: 'http://www.sfgov.org',
                    zIndex: 100,
                    lat: 37.774460000000005,
                    lng: -122.41957000000001,
                },
                {
                    title: "Jessica Lynn's Loving Doul...",
                    name: "Jessica Lynn's Loving Doul...",
                    address:
                        '12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+18479718445',
                    type: 'business',
                    website: '',
                    zIndex: 100,
                    lat: 37.77444,
                    lng: -122.41957000000001,
                },
                {
                    title: 'Joy Auto Service',
                    name: 'Joy Auto Service',
                    address:
                        '40 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14152556180',
                    type: 'business',
                    website: 'http://www.pakautoservice.com',
                    zIndex: 100,
                    lat: 37.77366,
                    lng: -122.41974,
                },
                {
                    title: 'San Francisco Paratransit ...',
                    name: 'San Francisco Paratransit ...',
                    address:
                        '68 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14153517000',
                    type: 'business',
                    website: 'http://www.sfparatransit.com',
                    zIndex: 100,
                    lat: 37.77334,
                    lng: -122.41953,
                },
                {
                    title: 'Civic Center Hotel',
                    name: 'Civic Center Hotel',
                    address:
                        '20 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14158612373',
                    type: 'business',
                    website: 'http://www.sfciviccenter.org',
                    zIndex: 100,
                    lat: 37.773909999999994,
                    lng: -122.42002,
                },
                {
                    title: 'City Dance Studios',
                    name: 'City Dance Studios',
                    address:
                        '10 Colton St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14152971172',
                    type: 'business',
                    website: 'http://www.citydance.org',
                    zIndex: 100,
                    lat: 37.77335,
                    lng: -122.42005,
                },
                {
                    title: 'International Automotives',
                    name: 'International Automotives',
                    address:
                        '74 12th St, San Francisco, CA 94103, United States, San Francisco ',
                    phone: '+14154474001',
                    type: 'business',
                    website: '',
                    zIndex: 100,
                    lat: 37.77347999999999,
                    lng: -122.41943,
                },
            ];
            const locations = [];
            markers.forEach(details => {
                locations.push(
                    new plugin.google.maps.LatLng(details.lat, details.lng)
                );
                map.addMarker({
                    position: new plugin.google.maps.LatLng(
                        details.lat,
                        details.lng
                    ),
                    title: details.title,
                    icon: {
                        url: 'file:///android_asset/www/img/biz-ico.png',
                    },
                    snippet: details.address,
                });
            });
            setTimeout(() => {
                map.animateCamera({
                    target: locations,
                    duration: 0.5,
                });
            }, 600);
        });

        document.querySelector('.hide').addEventListener('click', node => {
            map.clear();
            mapShown = !mapShown;
            map.setVisible(mapShown);
            requestAnimationFrame(() => {
                document.querySelector('.map').style.display = 'none';
            });
            map.setCameraTarget(latLngPair[0]);
        });

        function initMap(map) {
            // initialized in Venice, California
            map.setOptions({
                camera: {
                    latLng: latLngPair[0],
                    zoom: 15,
                },
            });
            // hide the map
            mapShown = !mapShown;
            map.setVisible(mapShown);
            requestAnimationFrame(() => {
                document.querySelector('.map').style.display = 'none';
            });
        }
    },
};

app.initialize();