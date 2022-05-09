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
/* 12 */
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
const UNITS = {
    igc: ' FZC',
    points: ' points',
};
const onAchievementObtained = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = Object.keys(payload.updateDescription.updatedFields || {})
        .map((key) => key.includes('achievements') && key)
        .filter(Boolean);
    if (!keys.length)
        return;
    const newAchievementIds = findNewAchievements(payload, keys);
    if (!newAchievementIds.length)
        return;
    yield Promise.all([
        addNotifications(newAchievementIds, payload),
        applyAchievementAwards(newAchievementIds, payload),
        updateAchievementStatus(newAchievementIds, payload.documentKey._id),
    ]);
});
exports.default = onAchievementObtained;
const findNewAchievements = (payload, keys) => {
    return (keys
        // eslint-disable-next-line security/detect-object-injection
        .map((key) => payload.updateDescription.updatedFields[key])
        .filter(({ status }) => status === utility_1.ACHIEVEMENT_STATUS.NEW)
        .map(({ _id }) => _id));
};
const addNotifications = (achievementIds, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const db = context.services.get('fanzone-dev-atlas').db('fanzone-dev');
    const notifications = db.collection('Notification');
    const metaAchievements_col = db.collection('MetaAchievement');
    const translations_col = db.collection('Translations');
    const [metaAchievements, translations] = yield Promise.all([
        metaAchievements_col.find({ _id: { $in: achievementIds } }).toArray(),
        translations_col.find({ _relation_id: { $in: achievementIds } }).toArray(),
    ]);
    const newNotifications = createAchievementNotification({
        userId: payload.fullDocument._id,
        achievementIds,
        metaAchievements,
        translations,
    });
    return notifications.insertMany(newNotifications);
});
const createAchievementNotification = ({ userId, achievementIds, metaAchievements, translations, }) => achievementIds.map((achievementId) => {
    var _a;
    const metaAchievement = metaAchievements.find(({ _id }) => achievementId === _id);
    const translation = translations.find(({ _relation_id }) => _relation_id.toString() === achievementId.toString());
    const title = ((_a = translation === null || translation === void 0 ? void 0 : translation.items.find((item) => item.id === 'title')) === null || _a === void 0 ? void 0 : _a.value) ||
        `TRANSLATION MISSING FOR ACHIEVEMENT ${achievementId.toString()}`;
    // eslint-disable-next-line security/detect-object-injection
    const reward = metaAchievement === null || metaAchievement === void 0 ? void 0 : metaAchievement.rewards.map(({ type, value }) => `${value}${UNITS[type] || ''}`).join(', ');
    const rewardstring = reward ? `and received the following reward: ${reward}.` : '';
    return {
        _user_id: userId,
        category: 'achievement',
        content: `You completed the achievement ${title}${rewardstring}`,
        title: `Achievement unlocked: ${title}`,
        type: utility_1.NOTIFICATION_TYPE.NOTIFICATION,
        status: utility_1.NOTIFICATION_STATUS.NOT_READ,
        createdAt: new Date(),
    };
});
const applyAchievementAwards = (newAchievementIds, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const users = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    const metaAchievements = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('MetaAchievement');
    const achievements = yield metaAchievements.find({ _id: { $in: newAchievementIds } }).toArray();
    const rewards = achievements.map(({ rewards }) => rewards).flat();
    const reduced = rewards.reduce((acc, { type, value }) => {
        if (type === 'igc')
            acc.igc = (acc.igc || 0) + parseInt(value);
        if (type === 'points')
            acc.points = (acc.points || 0) + parseInt(value);
        if (type === 'other')
            acc.other = [...acc.other, value];
        return acc;
    }, { igc: 0, points: 0, other: [] });
    yield users.updateOne({ _id: payload.fullDocument._id }, { $inc: { coins: reduced.igc, points: reduced.points } });
});
const updateAchievementStatus = (newAchievementIds, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    yield users.updateOne({ _id: userId }, { $set: { 'achievements.$[element].status': utility_1.ACHIEVEMENT_STATUS.NOT_SEEN } }, { arrayFilters: [{ 'element.status': utility_1.ACHIEVEMENT_STATUS.NEW, 'element._id': { $in: newAchievementIds } }] });
});


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
/******/ var __webpack_exports__ = __webpack_require__(12);
/******/ exports = __webpack_exports__.default;
/******/ 
