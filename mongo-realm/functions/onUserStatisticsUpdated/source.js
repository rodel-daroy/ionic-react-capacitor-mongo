/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3), exports);
__exportStar(__webpack_require__(5), exports);
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(7), exports);
__exportStar(__webpack_require__(8), exports);


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(4), exports);


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateEmail = void 0;
const validateEmail = (email) => {
    // eslint-disable-next-line
    const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegEx.test(email)) {
        throw new Error(`Invalid Payload: ${String(email)} for parameter 'email'.`);
    }
    return true;
};
exports.validateEmail = validateEmail;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NOTIFICATION_STATUS = exports.NOTIFICATION_TYPE = void 0;
var NOTIFICATION_TYPE;
(function (NOTIFICATION_TYPE) {
    NOTIFICATION_TYPE["NOTIFICATION"] = "notification";
    NOTIFICATION_TYPE["ACHIEVEMENT"] = "achievement";
})(NOTIFICATION_TYPE = exports.NOTIFICATION_TYPE || (exports.NOTIFICATION_TYPE = {}));
var NOTIFICATION_STATUS;
(function (NOTIFICATION_STATUS) {
    NOTIFICATION_STATUS[NOTIFICATION_STATUS["NOT_READ"] = 0] = "NOT_READ";
    NOTIFICATION_STATUS[NOTIFICATION_STATUS["READ"] = 1] = "READ";
    NOTIFICATION_STATUS[NOTIFICATION_STATUS["ARCHIEVED"] = 2] = "ARCHIEVED";
    NOTIFICATION_STATUS[NOTIFICATION_STATUS["DELETED"] = 3] = "DELETED";
})(NOTIFICATION_STATUS = exports.NOTIFICATION_STATUS || (exports.NOTIFICATION_STATUS = {}));


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ACHIEVEMENT_STATUS = void 0;
var ACHIEVEMENT_STATUS;
(function (ACHIEVEMENT_STATUS) {
    ACHIEVEMENT_STATUS["NOT_SEEN"] = "not_seen";
    ACHIEVEMENT_STATUS["SEEN"] = "seen";
    ACHIEVEMENT_STATUS["NEW"] = "new";
})(ACHIEVEMENT_STATUS = exports.ACHIEVEMENT_STATUS || (exports.ACHIEVEMENT_STATUS = {}));


