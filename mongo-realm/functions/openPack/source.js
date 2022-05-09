/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ var __webpack_modules__ = ({

/***/ 20:
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
const openPack = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const cluster = context.services.get('fanzone-dev-atlas');
    const session = cluster.startSession();
    try {
        const packs = cluster.db('fanzone-dev').collection('Pack');
        const cards = cluster.db('fanzone-dev').collection('Card');
        const userStatistics = cluster.db('fanzone-dev').collection('UserStatistics');
        /* Make sure all resources exist, then get selected pack */
        const pack = yield packs.findOne({ _id: BSON.ObjectId(payload.packId), opened: false }, { session });
        if (!pack)
            throw new Error(`Pack with id ${payload.packId} is already opened.`);
        /* Check if current user is pack owner */
        if (pack._user_id.toString() !== payload.userId)
            throw new Error('User does not own this pack');
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            /* Apply changes */
            yield Promise.all([
                packs.findOneAndUpdate({ _id: BSON.ObjectId(payload.packId) }, { $set: { opened: true } }, { session }),
                cards.updateMany({ _id: { $in: pack._card_ids } }, { $set: { _user_id: BSON.ObjectId(payload.userId) } }, { session }),
                userStatistics.updateOne({ _user_id: BSON.ObjectId(payload.userId) }, {
                    $inc: { 'packs.opened.count': 1, 'collectedCards.count': pack._card_ids.length },
                    $push: { 'packs.opened.list': { _metaPack_id: pack._id, timestamp: new Date() } },
                }),
            ]);
        }));
    }
    finally {
        session.endSession();
    }
});
exports.default = openPack;


/***/ })

/******/ });
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__[20](0, __webpack_exports__);
/******/ exports = __webpack_exports__.default;
/******/ 
