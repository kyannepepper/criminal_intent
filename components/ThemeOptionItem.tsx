import React, { memo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Theme } from "./ThemeContext";

export default memo(function ThemeOptionItem({
  item,
  selected,
  onPress,
}: {
  item: Theme;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        {
          backgroundColor: selected ? item.bold : "#fff",
          borderColor: selected ? item.bold : "#e4e4e7",
        },
      ]}
    >
      <Text
        style={[
          styles.optionTitle,
          { color: selected ? item.text : "#111827" },
        ]}
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.optionSubtitle,
          { color: selected ? item.text : "#6b7280" },
        ]}
      >
        bg: {item.bg} • primary: {item.bold} • text: {item.text}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  option: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
  },
  optionTitle: {
    fontWeight: "600",
  },
  optionSubtitle: {
    marginTop: 6,
  },
});
