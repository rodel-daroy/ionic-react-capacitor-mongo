/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const onNewNotification = (_payload) => {
    // eslint-disable-next-line no-console
    console.log('TODO: Send New Notification');
};
exports.default = onNewNotification;

})();

exports = __webpack_exports__.default;
