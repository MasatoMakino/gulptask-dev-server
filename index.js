"use strict";

const { watch, series } = require("gulp");
const connect = require("gulp-connect-php");
const browserSync = require("browser-sync").create();
const fs = require("fs");
const path = require("path");
const makeDir = require("make-dir");

/**
 * サーバー開始およびリロードタスクを取得する。
 * @param {string} base - webサーバーのルートになるディレクトリ
 * @param {Object} [option = {}]
 * @param {number} [option.port = 8000] - phpサーバーのport
 * @return {{server: server, reload: reload}}
 */
module.exports = (base, option) => {
  if (option == null) option = {};
  if (option.port == null) option.port = 8000;
  option.base = path.resolve(process.cwd(), base);

  const isExistBase = fs.existsSync(option.base);
  if (!isExistBase) {
    makeDir.sync(option.base);
  }

  const server = done => {
    connect.server(option, () => {
      browserSync.init(
        {
          proxy: "localhost:" + option.port
        },
        done
      );
    });
  };

  const reload = done => {
    browserSync.reload();
    done();
  };

  const watchPath = path.resolve(option.base, "**/*");
  const watchTask = () => {
    watch(watchPath, reload);
  };

  return series(server, watchTask);
};
