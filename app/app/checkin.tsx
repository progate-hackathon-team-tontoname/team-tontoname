import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BAG_TYPES = [
  { id: 'suitcase', label: 'スーツケース', icon: '🧳' },
  { id: 'boston', label: 'ボストンバッグ', icon: '👜' },
  { id: 'backpack', label: 'リュックサック', icon: '🎒' },
  { id: 'tote', label: 'トートバッグ', icon: '🛍️' },
];

export default function CheckinScreen() {
  const router = useRouter();
  const [selectedBag, setSelectedBag] = useState<string | null>(null);
  const [name, setName] = useState('');

  const canSubmit = selectedBag !== null && name.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>荷物を預ける</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>カバンの種類を選んでね</Text>
        <View style={styles.bagGrid}>
          {BAG_TYPES.map((bag) => (
            <Pressable
              key={bag.id}
              style={[
                styles.bagCard,
                selectedBag === bag.id && styles.bagCardSelected,
              ]}
              onPress={() => setSelectedBag(bag.id)}
            >
              <Text style={styles.bagIcon}>{bag.icon}</Text>
              <Text
                style={[
                  styles.bagLabel,
                  selectedBag === bag.id && styles.bagLabelSelected,
                ]}
              >
                {bag.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionLabel}>名前をつけてあげよう</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="例：たびすけ"
          placeholderTextColor="#A0AEC0"
          value={name}
          onChangeText={setName}
          maxLength={20}
        />

        <Pressable
          style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
          onPress={() => canSubmit && router.replace('/map')}
          disabled={!canSubmit}
        >
          <Text style={styles.submitButtonText}>預ける 🌏</Text>
        </Pressable>
      </ScrollView>
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
  content: {
    padding: 20,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2E4A',
    marginTop: 8,
    marginBottom: 4,
  },
  bagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  bagCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  bagCardSelected: {
    borderColor: '#1A2E4A',
    backgroundColor: '#EBF4FF',
  },
  bagIcon: {
    fontSize: 48,
  },
  bagLabel: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  bagLabelSelected: {
    color: '#1A2E4A',
    fontWeight: 'bold',
  },
  nameInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A2E4A',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#1A2E4A',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
