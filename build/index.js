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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleTS = exports.sampleJS = exports.sample = void 0;
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