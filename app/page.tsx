import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { Stack, Group, Box, RingProgress } from "@mantine/core";
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
  const today = new Date();
  const dates = [];

  // 生成前100天的日期
  for (let i = 100; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  // 添加今天
  dates.push(today);

  // 生成后20天的日期
  for (let i = 1; i <= 20; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return (
    <Stack gap="lg">
      <Group justify="space-around" align="center">
        <p className="font-bold"> {formatDate(new Date())}</p>
      </Group>
      <Box pos="relative">
        <Divider />
        <Box
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "10px solid var(--mantine-color-default-border)",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "-1px"
          }}
        />
      </Box>
      <Box
        style={{
          width: "100%",
          overflowX: "auto",
          scrollBehavior: "smooth"
        }}
      >
        <Group gap="md" wrap="nowrap" style={{ padding: "20px 0" }}>
          {dates.map((date, index) => (
            <RingProgress
              key={index}
              size={120}
              thickness={12}
              roundCaps
              sections={[
                { value: 40, color: "blue" },
                { value: 100, color: "gray.4" }
              ]}
              label={
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "12px" }}>{date.getDate()}</div>
                  <div style={{ fontSize: "10px", color: "gray" }}>{`${40}/${78}`}</div>
                </div>
              }
            />
          ))}
        </Group>
      </Box>
    </Stack>
  );
}
