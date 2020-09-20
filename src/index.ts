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
 * @deprecated Use generateTask
 * @param base
 * @param option
 */
export function get(base: string, option?: ServerOption): Function {
  return generateTask(base, option);
}

/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base webサーバーのルートになるディレクトリ
 * @param option
 */
export function generateTask(base: string, option?: ServerOption): Function {
  option = initOption(option, base);
  initBaseDir(option);

  const server = async () => {
    await updatePort(option);
    await startServer(browserSync, option);
    return;
  };

  return series(server, getWatch(browserSync, option));
}
