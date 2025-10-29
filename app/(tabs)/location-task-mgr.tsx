import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Button, Platform } from 'react-native';
import { LOCATION_TASK } from '../../tasks/locaiton.task';

declare global {
  interface Window {
    // optional ID returned by navigator.geolocation.watchPosition
    _webWatchId?: number;
  }
}

export default function LocationDemo() {
  
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const [error, setError] = useState<string | null>(null);



  const startBackground = async () => {
    if (Platform.OS === 'web') {
      // Web fallback using browser Geolocation API
      if ('geolocation' in navigator) {
        console.log('Starting web location tracking...');
        window._webWatchId = navigator.geolocation.watchPosition(
          (position) => {
            setCoords(position.coords);
            console.log('Web location:', position.coords);
          },
          (error) => console.error('Web location error:', error),
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
        );
      } else {
        console.warn('Geolocation not supported in this browser.');
      }
      return;
    }

    // Native (iOS / Android)
    const fgStatus = await Location.requestForegroundPermissionsAsync();
    if (fgStatus.status !== 'granted') {
      setError('Permission to access location was denied');
      return;
    }

    const bgStatus = await Location.requestBackgroundPermissionsAsync();
    if (bgStatus.status !== 'granted') {
      console.warn('Background location permission denied');
      return;
    }

    const started = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
    if (!started) {
      console.log('Starting native background location updates...');
      await Location.startLocationUpdatesAsync(LOCATION_TASK, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 25,
        pausesUpdatesAutomatically: true, // iOS
        showsBackgroundLocationIndicator: true, // iOS
        foregroundService: {
          notificationTitle: 'Tracking location',
          notificationBody: 'Running in the background',
        },
      });
    }
  };

  const stopBackground = async () => {
    if (Platform.OS === 'web') {
      if (window._webWatchId) {
        navigator.geolocation.clearWatch(window._webWatchId);
        console.log('Stopped web location tracking.');
        delete window._webWatchId;
      }
      return;
    }

    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK);
      console.log('Stopped native background location updates.');
    } catch (error) {
      console.error('Error stopping background location updates:', error);
    }
  };

  return (
    <ThemedView style={{ padding: 16 }}>
      {coords && (
        <ThemedText>
          Lat: {coords.latitude.toFixed(5)}  Lon: {coords.longitude.toFixed(5)}
        </ThemedText>
      )}
      {error && <ThemedText style={{ color: 'crimson' }}>{error}</ThemedText>}

      <Button title="Start background tracking" onPress={startBackground} />
      <Button title="Stop background tracking" onPress={stopBackground} />

      {Platform.OS === 'android' && (
        <ThemedText style={{ marginTop: 12, opacity: 0.7 }}>
          Tip: ensure Location is enabled in device settings.
        </ThemedText>
      )}
    </ThemedView>
  );
}