export interface ThemeProps {
  $themeColor: string;
  $glowIntensity: number;
  $enableFlicker: boolean;
}

export interface OutputLine {
  commandText: string;
  responseText: string | React.ReactNode;
}
