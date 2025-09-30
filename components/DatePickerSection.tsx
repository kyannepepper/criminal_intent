import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "./ThemeContext";

export default function DatePickerSection({
  date,
  showPicker,
  onOpen,
  onChange,
  onClose,
}: {
  date: Date;
  showPicker: boolean;
  onOpen: () => void;
  onChange: (_: any, selectedDate?: Date) => void;
  onClose: () => void;
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onOpen}
        style={[styles.primaryButton, { backgroundColor: theme.bold }]}
      >
        <Text style={[styles.primaryButtonText, { color: theme.text }]}>
          {`Select Date: ${date.toLocaleDateString()}`}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
          style={styles.iosPicker}
        />
      )}

      {Platform.OS === "ios" && showPicker && (
        <Pressable onPress={onClose} style={[styles.iosDone, { backgroundColor: theme.text }]}>
          <Text style={[styles.iosDoneText, { color: theme.bold }]}>Done</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 30 },
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  primaryButtonText: { fontWeight: "600" },
  iosPicker: { backgroundColor: "white", marginLeft: -20, marginTop: 20, borderRadius: 5 },
  iosDone: { marginTop: 10, alignSelf: "center", padding: 10, borderRadius: 5 },
  iosDoneText: {},
});
