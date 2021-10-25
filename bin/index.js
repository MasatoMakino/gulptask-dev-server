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
exports.generateTask = void 0;
const browserSync = require("browser-sync").create();
const Server_1 = require("./Server");
const ServerOption_1 = require("./ServerOption");
const Watch_1 = require("./Watch");
/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base webサーバーのルートになるディレクトリ
 * @param option
 */
function generateTask(base, option) {
    const server = (generationOption) => __awaiter(this, void 0, void 0, function* () {
        yield (0, ServerOption_1.initBaseDir)(generationOption.base);
        yield (0, Server_1.startServer)(browserSync, generationOption);
        return;
    });
    return () => __awaiter(this, void 0, void 0, function* () {
        const generationOption = yield (0, ServerOption_1.initOption)(option, base);
        yield server(generationOption);
        const watchTask = (0, Watch_1.getWatch)(browserSync, generationOption);
        yield watchTask();
        return;
    });
}
exports.generateTask = generateTask;
