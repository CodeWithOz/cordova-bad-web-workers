import { secondModFunc1, secondModFunc2 } from './second-mod';
import { thirdModFunc1, thirdModFunc2 } from './third-mod';
import { state } from './first-mod';

export function initAppBeforeDeviceReady() {
    console.log('[CUSTOM LOG] app initialized before deviceready fires');
    secondModFunc1();
    thirdModFunc1();
}

export function initAppAfterDeviceReady() {
    console.log('[CUSTOM LOG] app initialized after deviceready fires');
    secondModFunc2();
    thirdModFunc2();
    document
        .querySelector('.init-bottom-sheet')
        .addEventListener('click', e => {
            if (state) {
                alert(`state.fakeProp: ${state.fakeProp}`);
            } else {
                alert(`state: ${state}`);
            }
        });
    document
        .querySelector('.destroy-bottom-sheet')
        .addEventListener('click', e => {
            const newVal = Math.floor(Math.random() * 1000);
            alert(`setting state.fakeProp to ${newVal}`);
            state.fakeProp = newVal;
            alert(`setting state.fakeProp: ${state.fakeProp}`);
        });
}
