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
        let haON = true,
            cvON = true,
            opON = true;
        const ul = document.querySelector('.cupertino-pane ul');
        const injectBtn = document.querySelector('.inject');
        injectBtn.addEventListener('click', e => {
            ul.innerHTML += ul.innerHTML;
        });
        const toggleHaBtn = document.querySelector('.toggle-ha');
        toggleHaBtn.addEventListener('click', e => {
            if (haON) {
                ul.classList.remove('ha');
                toggleHaBtn.querySelector('span').textContent = 'OFF';
                haON = false;
            } else {
                ul.classList.add('ha');
                toggleHaBtn.querySelector('span').textContent = 'ON';
                haON = true;
            }
        });
        const toggleCvBtn = document.querySelector('.toggle-cv');
        toggleCvBtn.addEventListener('click', e => {
            if (cvON) {
                ul.classList.remove('cv');
                toggleCvBtn.querySelector('span').textContent = 'none';
                cvON = false;
            } else {
                ul.classList.add('cv');
                toggleCvBtn.querySelector('span').textContent = 'auto';
                cvON = true;
            }
        });
        const toggleOpBtn = document.querySelector('.toggle-op');
        toggleOpBtn.addEventListener('click', e => {
            if (opON) {
                ul.classList.remove('op');
                toggleOpBtn.querySelector('span').textContent = 'OFF';
                opON = false;
            } else {
                ul.classList.add('op');
                toggleOpBtn.querySelector('span').textContent = 'ON';
                opON = true;
            }
        });
    },
};

app.initialize();
