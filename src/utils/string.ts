// src/utils/string.ts

/**
 * HTMLタグを文字列から取り除きます。
 * @param htmlString HTML文字列
 * @returns HTMLタグが除去されたプレーンテキスト
 */
export function stripHtmlTags(htmlString: string): string {
  if (!htmlString) return '';
  // `gm` フラグではなく、よりシンプルで堅牢な正規表現に変更
  return htmlString.replace(/<[^>]+>/g, '');
}