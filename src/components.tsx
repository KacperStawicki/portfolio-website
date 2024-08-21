import { ThemeProps } from "@/types";
import styled, { keyframes } from "styled-components";

export const crtEffect = (
  $themeColor: string,
  $glowIntensity: number
) => keyframes`
  0%, 100% {
    text-shadow: 0 0 ${2 * $glowIntensity}px rgba(${$themeColor}, ${
  0.5 * $glowIntensity
}),
                 0 0 ${4 * $glowIntensity}px rgba(${$themeColor}, ${
  0.5 * $glowIntensity
}),
                 0 0 ${8 * $glowIntensity}px rgba(${$themeColor}, ${
  0.5 * $glowIntensity
}),
                 0 0 ${12 * $glowIntensity}px rgba(${
  $themeColor === "255, 184, 0" ? "255, 0, 0" : "0, 255, 0"
}, ${0.5 * $glowIntensity}),
                 0 0 ${16 * $glowIntensity}px rgba(${
  $themeColor === "255, 184, 0" ? "255, 0, 0" : "0, 255, 0"
}, ${0.5 * $glowIntensity});
  }
  50% {
    text-shadow: 0 0 ${1 * $glowIntensity}px rgba(${$themeColor}, ${
  0.5 * $glowIntensity
}),
                 0 0 ${2 * $glowIntensity}px rgba(${$themeColor}, ${
  0.5 * $glowIntensity
}),
                 0 0 ${3 * $glowIntensity}px rgba(${$themeColor}, ${
  0.5 * $glowIntensity
}),
                 0 0 ${4 * $glowIntensity}px rgba(${$themeColor}, ${
  0.5 * $glowIntensity
}),
                 0 0 ${5 * $glowIntensity}px rgba(${$themeColor}, ${
  0.5 * $glowIntensity
});
  }
`;

export const CRTScreen = styled.div<ThemeProps>`
  background: radial-gradient(
    circle,
    rgba(${(props) => props.$themeColor}, 0.15) 20%,
    rgba(${(props) => props.$themeColor}, 0.05) 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
  color: ${(props) => `rgb(${props.$themeColor})`};
  font-size: 16px;
  height: 100vh;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  animation: ${(props) => crtEffect(props.$themeColor, props.$glowIntensity)}
    0.01s infinite;
  position: relative;
  filter: blur(0.5px); /* Apply slight blur to the overall image */

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
`;

export const CRTContainer = styled.div<ThemeProps>`
  border: 5px solid ${(props) => `rgb(${props.$themeColor})`};
  padding: 0px 20px;
  height: 100%;
  margin: auto;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  animation: ${(props) => crtEffect(props.$themeColor, props.$glowIntensity)}
    0.01s infinite;

  @media (max-width: 768px) {
    padding: 0px 10px;
  }

  @media (max-width: 480px) {
    padding: 0px 5px;
  }
`;

export const CRTContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const TypingCursor = styled.span<ThemeProps>`
  display: inline-block;
  width: 10px;
  height: 20px;
  background: ${(props) => `rgb(${props.$themeColor})`};
  margin-left: 2px;
  vertical-align: middle;
  animation: ${(props) => crtEffect(props.$themeColor, props.$glowIntensity)}
    0.01s infinite;

  @media (max-width: 768px) {
    width: 8px;
    height: 16px;
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 12px;
  }
`;

export const ASCIIArt = styled.pre<ThemeProps>`
  color: ${(props) => `rgb(${props.$themeColor})`};
  font-size: 1.5rem;
  line-height: 1;
  margin: 0;
  animation: ${(props) => crtEffect(props.$themeColor, props.$glowIntensity)}
    0.01s infinite;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

export const LoadingIndicator = styled.div<ThemeProps>`
  animation: ${(props) => crtEffect(props.$themeColor, props.$glowIntensity)}
    0.01s infinite;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 70%;
  }
`;

export const Suggestions = styled.ul<ThemeProps>`
  list-style: none;
  padding: 15px;
  margin: 10px 0;
  color: ${(props) => `rgb(${props.$themeColor})`};
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid ${(props) => `rgb(${props.$themeColor})`};
  animation: ${(props) => crtEffect(props.$themeColor, props.$glowIntensity)}
    0.01s infinite;

  & li:not(:first-child) {
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

export const TimelineDate = styled.span`
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

export const Timeline = styled.ul`
  list-style: disc;
  padding-left: 20px;

  @media (max-width: 768px) {
    padding-left: 15px;
  }

  @media (max-width: 480px) {
    padding-left: 10px;
  }
`;

export const CRTEffectCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
`;

export const MobileKeyboardButton = styled.button<ThemeProps>`
  position: fixed;
  display: none;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${(props) => `rgb(${props.$themeColor})`};
  border: 2px solid ${(props) => `rgb(${props.$themeColor})`};
  padding: 10px;
  z-index: 100;
  animation: ${(props) => crtEffect(props.$themeColor, props.$glowIntensity)}
    0.01s infinite;
  text-shadow: 0 0 ${(props) => 2 * props.$glowIntensity}px
      rgba(
        ${(props) => props.$themeColor},
        ${(props) => 0.5 * props.$glowIntensity}
      ),
    0 0 ${(props) => 4 * props.$glowIntensity}px
      rgba(
        ${(props) => props.$themeColor},
        ${(props) => 0.5 * props.$glowIntensity}
      ),
    0 0 ${(props) => 8 * props.$glowIntensity}px
      rgba(
        ${(props) => props.$themeColor},
        ${(props) => 0.5 * props.$glowIntensity}
      );

  @media (max-width: 768px) {
    padding: 8px;
    display: block;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

export const MobileKeyboard = styled.input<ThemeProps>`
  position: fixed;
  display: none;
  bottom: 70px;
  left: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.9);
  border: 2px solid ${(props) => `rgb(${props.$themeColor})`};
  color: ${(props) => `rgb(${props.$themeColor})`};
  padding: 10px;
  font-size: 16px;
  z-index: 100;
  text-shadow: 0 0 ${(props) => 2 * props.$glowIntensity}px
      rgba(
        ${(props) => props.$themeColor},
        ${(props) => 0.5 * props.$glowIntensity}
      ),
    0 0 ${(props) => 4 * props.$glowIntensity}px
      rgba(
        ${(props) => props.$themeColor},
        ${(props) => 0.5 * props.$glowIntensity}
      ),
    0 0 ${(props) => 8 * props.$glowIntensity}px
      rgba(
        ${(props) => props.$themeColor},
        ${(props) => 0.5 * props.$glowIntensity}
      );

  @media (max-width: 768px) {
    display: block;
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => `rgb(${props.$themeColor})`};
    box-shadow: 0 0 ${(props) => 4 * props.$glowIntensity}px
      rgba(
        ${(props) => props.$themeColor},
        ${(props) => 0.5 * props.$glowIntensity}
      );
  }
`;
