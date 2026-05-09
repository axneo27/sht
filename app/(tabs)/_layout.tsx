import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" drawable="ic_home" />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="info">
        <Icon sf="info.circle.fill" drawable="ic_info" />
        <Label>Info</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
