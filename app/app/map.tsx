import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_COLLAPSED = SCREEN_HEIGHT * 0.65;
const SHEET_EXPANDED = SCREEN_HEIGHT * 0.2;

const MOCK_TIMELINE = [
  {
    id: '1',
    time: '10:30',
    place: '浅草寺',
    comment: 'わあ！大きな雷門だ！ちょっと記念に立ち寄ってみたよ🏮',
  },
  {
    id: '2',
    time: '12:15',
    place: '上野公園',
    comment: '公園でおいしそうなたこ焼きの匂いがしたよ。食べられないけどね🐙',
  },
  {
    id: '3',
    time: '14:00',
    place: '秋葉原',
    comment: 'キラキラした電気街だ！すごい人の数にびっくりしたよ⚡',
  },
];

export default function MapScreen() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const sheetY = useRef(new Animated.Value(SHEET_COLLAPSED)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 5,
      onPanResponderMove: (_, { moveY }) => {
        const clamped = Math.max(SHEET_EXPANDED, Math.min(SHEET_COLLAPSED, moveY));
        sheetY.setValue(clamped);
      },
      onPanResponderRelease: (_, { moveY }) => {
        const goExpanded = moveY < SCREEN_HEIGHT * 0.45;
        Animated.spring(sheetY, {
          toValue: goExpanded ? SHEET_EXPANDED : SHEET_COLLAPSED,
          useNativeDriver: false,
        }).start();
        setIsExpanded(goExpanded);
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>旅の軌跡</Text>
        <Pressable
          style={styles.souvenirButton}
          onPress={() => router.push('/souvenir')}
        >
          <Text style={styles.souvenirIcon}>🎁</Text>
        </Pressable>
      </View>

      {/* マッププレースホルダー */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapEmoji}>🗺️</Text>
        <Text style={styles.mapPlaceholderText}>
          Google Maps API{'\n'}ここに地図が表示されます
        </Text>
        {/* 現在地マーカーイメージ */}
        <View style={styles.markerPreview}>
          <Text style={styles.markerEmoji}>🧳</Text>
          <Text style={styles.markerLabel}>現在地</Text>
        </View>
      </View>

      {/* ボトムシート */}
      <Animated.View style={[styles.bottomSheet, { top: sheetY }]}>
        <View {...panResponder.panHandlers}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeaderRow}>
            <Text style={styles.sheetTitle}>タイムライン</Text>
            <Text style={styles.sheetSubtitle}>
              {isExpanded ? '▼ 閉じる' : '▲ 開く'}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.timelineScroll}
          contentContainerStyle={styles.timelineContent}
          showsVerticalScrollIndicator={false}
        >
          {MOCK_TIMELINE.map((item, index) => (
            <View key={item.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <Text style={styles.timelineTime}>{item.time}</Text>
                {index < MOCK_TIMELINE.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>
              <View style={styles.timelineCard}>
                <Text style={styles.timelinePlace}>📍 {item.place}</Text>
                <Text style={styles.timelineComment}>{item.comment}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
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
    color: '#1A2E4A',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2E4A',
  },
  souvenirButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  souvenirIcon: {
    fontSize: 24,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#C8DFF0',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  mapEmoji: {
    fontSize: 64,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: '#4A6580',
    textAlign: 'center',
    lineHeight: 22,
  },
  markerPreview: {
    alignItems: 'center',
    marginTop: 8,
  },
  markerEmoji: {
    fontSize: 32,
  },
  markerLabel: {
    fontSize: 12,
    color: '#4A6580',
    marginTop: 4,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    paddingTop: 12,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2E4A',
  },
  sheetSubtitle: {
    fontSize: 13,
    color: '#718096',
  },
  timelineScroll: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  timelineContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 48,
  },
  timelineTime: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '600',
    marginBottom: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#CBD5E0',
    minHeight: 40,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 4,
  },
  timelinePlace: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A2E4A',
  },
  timelineComment: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
});
