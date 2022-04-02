import { wrap } from 'comlink';

const workers = {
    first: 'first.ww.js',
};

export function getWorker(id) {
    try {
        const worker = new Worker('./js/workers/' + workers[id]);
        const workerProxy = wrap(worker);
        return [workerProxy, worker];
    } catch (e) {
        console.log('=================== worker creation failed:', e);
        return [{}, {}];
    }
}
/**
 * Releases the resources used by a Comlink Proxy and destroys the associated web worker
 *
 * @param {Array} workerAndProxy two-member array. First member is a Proxy of the worker
 * as returned by Comlink, second member is the associated web worker
 */
export function destroyWorker(workerAndProxy) {
    if (workerAndProxy[0]) {
        workerAndProxy[0][Comlink.releaseProxy]();
    }
    if (workerAndProxy[1]) {
        workerAndProxy[1].terminate();
    }
}
