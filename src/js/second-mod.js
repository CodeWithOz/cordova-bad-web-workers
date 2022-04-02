import { firstModFunc1 } from './first-mod';
import { thirdModFunc1, thirdModFunc2 } from './third-mod';

console.log('imported first mod func 1 inside second mod');

export function secondModFunc1() {
    console.log('executing first mod func 1 inside second mod func 1');
    firstModFunc1();
}

export function secondModFunc2() {
    console.log('executing third mod func 1 inside second mod func 2');
    thirdModFunc1();
}

export function secondModFunc3() {
    console.log('executing third mod func 2 inside second mod func 3');
    thirdModFunc2();
}
