/**
 * オプションの初期化
 * @param option
 * @param base
 */
export declare function initOption(option: ServerOption, base: string): ServerOption;
export declare function initBaseDir(option: ServerOption): void;
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