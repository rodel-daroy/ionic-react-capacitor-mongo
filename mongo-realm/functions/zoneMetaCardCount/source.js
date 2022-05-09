/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ var __webpack_modules__ = ({

/***/ 23:
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
const zoneMetaCardCount = (source) => __awaiter(void 0, void 0, void 0, function* () {
    const metaCardsCollection = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('MetaCard');
    const cardsCollection = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('Card');
    const zoneId = source._id;
    const _user_id = BSON.ObjectId(context.user.custom_data._id);
    const metaCards = yield metaCardsCollection.find({ _zone_ids: zoneId }).toArray();
    const total = metaCards.length;
    const metaCardIds = metaCards.map(({ _id }) => _id);
    const cards = yield cardsCollection.find({ _user_id, _metaCard_id: { $in: metaCardIds } }).toArray();
    const uniqueCards = new Set(cards.map(({ _metaCard_id }) => _metaCard_id.toString()));
    const owned = uniqueCards.size;
    return { total, owned };
});
exports.default = zoneMetaCardCount;


/***/ })

/******/ });
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__[23](0, __webpack_exports__);
/******/ exports = __webpack_exports__.default;
/******/ 
