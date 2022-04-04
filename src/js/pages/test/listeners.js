import { state } from '../../first-mod';

export const pageFunc = function () {
    if (state) {
        alert(`[LAZYLOAD] state.fakeProp: ${state.fakeProp}`);
    } else {
        alert(`[LAZYLOAD] state: ${state}`);
    }
};
