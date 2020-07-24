"use strict";
const { series } = require("gulp");
const browserSync = require("browser-sync").create();

import { startServer } from "./Server";
import { getWatch } from "./Watch";
import {
  ServerOption,
  initOption,
  initBaseDir,
  updatePort,
} from "./ServerOption";

/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base - webサーバーのルートになるディレクトリ
 * @param [option]
 * @return {{server: server, reload: reload}}
 */
export function get(base: string, option?: ServerOption): Function {
  option = initOption(option, base);
  initBaseDir(option);

  const server = async () => {
    await updatePort(option);
    await startServer(browserSync, option);
    return;
  };

  return series(server, getWatch(browserSync, option));
}
