import { firstModFunc1 } from './first-mod.js';
import { secondModFunc1 } from './second-mod.js';

console.log('imported first mod func 1 inside third mod');

export function thirdModFunc1() {
    console.log('executing first mod func 1 inside third mod func 1');
    firstModFunc1();
}

export function thirdModFunc2() {
    console.log('executing second mod func 1 inside third mod func 2');
    secondModFunc1();
}
