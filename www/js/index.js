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
        this.receivedEvent('deviceready');
        let myPane;
        document.querySelector('.init-bottom-sheet').addEventListener('click', event => {
            initPane(undefined, true);
        });
        document.querySelector('.destroy-bottom-sheet').addEventListener('click', event => {
            if (myPane) {
                myPane.destroy({ animate: true });
                myPane = null;
            }
        });

        // initialize cupertino-pane bottom sheet
        function initPane(config = {
            onDidDismiss() {
                if (myPane) {
                    myPane.destroy({ animate: true });
                    myPane = null;
                }
                document.querySelector('button.switch-tabs').removeEventListener('click', switchTabs);
            },
            onDidPresent() {
                document.querySelector('button.switch-tabs').addEventListener('click', switchTabs);
            },
            topperOverflow: false,
        }, shouldPresent) {
            myPane = new CupertinoPane('.cupertino-pane', config);
            if (shouldPresent) {
                myPane.present({ animate: true });
            }
        }
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

let count = 0;
function insertPane() {
    const getLis = () => {
        let html = '';
        for (let i = 0; i < 30; i++) {
            html += `<li><span>Text ${(count * 10) + i}</span></li>`;
        }
        return html;
    };
    const paneHTML = `
    <div class="cupertino-pane-${count}">
        <h1>Header</h1>
        <div class="content">
            ${getLis()}
        </div>
    </div>`;
    document.body.insertAdjacentHTML(paneHTML);
    const newPane = new CupertinoPane(`.cupertino-pane-${count}`);
    myPane.present({ animate: true });
    count++;
}

function switchTabs() {
    const activeTab = document.querySelector('.scroller.active');
    if (activeTab) {
        if (activeTab.classList.contains('second')) {
            // switch to the third
            requestAnimationFrame(() => {
                activeTab.classList.remove('active');
                document.querySelector('.scroller.third').classList.add('active');
            });
        } else if (activeTab.classList.contains('third')) {
            // switch to the first
            requestAnimationFrame(() => {
                activeTab.classList.remove('active');
            });
        }
    } else {
        // the first tab is focused
        // switch to the second
        document.querySelector('.scroller.second').classList.add('active');
    }
}
