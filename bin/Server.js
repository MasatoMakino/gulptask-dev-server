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
exports.startServer = void 0;
const { exec } = require("child_process");
const compress = require("compression");
/**
 * optionに従い、PHPサーバーかbrowserSyncのいずれかを起動する。
 * @param browserSync
 * @param option
 */
function startServer(browserSync, option) {
    return __awaiter(this, void 0, void 0, function* () {
        if (option.usePhpDevServer) {
            yield startPhpServer(browserSync, option);
        }
        else {
            yield startBSServer(browserSync, option);
        }
    });
}
exports.startServer = startServer;
/**
 * PHPサーバーを立ち上げる。
 * @param browserSync
 * @param option
 */
function startPhpServer(browserSync, option) {
    return new Promise((resolve, reject) => {
        const process = exec(`php -S 127.0.0.1:${option.port} -t ${option.base}`, () => { });
        process.stderr.on("data", (chunk) => {
            const isStartedMessage = /\)\sstarted$/.test(chunk.trim());
            if (isStartedMessage) {
                browserSync.init({
                    proxy: {
                        target: "localhost:" + option.port,
                        middleware: [compress()],
                    },
                    port: option.browserSyncPort,
                }, () => {
                    resolve();
                });
            }
            const failMessage = /Failed\s+to\s+listen\s+on/.test(chunk.trim());
            if (failMessage) {
                console.warn(chunk.trim());
                reject();
            }
            console.log(chunk.trim());
        });
    });
}
function startBSServer(browserSync, option) {
    return new Promise((resolve) => {
        browserSync.init({
            server: option.base,
            port: option.browserSyncPort,
        }, () => {
            resolve();
        });
    });
}
