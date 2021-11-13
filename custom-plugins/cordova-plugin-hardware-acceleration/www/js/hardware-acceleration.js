module.exports = {
    disable: (success, error) => {
        cordova.exec(success, error, 'HardwareAcceleration', 'disable', []);
    },
    enable: (success, error) => {
        cordova.exec(success, error, 'HardwareAcceleration', 'enable', []);
    },
    getLayerType: (success, error) => {
        cordova.exec(success, error, 'HardwareAcceleration', 'getLayerType', []);
    },
};
