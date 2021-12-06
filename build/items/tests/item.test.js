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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var mongoose_1 = __importDefault(require("mongoose"));
var item_model_1 = __importDefault(require("../item.model"));
var helper_1 = require("./helper");
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, initialItems_1, item, newItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, item_model_1.default.deleteMany({})];
            case 1:
                _a.sent();
                _i = 0, initialItems_1 = helper_1.initialItems;
                _a.label = 2;
            case 2:
                if (!(_i < initialItems_1.length)) return [3 /*break*/, 5];
                item = initialItems_1[_i];
                newItem = new item_model_1.default(item);
                return [4 /*yield*/, newItem.save()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); });
describe("Items", function () {
    it("Gets all items", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default).get("/items/").expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveLength(2);
                    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: "Ball" })]));
                    return [2 /*return*/];
            }
        });
    }); });
    it("Adds valid item", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newItem, response, dataInCollection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newItem = {
                        name: "Pants",
                        price: 120,
                        description: "Lorem ipsum...",
                        stockCount: 20,
                        imgUrl: "https://cdn.pixabay.com/photo/2020/03/02/12/13/jeans-4895573_960_720.jpg",
                        isOnSale: false,
                    };
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post("/items/")
                            .send(newItem)
                            .expect(201)
                            .expect("Content-Type", /application\/json/)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default).get("/items/").expect(200)];
                case 2:
                    response = _a.sent();
                    expect(response.body).toHaveLength(helper_1.initialItems.length + 1);
                    return [4 /*yield*/, item_model_1.default.find({})];
                case 3:
                    dataInCollection = _a.sent();
                    expect(dataInCollection).toEqual(expect.arrayContaining([expect.objectContaining({ name: "Pants" })]));
                    return [2 /*return*/];
            }
        });
    }); });
    it("Removes item", function () { return __awaiter(void 0, void 0, void 0, function () {
        var items, id, response, newItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, item_model_1.default.find({})];
                case 1:
                    items = _a.sent();
                    id = items[0]._id.toString();
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default).delete("/items/" + id).expect(202)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, item_model_1.default.find({})];
                case 3:
                    newItems = _a.sent();
                    expect(newItems.length).toBe(items.length - 1);
                    expect(response.body.id).toEqual(id);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Sends 404 after deleting non existing item", function () { return __awaiter(void 0, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, helper_1.getNonExistingId)()];
                case 1:
                    id = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.default).delete("/items/" + id).expect(404)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function (done) {
    mongoose_1.default.connection.close();
    done();
});
//# sourceMappingURL=item.test.js.map