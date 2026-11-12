import { StyleSheet, Text, View } from "react-native";

export default function WalkMap() {
  return (
    <View style={styles.container}>
      <Text>Walk Map Not Supported</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    minHeight: 240,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
