import * as path from "path";

const fs = require("fs");
const portfinder = require("portfinder");
const HIGHEST_PORT = 65535;

/**
 * オプションの初期化
 * @param option
 * @param base
 */
export async function initOption(
  option: InitOption | undefined | null,
  base: string
): Promise<ServerGenerationOption> {
  return {
    base: path.resolve(process.cwd(), base),
    phpPort: await getPort(8000, HIGHEST_PORT),
    browserSyncPort: await getPort(3000, HIGHEST_PORT),
    ignore: generateIgnore(option?.ignore),
    usePhpDevServer: option?.usePhpDevServer ?? false,
  };
}

function generateIgnore(ignore?: string | string[]): string[] {
  if (typeof ignore === "string") {
    return [ignore];
  }
  return ignore ?? [];
}

/**
 * オプション内にある監視先フォルダを初期化する。
 * 存在しない場合はディレクトリを生成する。
 * @param base
 */
export async function initBaseDir(base: string) {
  const isExistBase = fs.existsSync(base);
  if (!isExistBase) {
    await fs.promises.mkdir(base, { recursive: true });
    console.warn(
      `[Warning] Missing the directory specified by 'option.base'. This task make a directory ${base}.`
    );
  }
}

async function getPort(basePort: number, highestPort: number): Promise<number> {
  portfinder.basePort = basePort;
  portfinder.highestPort = highestPort;
  return portfinder.getPortPromise();
}

/**
 * タスク起動オプション
 */
export interface InitOption {
  ignore?: string | string[];
  usePhpDevServer?: boolean;
}

/**
 * サーバーを生成するオプション
 * InitOptionから生成される
 */
export interface ServerGenerationOption {
  base: string;
  phpPort: number;
  browserSyncPort: number;

  ignore: string | string[];
  usePhpDevServer: boolean;
}
