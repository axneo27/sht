import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Controller, useForm } from 'react-hook-form';
import { RootStackParamList, ProtocolFormData } from '../types/protocol';
import { ProtocolContext } from '../context/ProtocolContext';

type ParticipantAScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ParticipantA'>;

interface Props {
  navigation: ParticipantAScreenNavigationProp;
}

export const ParticipantAScreen: React.FC<Props> = ({ navigation }) => {
  const { formData, updateFormData } = useContext(ProtocolContext);
  const { control, handleSubmit, formState: { errors } } = useForm<Partial<ProtocolFormData>>({
    defaultValues: {
      participantAName: formData?.participantAName || '',
      participantASurname: formData?.participantASurname || '',
      participantABirthDate: formData?.participantABirthDate || '',
      participantAPhone: formData?.participantAPhone || '',
      participantACarNumber: formData?.participantACarNumber || '',
    },
  });

  const onSubmit = (data: Partial<ProtocolFormData>) => {
    updateFormData(data);
    navigation.navigate('LicenseData');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Участник А</Text>
        <Text style={styles.subtitle}>Дані про водія та транспортний засіб</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Ім'я</Text>
          <Controller
            control={control}
            name="participantAName"
            rules={{ required: 'Ім\'я обов\'язкове' }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.participantAName && styles.inputError]}
                placeholder="Введіть ім'я"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.participantAName && (
            <Text style={styles.error}>{errors.participantAName.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Прізвище</Text>
          <Controller
            control={control}
            name="participantASurname"
            rules={{ required: 'Прізвище обов\'язкове' }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.participantASurname && styles.inputError]}
                placeholder="Введіть прізвище"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.participantASurname && (
            <Text style={styles.error}>{errors.participantASurname.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Дата народження (ДД.МM.РРРР)</Text>
          <Controller
            control={control}
            name="participantABirthDate"
            rules={{ 
              required: 'Дата народження обов\'язкова',
              pattern: {
                value: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                message: 'Формат: ДД.МM.РРРР'
              }
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.participantABirthDate && styles.inputError]}
                placeholder="ДД.МM.РРРР"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.participantABirthDate && (
            <Text style={styles.error}>{errors.participantABirthDate.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Телефон</Text>
          <Controller
            control={control}
            name="participantAPhone"
            rules={{ 
              required: 'Телефон обов\'язковий',
              pattern: {
                value: /^\+?[0-9]{9,}$/,
                message: 'Введіть коректний номер телефону'
              }
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.participantAPhone && styles.inputError]}
                placeholder="+380..."
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.participantAPhone && (
            <Text style={styles.error}>{errors.participantAPhone.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Держ. номер авто</Text>
          <Controller
            control={control}
            name="participantACarNumber"
            rules={{ required: 'Номер авто обов\'язковий' }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[styles.input, errors.participantACarNumber && styles.inputError]}
                placeholder="АА 1234 АА"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
              />
            )}
          />
          {errors.participantACarNumber && (
            <Text style={styles.error}>{errors.participantACarNumber.message}</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonSecondaryText}>Назад</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Далі</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  error: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  buttonSecondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
