import { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ProtocolContext } from '../context/ProtocolContext';

export default function SummaryScreen() {
  const router = useRouter();
  const { formData, resetFormData } = useContext(ProtocolContext);

  const handleSubmit = () => {
    Alert.alert('Успіх', 'Європротокол успішно оформлено!', [
      {
        text: 'Оформити новий',
        onPress: () => {
          resetFormData();
          router.dismissAll();
        },
      },
      {
        text: 'Закрити',
        onPress: () => {},
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Огляд даних</Text>
        <Text style={styles.subtitle}>Перевірте введені дані перед відправленням</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Дата та час ДТП</Text>
          <View style={styles.sectionContent}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Дата:</Text>
              <Text style={styles.rowValue}>{formData?.accidentDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Час:</Text>
              <Text style={styles.rowValue}>{formData?.accidentTime}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Учасник А</Text>
          <View style={styles.sectionContent}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>ПІБ:</Text>
              <Text style={styles.rowValue}>
                {formData?.participantAName} {formData?.participantASurname}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Дата народження:</Text>
              <Text style={styles.rowValue}>{formData?.participantABirthDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Телефон:</Text>
              <Text style={styles.rowValue}>{formData?.participantAPhone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Держ. номер:</Text>
              <Text style={styles.rowValue}>{formData?.participantACarNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Водійське посвідчення</Text>
          <View style={styles.sectionContent}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Номер посвідчення:</Text>
              <Text style={styles.rowValue}>{formData?.licenseNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Категорія:</Text>
              <Text style={styles.rowValue}>{formData?.licenseCategory}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Дійсне до:</Text>
              <Text style={styles.rowValue}>{formData?.licenseValidUntil}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Країна видачі:</Text>
              <Text style={styles.rowValue}>{formData?.licenseCountry}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Вид пошкодження</Text>
          <View style={styles.sectionContent}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Сторона:</Text>
              <Text style={styles.rowValue}>{formData?.damageSide}</Text>
            </View>
            <View style={[styles.row, styles.rowFull]}>
              <Text style={styles.rowLabel}>Опис:</Text>
              <Text style={[styles.rowValue, styles.rowValueMultiline]}>
                {formData?.damageDescription}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.back()}>
          <Text style={styles.buttonSecondaryText}>Редагувати</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Відправити</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', lineHeight: 20 },
  content: { paddingHorizontal: 20, paddingVertical: 20 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionContent: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 12 },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rowFull: { flexDirection: 'column' },
  rowLabel: { fontWeight: '600', color: '#666', width: '35%' },
  rowValue: { color: '#1a1a1a', flex: 1 },
  rowValueMultiline: { marginTop: 8, lineHeight: 20 },
  buttonContainer: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 20, gap: 12 },
  buttonSecondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonSecondaryText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  buttonPrimary: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
