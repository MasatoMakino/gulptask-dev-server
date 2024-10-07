"use strict";
import browserSync from "browser-sync";
const browserSyncInstance = browserSync.create(); 

import { startServer } from "./Server.js";
import {
  initBaseDir,
  initOption,
  InitOption,
  ServerGenerationOption,
} from "./ServerOption.js";
import { getWatch } from "./Watch.js";

/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base webサーバーのルートになるディレクトリ
 * @param option
 */
export function generateTask(base: string, option?: InitOption): Function {
  const server = async (generationOption: ServerGenerationOption) => {
    await initBaseDir(generationOption.base);
    await startServer(browserSyncInstance, generationOption);
    return;
  };

  return async () => {
    const generationOption = await initOption(option, base);
    await server(generationOption);
    const watchTask = getWatch(browserSyncInstance, generationOption);
    await watchTask();
    return;
  };
}
