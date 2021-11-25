"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stockCount: { type: Number, required: true },
    imgUrl: { type: String, required: true },
    isOnSale: { type: Boolean, required: true },
});
exports.ItemSchema.set("toJSON", {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
var Item = (0, mongoose_1.model)("Item", exports.ItemSchema);
exports.default = Item;
//# sourceMappingURL=item.model.js.map