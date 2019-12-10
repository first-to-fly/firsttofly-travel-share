"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_1 = __importDefault(require("@nabstudio/sample"));
exports.sample = sample_1.default;
const sampleTS_1 = __importDefault(require("sampleTS"));
exports.sampleTS = sampleTS_1.default;
const sampleJS_1 = __importDefault(require("./sampleJS"));
exports.sampleJS = sampleJS_1.default;
(async () => {
    console.log("Dynamically loading module...");
    const dynamicSample = await Promise.resolve().then(() => __importStar(require("./sampleJS")));
    console.log("Module loaded", dynamicSample);
})();
//# sourceMappingURL=index.js.map