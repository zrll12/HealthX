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
  /** Your theme override here */
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
              navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
              header={{ height: 50 }}
              padding="md">
              <AppShell.Header>
                <Group visibleFrom="sm" justify="space-around" align="center" h={50}> {/* Desktop header */}
                  <p className="font-bold">Health X</p>
                </Group>
                <Group hiddenFrom="sm" justify="space-between" align="center" h={50} w="98%"> {/* Mobile view */}
                  <Space />
                  <p className="font-bold">Health X</p>
                  <Group gap="sm">
                    <ColorSchemeToggle />
                    <Button isIconOnly variant={"light"} onPress={toggle}>{opened ? <IconX /> : <IconMenu2 />}</Button>
                  </Group>
                </Group>
              </AppShell.Header>
              <AppShell.Navbar p="md">
                <Stack h="100%" justify="space-between" visibleFrom="sm"> {/* Desktop header */}
                  <Stack>
                    {/* 这里可以添加其他导航项目 */}
                  </Stack>
                  <Group gap="sm" justify="flex-end" wrap="nowrap">
                    <ColorSchemeToggle />
                  </Group>
                </Stack>
                <Stack hiddenFrom="sm"> {/* Mobile view */}

                </Stack>
              </AppShell.Navbar>
              <AppShell.Main>
                <Stack h="100%" justify="space-between">
                  <Stack>
                    {children}
                  </Stack>
                </Stack>
              </AppShell.Main>
              <AppShell.Footer>
                <Group justify="space-around" align="center" h={50}>
                  <p>© {displayYear} Health X. All rights reserved.</p>
                </Group>
              </AppShell.Footer>
            </AppShell>
          </HeroUIProvider>
        </NextThemesProvider>
      </MantineProvider>
    </div>
    </body>
    </html>
  );
}
