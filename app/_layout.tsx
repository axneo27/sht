import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ProtocolProvider } from '../context/ProtocolContext';

export default function RootLayout() {
  return (
    <ProtocolProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerBackTitle: 'Назад',
          headerTintColor: '#007AFF',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="datetime" options={{ title: 'Дата та час ДТП' }} />
        <Stack.Screen name="participant-a" options={{ title: 'Учасник А' }} />
        <Stack.Screen name="license-data" options={{ title: 'Водійське посвідчення' }} />
        <Stack.Screen name="damage-type" options={{ title: 'Вид пошкодження' }} />
        <Stack.Screen
          name="summary"
          options={{ title: 'Огляд даних', headerBackVisible: false }}
        />
      </Stack>
    </ProtocolProvider>
  );
}
