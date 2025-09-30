import React, { memo, useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "./ThemeContext";

type Mystery = {
  id: string;
  title: string;
  date: string;
  imageUri?: string | null;
  solved?: boolean;
};

export default memo(function MysteryCard({
  item,
  onPress,
}: {
  item: Mystery;
  onPress: () => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, styles.cardImagePlaceholder]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>

      {item.solved ? (
        <Image
          source={require("../assets/images/handcuff.png")}
          style={styles.solvedIcon}
          resizeMode="cover"
        />
      ) : null}
    </Pressable>
  );
});

function getStyles(theme: any) {
  return StyleSheet.create({
    card: {
      flexDirection: "row",
      backgroundColor: "white",
      borderRadius: 5,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    cardImage: {
      width: 90,
      height: 90,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      backgroundColor: "#eee",
    },
    cardImagePlaceholder: {
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      color: "#aaa",
    },
    cardContent: {
      flex: 1,
      marginLeft: 20,
    },
    cardTitle: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 5,
      color: '#000',
    },
    cardDate: {
      fontSize: 14,
      color: '#000',
    },
    solvedIcon: {
      width: 20,
      height: 20,
      margin: 20,
    },
  });
}
