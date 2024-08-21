"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ASCIIArt,
  CRTContainer,
  CRTContent,
  CRTEffectCanvas,
  CRTScreen,
  LoadingIndicator,
  Suggestions,
  Timeline,
  TimelineDate,
  TypingCursor,
  MobileKeyboardButton,
  MobileKeyboard,
} from "@/components";
import {
  availableCommands,
  jokes,
  motivations,
  timelineEvents,
} from "@/constants";
import { Typewriter } from "react-simple-typewriter";
import { OutputLine } from "@/types";
import { hslToRgb } from "@/utils";
import { useScanlinesEffect } from "@/scanlines";
import { Keyboard, KeyboardOff } from "lucide-react";

export default function Terminal() {
  const [command, setCommand] = useState<string>("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<string>("255, 184, 0");
  const [hue, setHue] = useState<number>(40);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [glowIntensity, setGlowIntensity] = useState<number>(1);
  const [adjustingGlow, setAdjustingGlow] = useState<boolean>(false);
  const [adjustingTheme, setAdjustingTheme] = useState<boolean>(false);
  const [showMobileKeyboard, setShowMobileKeyboard] = useState<boolean>(false);
  const crtCanvasRef = useRef<HTMLCanvasElement>(null);
  const endOfOutputRef = useRef<HTMLDivElement>(null);

  useScanlinesEffect(crtCanvasRef, themeColor);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if mobile keyboard is active
      if (loading || showMobileKeyboard) return;

      const { key } = e;

      if (adjustingGlow) {
        if (key === "ArrowRight") {
          setGlowIntensity((prev) => Math.min(prev + 0.1, 1));
        } else if (key === "ArrowLeft") {
          setGlowIntensity((prev) => Math.max(prev - 0.1, 0));
        } else if (key === "Escape") {
          setAdjustingGlow(false);
        }
      } else if (adjustingTheme) {
        if (key === "ArrowRight") {
          setHue((prev) => (prev + 10) % 360);
          const [r, g, b] = hslToRgb((hue + 10) % 360, 100, 50);
          setThemeColor(`${r}, ${g}, ${b}`);
        } else if (key === "ArrowLeft") {
          setHue((prev) => (prev - 10 + 360) % 360);
          const [r, g, b] = hslToRgb((hue - 10 + 360) % 360, 100, 50);
          setThemeColor(`${r}, ${g}, ${b}`);
        } else if (key === "Escape") {
          setAdjustingTheme(false);
        }
      } else {
        if (key === "Enter") {
          handleCommand(command.trim().toLowerCase());
          setCommandHistory((prev) => [...prev, command.trim().toLowerCase()]);
          setHistoryIndex(-1);
          setCommand("");
          setSuggestions([]);
        } else if (key === "Backspace") {
          updateCommand(command.slice(0, -1));
        } else if (key === "ArrowUp") {
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex]);
          } else if (historyIndex === -1 && commandHistory.length > 0) {
            setHistoryIndex(commandHistory.length - 1);
            setCommand(commandHistory[commandHistory.length - 1]);
          }
        } else if (key === "ArrowDown") {
          if (historyIndex >= 0 && historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex]);
          } else if (historyIndex === commandHistory.length - 1) {
            setHistoryIndex(-1);
            setCommand("");
          }
        } else if (key.length === 1) {
          updateCommand(command + key);
        } else if (key === "Tab") {
          e.preventDefault();
          if (suggestions.length > 0) {
            setCommand(suggestions[0]);
            setSuggestions([]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    command,
    suggestions,
    loading,
    historyIndex,
    commandHistory,
    adjustingGlow,
    adjustingTheme,
    hue,
    showMobileKeyboard, // Include in dependency array
  ]);

  const updateCommand = (newCommand: string) => {
    setCommand(newCommand);
    setSuggestions(
      availableCommands.filter((cmd) =>
        cmd.startsWith(newCommand.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (endOfOutputRef.current) {
      endOfOutputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output, command]);

  const handleCommand = (cmd: string) => {
    if (cmd === "glow") {
      setAdjustingGlow(true);
      setOutput((prev) => [
        ...prev,
        {
          commandText: `> ${cmd}`,
          responseText:
            'Use left/right arrow keys to adjust glow intensity. Press "Escape" to exit.',
        },
      ]);
    } else if (cmd === "theme") {
      setAdjustingTheme(true);
      setOutput((prev) => [
        ...prev,
        {
          commandText: `> ${cmd}`,
          responseText:
            'Use left/right arrow keys to adjust theme color. Press "Escape" to exit.',
        },
      ]);
    } else if (cmd === "history") {
      setOutput((prev) => [
        ...prev,
        {
          commandText: `> ${cmd}`,
          responseText: (
            <div>
              {commandHistory.map((historyCmd, index) => (
                <p key={index}>{historyCmd}</p>
              ))}
            </div>
          ),
        },
      ]);
    } else {
      const responseText = getCommandResponse(cmd);
      if (responseText) {
        setOutput((prev) => [
          ...prev,
          { commandText: `> ${cmd}`, responseText },
        ]);
      }
    }
  };

  const getCommandResponse = (cmd: string): string | React.ReactNode => {
    switch (cmd) {
      case "help":
        return 'Available commands: "help", "about", "contact", "clear", "joke", "motivate", "theme", "timeline", "glow", "history"';
      case "about":
        return "I'm a frontend developer, diggin' tech with a couple of years under my belt. I'm really into clean, modern UIs, but I'm always up for some experimentation like with this far-out portfolio. I'm self-taught and currently grooving with Next.js & TypeScript and other cool libraries. Wanna know more? Hit me up!";
      case "contact":
        return "You can reach me at stawicki.k02@gmail.com or groove with me on LinkedIn: www.linkedin.com/in/kacper-stawicki-0541512a9";
      case "clear":
        setOutput([]);
        return "";
      case "joke":
        return handleAsyncResponse(
          () => jokes[Math.floor(Math.random() * jokes.length)]
        );
      case "motivate":
        return handleAsyncResponse(
          () => motivations[Math.floor(Math.random() * motivations.length)]
        );
      case "timeline":
        return (
          <Timeline>
            {timelineEvents.map((event, index) => (
              <li key={index}>
                <TimelineDate>{event.year}</TimelineDate>:{" "}
                <Typewriter
                  words={[event.description]}
                  loop={1}
                  typeSpeed={10}
                  deleteSpeed={50}
                />
              </li>
            ))}
          </Timeline>
        );
      case "history":
        return commandHistory.join("\n");
      case "easteregg":
        return "Far out! You found the Easter Egg! Here's a secret: The best way to predict the future is to invent it, dig?";
      default:
        return `Command not found: ${cmd}`;
    }
  };

  const handleAsyncResponse = (getResponse: () => string) => {
    setLoading(true);
    setTimeout(() => {
      const responseText = getResponse();
      setLoading(false);
      setOutput((prev) => [
        ...prev,
        { commandText: `> ${command}`, responseText },
      ]);
    }, 1500);
    return "";
  };

  return (
    <CRTScreen $themeColor={themeColor} $glowIntensity={glowIntensity}>
      <CRTContainer $themeColor={themeColor} $glowIntensity={glowIntensity}>
        <CRTContent>
          <ASCIIArt $themeColor={themeColor} $glowIntensity={glowIntensity}>
            {`
            _ _         _____ _                     _ 
  /\\  /\\___| | | ___   /__   \\ |__   ___ _ __ ___  / \\
 / /_/ / _ \\ | |/ _ \\    / /\\/ '_ \\ / _ \\ '__/ _ \\/  /
/ __  /  __/ | | (_) |  / /  | | | |  __/ | |  __/\\_/ 
\\/ /_/ \\___|_|_|\\___/   \\/   |_| |_|\\___|_|  \\___\\/   
                                                      
`}
          </ASCIIArt>
          <p>
            <Typewriter
              words={[
                'Type "help" for a list of commands. Use "Tab" to autocomplete commands. For best experience use Desktop Firefox.',
              ]}
              loop={1}
              typeSpeed={10}
              deleteSpeed={50}
            />
          </p>
          {output.map((line, index) => (
            <div key={index}>
              <p>{line.commandText}</p>
              {typeof line.responseText === "string" ? (
                <p>
                  <Typewriter
                    words={[line.responseText]}
                    loop={1}
                    typeSpeed={10}
                    deleteSpeed={50}
                  />
                </p>
              ) : (
                line.responseText
              )}
            </div>
          ))}
          {loading && (
            <LoadingIndicator
              $themeColor={themeColor}
              $glowIntensity={glowIntensity}
            >
              Thinking...
            </LoadingIndicator>
          )}
          {!loading && !adjustingGlow && !adjustingTheme && (
            <p>
              {"> "} {command}
              <TypingCursor
                $themeColor={themeColor}
                $glowIntensity={glowIntensity}
              />
            </p>
          )}
          {!loading && adjustingGlow && (
            <p>
              Glow Intensity:
              {Array(Math.round(glowIntensity * 10))
                .fill("█")
                .join("")}
              <TypingCursor
                $themeColor={themeColor}
                $glowIntensity={glowIntensity}
              />
            </p>
          )}
          {!loading && adjustingTheme && (
            <p>
              Theme Color:
              {Array(10)
                .fill("█")
                .map((block, index) => (
                  <span
                    key={index}
                    style={{
                      color: `hsl(${(hue + index * 36) % 360}, 100%, 50%)`,
                    }}
                  >
                    {block}
                  </span>
                ))}
              <TypingCursor
                $themeColor={`hsl(${hue}, 100%, 50%)`}
                $glowIntensity={glowIntensity}
              />
            </p>
          )}
          {suggestions.length > 0 && !loading && (
            <Suggestions
              $themeColor={themeColor}
              $glowIntensity={glowIntensity}
            >
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </Suggestions>
          )}
          <MobileKeyboardButton
            $themeColor={themeColor}
            $glowIntensity={glowIntensity}
            onClick={() => setShowMobileKeyboard(!showMobileKeyboard)}
          >
            {showMobileKeyboard ? <KeyboardOff /> : <Keyboard />}
          </MobileKeyboardButton>
          {showMobileKeyboard && (
            <MobileKeyboard
              $themeColor={themeColor}
              $glowIntensity={glowIntensity}
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                const { key } = e;
                if (key === "Enter") {
                  handleCommand(command.trim().toLowerCase());
                  setCommandHistory((prev) => [
                    ...prev,
                    command.trim().toLowerCase(),
                  ]);
                  setHistoryIndex(-1);
                  setCommand("");
                  setSuggestions([]);
                  setTimeout(() => {
                    setShowMobileKeyboard(false);
                  }, 100);
                }
              }}
            />
          )}
          <div ref={endOfOutputRef} />
        </CRTContent>
      </CRTContainer>
      <CRTEffectCanvas ref={crtCanvasRef} />
    </CRTScreen>
  );
}
