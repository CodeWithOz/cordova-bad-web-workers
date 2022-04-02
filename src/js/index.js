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
        import('./main.js')
            .then(({ initAppBeforeDeviceReady }) => {
                initAppBeforeDeviceReady();
            })
            .catch(err =>
                alert(`error importing main.js: ${JSON.stringify(err)}`)
            );
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        console.log('[app] deviceready fired');
        import('./main.js')
            .then(({ initAppAfterDeviceReady }) => {
                initAppAfterDeviceReady();
            })
            .catch(err =>
                alert(`error importing main.js: ${JSON.stringify(err)}`)
            );
        return;
        let myPane;
        let topHeight = 750;
        let scrollTop;
        // initialize transformY variable as the lowest point in the viewport
        let highestTransformY = window.innerHeight;

        document
            .querySelector('.init-bottom-sheet')
            .addEventListener('click', event => {
                initPane(undefined, true);
            });
        document
            .querySelector('.destroy-bottom-sheet')
            .addEventListener('click', event => {
                if (myPane) {
                    myPane.destroy({ animate: true });
                    myPane = null;
                }
            });

        // initialize cupertino-pane bottom sheet
        function initPane(
            config = {
                breaks: {
                    top: {
                        enabled: true,
                        height: topHeight,
                    },
                },
                onDrag() {
                    if (scrollTop > 0) {
                        myPane.disableDrag();
                    } else {
                        myPane.enableDrag();
                    }

                    if (
                        myPane.getPanelTransformY() >
                        window.innerHeight - topHeight
                    ) {
                        document
                            .querySelectorAll('.cupertino-pane .scroller')
                            .forEach(node => (node.style.overflowY = 'hidden'));
                    }
                },
                onDidDismiss() {
                    if (myPane) {
                        myPane.destroy({ animate: true });
                        myPane = null;
                    }
                    // document.querySelector('button.switch-tabs').removeEventListener('click', switchTabs);
                    document
                        .querySelectorAll('.cupertino-pane .scroller')
                        .forEach(node =>
                            node.removeEventListener('scroll', toggleDrag)
                        );
                },
                onDidPresent() {
                    // document.querySelector('button.switch-tabs').addEventListener('click', switchTabs);
                    document
                        .querySelectorAll('.cupertino-pane .scroller')
                        .forEach(node =>
                            node.addEventListener('scroll', toggleDrag)
                        );
                },
                topperOverflow: false,
                onTransitionEnd() {
                    if (myPane) {
                        const currentBreakPoint = myPane.currentBreak();
                        if (currentBreakPoint === 'top') {
                            requestAnimationFrame(() =>
                                document
                                    .querySelectorAll(
                                        '.cupertino-pane .scroller'
                                    )
                                    .forEach(
                                        node => (node.style.overflowY = 'auto')
                                    )
                            );
                        }
                        const currentTransformY = myPane.getPanelTransformY();
                        // update the highest transformY if necessary
                        if (currentTransformY < highestTransformY) {
                            highestTransformY = currentTransformY;
                        }
                    }
                },
            },
            shouldPresent
        ) {
            requestAnimationFrame(() => {
                document
                    .querySelectorAll('.cupertino-pane')
                    .forEach(function (el) {
                        el.parentNode.removeChild(el);
                    });
                const sheetHtml = `
                    <div class="cupertino-pane">
                        <h1>Header</h1>
                        <button type="button" class="switch-tabs"></button>
                        <div class="centerer">
                            <div class="switcher">
                                <input type="radio" name="status-bottom-sheet-tabs" value="comment" id="comment" class="switcher__input switcher__input--comment" checked="">
                                <label for="comment" class="switcher__label">Comments</label>
                                <input type="radio" name="status-bottom-sheet-tabs" value="profile" id="profile" class="switcher__input switcher__input--profile">
                                <label for="profile" class="switcher__label">Profile</label>
                                <input type="radio" name="status-bottom-sheet-tabs" value="public" id="public" class="switcher__input switcher__input--public">
                                <label for="public" class="switcher__label">Public</label>
                                <span class="switcher__toggle"></span>
                            </div>
                        </div>
                        <div class="content">
                            <div class="scroller" overflow-y>
                                <li><span>Text 1</span></li>
                                <li><span>Text 2</span></li>
                                <li><span>Text 3</span></li>
                                <li><span>Text 4</span></li>
                                <li><span>Text 5</span></li>
                                <li><span>Text 6</span></li>
                                <li><span>Text 7</span></li>
                                <li><span>Text 8</span></li>
                                <li><span>Text 9</span></li>
                                <li><span>Text 10</span></li>
                            </div>
                            <div class="scroller second" overflow-y>
                                <li><span>Text 1</span></li>
                                <li><span>Text 2</span></li>
                                <li><span>Text 3</span></li>
                                <li><span>Text 4</span></li>
                                <li><span>Text 5</span></li>
                                <li><span>Text 6</span></li>
                                <li><span>Text 7</span></li>
                                <li><span>Text 8</span></li>
                                <li><span>Text 9</span></li>
                                <li><span>Text 10</span></li>
                                <li><span>Text 11</span></li>
                                <li><span>Text 12</span></li>
                                <li><span>Text 13</span></li>
                                <li><span>Text 14</span></li>
                                <li><span>Text 15</span></li>
                                <li><span>Text 16</span></li>
                                <li><span>Text 17</span></li>
                                <li><span>Text 18</span></li>
                                <li><span>Text 19</span></li>
                                <li><span>Text 20</span></li>
                            </div>
                            <div class="scroller third" overflow-y>
                                <li><span>Text 1</span></li>
                                <li><span>Text 2</span></li>
                                <li><span>Text 3</span></li>
                                <li><span>Text 4</span></li>
                                <li><span>Text 5</span></li>
                                <li><span>Text 6</span></li>
                                <li><span>Text 7</span></li>
                                <li><span>Text 8</span></li>
                                <li><span>Text 9</span></li>
                                <li><span>Text 10</span></li>
                                <li><span>Text 11</span></li>
                                <li><span>Text 12</span></li>
                                <li><span>Text 13</span></li>
                                <li><span>Text 14</span></li>
                                <li><span>Text 15</span></li>
                                <li><span>Text 16</span></li>
                                <li><span>Text 17</span></li>
                                <li><span>Text 18</span></li>
                                <li><span>Text 19</span></li>
                                <li><span>Text 20</span></li>
                                <li><span>Text 21</span></li>
                                <li><span>Text 22</span></li>
                                <li><span>Text 23</span></li>
                                <li><span>Text 24</span></li>
                                <li><span>Text 25</span></li>
                                <li><span>Text 26</span></li>
                                <li><span>Text 27</span></li>
                                <li><span>Text 28</span></li>
                                <li><span>Text 29</span></li>
                                <li><span>Text 30</span></li>
                            </div>
                        </div>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', sheetHtml);
                const scrollSnapContainer = document.querySelector(`.content`);
                const sectionScrollTimeline = new ScrollTimeline({
                    scrollSource: scrollSnapContainer,
                    orientation: 'inline',
                    fill: 'both',
                });
                const activeIndicator =
                    document.querySelector('.switcher__toggle');
                const labels = document.querySelectorAll('label');
                if (activeIndicator instanceof HTMLElement) {
                    // animate it's position
                    activeIndicator.animate(
                        {
                            transform: [...labels].map(label => {
                                const forAttr = label.getAttribute('for') || '';
                                if (forAttr === 'public') {
                                    return 'translateX(calc(200% - 7px))';
                                } else if (forAttr === 'profile') {
                                    return 'translateX(100%)';
                                } else {
                                    return 'translateX(0px)';
                                }
                            }),
                        },
                        {
                            duration: 1000,
                            fill: 'both',
                            timeline: sectionScrollTimeline,
                        }
                    );
                }
                labels.forEach(label => {
                    label.animate(
                        {
                            color: [...labels].map(item =>
                                item === label ? `white` : `black`
                            ),
                        },
                        {
                            duration: 1000,
                            fill: 'both',
                            timeline: sectionScrollTimeline,
                        }
                    );
                });
                myPane = new CupertinoPane('.cupertino-pane', config);
                if (shouldPresent) {
                    myPane.present({ animate: true });
                }
            });
        }

        function switchTabs() {
            const activeTab = document.querySelector('.scroller.active');
            if (activeTab) {
                if (activeTab.classList.contains('second')) {
                    // switch to the third
                    scrollTop = 0;
                    requestAnimationFrame(() => {
                        activeTab.classList.remove('active');
                        document.querySelector('.scroller.third').classList.add('active');
                    });
                } else if (activeTab.classList.contains('third')) {
                    scrollTop = 0;
                    // switch to the first
                    requestAnimationFrame(() => {
                        activeTab.classList.remove('active');
                    });
                }
            } else {
                scrollTop = 0;
                // the first tab is focused
                // switch to the second
                document.querySelector('.scroller.second').classList.add('active');
            }
        }

        function toggleDrag(e) {
            scrollTop = e.target.scrollTop;
            if (scrollTop > 0) {
                if (myPane) {
                    myPane.disableDrag();
                }
            } else {
                if (myPane) {
                    myPane.enableDrag();
                }
            }
        }
    },
};

app.initialize();
