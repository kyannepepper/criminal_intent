import Checkbox from "expo-checkbox";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "./ThemeContext";

export default function SolvedCheckboxRow({
  solved,
  onChange,
}: {
  solved: boolean;
  onChange: (v: boolean) => void;
}) {
  const { theme } = useTheme();
  const color =  solved ? theme.text === "#1f1f1f" ? theme.text : theme.bold : theme.text 

  return (
    <View style={styles.row}>
      <Checkbox value={solved} onValueChange={onChange} color={color} style={styles.checkbox} />
      <Text style={[styles.label, { color: theme.text }]}>Solved</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginTop: 24 },
  checkbox: { width: 22, height: 22, borderRadius: 4 },
  label: { marginLeft: 8, fontSize: 16 },
});
