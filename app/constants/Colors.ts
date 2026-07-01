/**
 * アプリケーションのカラーパレット定義
 * ハッカソン中のテーマカラー変更はここを一元修正することで対応します。
 */
export const Colors = {
  // メインのブランドカラー（ネイビー系）
  primary: '#1A2E4A',
  
  // 背景色（淡いブルー）
  background: '#F0F7FF',
  
  // コンポーネント用（白など）
  card: '#FFFFFF',
  
  // テキストカラー
  text: {
    primary: '#1A2E4A',
    secondary: '#4A5568',
    muted: '#718096',
    light: '#FFFFFF',
  },
  
  // ボーダー・ライン・プレースホルダーなど
  border: '#E2E8F0',
  line: '#CBD5E0',
  placeholder: '#A0AEC0',
  
  // ボタンのアクティブ・非アクティブ状態など
  button: {
    primary: '#1A2E4A',
    disabled: '#A0AEC0',
  },
  
  // 各種ステータス
  selection: {
    selectedBorder: '#1A2E4A',
    selectedBg: '#EBF4FF',
  },

  // マッププレースホルダー背景
  mapPlaceholder: '#C8DFF0',
  mapText: '#4A6580',
};
