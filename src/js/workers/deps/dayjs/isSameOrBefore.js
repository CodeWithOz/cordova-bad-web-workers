/**
 * Version: DayJS 1.10.5
 * Source: https://unpkg.com/browse/dayjs@1.10.5/plugin/isSameOrBefore.js
 */

!(function (e, i) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = i())
        : 'function' == typeof define && define.amd
        ? define(i)
        : ((e =
              'undefined' != typeof globalThis
                  ? globalThis
                  : e || self).dayjs_plugin_isSameOrBefore = i());
})(this, function () {
    'use strict';
    return function (e, i) {
        i.prototype.isSameOrBefore = function (e, i) {
            return this.isSame(e, i) || this.isBefore(e, i);
        };
    };
});
