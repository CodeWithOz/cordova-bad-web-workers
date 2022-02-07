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
        console.log('[app] deviceready fired');
        let myPane;
        let topHeight = 750;
        let scrollTop;
        // initialize transformY variable as the lowest point in the viewport
        let highestTransformY = window.innerHeight;
        const scrollSnapContainer = document.querySelector(`.content`);
        const sectionScrollTimeline = new ScrollTimeline({
            scrollSource: scrollSnapContainer,
            orientation: 'inline',
            fill: 'both',
        });
        const activeIndicator = document.querySelector('.switcher__toggle');
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
            breaks: {
                top: {
                    enabled: true,
                    height: topHeight
                }
            },
            onDrag() {
                if (scrollTop > 0) {
                    myPane.disableDrag();
                } else {
                    myPane.enableDrag();
                }

                if (myPane.getPanelTransformY() > window.innerHeight - topHeight) {
                    document.querySelectorAll('.cupertino-pane .scroller').forEach(node => node.style.overflowY = 'hidden')
                }
            },
            onDidDismiss() {
                if (myPane) {
                    myPane.destroy({ animate: true });
                    myPane = null;
                }
                // document.querySelector('button.switch-tabs').removeEventListener('click', switchTabs);
                document.querySelectorAll('.cupertino-pane .scroller').forEach(node => node.removeEventListener('scroll', toggleDrag));
            },
            onDidPresent() {
                // document.querySelector('button.switch-tabs').addEventListener('click', switchTabs);
                document.querySelectorAll('.cupertino-pane .scroller').forEach(node => node.addEventListener('scroll', toggleDrag));
            },
            topperOverflow: false,
            onTransitionEnd() {
                if (myPane) {
                    const currentBreakPoint = myPane.currentBreak();
                    if (currentBreakPoint === 'top') {
                        requestAnimationFrame(() => document.querySelectorAll('.cupertino-pane .scroller').forEach(node => node.style.overflowY = 'auto'));
                    }
                    const currentTransformY = myPane.getPanelTransformY();
                    // update the highest transformY if necessary
                    if (currentTransformY < highestTransformY) {
                        highestTransformY = currentTransformY;
                    }
                }
            },
        }, shouldPresent) {
            myPane = new CupertinoPane('.cupertino-pane', config);
            if (shouldPresent) {
                myPane.present({ animate: true });
            }
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
