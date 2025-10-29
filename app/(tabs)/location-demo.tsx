import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Button, Platform } from 'react-native';

export default function LocationDemo() {
  const [status, setStatus] = useState<'undetermined'|'granted'|'denied'>('undetermined');
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const [error, setError] = useState<string | null>(null);

  const askPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setStatus(status);
    if (status !== 'granted') {
      setError('Permission denied');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    setCoords(loc.coords);
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <ThemedView style={{ padding: 16 }}>
      <ThemedText>Permission: {status}</ThemedText>
      {coords && (
        <ThemedText>
          Lat: {coords.latitude.toFixed(5)}  Lon: {coords.longitude.toFixed(5)}
        </ThemedText>
      )}
      {error && <ThemedText style={{ color: 'crimson' }}>{error}</ThemedText>}
      <Button title="Refresh location" onPress={askPermission} />
      {Platform.OS === 'android' && (
        <ThemedText style={{ marginTop: 12, opacity: 0.7 }}>
          Tip: ensure Location is enabled in device settings.
        </ThemedText>
      )}
    </ThemedView>
  );
}