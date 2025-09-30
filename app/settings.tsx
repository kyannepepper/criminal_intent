import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../components/ThemeContext";
import ThemeOptionItem from "../components/ThemeOptionItem";

export default function Settings() {
  const { theme, themes, setThemeById } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Choose Theme</Text>
      <FlatList
        data={themes}
        keyExtractor={(t) => String(t.id)}
        renderItem={({ item }) => (
          <ThemeOptionItem
            item={item}
            selected={item.id === theme.id}
            onPress={() => setThemeById(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
});
