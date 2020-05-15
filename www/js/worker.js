importScripts('http://localhost/js/proxy.min.js');
importScripts('http://localhost/js/comlink/comlink.global.min.js');

const workerService = {
    testWorker: function(cloneableValue) {
        return cloneableValue;
    },
};

Comlink.expose(workerService, self);
