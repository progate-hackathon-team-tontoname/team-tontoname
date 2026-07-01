import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* メニューボタン */}
      <View style={styles.header}>
        <Pressable style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
      </View>

      {/* 鞄キャラクター */}
      <View style={styles.characterArea}>
        <Text style={styles.bagCharacter}>🧳</Text>
        <Text style={styles.characterName}>あなたの荷物</Text>
      </View>

      {/* あずかるボタン */}
      <Pressable
        style={styles.azukaruButton}
        onPress={() => router.push('/checkin')}
      >
        <Text style={styles.azukaruButtonText}>あずかる</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#1A2E4A',
  },
  characterArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  bagCharacter: {
    fontSize: 160,
  },
  characterName: {
    fontSize: 18,
    color: '#1A2E4A',
    fontWeight: '500',
  },
  azukaruButton: {
    position: 'absolute',
    bottom: 48,
    right: 24,
    backgroundColor: '#1A2E4A',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  azukaruButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
