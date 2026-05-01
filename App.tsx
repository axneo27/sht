import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ProtocolProvider } from './context/ProtocolContext';
import { HomeScreen } from './screens/HomeScreen';
import { DateTimeScreen } from './screens/DateTimeScreen';
import { ParticipantAScreen } from './screens/ParticipantAScreen';
import { LicenseDataScreen } from './screens/LicenseDataScreen';
import { DamageTypeScreen } from './screens/DamageTypeScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { RootStackParamList } from './types/protocol';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Назад',
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DateTime"
        component={DateTimeScreen}
        options={{
          title: 'Дата та час ДТП',
        }}
      />
      <Stack.Screen
        name="ParticipantA"
        component={ParticipantAScreen}
        options={{
          title: 'Учасник А',
        }}
      />
      <Stack.Screen
        name="LicenseData"
        component={LicenseDataScreen}
        options={{
          title: 'Водійське посвідчення',
        }}
      />
      <Stack.Screen
        name="DamageType"
        component={DamageTypeScreen}
        options={{
          title: 'Вид пошкодження',
        }}
      />
      <Stack.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          title: 'Огляд даних',
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ProtocolProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaView>
    </ProtocolProvider>
  );
}
