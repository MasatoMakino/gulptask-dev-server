"use strict";
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
 * @param base webサーバーのルートになるディレクトリ
 * @param option
 */
export function generateTask(base: string, option?: ServerOption): Function {
  option = initOption(option, base);

  const server = async () => {
    await initBaseDir(option);
    await updatePort(option);
    await startServer(browserSync, option);
    return;
  };

  return async () => {
    await server();

    const watchTask = getWatch(browserSync, option);
    await watchTask();
    return;
  };
}
