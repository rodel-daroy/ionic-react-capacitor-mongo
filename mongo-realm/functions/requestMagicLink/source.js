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
/* 11 */
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createToken = exports.createRandomNumericString = exports.validateType = exports.sendEmail = void 0;
const utility_1 = __webpack_require__(2);
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { http, sendingBlueApiKey, sendingBlueBaseURL, code, baseURL, email, token, type, username } = options;
    const body = {
        sender: {
            name: 'Fanzone Media',
            email: 'hi@fanzone.media',
        },
        to: [
            {
                email,
            },
        ],
        templateId: 17,
        replyTo: {
            email: 'hi@fanzone.media',
            name: 'Fanzone Media',
        },
        params: {},
    };
    switch (type) {
        case 'login': {
            body.templateId = 17;
            body.params = { code: code, link: `${baseURL}/magic-login-link-target?token=${token}&email=${email}` };
            break;
        }
        case 'register': {
            body.templateId = 18;
            body.params = {
                code: code,
                link: `${baseURL}/magic-login-link-target?token=${token}&email=${email}&username=${username ? username : 'user'}`,
            };
            break;
        }
        default:
            break;
    }
    return yield http.post({
        url: `${sendingBlueBaseURL}/email`,
        headers: {
            accept: ['application/json'],
            'api-key': [sendingBlueApiKey],
            'Content-Type': ['application/json'],
        },
        body: JSON.stringify(body),
    });
});
exports.sendEmail = sendEmail;
function validateType(type) {
    if (!['register', 'login'].includes(type)) {
        throw new Error(`Invalid Payload: ${type} for parameter 'type'.`);
    }
    return true;
}
exports.validateType = validateType;
const createRandomNumericString = (length = 6) => (Math.random() * Math.random() * 999999).toFixed(0).padStart(length, '0');
exports.createRandomNumericString = createRandomNumericString;
const createToken = (signToken) => (secret) => {
    // create JWT
    const code = exports.createRandomNumericString(6);
    return {
        token: signToken({ type: 'requestMagicLink', code }, secret, { expiresIn: 60 * 30 }),
        code,
    };
};
exports.createToken = createToken;
const requestMagicLink = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { sign } = yield Promise.resolve().then(() => __importStar(__webpack_require__(11)));
    const sendingBlueBaseURL = context.values.get('sendingBlueBaseURL');
    const baseURL = context.values.get('clientBaseURL');
    const jwtSecret = context.values.get('jwtSecretMagicLink');
    const sendingBlueApiKey = context.values.get('sendingBlueApiKey');
    const http = context.services.get('http');
    const userCollection = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    const { email, type, username } = payload;
    utility_1.validateEmail(email);
    validateType(type);
    const user = yield userCollection.findOne({ email });
    const { token, code } = exports.createToken(sign)(jwtSecret);
    if (!user) {
        yield userCollection.insertOne({
            email,
            authToken: token,
            accountId: 'toBeUpdated',
            username: '',
            coins: BSON.Decimal128.fromString('10000.0'),
            points: 0,
            securitySetting: 1,
            achievements: [],
            _bookmarkedCard_ids: [],
        });
    }
    else {
        yield userCollection.updateOne({ email }, { $set: { authToken: token } });
    }
    const res = yield exports.sendEmail({
        http,
        email,
        token,
        code,
        type,
        username,
        baseURL,
        sendingBlueApiKey,
        sendingBlueBaseURL,
    });
    return res;
});
exports.default = requestMagicLink;


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
/******/ var __webpack_exports__ = __webpack_require__(22);
/******/ exports = __webpack_exports__.default;
/******/ 
