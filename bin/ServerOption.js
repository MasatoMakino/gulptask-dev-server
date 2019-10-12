"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = require("fs");
const makeDir = require("make-dir");
/**
 * オプションの初期化
 * @param option
 * @param base
 */
function initOption(option, base) {
    if (option == null)
        option = {};
    option.base = path.resolve(process.cwd(), base);
    if (option.basePort == null)
        option.basePort = 8000;
    if (option.highestPort == null)
        option.highestPort = 65535;
    if (option.ignore == null) {
        option.ignore = [];
    }
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
