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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBaseDir = exports.initOption = void 0;
const path = __importStar(require("path"));
const fs = require("fs");
const makeDir = require("make-dir");
/**
 * オプションの初期化
 * @param option
 * @param base
 */
function initOption(option, base) {
    var _a, _b, _c, _d;
    option = option !== null && option !== void 0 ? option : {};
    option.base = path.resolve(process.cwd(), base);
    option.basePort = (_a = option.basePort) !== null && _a !== void 0 ? _a : 8000;
    option.highestPort = (_b = option.highestPort) !== null && _b !== void 0 ? _b : 65535;
    option.usePhpDevServer = (_c = option.usePhpDevServer) !== null && _c !== void 0 ? _c : true;
    option.ignore = (_d = option.ignore) !== null && _d !== void 0 ? _d : [];
    if (typeof option.ignore === "string") {
        option.ignore = [option.ignore];
    }
    return option;
}
exports.initOption = initOption;
function initBaseDir(option) {
    const isExistBase = fs.existsSync(option.base);
    if (!isExistBase) {
        makeDir.sync(option.base);
    }
}
exports.initBaseDir = initBaseDir;
