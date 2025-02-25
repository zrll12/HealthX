import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { Stack, Group, Box } from "@mantine/core";
import { Divider } from "@heroui/divider";
import React from "react";

function formatDate(date: Date): string {
  const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const today = new Date();
  const yesterday = new Date(today);
  const tomorrow = new Date(today);

  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  const isSameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();

  if (isSameDay(date, today)) {
    return `今天 ${date.getMonth() + 1}月${date.getDate()}日`;
  } else if (isSameDay(date, yesterday)) {
    return `昨天 ${date.getMonth() + 1}月${date.getDate()}日`;
  } else if (isSameDay(date, tomorrow)) {
    return `明天 ${date.getMonth() + 1}月${date.getDate()}日`;
  } else {
    return `${date.getMonth() + 1}月${date.getDate()}日 ${daysOfWeek[date.getDay()]}`;
  }
}


export default function HomePage() {
  return (
    <Stack gap="lg">
      <Group justify="space-around" align="center"> {/* Desktop header */}
        {formatDate(new Date())}
      </Group>
      <Divider />
    </Stack>
  );
}
