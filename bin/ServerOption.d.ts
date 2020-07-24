/**
 * オプションの初期化
 * @param option
 * @param base
 */
export declare function initOption(option: ServerOption, base: string): ServerOption;
/**
 * オプション内にある監視先フォルダを初期化する。
 * 存在しない場合はディレクトリを生成する。
 * @param option
 */
export declare function initBaseDir(option: ServerOption): void;
/**
 * Option内のポート番号を、範囲指定に従い更新する。
 * @param option
 */
export declare function updatePort(option: ServerOption): Promise<void>;
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
//# sourceMappingURL=ServerOption.d.ts.map