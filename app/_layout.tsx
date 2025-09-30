import { Link, Stack } from "expo-router";
import { Plus, Settings } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider, useTheme } from "../components/ThemeContext";

function HeaderTitle({ color }: { color: string }) {
  return <Text style={[styles.headerTitle, { color }]}>Criminal Intent</Text>;
}

function HeaderIndexActions({ color }: { color: string }) {
  return (
    <View style={styles.headerActionsRow}>
      <Link href="/details" asChild>
        <Plus color={color} />
      </Link>
      <Link href="/settings" asChild>
        <Settings color={color} />
      </Link>
    </View>
  );
}

function HeaderSettingsOnly({ color }: { color: string }) {
  return (
    <View style={styles.headerRightSingle}>
      <Link href="/settings" asChild>
        <Settings color={color} />
      </Link>
    </View>
  );
}

function RootStack() {
  const { theme } = useTheme();
  const barStyle = theme.text === "#1f1f1f" ? "dark" : "light";

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.bold },
        headerTintColor: theme.text,
        headerTitle: "",
        statusBarStyle: barStyle,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <HeaderTitle color={theme.text} />,
          headerRight: () => <HeaderIndexActions color={theme.text} />,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerRight: () => <HeaderSettingsOnly color={theme.text} />,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerRight: () => null,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerActionsRow: {
    flexDirection: "row",
    gap: 15,
    marginRight: 10,
    alignItems: "center",
  },
  headerRightSingle: {
    marginRight: 10,
  },
});
