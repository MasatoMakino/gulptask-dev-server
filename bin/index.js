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
exports.get = void 0;
const ServerOption_1 = require("./ServerOption");
const { watch, series } = require("gulp");
const connect = require("gulp-connect-php");
const browserSync = require("browser-sync").create();
const compress = require("compression");
const portfinder = require("portfinder");
const path = require("path");
/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base - webサーバーのルートになるディレクトリ
 * @param [option]
 * @return {{server: server, reload: reload}}
 */
function get(base, option) {
    option = ServerOption_1.initOption(option, base);
    ServerOption_1.initBaseDir(option);
    const server = (done) => __awaiter(this, void 0, void 0, function* () {
        option.port = yield getPort(option.basePort, option.highestPort);
        option.browserSyncPort = yield getPort(option.browserSyncBasePort, option.browserSyncHighestPort);
        console.log(option);
        startServer(option, done);
    });
    const getPort = (basePort, highestPort) => __awaiter(this, void 0, void 0, function* () {
        portfinder.basePort = basePort;
        portfinder.highestPort = highestPort;
        return yield portfinder.getPortPromise();
    });
    const startServer = (option, done) => {
        if (option.usePhpDevServer) {
            startPhpServer(option, done);
        }
        else {
            startBSServer(option, done);
        }
    };
    const startPhpServer = (option, done) => {
        connect.server(option, () => {
            browserSync.init({
                proxy: {
                    target: "localhost:" + option.port,
                    middleware: [compress()],
                },
            }, done);
        });
    };
    const startBSServer = (option, done) => {
        browserSync.init({
            server: option.base,
            port: option.browserSyncPort,
        }, done);
    };
    const reload = (done) => {
        browserSync.reload();
        done();
    };
    const watchPath = path.resolve(option.base, "**/*");
    const ignorePath = option.ignore.map((val) => {
        return "!" + path.resolve(option.base, val);
    });
    const pathArray = [watchPath, ...ignorePath];
    const watchTask = () => {
        watch(pathArray, reload);
    };
    return series(server, watchTask);
}
exports.get = get;
