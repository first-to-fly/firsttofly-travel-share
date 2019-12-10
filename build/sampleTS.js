"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_1 = __importDefault(require("@nabstudio/sample"));
exports.sample = sample_1.default;
const someArray2 = [
    "foo",
    "bar",
];
console.log(someArray2);
if (someArray2.length === 0) {
    console.log(1);
}
else {
    console.log(2);
}
let someString2 = "";
someString2 = "def";
// someString2 = 5; // <-- ts error
console.log(someString2);
const testHash = {};
console.log(testHash);
const abc = "def";
exports.default = abc;
//# sourceMappingURL=sampleTS.js.map