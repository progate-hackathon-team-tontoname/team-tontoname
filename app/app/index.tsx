import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function StartScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log("=== API疎通テスト開始 ===");
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";
    fetch(`${apiUrl}/health`)
      .then((res) => res.json())
      .then((data) => {
        console.log("=== API疎通テスト成功！ ===");
        console.log("レスポンスデータ:", data);
      })
      .catch((err) => {
        console.log("=== API疎通テスト失敗 ===");
        console.error("エラー内容:", err);
      });
  }, []);

  return (
    <Pressable style={styles.container} onPress={() => router.replace('/home')}>
      <View style={styles.iconContainer}>
        <Text style={styles.bagIcon}>🧳</Text>
      </View>
      <Text style={styles.title}>あずかり旅</Text>
      <Text style={styles.subtitle}>Tap to start</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2E4A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bagIcon: {
    fontSize: 96,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
});
