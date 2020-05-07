importScripts('http://localhost:8080/js/proxy.min.js');
importScripts('http://localhost:8080/js/comlink/comlink.global.min.js');

const workerService = {
    testWorker: function(cloneableValue) {
        return cloneableValue;
    },
};

Comlink.expose(workerService, self);
