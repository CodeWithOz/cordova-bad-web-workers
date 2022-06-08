import { secondModFunc1, secondModFunc2 } from './second-mod';
import { thirdModFunc1, thirdModFunc2 } from './third-mod';
import { state } from './first-mod';

export function initAppBeforeDeviceReady() {
    console.log('[CUSTOM LOG] app initialized before deviceready fires');
    // secondModFunc1();
    // thirdModFunc1();
}

window.myPane = null;
let topHeight = 750;
let scrollTop = 0;
// initialize transformY variable as the lowest point in the viewport
let highestTransformY = window.innerHeight;
export function initAppAfterDeviceReady() {
    console.log('[CUSTOM LOG] app initialized after deviceready fires');
    // secondModFunc2();
    // thirdModFunc2();
    document
        .querySelector('.init-bottom-sheet')
        .addEventListener('click', e => {
            initPane(undefined, true);
        });
    document
        .querySelector('.destroy-bottom-sheet')
        .addEventListener('click', e => {
            if (myPane) {
                myPane.destroy({ animate: true });
                myPane = null;
            }
        });
    function initPane(
        config = {
            breaks: {
                top: {
                    enabled: true,
                    // height: topHeight,
                    height: window.innerHeight - 81,
                },
            },
            events: {
                // onDrag() {
                //     if (scrollTop > 0) {
                //         myPane.disableDrag();
                //     } else {
                //         myPane.enableDrag();
                //     }

                //     if (
                //         myPane.getPanelTransformY() >
                //         window.innerHeight - topHeight
                //     ) {
                //         document
                //             .querySelectorAll('.cupertino-pane .scroller')
                //             .forEach(node => (node.style.overflowY = 'hidden'));
                //     }
                // },
                onDidDismiss() {
                    if (myPane) {
                        myPane.destroy({ animate: true });
                        myPane = null;
                    }
                    // document.querySelector('button.switch-tabs').removeEventListener('click', switchTabs);
                    // document
                    //     .querySelectorAll('.cupertino-pane .scroller')
                    //     .forEach(node =>
                    //         node.removeEventListener('scroll', toggleDrag)
                    //     );
                },
                onDidPresent() {
                    // document.querySelector('button.switch-tabs').addEventListener('click', switchTabs);
                    // document
                    //     .querySelectorAll('.cupertino-pane .scroller')
                    //     .forEach(node =>
                    //         node.addEventListener('scroll', toggleDrag)
                    //     );
                },
                onTransitionEnd() {
                    // if (myPane) {
                    //     const currentBreakPoint = myPane.currentBreak();
                    //     if (currentBreakPoint === 'top') {
                    //         requestAnimationFrame(() =>
                    //             document
                    //                 .querySelectorAll('.cupertino-pane .scroller')
                    //                 .forEach(
                    //                     node => (node.style.overflowY = 'auto')
                    //                 )
                    //         );
                    //     }
                    //     const currentTransformY = myPane.getPanelTransformY();
                    //     // update the highest transformY if necessary
                    //     if (currentTransformY < highestTransformY) {
                    //         highestTransformY = currentTransformY;
                    //     }
                    // }
                },
            },
            // topperOverflow: false,
        },
        shouldPresent
    ) {
        requestAnimationFrame(() => {
            document.querySelectorAll('.cupertino-pane').forEach(function (el) {
                el.parentNode.removeChild(el);
            });
            const sheetHtml = `
                <div class="cupertino-pane">
                    <h1>Header</h1>
                    <div class="content">
                        <div class="scroller">
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
            myPane = new CupertinoPane('.cupertino-pane', config);
            if (shouldPresent) {
                myPane.present({ animate: true });
            }
        });
    }
}
