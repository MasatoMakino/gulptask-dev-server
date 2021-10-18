"use strict";
import {ServerGenerationOption} from "./ServerOption";
const path = require("path");

export function getWatch(
  browserSync,
  option: ServerGenerationOption
): Function {
  const watchPath = path.resolve(option.base, "**/*");
  const ignorePath = (option.ignore as string[]).map((val) => {
    return "!" + path.resolve(option.base, val);
  });
  const pathArray = [watchPath, ...ignorePath];

  return async () => {
    browserSync.watch(pathArray).on("change", browserSync.reload);
  };
}
