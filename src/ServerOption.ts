import * as path from "path";

const fs = require("fs");
const makeDir = require("make-dir");
/**
 * オプションの初期化
 * @param option
 * @param base
 */

export function initOption(option: ServerOption, base: string): ServerOption {
  option = option ?? {};
  option.base = path.resolve(process.cwd(), base);
  option.basePort = option.basePort ?? 8000;
  option.highestPort = option.highestPort ?? 65535;
  option.browserSyncBasePort = option.browserSyncBasePort ?? 3000;
  option.browserSyncHighestPort = option.browserSyncHighestPort ?? 65535;
  option.usePhpDevServer = option.usePhpDevServer ?? true;

  option.ignore = option.ignore ?? [];
  if (typeof option.ignore === "string") {
    option.ignore = [option.ignore];
  }

  return option;
}

export function initBaseDir(option: ServerOption) {
  const isExistBase = fs.existsSync(option.base);
  if (!isExistBase) {
    makeDir.sync(option.base);
  }
}

export interface ServerOption {
  base?: string;
  port?: number;
  browserSyncPort?:number;
  basePort?: number;
  highestPort?: number;
  browserSyncBasePort?: number;
  browserSyncHighestPort?: number;
  ignore?: string | string[];
  usePhpDevServer?: boolean;
}
