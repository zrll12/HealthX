'use client';

import {MantineColorScheme, rem, useMantineColorScheme} from '@mantine/core';
import {IconBrightness2, IconMoonStars} from '@tabler/icons-react';
import {useEffect, useState} from 'react';
import {Button} from "@heroui/button";
import {useTheme} from "next-themes";

const schemes = [
  {scheme: 'light', icon: <IconBrightness2 style={{width: rem(20)}} stroke={1.5}/>},
  {scheme: 'dark', icon: <IconMoonStars style={{width: rem(18)}} stroke={1.5}/>},
];

export function ColorSchemeToggle() {
  const [selected, setSelected] = useState(0);
  const [mounted, setMounted] = useState(false);
  const {setTheme} = useTheme();
  const {setColorScheme} = useMantineColorScheme();

  function selectNextColorScheme() {
    const nextSelected = 1 - selected;
    setTheme(schemes[nextSelected].scheme);
    setColorScheme(schemes[nextSelected].scheme as MantineColorScheme);

    setSelected(nextSelected);
  }

  useEffect(() => {
    setMounted(true);
    setTheme(schemes[selected].scheme);
    setColorScheme(schemes[selected].scheme as MantineColorScheme);
  }, []);

  if (!mounted) return null

  return (
    <Button isIconOnly
            variant="light"
            aria-label="Gallery"
            onPress={selectNextColorScheme}
    >
      {schemes[selected].icon}
    </Button>
  );
}
