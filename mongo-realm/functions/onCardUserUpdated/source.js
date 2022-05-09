/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ var __webpack_modules__ = ({

/***/ 14:
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
const onCardUserUpdated = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _user_id: userId, previousOwners, _metaCard_id, mintNumber } = payload.fullDocument;
    yield Promise.all([
        updateUserPoints({
            newOwnerId: userId,
            prevOwnerId: previousOwners[previousOwners.length - 1]._user_id,
            metaCardId: _metaCard_id,
            mintNumber,
        }),
        addUserStatistics(userId, previousOwners),
    ]);
});
const addUserStatistics = (userId, previousOwners) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userStatistics = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('UserStatistics');
    const previousOwnerId = (_a = previousOwners[previousOwners.length - 1]) === null || _a === void 0 ? void 0 : _a._user_id;
    yield userStatistics.updateOne({ _user_id: userId }, { $inc: { 'collectedCards.count': 1 } });
    if (previousOwnerId)
        yield userStatistics.updateOne({ _user_id: previousOwnerId }, { $inc: { 'collectedCards.count': 1 } });
});
const updateUserPoints = ({ mintNumber, newOwnerId, prevOwnerId, metaCardId }) => __awaiter(void 0, void 0, void 0, function* () {
    const db = context.services.get('fanzone-dev-atlas').db('fanzone-dev');
    const users = db.collection('User');
    const metaCards = db.collection('MetaCard');
    const metaCard = yield metaCards.findOne({ _id: metaCardId });
    if (!metaCard)
        throw new Error('MetaCard not found');
    try {
        // eslint-disable-next-line security/detect-eval-with-expression
        const fn = eval(metaCard.scoreCalc);
        const value = Math.round(fn(mintNumber * 10));
        yield Promise.all([
            users.updateOne({ _id: newOwnerId }, { $inc: { points: value } }),
            users.updateOne({ _id: prevOwnerId }, { $inc: { points: 0 - value } }),
        ]);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    }
});
exports.default = onCardUserUpdated;


/***/ })

/******/ });
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__[14](0, __webpack_exports__);
/******/ exports = __webpack_exports__.default;
/******/ 
