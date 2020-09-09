import React from 'react'
import { Button, useColorMode } from '@chakra-ui/core'
import styled from '@emotion/styled'

const IconWrapper = styled(Button)`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;
  &:hover {
    opacity: 1;
  }
  box-shadow: 0;
  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${(p) => p.theme.colors.gray[800]};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${(p) => (p.isDark ? '4px' : '2px')} solid
    ${(p) => p.theme.colors.primary};
  background: ${(p) => p.theme.colors.primary};
  transform: scale(${(p) => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${(p) => (p.isDark ? 'visible' : 'hidden')};
  &::before {
    content: '';
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid ${(p) => p.theme.colors.primary};
    border-radius: 50%;
    transform: translate(${(p) => (p.isDark ? '14px, -14px' : '0, 0')});
    opacity: ${(p) => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${(p) => p.theme.colors.primary},
      0 23px 0 ${(p) => p.theme.colors.primary},
      23px 0 0 ${(p) => p.theme.colors.primary},
      -23px 0 0 ${(p) => p.theme.colors.primary},
      15px 15px 0 ${(p) => p.theme.colors.primary},
      -15px 15px 0 ${(p) => p.theme.colors.primary},
      15px -15px 0 ${(p) => p.theme.colors.primary},
      -15px -15px 0 ${(p) => p.theme.colors.primary};
    transform: scale(${(p) => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;
  }
`

const MoonMask = styled.div`
  position: absolute;
  right: 9px;
  top: 9px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  &:active {
    opacity: 0;
  }
  background: ${(p) =>
    p.isDark ? p.theme.colors.gray[800] : p.theme.colors.white};
  transform: translate(${(p) => (p.isDark ? '14px, -14px' : '0, 0')});
  opacity: ${(p) => (p.isDark ? 0 : 1)};
  transition: ${(p) => p.theme.colorModeTransition}, transform 0.45s ease;
`

export default function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode !== 'light'

  return (
    <IconWrapper
      isDark={isDark}
      backgroundColor={isDark ? 'gray.800' : 'white'}
      _hover={'white'}
      onClick={toggleColorMode}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  )
}
