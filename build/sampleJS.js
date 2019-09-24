"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepcopy_1 = __importDefault(require("deepcopy"));
const sampleTS_1 = __importDefault(require("./sampleTS"));
console.log(deepcopy_1.default(sampleTS_1.default));
const someArray = [
    "foo",
    "bar",
];
console.log(someArray);
if (someArray.length === 0) {
    console.log(1);
}
else {
    console.log(2);
}
let someString = "";
someString = "abc";
// someString = 5; // <-- ts error
console.log(someString);
exports.default = someArray;
// export default someString; // <-- es error
//# sourceMappingURL=sampleJS.js.map