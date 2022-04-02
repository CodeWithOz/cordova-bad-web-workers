import { secondModFunc1, secondModFunc2 } from './second-mod';
import { thirdModFunc1, thirdModFunc2 } from './third-mod';

export function initAppBeforeDeviceReady() {
    console.log('[CUSTOM LOG] app initialized before deviceready fires');
    secondModFunc1();
    thirdModFunc1();
}

export function initAppAfterDeviceReady() {
    console.log('[CUSTOM LOG] app initialized after deviceready fires');
    secondModFunc2();
    thirdModFunc2();
}
