importScripts('../deps/comlink/comlink.global.min.js');
importScripts('../deps/dayjs/dayjs.min.js');
importScripts('../deps/dayjs/customParseFormat.js');
importScripts('../deps/dayjs/isSameOrAfter.js');
importScripts('../deps/dayjs/isSameOrBefore.js');

dayjs.extend(dayjs_plugin_customParseFormat);
dayjs.extend(dayjs_plugin_isSameOrAfter);
dayjs.extend(dayjs_plugin_isSameOrBefore);

const firstService = {
    testWorker: function (cloneableValue) {
        return cloneableValue;
    },
    testDayjs: function (timestamp) {
        const msgTimestamp = dayjs(timestamp);
        return (
            msgTimestamp.isSameOrAfter(
                dayjs(Date.now() - Math.random() * 1000000000)
            ) &&
            msgTimestamp.isSameOrBefore(
                dayjs(Date.now() - Math.random() * 1000000000)
            )
        );
    },
};

Comlink.expose(firstService, self);
