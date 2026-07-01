import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function StartScreen() {
  const router = useRouter();

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
