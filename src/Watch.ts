"use strict";
import { ServerOption } from "./ServerOption";

const path = require("path");
const { watch } = require("gulp");

export function getWatch(browserSync, option: ServerOption): Function {
  const watchPath = path.resolve(option.base, "**/*");
  const ignorePath = (option.ignore as string[]).map((val) => {
    return "!" + path.resolve(option.base, val);
  });
  const pathArray = [watchPath, ...ignorePath];

  const watchTask = () => {
    watch(pathArray, async () => {
      browserSync.reload();
    });
  };
  return watchTask;
}
