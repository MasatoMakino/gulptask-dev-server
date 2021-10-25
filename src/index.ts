"use strict";
const browserSync = require("browser-sync").create();

import { startServer } from "./Server";
import {
  initBaseDir,
  initOption,
  InitOption,
  ServerGenerationOption,
} from "./ServerOption";
import { getWatch } from "./Watch";

/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base webサーバーのルートになるディレクトリ
 * @param option
 */
export function generateTask(base: string, option?: InitOption): Function {
  const server = async (generationOption: ServerGenerationOption) => {
    await initBaseDir(generationOption.base);
    await startServer(browserSync, generationOption);
    return;
  };

  return async () => {
    const generationOption = await initOption(option, base);
    await server(generationOption);
    const watchTask = getWatch(browserSync, generationOption);
    await watchTask();
    return;
  };
}
