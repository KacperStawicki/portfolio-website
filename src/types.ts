export interface ThemeProps {
  $themeColor: string;
  $glowIntensity: number;
}

export interface OutputLine {
  commandText: string;
  responseText: string | React.ReactNode;
}
