import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MysteryCard from "../components/MysteryCard";
import { useTheme } from "../components/ThemeContext";

export default function Index() {
  const [list, setList] = useState<any[]>([]);
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  useFocusEffect(
    useCallback(() => {
      async function loadMysteries() {
        const raw = await AsyncStorage.getItem("@mysteries");
        setList(raw ? JSON.parse(raw) : []);
      }
      loadMysteries();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MysteryCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/details",
                params: {id: item.id},
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No mysteries saved yet.</Text>
        }
        ListFooterComponent={<View style={styles.footerSpacer} />}
      />
    </View>
  );
}

function getStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    listContent: {
      padding: 30,
    },
    emptyText: {
      marginTop: 40,
      color: theme.text,
      textAlign: "center",
    },
    footerSpacer: {
      height: 120,
    },
  });
}
