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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTask = exports.get = void 0;
const { series } = require("gulp");
const browserSync = require("browser-sync").create();
const Server_1 = require("./Server");
const Watch_1 = require("./Watch");
const ServerOption_1 = require("./ServerOption");
/**
 * @deprecated Use generateTask
 * @param base
 * @param option
 */
function get(base, option) {
    return generateTask(base, option);
}
exports.get = get;
/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base webサーバーのルートになるディレクトリ
 * @param option
 */
function generateTask(base, option) {
    option = (0, ServerOption_1.initOption)(option, base);
    (0, ServerOption_1.initBaseDir)(option);
    const server = () => __awaiter(this, void 0, void 0, function* () {
        yield (0, ServerOption_1.updatePort)(option);
        yield (0, Server_1.startServer)(browserSync, option);
        return;
    });
    return series(server, (0, Watch_1.getWatch)(browserSync, option));
}
exports.generateTask = generateTask;
