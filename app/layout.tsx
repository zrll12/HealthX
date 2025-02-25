"use client";

import "@/styles/globals.css";
import "@mantine/core/styles.css";
import React from "react";
import {
  AppShell,
  ColorSchemeScript,
  createTheme,
  Group,
  mantineHtmlProps,
  MantineProvider,
  Space, Stack
} from "@mantine/core";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import { Button } from "@heroui/button";
import { IconMenu2, IconX } from "@tabler/icons-react";


const theme = createTheme({
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
});


const startYear = 2025;
const currentYear = new Date().getFullYear();
const displayYear = startYear === currentYear ? `${startYear}` : `${startYear}-${currentYear}`;

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <html {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
      <title>HealthX</title>
    </head>
    <body>
    <div>
      <MantineProvider theme={theme}>
        <NextThemesProvider attribute="class">
          <HeroUIProvider>
            <AppShell
              aside={{ width: 230, breakpoint: "sm", collapsed: { mobile: !opened, desktop: false } }}
              header={{ height: 50 }}
              footer={{ height: 50 }}
              padding="md">
              <AppShell.Header>
                <Stack h={50} justify="center" style={{ position: "relative" }}>
                  {/* desktop header */}
                  <Group visibleFrom="sm" justify="space-between" w="100%" px="md">
                    <p className="font-bold">Health X</p>
                    <ColorSchemeToggle />
                  </Group>
                  {/* mobile header */}
                  <Group hiddenFrom="sm" justify="space-between" align="center" w="100%" px="md">
                    <div style={{ width: 92 }} />
                    {/* 占位元素，用于平衡布局 */}
                    <p className="font-bold">Health X</p>
                    <Group gap="sm">
                      <ColorSchemeToggle />
                      <Button isIconOnly variant={"light"} onPress={toggle}>{opened ? <IconX /> :
                        <IconMenu2 />}</Button>
                    </Group>
                  </Group>
                </Stack>
              </AppShell.Header>

              <AppShell.Footer>
                <Group justify="space-around" align="center" h={50}>
                  <p>© {displayYear} Health X. All rights reserved.</p>
                </Group>
              </AppShell.Footer>

              <AppShell.Aside p="md">
                <Stack h="100%" justify="space-between" visibleFrom="sm"> {/* desktop navbar */}
                  <Stack>
                  </Stack>
                  <Group gap="sm" justify="flex-end" wrap="nowrap">
                    {/* 底部 <ColorSchemeToggle /> */}
                  </Group>
                </Stack>
                <Stack hiddenFrom="sm"> {/* mobile navbar */}

                </Stack>
              </AppShell.Aside>
              <AppShell.Main>
                {children}
              </AppShell.Main>
            </AppShell>
          </HeroUIProvider>
        </NextThemesProvider>
      </MantineProvider>
    </div>
    </body>
    </html>
  );
}
