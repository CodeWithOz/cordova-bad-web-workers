importScripts('./js/proxy.min.js');
importScripts('./js/comlink/comlink.global.min.js');

const workerService = {
    testWorker: function(cloneableValue) {
        return cloneableValue;
    },
};

Comlink.expose(workerService, self);
