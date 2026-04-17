import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';

type Priority = 'low' | 'medium' | 'high';

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  date?: string;
  priority?: Priority;
};

interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

interface NewTodoForm {
  title: string;
  date: string;
  priority: Priority;
}

const priorityOptions: Priority[] = ['low', 'medium', 'high'];

function fakeTime(id: number): string {
  const hour = (id % 12) + 7;
  return `${hour} ${hour < 12 ? 'am' : 'pm'}`;
}

function getTodayLabel(): string {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
      ? 'nd'
      : day === 3 || day === 23
      ? 'rd'
      : 'th';

  return `${day}${suffix} ${month} ${year}`;
}

function CheckIcon({ completed }: { completed: boolean }) {
  if (!completed) {
    return <View style={styles.emptyCircle} />;
  }
  return (
    <View style={styles.checkedCircle}>
      <Text style={styles.checkMark}>✓</Text>
    </View>
  );
}

function TodoItem({
  item,
  onToggle,
}: {
  item: Todo;
  onToggle: (id: number) => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.card, item.completed && styles.cardCompleted]}
      onPress={() => onToggle(item.id)}
      activeOpacity={0.8}
    >
      {item.completed && <View style={styles.completedAccent} />}
      <CheckIcon completed={item.completed} />
      <View style={styles.cardBody}>
        <Text
          style={[styles.todoText, item.completed && styles.todoTextCompleted]}
          numberOfLines={2}
        >
          {item.todo}
        </Text>
        {item.date ? <Text style={styles.metaText}>{item.date}</Text> : null}
      </View>
      <Text style={styles.timeText}>{fakeTime(item.id)}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewTodoForm>({
    defaultValues: {
      title: '',
      date: '',
      priority: 'medium',
    },
  });

  useEffect(() => {
    fetch('https://dummyjson.com/todos?limit=20')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json() as Promise<TodosResponse>;
      })
      .then((data) => {
        setTodos(data.todos);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleToggle(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function onSubmit(data: NewTodoForm) {
    const newTodo: Todo = {
      id: Date.now(),
      todo: data.title,
      completed: false,
      userId: 0,
      date: data.date,
      priority: data.priority,
    };

    setTodos((prev) => [newTodo, ...prev]);
    reset({ title: '', date: '', priority: 'medium' });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.title}>ODOT List</Text>
          <Text style={styles.dateLabel}>{getTodayLabel()}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Create new task</Text>

          <Text style={styles.formLabel}>Назва</Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: 'Назва обов’язкова' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Наприклад, купити хліб"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.title && (
            <Text style={styles.fieldError}>{errors.title.message}</Text>
          )}

          <Text style={styles.formLabel}>Дата</Text>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text style={styles.formLabel}>Пріоритет</Text>
          <Controller
            control={control}
            name="priority"
            render={({ field: { value, onChange } }) => (
              <View style={styles.priorityRow}>
                {priorityOptions.map((option) => (
                  <Pressable
                    key={option}
                    style={[
                      styles.priorityButton,
                      value === option && styles.priorityButtonActive,
                    ]}
                    onPress={() => onChange(option)}
                  >
                    <Text
                      style={[
                        styles.priorityButtonLabel,
                        value === option && styles.priorityButtonLabelActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          />

          <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitButtonText}>Додати завдання</Text>
          </Pressable>
        </View>

        {loading && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#4CAF8C" />
          </View>
        )}

        {!loading && error !== null && (
          <View style={styles.centered}>
            <Text style={styles.errorText}>Failed to load todos: {error}</Text>
          </View>
        )}

        {!loading && error === null && (
          <FlatList<Todo>
            data={todos}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <TodoItem item={item} onToggle={handleToggle} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: '#F0F2F5',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  formContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 10,
  },
  fieldError: {
    color: '#DC2626',
    fontSize: 13,
    marginBottom: 10,
  },
  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  priorityButtonActive: {
    backgroundColor: '#4CAF8C',
    borderColor: '#4CAF8C',
  },
  priorityButtonLabel: {
    color: '#0F172A',
    textTransform: 'capitalize',
    fontWeight: '700',
  },
  priorityButtonLabelActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    marginTop: 4,
    backgroundColor: '#4CAF8C',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  cardBody: {
    flex: 1,
  },
  cardCompleted: {
    backgroundColor: '#FFFFFF',
  },
  completedAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 48,
    height: 48,
    backgroundColor: '#FFCDD2',
    borderBottomLeftRadius: 48,
  },
  emptyCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    marginRight: 14,
    flexShrink: 0,
  },
  checkedCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF8C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
  todoText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  metaText: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 13,
  },
  timeText: {
    fontSize: 13,
    color: '#94A3B8',
    marginLeft: 10,
    flexShrink: 0,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
