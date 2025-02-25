"use client";

import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { Stack, Group, Box } from "@mantine/core";
import { Divider } from "@heroui/divider";
import { CircularProgress } from "@heroui/react";
import React, { useEffect, useState, useRef } from "react";

// 日期格式化
// 日期格式化
function formatDate(date: Date | null): string {
  if (!date || isNaN(date.getTime())) {
    return "无效日期"; // 如果传入的是无效的日期对象，返回一个默认值
  }

  const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const today = new Date();
  const yesterday = new Date(today);
  const tomorrow = new Date(today);

  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  // 日期有效性检查
  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;  // 确保日期对象有效
    return d1.toDateString() === d2.toDateString();
  };

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


// 假设每个日期都有独立的进度值 (这里我们用简单的模拟数据)
function getDailyProgress(date: Date): number {
  return (Math.random() * 100); // 使用一个随机的进度值来模拟每个日期的独立百分比
}

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); // 用于引用滚动容器
  const [visibleDate, setVisibleDate] = useState<Date | null>(null); // 当前显示的日期

  // 获取过去300天和未来50天的日期
// 生成前300天和后50天的日期
  const generateDates = () => {
    const dates = [];
    const today = new Date(selectedDate!);

    // 从今天往前推 300 天
    for (let i = 300; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      if (!isNaN(date.getTime())) { // 确保生成的日期有效
        dates.push(date);
      }
    }

    // 从今天往后推 50 天
    for (let i = 1; i <= 50; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (!isNaN(date.getTime())) { // 确保生成的日期有效
        dates.push(date);
      }
    }

    return dates;
  };


  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);

    const scrollToToday = () => {
      if (containerRef.current) {
        const dayWidth = 120; // 每天进度条的宽度
        const todayIndex = 300; // 今天的位置是300天之前（从前面300天起）
        const scrollPosition = todayIndex * dayWidth - containerRef.current.clientWidth / 2 + dayWidth / 2;
        containerRef.current.scrollLeft = scrollPosition;
      }
    };

    scrollToToday(); // 滚动到今天
  }, []);

  // 更新顶部日期
  const handleScroll = () => {
    if (containerRef.current) {
      const dayWidth = 120;
      const scrollLeft = containerRef.current.scrollLeft;
      const dateIndex = Math.floor(scrollLeft / dayWidth); // 当前滚动位置对应的日期索引
      const today = new Date();
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - 300 + dateIndex); // 根据滚动位置计算日期
      setVisibleDate(targetDate);
    }
  };

  // 如果 selectedDate 还没有设置好，就不渲染内容
  if (!selectedDate) {
    return <div>加载中...</div>;
  }

  return (
    <Stack gap="lg">
      <Group justify="space-around" align="center">
        <p className="font-bold"> {formatDate(visibleDate!)}</p> {/* 显示滚动位置的日期 */}
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
      {/* 水平滚动容器 */}
      <Box
        ref={containerRef}
        style={{
          overflowX: "auto",
          display: "flex",
          padding: "20px 0",
          scrollSnapType: "x mandatory" // 滚动时停留在每个日期
        }}
        onScroll={handleScroll} // 监听滚动事件
      >
        {generateDates().map((date, index) => {
          const progress = getDailyProgress(date); // 每个日期的进度
          return (
            <Box
              key={index}
              style={{
                flexShrink: 0,
                width: 120, // 每个日期的宽度
                margin: "0 10px",
                textAlign: "center",
                scrollSnapAlign: "center" // 让每个日期的进度条对齐
              }}
            >
              <CircularProgress
                classNames={{
                  svg: "w-24 h-24 drop-shadow-md", // 设置圆圈的大小和阴影
                  value: "text-2xl font-semibold" // 设置值的字体样式
                }}
                showValueLabel={true} // 显示值标签
                strokeWidth={4} // 设置圆环的宽度
                value={progress} // 进度值
              />
              <p className="text-sm">{date.getMonth() + 1}月{date.getDate()}日</p>
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
}
