import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

export const LOCATION_TASK = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.warn('BG task error:', error);
    return;
  }
  const { locations } = data as { locations: Location.LocationObject[] };

  // In production: batch & POST to API, write to storage, etc.
  console.log('BG locations:', locations.map(l => l.coords));
});