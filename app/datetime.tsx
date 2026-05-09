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

export default function DateTimeScreen() {
  const router = useRouter();
  const { formData, updateFormData } = useContext(ProtocolContext);
  const { control, handleSubmit, formState: { errors } } = useForm<Partial<ProtocolFormData>>({
    defaultValues: {
      accidentDate: formData?.accidentDate || '',
      accidentTime: formData?.accidentTime || '',
    },
  });

  const onSubmit = (data: Partial<ProtocolFormData>) => {
    updateFormData(data);
    router.push('/participant-a');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Дата та час ДТП</Text>
        <Text style={styles.subtitle}>Вкажіть дату та час дорожно-транспортної пригоди</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Дата (ДД.МM.РРРР)</Text>
          <Controller
            control={control}
            name="accidentDate"
            rules={{
              required: "Дата обов'язкова",
              pattern: {
                value: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                message: 'Формат: ДД.МM.РРРР',
              },
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.accidentDate && styles.inputError]}
                placeholder="ДД.МM.РРРР"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.accidentDate && (
            <Text style={styles.error}>{errors.accidentDate.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Час (ГГ:ММ)</Text>
          <Controller
            control={control}
            name="accidentTime"
            rules={{
              required: 'Час обов\'язковий',
              pattern: {
                value: /^([01]\d|2[0-3]):[0-5]\d$/,
                message: 'Формат: ГГ:ММ',
              },
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.accidentTime && styles.inputError]}
                placeholder="ГГ:ММ"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.accidentTime && (
            <Text style={styles.error}>{errors.accidentTime.message}</Text>
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
