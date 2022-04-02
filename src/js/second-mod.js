import { firstModFunc1 } from './first-mod.js';
import { thirdModFunc1, thirdModFunc2 } from './third-mod.js';

console.log('imported first mod func 1 inside second mod');

export function secondModFunc1() {
    console.log('executing first mod func 1 inside second mod func 1');
    firstModFunc1();
}

export function secondModFunc2() {
    console.log('executing third mod func 1 inside second mod func 2');
    thirdModFunc1();
    console.log('executing third mod func 2 inside second mod func 2');
    thirdModFunc2();
}
