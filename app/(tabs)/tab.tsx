import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';

export default function Tab() {


    const [count, setCount] = useState(0);
    const [message, setMessage] = useState('Ready');


    useEffect(() => {
        setMessage(count % 2 === 0 ? 'Even count' : 'Odd count');
    }, [count]);



    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Hello React Native!</ThemedText>
            <ThemedText>{count}</ThemedText>
            <Button title="Increment" onPress={() => setCount(c => c + 1)} />
            <ThemedText>{message}</ThemedText>
        </ThemedView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, gap: 12, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: '600' },
});
