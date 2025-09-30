import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SuccessOverlay({
  visible,
  message,
}: {
  visible: boolean;
  message: string;
}) {
  if (!visible) return null;
  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.card}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 24,
    paddingHorizontal: 30,
    minWidth: 220,
    alignItems: "center",
  },
  text: { fontWeight: "700" },
});
