import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { Header } from '../components/Header';
import { SouvenirItem } from '../types';

const MOCK_SOUVENIRS: SouvenirItem[] = [
  {
    id: '1',
    type: 'postcard',
    icon: '🏮',
    place: '浅草',
    comment: '浅草の雷門の前で記念写真を撮ったよ！',
  },
  {
    id: '2',
    type: 'sticker',
    icon: '🌸',
    place: '上野公園',
    comment: '桜の花びらをひとつ拾ったよ。きれいだった！',
  },
  {
    id: '3',
    type: 'postcard',
    icon: '⚡',
    place: '秋葉原',
    comment: '電気街のきらきらした夜景、忘れられないよ！',
  },
];

export default function SouvenirScreen() {
  const router = useRouter();

  const boxScale = useRef(new Animated.Value(0.8)).current;
  const boxOpacity = useRef(new Animated.Value(0)).current;
  const characterY = useRef(new Animated.Value(40)).current;
  const characterOpacity = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(boxScale, { toValue: 1, useNativeDriver: true }),
        Animated.timing(boxOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(300),
      Animated.parallel([
        Animated.spring(characterY, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(characterOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="お土産"
        onBackPress={() => router.replace('/home')}
        textColor={Colors.text.light}
      />

      {/* アニメーションエリア */}
      <View style={styles.animationArea}>
        <Animated.View
          style={[
            styles.characterContainer,
            {
              transform: [{ translateY: characterY }],
              opacity: characterOpacity,
            },
          ]}
        >
          <Text style={styles.characterEmoji}>🧳</Text>
          <Text style={styles.characterMessage}>ただいま！お土産持ってきたよ🎉</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.boxContainer,
            { transform: [{ scale: boxScale }], opacity: boxOpacity },
          ]}
        >
          <Text style={styles.boxEmoji}>🎁</Text>
        </Animated.View>
      </View>

      {/* お土産リスト */}
      <Animated.View style={[styles.souvenirSection, { opacity: listOpacity }]}>
        <Text style={styles.sectionTitle}>旅のおみやげ</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.souvenirList}
        >
          {MOCK_SOUVENIRS.map((item) => (
            <View key={item.id} style={styles.souvenirCard}>
              <View style={styles.souvenirIconContainer}>
                <Text style={styles.souvenirIconEmoji}>{item.icon}</Text>
              </View>
              <Text style={styles.souvenirType}>
                {item.type === 'postcard' ? '📮 絵葉書' : '⭐ シール'}
              </Text>
              <Text style={styles.souvenirPlace}>{item.place}</Text>
              <Text style={styles.souvenirComment}>{item.comment}</Text>
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <Pressable
        style={styles.homeButton}
        onPress={() => router.replace('/home')}
      >
        <Text style={styles.homeButtonText}>ホームに戻る</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  animationArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  characterContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  characterEmoji: {
    fontSize: 72,
  },
  characterMessage: {
    fontSize: 16,
    color: Colors.text.light,
    fontWeight: '600',
  },
  boxContainer: {
    alignItems: 'center',
  },
  boxEmoji: {
    fontSize: 64,
  },
  souvenirSection: {
    flex: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.light,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  souvenirList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  souvenirCard: {
    width: 180,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  souvenirIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  souvenirIconEmoji: {
    fontSize: 32,
  },
  souvenirType: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  souvenirPlace: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.light,
  },
  souvenirComment: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
  homeButton: {
    margin: 20,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  homeButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
