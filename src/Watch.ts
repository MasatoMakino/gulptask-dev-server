"use strict";
import { ServerGenerationOption } from "./ServerOption.js";
import path from "path";
import { BrowserSyncInstance } from "browser-sync";

export function getWatch(
  browserSync: BrowserSyncInstance,
  option: ServerGenerationOption
): Function {
  const watchPath = path.resolve(option.base, "**/*");
  const ignorePath = (option.ignore as string[]).map((val) => {
    return path.resolve(option.base, val);
  });

  return async () => {
    browserSync.watch(watchPath, {ignored:ignorePath}).on("change", browserSync.reload);
  };
}
