"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.initBaseDir = exports.initOption = void 0;
const path = __importStar(require("path"));
const fs = require("fs");
const portfinder = require("portfinder");
const HIGHEST_PORT = 65535;
/**
 * オプションの初期化
 * @param option
 * @param base
 */
function initOption(option, base) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return {
            base: path.resolve(process.cwd(), base),
            phpPort: yield getPort(8000, HIGHEST_PORT),
            browserSyncPort: yield getPort(3000, HIGHEST_PORT),
            ignore: generateIgnore(option),
            usePhpDevServer: (_a = option.usePhpDevServer) !== null && _a !== void 0 ? _a : false,
        };
    });
}
exports.initOption = initOption;
function generateIgnore(option) {
    var _a;
    if (typeof option.ignore === "string") {
        option.ignore = [option.ignore];
    }
    return (_a = option.ignore) !== null && _a !== void 0 ? _a : [];
}
/**
 * オプション内にある監視先フォルダを初期化する。
 * 存在しない場合はディレクトリを生成する。
 * @param base
 */
function initBaseDir(base) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExistBase = fs.existsSync(base);
        if (!isExistBase) {
            yield fs.promises.mkdir(base, { recursive: true });
            console.warn(`[Warning] Missing the directory specified by 'option.base'. This task make a directory ${base}.`);
        }
    });
}
exports.initBaseDir = initBaseDir;
function getPort(basePort, highestPort) {
    return __awaiter(this, void 0, void 0, function* () {
        portfinder.basePort = basePort;
        portfinder.highestPort = highestPort;
        return portfinder.getPortPromise();
    });
}
