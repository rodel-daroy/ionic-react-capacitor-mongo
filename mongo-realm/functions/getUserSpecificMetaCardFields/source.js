/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ var __webpack_modules__ = ({

/***/ 9:
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
const getUserSpecificMetaCardFields = (source) => __awaiter(void 0, void 0, void 0, function* () {
    const db = context.services.get('fanzone-dev-atlas').db('fanzone-dev');
    const cardsCollection = db.collection('Card');
    const usersCollection = db.collection('User');
    const userId = context.user.custom_data._id;
    const [ownedCard, onSaleByMeCard, onSaleByOthersCard, user] = yield Promise.all([
        // owned
        cardsCollection.findOne({ _metaCard_id: source._id, _user_id: BSON.ObjectId(userId) }),
        // onSaleByMe
        cardsCollection.findOne({ _metaCard_id: source._id, _user_id: BSON.ObjectId(userId), onSale: true }),
        // onSaleByOthers
        cardsCollection.findOne({ _metaCard_id: source._id, _user_id: { $ne: BSON.ObjectId(userId) }, onSale: true }),
        // bookmarked
        usersCollection.findOne({ _id: BSON.ObjectId(userId) }),
    ]);
    return {
        owned: Boolean(ownedCard),
        onSaleByMe: Boolean(onSaleByMeCard),
        onSaleByOthers: Boolean(onSaleByOthersCard),
        bookmarked: Boolean(user === null || user === void 0 ? void 0 : user._bookmarkedCard_ids.some((id) => source._id.toString() === id.toString())),
    };
});
exports.default = getUserSpecificMetaCardFields;


/***/ })

/******/ });
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__[9](0, __webpack_exports__);
/******/ exports = __webpack_exports__.default;
/******/ 
