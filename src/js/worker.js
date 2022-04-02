importScripts('./proxy.min.js');
importScripts('./comlink/comlink.global.min.js');

const workerService = {
    testWorker: function(cloneableValue) {
        return cloneableValue;
    },
};

Comlink.expose(workerService, self);
