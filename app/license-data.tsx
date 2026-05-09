import { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ProtocolFormData } from '../types/protocol';
import { ProtocolContext } from '../context/ProtocolContext';

export default function LicenseDataScreen() {
  const router = useRouter();
  const { formData, updateFormData } = useContext(ProtocolContext);
  const { control, handleSubmit, formState: { errors } } = useForm<Partial<ProtocolFormData>>({
    defaultValues: {
      licenseNumber: formData?.licenseNumber || '',
      licenseCategory: formData?.licenseCategory || '',
      licenseValidUntil: formData?.licenseValidUntil || '',
      licenseCountry: formData?.licenseCountry || '',
    },
  });

  const onSubmit = (data: Partial<ProtocolFormData>) => {
    updateFormData(data);
    router.push('/damage-type');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Водійське посвідчення</Text>
        <Text style={styles.subtitle}>Дані посвідчення водія А</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Номер посвідчення</Text>
          <Controller
            control={control}
            name="licenseNumber"
            rules={{ required: "Номер посвідчення обов'язковий" }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.licenseNumber && styles.inputError]}
                placeholder="Введіть номер"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.licenseNumber && (
            <Text style={styles.error}>{errors.licenseNumber.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Категорія</Text>
          <Controller
            control={control}
            name="licenseCategory"
            rules={{ required: "Категорія обов'язкова" }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.licenseCategory && styles.inputError]}
                placeholder="Наприклад: B, C, D"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.licenseCategory && (
            <Text style={styles.error}>{errors.licenseCategory.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Дійсне до (ДД.МM.РРРР)</Text>
          <Controller
            control={control}
            name="licenseValidUntil"
            rules={{
              required: "Дата обов'язкова",
              pattern: {
                value: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                message: 'Формат: ДД.МM.РРРР',
              },
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.licenseValidUntil && styles.inputError]}
                placeholder="ДД.МM.РРРР"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.licenseValidUntil && (
            <Text style={styles.error}>{errors.licenseValidUntil.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Країна видачі</Text>
          <Controller
            control={control}
            name="licenseCountry"
            rules={{ required: "Країна обов'язкова" }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.licenseCountry && styles.inputError]}
                placeholder="Наприклад: Україна, UA"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.licenseCountry && (
            <Text style={styles.error}>{errors.licenseCountry.message}</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.back()}>
          <Text style={styles.buttonSecondaryText}>Назад</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Далі</Text>
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
  form: { paddingHorizontal: 20, paddingVertical: 20 },
  field: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
  },
  inputError: { borderColor: '#ff3b30' },
  error: { color: '#ff3b30', fontSize: 12, marginTop: 4 },
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
