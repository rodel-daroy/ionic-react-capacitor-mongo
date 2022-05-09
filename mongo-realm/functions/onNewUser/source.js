/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ var __webpack_modules__ = ({

/***/ 15:
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
const onNewUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = BSON.ObjectId(payload.user.identities[0].id);
    const accountId = payload.user.id;
    yield setAccountIdForUser(userId, accountId);
    yield insertUserStatisticsDocument(userId);
    yield addUserStatistics(userId);
});
exports.default = onNewUser;
const addUserStatistics = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userStatistics = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('UserStatistics');
    yield userStatistics.updateOne({ _user_id: userId }, { $set: { emailRegistered: new Date() } });
});
const setAccountIdForUser = (userId, accountId) => __awaiter(void 0, void 0, void 0, function* () {
    const cluster = context.services.get('fanzone-dev-atlas');
    const users = cluster.db('fanzone-dev').collection('User');
    return users.updateOne({ _id: userId }, { $set: { accountId } });
});
const insertUserStatisticsDocument = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cluster = context.services.get('fanzone-dev-atlas');
    const userStatistics = cluster.db('fanzone-dev').collection('UserStatistics');
    // TBD: Should this doc be pre-populated? MongoDB updates can create fields automatically
    const newDoc = {
        _user_id: userId,
        emailRegistered: null,
        appOpened: {
            count: 0,
            list: [],
        },
        pageViews: {
            count: 0,
            list: [],
        },
        collectedCards: {
            count: 0,
        },
        market: {
            purchases: {
                count: 0,
                list: [],
            },
            sales: {
                count: 0,
                list: [],
            },
        },
        games: {
            playedCount: 0,
            penalty: {
                playedCount: 0,
                list: [],
            },
        },
        packs: {
            opened: {
                count: 0,
                list: [],
            },
        },
    };
    return userStatistics.insertOne(newDoc);
});


/***/ })

/******/ });
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__[15](0, __webpack_exports__);
/******/ exports = __webpack_exports__.default;
/******/ 
