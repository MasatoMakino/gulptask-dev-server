import { ServerOption } from "./ServerOption";
/**
 * @deprecated Use generateTask
 * @param base
 * @param option
 */
export declare function get(base: string, option?: ServerOption): Function;
/**
 * サーバー開始およびリロードタスクを取得する。
 * @param base webサーバーのルートになるディレクトリ
 * @param option
 */
export declare function generateTask(base: string, option?: ServerOption): Function;
//# sourceMappingURL=index.d.ts.map