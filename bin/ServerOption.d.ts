/**
 * オプションの初期化
 * @param option
 * @param base
 */
export declare function initOption(option: InitOption, base: string): Promise<ServerGenerationOption>;
/**
 * オプション内にある監視先フォルダを初期化する。
 * 存在しない場合はディレクトリを生成する。
 * @param base
 */
export declare function initBaseDir(base: string): Promise<void>;
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
//# sourceMappingURL=ServerOption.d.ts.map