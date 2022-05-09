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
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
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
const purchaseCardFromMarket = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const buyerId = context.user.custom_data._id;
    const cluster = context.services.get('fanzone-dev-atlas');
    const cards = cluster.db('fanzone-dev').collection('Card');
    const users = cluster.db('fanzone-dev').collection('User');
    const notifications = cluster.db('fanzone-dev').collection('Notification');
    const translations = cluster.db('fanzone-dev').collection('Translations');
    const metaCards = cluster.db('fanzone-dev').collection('MetaCard');
    const userStatistics = cluster.db('fanzone-dev').collection('UserStatistics');
    const session = cluster.startSession({ defaultTransactionOptions: { readPreference: 'primary' } });
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    };
    try {
        /* Make sure all resources exist
         * NOTE: We cannot use .find/.findOne queries within a Transaction (Realm specific?) so we do it before.
         */
        const card = yield cards.findOne({ _id: BSON.ObjectId(payload.cardId), onSale: true });
        if (!card)
            throw new Error(`Card with id ${payload.cardId} not on sale.`);
        if (!card.price)
            throw new Error(`Card with id ${payload.cardId} has no price set.`);
        const owner = yield users.findOne({ _id: card._user_id });
        if (!owner)
            throw new Error(`Owner (${card._user_id.toHexString()}) of card with id ${payload.cardId} not found`);
        const buyer = yield users.findOne({ _id: BSON.ObjectId(buyerId) });
        if (!buyer)
            throw new Error(`Buyer (${buyerId}) not found`);
        const metaCard = yield metaCards.findOne({ _id: card._metaCard_id });
        if (!metaCard)
            throw new Error(`MetaCard for card ${card._id.toString()} not found.`);
        const cardTranslations = yield translations.findOne({ _relation_id: metaCard._id });
        const cardTitle = (cardTranslations && ((_a = cardTranslations.items.find(({ id }) => id === 'title')) === null || _a === void 0 ? void 0 : _a.value)) ||
            card._metaCard_id.toString();
        /* Check if buyer has sufficient funds */
        const cardPrice = parseFloat(card.price.toString());
        const buyerCoins = parseFloat(buyer.coins.toString());
        if (buyerCoins < cardPrice)
            throw new Error('Insufficient funds.');
        const previousOwner = {
            _user_id: card._user_id,
            transferDate: new Date().toUTCString(),
            transferType: 'purchase',
            purchasePrice: card.price,
        };
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            /* Apply changes */
            yield Promise.all([
                /* Update Buyer - subtract price of card */
                users.updateOne({ _id: BSON.ObjectId(buyerId), coins: { $gte: card.price } }, {
                    $inc: { coins: 0 - card.price },
                    $push: { previousOwners: previousOwner },
                }, { session }),
                /* Update Seller - add price of card */
                users.updateOne({ _id: card._user_id }, { $inc: { coins: card.price } }, { session }),
                cards.updateOne({ _id: BSON.ObjectId(payload.cardId), onSale: true }, { $set: { _user_id: buyer._id, onSale: false }, $unset: { onSaleDate: '', price: '' } }, { session }),
                userStatistics.updateOne({ _user_id: card._user_id }, {
                    $inc: { 'market.purchases.count': 1, 'collectedCards.count': 1 },
                    $push: { 'market.purchases.list': { _card_id: card._id, timestamp: new Date() } },
                }),
                userStatistics.updateOne({ _user_id: buyer._id }, {
                    $inc: { 'market.sales.count': 1, 'collectedCards.count': -1 },
                    $push: { 'market.sales.list': { _card_id: card._id, timestamp: new Date() } },
                }),
                notifications.insertMany([
                    {
                        _user_id: card._user_id,
                        category: 'notification',
                        content: `You sold a card for ${cardPrice} FZC: ${cardTitle} - Mint ${card.mintNumber}`,
                        title: `You sold a card for ${cardPrice} FZC: ${cardTitle} - Mint ${card.mintNumber}`,
                        type: utility_1.NOTIFICATION_TYPE.NOTIFICATION,
                        status: utility_1.NOTIFICATION_STATUS.NOT_READ,
                        createdAt: new Date(),
                    },
                    {
                        _user_id: BSON.ObjectId(buyerId),
                        category: 'notification',
                        content: `You bought a card for ${cardPrice} FZC: ${cardTitle} - Mint ${card.mintNumber}`,
                        title: `You bought a card for ${cardPrice} FZC: ${cardTitle} - Mint ${card.mintNumber}`,
                        type: utility_1.NOTIFICATION_TYPE.NOTIFICATION,
                        status: utility_1.NOTIFICATION_STATUS.NOT_READ,
                        createdAt: new Date(),
                    },
                ]),
                // create notifications for buyer & seller
            ]);
        }), transactionOptions);
    }
    finally {
        session.endSession();
    }
});
exports.default = purchaseCardFromMarket;


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
/******/ var __webpack_exports__ = __webpack_require__(21);
/******/ exports = __webpack_exports__.default;
/******/ 
