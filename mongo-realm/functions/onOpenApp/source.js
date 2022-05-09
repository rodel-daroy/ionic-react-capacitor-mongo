/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ var __webpack_modules__ = ({

/***/ 17:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const onOpenApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield addUserStatistics();
});
const addUserStatistics = () => __awaiter(void 0, void 0, void 0, function* () {
    const userStatistics = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('UserStatistics');
    const userId = context.user.custom_data._id;
    if (!userId)
        return; // Function called by anon-user
    const updates = { $inc: { 'appOpened.count': 1 }, $push: { 'appOpened.list': { timestamp: new Date() } } };
    yield userStatistics.updateOne({ _user_id: BSON.ObjectId(userId) }, updates);
});
exports.default = onOpenApp;


/***/ })

/******/ });
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__[17](0, __webpack_exports__);
/******/ exports = __webpack_exports__.default;
/******/ 
