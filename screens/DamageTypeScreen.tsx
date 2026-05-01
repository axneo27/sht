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

type DamageTypeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DamageType'>;

interface Props {
  navigation: DamageTypeScreenNavigationProp;
}

const damageSides = ['Передня', 'Задня', 'Ліва', 'Права', 'Дах', 'Низ'];

export const DamageTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { formData, updateFormData } = useContext(ProtocolContext);
  const { control, handleSubmit, formState: { errors }, watch } = useForm<Partial<ProtocolFormData>>({
    defaultValues: {
      damageSide: formData?.damageSide || '',
      damageDescription: formData?.damageDescription || '',
    },
  });

  const selectedSide = watch('damageSide');

  const onSubmit = (data: Partial<ProtocolFormData>) => {
    updateFormData(data);
    navigation.navigate('Summary');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Вид пошкодження</Text>
        <Text style={styles.subtitle}>Вкажіть сторону та опис пошкодження</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Сторона пошкодження</Text>
          <View style={styles.sideGrid}>
            {damageSides.map((side) => (
              <TouchableOpacity
                key={side}
                style={[
                  styles.sideButton,
                  selectedSide === side && styles.sideButtonActive,
                ]}
                onPress={() => {
                  // This will be handled by react-hook-form controller
                }}
              >
                <Controller
                  control={control}
                  name="damageSide"
                  rules={{ required: 'Виберіть сторону' }}
                  render={({ field: { onChange } }) => (
                    <TouchableOpacity
                      style={[
                        styles.sideButtonInner,
                        selectedSide === side && styles.sideButtonInnerActive,
                      ]}
                      onPress={() => onChange(side)}
                    >
                      <Text
                        style={[
                          styles.sideButtonText,
                          selectedSide === side && styles.sideButtonTextActive,
                        ]}
                      >
                        {side}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </TouchableOpacity>
            ))}
          </View>
          {errors.damageSide && (
            <Text style={styles.error}>{errors.damageSide.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Опис пошкодження</Text>
          <Controller
            control={control}
            name="damageDescription"
            rules={{ required: 'Опис обов\'язковий' }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={[
                  styles.textArea,
                  errors.damageDescription && styles.inputError,
                ]}
                placeholder="Детально опишіть пошкодження..."
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#ccc"
                multiline={true}
                numberOfLines={6}
                textAlignVertical="top"
              />
            )}
          />
          {errors.damageDescription && (
            <Text style={styles.error}>{errors.damageDescription.message}</Text>
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
          <Text style={styles.buttonText}>Готово</Text>
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
    marginBottom: 12,
  },
  sideGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sideButton: {
    flex: 1,
    minWidth: '31%',
  },
  sideButtonInner: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  sideButtonInnerActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  sideButtonActive: {},
  sideButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  sideButtonTextActive: {
    color: '#fff',
  },
  textArea: {
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
