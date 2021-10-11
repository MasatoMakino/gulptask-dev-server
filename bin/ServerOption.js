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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePort = exports.initBaseDir = exports.initOption = void 0;
const path = __importStar(require("path"));
const fs = require("fs");
const makeDir = require("make-dir");
const portfinder = require("portfinder");
/**
 * オプションの初期化
 * @param option
 * @param base
 */
function initOption(option, base) {
    var _a, _b, _c, _d, _e, _f;
    option !== null && option !== void 0 ? option : (option = {});
    option.base = path.resolve(process.cwd(), base);
    (_a = option.basePort) !== null && _a !== void 0 ? _a : (option.basePort = 8000);
    (_b = option.highestPort) !== null && _b !== void 0 ? _b : (option.highestPort = 65535);
    (_c = option.browserSyncBasePort) !== null && _c !== void 0 ? _c : (option.browserSyncBasePort = 3000);
    (_d = option.browserSyncHighestPort) !== null && _d !== void 0 ? _d : (option.browserSyncHighestPort = 65535);
    (_e = option.usePhpDevServer) !== null && _e !== void 0 ? _e : (option.usePhpDevServer = false);
    (_f = option.ignore) !== null && _f !== void 0 ? _f : (option.ignore = []);
    if (typeof option.ignore === "string") {
        option.ignore = [option.ignore];
    }
    return option;
}
exports.initOption = initOption;
/**
 * オプション内にある監視先フォルダを初期化する。
 * 存在しない場合はディレクトリを生成する。
 * @param option
 */
function initBaseDir(option) {
    const isExistBase = fs.existsSync(option.base);
    if (!isExistBase) {
        makeDir.sync(option.base);
    }
}
exports.initBaseDir = initBaseDir;
/**
 * Option内のポート番号を、範囲指定に従い更新する。
 * @param option
 */
function updatePort(option) {
    return __awaiter(this, void 0, void 0, function* () {
        option.port = yield getPort(option.basePort, option.highestPort);
        option.browserSyncPort = yield getPort(option.browserSyncBasePort, option.browserSyncHighestPort);
    });
}
exports.updatePort = updatePort;
function getPort(basePort, highestPort) {
    return __awaiter(this, void 0, void 0, function* () {
        portfinder.basePort = basePort;
        portfinder.highestPort = highestPort;
        return portfinder.getPortPromise();
    });
}
