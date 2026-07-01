/**
 * タイムラインの1イベントを表す型
 */
export interface TimelineItem {
  id: string;
  time: string;
  place: string;
  comment: string;
}

/**
 * お土産（カード）を表す型
 */
export interface SouvenirItem {
  id: string;
  type: 'postcard' | 'sticker'; // 絵葉書かステッカーのいずれか
  icon: string;                  // 絵文字などのアイコン
  place: string;                 // 訪れた場所
  comment: string;               // お土産に対するコメント・感想
}

/**
 * 荷物の種類（マスターデータ用）の型
 */
export interface BagType {
  id: string;
  label: string;
  icon: string;
}

/**
 * 現在アクティブな荷物（預けられている荷物）の情報型
 */
export interface ActiveBag {
  name: string;      // キャラクターの名前
  bagTypeId: string; // 選択されたカバンのID（suitcaseなど）
}
