/**
 * オプションの初期化
 * @param option
 * @param base
 */
export declare function initOption(option: TaskInitOption, base: string): Promise<ServerGenerationOption>;
/**
 * オプション内にある監視先フォルダを初期化する。
 * 存在しない場合はディレクトリを生成する。
 * @param base
 */
export declare function initBaseDir(base: string): Promise<void>;
/**
 *
 */
export interface TaskInitOption {
    phpBasePort?: number;
    browserSyncBasePort?: number;
    ignore?: string | string[];
    usePhpDevServer?: boolean;
}
/**
 * サーバーを生成するオプション
 * ServerOptionから生成される
 */
export interface ServerGenerationOption {
    base: string;
    phpPort?: number;
    browserSyncPort: number;
    ignore: string | string[];
    usePhpDevServer: boolean;
}
//# sourceMappingURL=TaskInitOption.d.ts.map