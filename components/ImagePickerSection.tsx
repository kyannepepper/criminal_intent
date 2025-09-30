import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "./ThemeContext";

export default function ImagePickerSection({
  imageUri,
  onPickLibrary,
  onTakePhoto,
  onClearImage,
}: {
  imageUri: string | null;
  onPickLibrary: () => void;
  onTakePhoto: () => void;
  onClearImage: () => void;
}) {
  const { theme } = useTheme();

  if (!imageUri) {
    return (
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text }]}>Photo</Text>
        <View style={styles.row}>
          <Pressable
            onPress={onPickLibrary}
            style={[styles.button, { backgroundColor: theme.bold }]}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>Select from Photos</Text>
          </Pressable>
          <Pressable
            onPress={onTakePhoto}
            style={[styles.button, { backgroundColor: theme.bold }]}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>Take Photo</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.previewRow}>
      <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
      <Pressable
        onPress={onClearImage}
        style={[styles.button, styles.changeButton, { backgroundColor: theme.bold }]}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>Change Image</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 20, gap: 12 },
  label: { fontSize: 20, fontWeight: "600" },
  row: { marginBottom: 20, flexDirection: "row", gap: 12 },
  button: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 5 },
  buttonText: {},
  previewRow: { flexDirection: "row", marginVertical: 20, alignItems: "flex-start" },
  previewImage: { width: 130, height: 130, borderRadius: 5 },
  changeButton: { marginHorizontal: 20, alignSelf: "flex-start" },
});
