import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import uuid from "react-native-uuid";
import DatePickerSection from "../components/DatePickerSection";
import ImagePickerSection from "../components/ImagePickerSection";
import LabeledInput from "../components/LabeledInput";
import SolvedCheckboxRow from "../components/SolvedCheckboxRow";
import SuccessOverlay from "../components/SuccessOverlay";
import { useTheme } from "../components/ThemeContext";

export default function Details() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    async function loadMystery() {
      if (!id) return;
      const raw = await AsyncStorage.getItem("@mysteries");
      if (!raw) return;
      const list = JSON.parse(raw);
      const mystery = list.find((m: any) => String(m.id) === String(id));
      if (mystery) {
        setTitle(mystery.title);
        setDetails(mystery.details);
        setImageUri(mystery.imageUri);
        setSolved(mystery.solved);
        setDate(new Date(mystery.date));
      }
    }
    loadMystery();
  }, [id]);

  const onSaveNew = async () => {
    if (!title.trim()) {
      alert("Please enter a title before saving.");
      return;
    }
    const record = {
      id: String(uuid.v4()),
      title: title.trim(),
      details: details.trim(),
      imageUri,
      date: date.toISOString(),
      solved,
    };
    const existing = await AsyncStorage.getItem("@mysteries");
    const list = existing ? JSON.parse(existing) : [];
    list.push(record);
    await AsyncStorage.setItem("@mysteries", JSON.stringify(list));
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1500);
  };

  const onSaveEdits = async () => {
    if (!id) return;
    const existing = await AsyncStorage.getItem("@mysteries");
    let list = existing ? JSON.parse(existing) : [];
    let updated = false;

    list = list.map((m: any) => {
      if (String(m.id) === String(id)) {
        updated = true;
        return {
          ...m,
          title: title.trim(),
          details: details.trim(),
          imageUri,
          date: date.toISOString(),
          solved,
        };
      }
      return m;
    });

    if (!updated) {
      alert("Could not find this item to update.");
      return;
    }

    await AsyncStorage.setItem("@mysteries", JSON.stringify(list));
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
  };

  const pickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      alert("Permission to access photos is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.9,
      aspect: [1, 1],
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      alert("Camera permission is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.9,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const onChangeDate = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const openDatePicker = () => {
    setShowPicker(true);
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <ScrollView ref={scrollRef} style={styles.scroll}>
        <View style={styles.body}>
          <LabeledInput label="Title" value={title} onChangeText={setTitle} placeholder="Title" />
          <ImagePickerSection
            imageUri={imageUri}
            onPickLibrary={pickFromLibrary}
            onTakePhoto={takePhoto}
            onClearImage={() => setImageUri(null)}
          />
          <LabeledInput
            label="Details"
            value={details}
            onChangeText={setDetails}
            placeholder="What happened?"
            textarea
          />
          <DatePickerSection
            date={date}
            showPicker={showPicker}
            onOpen={openDatePicker}
            onChange={onChangeDate}
            onClose={() => setShowPicker(false)}
          />
          <SolvedCheckboxRow solved={solved} onChange={setSolved} />
          <Pressable
            onPress={isEditing ? onSaveEdits : onSaveNew}
            style={[styles.saveButton, { backgroundColor: theme.text }]}
          >
            <Text style={[styles.saveText, { color: theme.bold }]}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
      <SuccessOverlay visible={showSuccess} message="Saved successfully" />
    </View>
  );
}

function getStyles(theme: any) {
  return StyleSheet.create({
    screen: { flex: 1 },
    scroll: { flex: 1 },
    body: { margin: 40 },
    saveButton: {
      marginTop: 20,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 5,
      alignItems: "center",
    },
    saveText: { fontWeight: "600" },
  });
}
