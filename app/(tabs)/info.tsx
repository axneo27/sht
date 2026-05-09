import { StyleSheet, Text, View } from 'react-native';

export default function InfoScreen() {
  return (
    <View style={[styles.container, {paddingVertical: 80}]}>
      <View style={styles.header}>
        <Text style={styles.title}>Про застосунок</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Що таке Європротокол?</Text>
        <Text style={styles.body}>
          Європротокол — це спрощений порядок оформлення дорожньо-транспортної
          пригоди без виклику поліції. Дозволяє учасникам ДТП самостійно
          зафіксувати обставини та пошкодження.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Умови застосування</Text>
        <Text style={styles.body}>
          • У ДТП беруть участь не більше двох транспортних засобів{'\n'}
          • Немає постраждалих осіб{'\n'}
          • Обидва учасники мають діючі поліси ОСЦПВ{'\n'}
          • Сума збитків не перевищує встановленого ліміту
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Версія</Text>
        <Text style={styles.body}>1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 24,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});