/***/ }),
/* 7 */
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
exports.getUserAchievements = void 0;
const getUserAchievements = ({ user, userId, achievementId }) => __awaiter(void 0, void 0, void 0, function* () {
    const users = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    const u = user ? user : userId ? yield users.findOne({ _id: userId }) : null;
    return (u === null || u === void 0 ? void 0 : u.achievements.filter(({ _id }) => _id.toString() === achievementId.toString())) || [];
});
exports.getUserAchievements = getUserAchievements;


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
exports.insertAchievement = void 0;
const achievementEnums_1 = __webpack_require__(6);
const insertAchievement = ({ userId, achievementId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const users = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    const newAchievement = {
        _id: achievementId,
        achievementDate: new Date(),
        status: achievementEnums_1.ACHIEVEMENT_STATUS.NEW,
    };
    return users.updateOne({ _id: userId }, { $push: { achievements: newAchievement } });
});
exports.insertAchievement = insertAchievement;


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
const utility_1 = __webpack_require__(2);
const DAY = 1000 * 60 * 60 * 24;
const onUserStatisticsUpdated = ({ fullDocument, updateDescription: { updatedFields }, }) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = [];
    const keys = Object.keys(updatedFields).reduce((acc, key) => Array.from(new Set([...acc, key.split('.').shift() || key])), []);
    keys.forEach((key) => {
        switch (true) {
            case key.includes('appOpened'): {
                promises.push(appOpenedAchievements(fullDocument));
                break;
            }
            case key.includes('pageViews'): {
                promises.push(visitPageAchievements(fullDocument));
                break;
            }
            case key.includes('collectedCards'): {
                promises.push(collectCardsAchievements(fullDocument));
                break;
            }
            case key.includes('emailRegistered'): {
                promises.push(emailRegisteredAchievements(fullDocument));
                break;
            }
            case key.includes('market'): {
                promises.push(marketAchievements(fullDocument));
                break;
            }
            case key.includes('packs'): {
                break;
            }
            default:
        }
    });
    yield Promise.all(promises);
});
const DAILY_LOGIN = 'daily_login';
const WEEKLY_LOGIN = 'weekly_login';
const appOpenedAchievements = ({ _user_id, appOpened: { list } }) => __awaiter(void 0, void 0, void 0, function* () {
    const startToday = new Date().setUTCHours(0, 0, 0, 0);
    const weekday = new Date(startToday).getDay(); // 0-6
    const startWeek = startToday - 1000 * 60 * 60 * 24 * weekday;
    const secondLastLogin = list[list.length - 2] || {};
    const lastLogin = list[list.length - 1] || {};
    /* First daily login */
    if (new Date(lastLogin.timestamp || 0).valueOf() > startToday &&
        new Date(secondLastLogin.timestamp || 0).valueOf() < startToday) {
        yield addAchievement(_user_id, DAILY_LOGIN);
    }
    /* Login each day of th week */
    const week = Array.from(Array(7)).map((_, i) => startWeek + DAY * i);
    // there needs to be one daily_login achievement for each interval in week
    if (yield hasWeeklyLogins(_user_id, week)) {
        yield addAchievement(_user_id, WEEKLY_LOGIN);
    }
});
const hasWeeklyLogins = (userId, week) => __awaiter(void 0, void 0, void 0, function* () {
    const db = context.services.get('fanzone-dev-atlas').db('fanzone-dev');
    const users = db.collection('User');
    const metaAchievements = db.collection('MetaAchievement');
    const user = yield users.findOne({ _id: userId });
    const metaAchievement = yield metaAchievements.findOne({ 'meta.internalName': DAILY_LOGIN, status: 'enabled' });
    if (!metaAchievement || !user)
        return false;
    const dailyLoginAchievements = user.achievements
        .filter(({ _id, achievementDate }) => metaAchievement._id === _id && new Date(achievementDate).valueOf() > week[0])
        .map(({ achievementDate }) => new Date(achievementDate).valueOf());
    return week.every((beginningOfDay) => dailyLoginAchievements.some((date) => date >= beginningOfDay && date < beginningOfDay + DAY));
});
const REGISTER_EMAIL = 'register_email';
const emailRegisteredAchievements = ({ _user_id }) => __awaiter(void 0, void 0, void 0, function* () {
    yield addAchievement(_user_id, REGISTER_EMAIL);
});
const VISIT_COLLECTION = 'visit_collection';
const visitPageAchievements = ({ _user_id, pageViews: { list } }) => __awaiter(void 0, void 0, void 0, function* () {
    if (list.some(({ name }) => name === 'collect')) {
        yield addAchievement(_user_id, VISIT_COLLECTION);
    }
});
const DAILY_FIRST_BUY_MARKET = 'daily_1st_buy_market';
const DAILY_FIRST_SELL_MARKET = 'daily_1st_sell_market';
const WEEKLY_TENTH_BUY_MARKET = 'weekly_10_buys_market';
const WEEKLY_TENTH_SELL_MARKET = 'weekly_10_sells_market';
const marketAchievements = ({ _user_id, market: { purchases, sales } }) => __awaiter(void 0, void 0, void 0, function* () {
    const startToday = new Date().setUTCHours(0, 0, 0, 0);
    const weekday = new Date(startToday).getDay(); // 0-6
    const startWeek = startToday - 1000 * 60 * 60 * 24 * weekday;
    const purchasesToday = purchases.list.filter((item) => new Date(item.timestamp).valueOf() > startToday);
    const purchasesThisWeek = purchases.list.filter((item) => new Date(item.timestamp).valueOf() > startWeek);
    const salesToday = sales.list.filter((item) => new Date(item.timestamp).valueOf() > startToday);
    const salesThisWeek = sales.list.filter((item) => new Date(item.timestamp).valueOf() > startWeek);
    if (purchasesToday.length === 1) {
        yield addAchievement(_user_id, DAILY_FIRST_BUY_MARKET);
    }
    if (salesToday.length === 1) {
        yield addAchievement(_user_id, DAILY_FIRST_SELL_MARKET);
    }
    if (purchasesThisWeek.length === 10) {
        yield addAchievement(_user_id, WEEKLY_TENTH_BUY_MARKET);
    }
    if (salesThisWeek.length === 10) {
        yield addAchievement(_user_id, WEEKLY_TENTH_SELL_MARKET);
    }
});
const COLLECT_TEN_CARDS = 'collect_10_cards';
const COLLECT_FIFTY_CARDS = 'collect_50_cards';
const COLLECT_HUNDRED_CARDS = 'collect_100_cards';
const collectCardsAchievements = ({ _user_id, collectedCards: { count } }) => __awaiter(void 0, void 0, void 0, function* () {
    if (count >= 10)
        yield addAchievement(_user_id, COLLECT_TEN_CARDS);
    if (count >= 50)
        yield addAchievement(_user_id, COLLECT_FIFTY_CARDS);
    if (count >= 100)
        yield addAchievement(_user_id, COLLECT_HUNDRED_CARDS);
});
const addAchievement = (_user_id, achievementName) => __awaiter(void 0, void 0, void 0, function* () {
    const metaAchievements_col = context.services
        .get('fanzone-dev-atlas')
        .db('fanzone-dev')
        .collection('MetaAchievement');
    const metaAchievement = yield metaAchievements_col.findOne({
        'meta.internalName': achievementName,
        status: 'enabled',
    });
    if (yield shouldAchievementBeGranted({
        userId: _user_id,
        metaAchievement,
    })) {
        yield utility_1.insertAchievement({
            userId: _user_id,
            achievementId: metaAchievement._id,
        });
    }
});
const shouldAchievementBeGranted = ({ metaAchievement, userId, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!metaAchievement || metaAchievement.status === 'disabled')
        return false;
    const startDay = new Date().setUTCHours(0, 0, 0, 0);
    const weekday = new Date(startDay).getDay(); // 0-6
    const startWeek = startDay - 1000 * 60 * 60 * 24 * weekday;
    const userAchievements = yield utility_1.getUserAchievements({ user, userId, achievementId: metaAchievement._id });
    switch (metaAchievement.meta.timeframe) {
        case 'one-off': {
            if (userAchievements.length)
                return false;
            break;
        }
        case 'weekly': {
            if (userAchievements.some(({ achievementDate }) => new Date(achievementDate).valueOf() > startWeek))
                return false;
            break;
        }
        case 'daily': {
            if (userAchievements.some(({ achievementDate }) => new Date(achievementDate).valueOf() > startDay))
                return false;
            break;
        }
        default:
    }
    return true;
});
exports.default = onUserStatisticsUpdated;


/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__(18);
/******/ exports = __webpack_exports__.default;
/******/ 
