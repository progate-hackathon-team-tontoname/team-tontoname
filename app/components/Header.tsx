import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface HeaderProps {
  title: string;
  onBackPress?: () => void; // 戻るボタンのクリックイベント（省略された場合は戻るボタンを非表示）
  rightElement?: ReactNode; // 右側に表示するカスタムUI（省略された場合は左右対称用のスペースを自動配置）
  textColor?: string;       // テキストの色をカスタム（例：背景が暗い画面での白文字用）
}

export function Header({ title, onBackPress, rightElement, textColor }: HeaderProps) {
  const dynamicTextStyle = textColor ? { color: textColor } : null;

  return (
    <View style={styles.header}>
      {/* 左側: 戻るボタン */}
      {onBackPress ? (
        <Pressable onPress={onBackPress} style={styles.backButton}>
          <Text style={[styles.backIcon, dynamicTextStyle]}>←</Text>
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}

      {/* 中央: タイトル */}
      <Text style={[styles.headerTitle, dynamicTextStyle]}>{title}</Text>

      {/* 右側: カスタム要素、またはプレースホルダー */}
      {rightElement ? (
        <View style={styles.rightElementContainer}>{rightElement}</View>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: Colors.text.primary, // 基本色はプライマリテキスト（souvenir画面などで白い文字にしたい場合は必要に応じてカスタムするか親コンポーネント側で制御します）
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  rightElementContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 44,
    height: 44,
  },
});
