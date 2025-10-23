import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Details() {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Details</ThemedText>
            <ThemedText>Item ID: {id}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
});
