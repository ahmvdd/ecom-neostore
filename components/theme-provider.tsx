'use client'
//fournisseur de thème (ThemeProvider) qui encapsule le fournisseur de thème de la bibliothèque next-themes. Il est utilisé pour gérer les thèmes (comme le mode clair et le mode sombre)
import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
