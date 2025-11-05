import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function Tab() {

    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            const cachedData = await AsyncStorage.getItem('todo');

            if (cachedData) {
                setData(JSON.parse(cachedData));
                setMessage('Loaded data from cache.');
            }
            else {
                fetch('https://jsonplaceholder.typicode.com/todos/1')
                    .then(response => response.json())
                    .then(json => {
                        setData(json);
                        AsyncStorage.setItem('todo', JSON.stringify(json));
                        setMessage(`Fetched todo: ${json.title}`);
                    })
                    .catch(error => {
                        setMessage(`Error fetching data: ${error.message}`);
                    });
            }
        };

        fetchData();
    }, []);



    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Hello React Native!</ThemedText>
            <ThemedText>
                data: {data ? JSON.stringify(data) : 'Loading...'}
            </ThemedText>
            <ThemedText>{message}</ThemedText>
        </ThemedView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, gap: 12, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: '600' },
});
