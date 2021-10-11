import * as path from "path";

const fs = require("fs");
const makeDir = require("make-dir");
const portfinder = require("portfinder");

/**
 * オプションの初期化
 * @param option
 * @param base
 */
export function initOption(option: ServerOption, base: string): ServerOption {
  option ??= {};
  option.base = path.resolve(process.cwd(), base);
  option.basePort ??= 8000;
  option.highestPort ??= 65535;
  option.browserSyncBasePort ??= 3000;
  option.browserSyncHighestPort ??= 65535;
  option.usePhpDevServer ??= false;

  option.ignore ??= [];
  if (typeof option.ignore === "string") {
    option.ignore = [option.ignore];
  }

  return option;
}

/**
 * オプション内にある監視先フォルダを初期化する。
 * 存在しない場合はディレクトリを生成する。
 * @param option
 */
export function initBaseDir(option: ServerOption) {
  const isExistBase = fs.existsSync(option.base);
  if (!isExistBase) {
    makeDir.sync(option.base);
  }
}

/**
 * Option内のポート番号を、範囲指定に従い更新する。
 * @param option
 */
export async function updatePort(option: ServerOption) {
  option.port = await getPort(option.basePort, option.highestPort);
  option.browserSyncPort = await getPort(
    option.browserSyncBasePort,
    option.browserSyncHighestPort
  );
}

async function getPort(basePort: number, highestPort: number): Promise<number> {
  portfinder.basePort = basePort;
  portfinder.highestPort = highestPort;
  return portfinder.getPortPromise();
}

export interface ServerOption {
  base?: string;
  port?: number;
  browserSyncPort?: number;
  basePort?: number;
  highestPort?: number;
  browserSyncBasePort?: number;
  browserSyncHighestPort?: number;
  ignore?: string | string[];
  usePhpDevServer?: boolean;
}
