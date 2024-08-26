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
import { Typewriter } from "react-simple-typewriter";
import { OutputLine } from "@/types";
import { hslToRgb } from "@/utils";
import { useScanlinesEffect } from "@/scanlines";
import { Keyboard, KeyboardOff } from "lucide-react";
import {
  AVAILABLE_COMMANDS,
  COMMAND_RESPONSES,
  JOKES,
  MOTIVATIONS,
  TIMELINE_EVENTS,
} from "@/constants";

export default function Terminal() {
  // State variables to manage command, output, theme color, etc.
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
  const [enableFlicker, setEnableFlicker] = useState<boolean>(false);

  // Refs to store references to DOM elements
  const crtCanvasRef = useRef<HTMLCanvasElement>(null);
  const endOfOutputRef = useRef<HTMLDivElement>(null);

  // Apply scanlines effect to the CRT canvas
  useScanlinesEffect(crtCanvasRef, themeColor);

  // Effect to handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading || showMobileKeyboard) return;

      const { key } = e;

      // Handle glow adjustment mode
      if (adjustingGlow) {
        if (key === "ArrowRight") {
          setGlowIntensity((prev) => Math.min(prev + 0.1, 1));
        } else if (key === "ArrowLeft") {
          setGlowIntensity((prev) => Math.max(prev - 0.1, 0));
        } else if (key === "Escape") {
          setAdjustingGlow(false);
        }
        // Handle theme adjustment mode
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
        // Handle general key presses
        if (key === "Enter") {
          handleCommand(command.trim().toLowerCase());
          setCommandHistory((prev) => [...prev, command.trim().toLowerCase()]);
          setHistoryIndex(-1);
          setCommand("");
          setSuggestions([]);
        } else if (key === "Backspace") {
          updateCommand(command.slice(0, -1));
        } else if (key === "ArrowUp") {
          // Navigate command history with ArrowUp
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex]);
          } else if (historyIndex === -1 && commandHistory.length > 0) {
            setHistoryIndex(commandHistory.length - 1);
            setCommand(commandHistory[commandHistory.length - 1]);
          }
        } else if (key === "ArrowDown") {
          // Navigate command history with ArrowDown
          if (historyIndex >= 0 && historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex]);
          } else if (historyIndex === commandHistory.length - 1) {
            setHistoryIndex(-1);
            setCommand("");
          }
        } else if (key.length === 1) {
          // Handle character input
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

    // Add event listener for keydown events
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Cleanup event listener on component unmount
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
    showMobileKeyboard,
  ]);

  // Function to update the command state and suggestions
  const updateCommand = (newCommand: string) => {
    setCommand(newCommand);
    setSuggestions(
      AVAILABLE_COMMANDS.filter((cmd) =>
        cmd.startsWith(newCommand.toLowerCase())
      )
    );
  };

  // Scroll to the end of output when the output or command changes
  useEffect(() => {
    if (endOfOutputRef.current) {
      endOfOutputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output, command]);

  // Function to handle command execution
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
    } else if (cmd === "flicker") {
      setEnableFlicker(!enableFlicker);
      setOutput((prev) => [
        ...prev,
        {
          commandText: `> ${cmd}`,
          responseText: enableFlicker
            ? "Disabled CRT flickering effect."
            : "Enabled CRT flickering effect.",
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

  // Function to get the response for a specific command
  const getCommandResponse = (cmd: string): string | React.ReactNode => {
    switch (cmd) {
      case "help":
        return COMMAND_RESPONSES.help;
      case "about":
        return COMMAND_RESPONSES.about;
      case "contact":
        return COMMAND_RESPONSES.contact;
      case "clear":
        setOutput([]);
        return "";
      case "joke":
        return handleAsyncResponse(
          () => JOKES[Math.floor(Math.random() * JOKES.length)]
        );
      case "motivate":
        return handleAsyncResponse(
          () => MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]
        );
      case "timeline":
        return (
          <Timeline>
            {TIMELINE_EVENTS.map((event, index) => (
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
        return COMMAND_RESPONSES.easteregg;
      default:
        return COMMAND_RESPONSES.default(cmd);
    }
  };

  // Function to handle asynchronous command responses like jokes and motivations
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

  // Render the terminal UI
  return (
    <CRTScreen
      $themeColor={themeColor}
      $glowIntensity={glowIntensity}
      $enableFlicker={enableFlicker}
    >
      <CRTContainer
        $themeColor={themeColor}
        $glowIntensity={glowIntensity}
        $enableFlicker={enableFlicker}
      >
        <CRTContent>
          {/* ASCII art and initial command hints */}
          <ASCIIArt
            $themeColor={themeColor}
            $glowIntensity={glowIntensity}
            $enableFlicker={enableFlicker}
          >
            {`
            _ _         _____ _                     _ 
  /\\  /\\___| | | ___   /__   \\ |__   ___ _ __ ___  / \\
 / /_/ / _ \\ | |/ _ \\    / /\\/ '_ \\ / _ \\ '__/ _ \\/  /
/ __  /  __/ | | (_) |  / /  | | | |  __/ | |  __/\\_/ 
\\/ /_/ \\___|_|_|\\___/   \\/   |_| |_|\\___|_|  \\___\\/   
                                                      
`}
          </ASCIIArt>
          <p className="flex flex-col">
            <Typewriter
              words={[`"help" - All commands`]}
              loop={1}
              typeSpeed={10}
              deleteSpeed={10}
            />
            <Typewriter
              words={[`"Tab" - Autocomplete commands`]}
              loop={1}
              typeSpeed={10}
              deleteSpeed={10}
            />
            <Typewriter
              words={[`"Up/Down" - Scroll through command history`]}
              loop={1}
              typeSpeed={10}
              deleteSpeed={10}
            />
            <Typewriter
              words={[`For the best experience, use Desktop Firefox.`]}
              loop={1}
              typeSpeed={10}
              deleteSpeed={10}
            />
          </p>

          {/* Render output lines */}
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

          {/* Loading indicator */}
          {loading && (
            <LoadingIndicator
              $themeColor={themeColor}
              $glowIntensity={glowIntensity}
              $enableFlicker={enableFlicker}
            >
              Thinking...
            </LoadingIndicator>
          )}

          {/* Render command input with typing cursor */}
          {!loading && !adjustingGlow && !adjustingTheme && (
            <p>
              {"> "} {command}
              <TypingCursor
                $themeColor={themeColor}
                $glowIntensity={glowIntensity}
                $enableFlicker={enableFlicker}
              />
            </p>
          )}

          {/* Render glow adjustment UI */}
          {!loading && adjustingGlow && (
            <p>
              Glow Intensity:
              {Array(Math.round(glowIntensity * 10))
                .fill("█")
                .join("")}
              <TypingCursor
                $themeColor={themeColor}
                $glowIntensity={glowIntensity}
                $enableFlicker={enableFlicker}
              />
            </p>
          )}

          {/* Render theme color adjustment UI */}
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
                $enableFlicker={enableFlicker}
              />
            </p>
          )}

          {/* Render command suggestions */}
          {suggestions.length > 0 && !loading && (
            <Suggestions
              $themeColor={themeColor}
              $glowIntensity={glowIntensity}
              $enableFlicker={enableFlicker}
            >
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </Suggestions>
          )}

          {/* Render mobile keyboard button */}
          <MobileKeyboardButton
            $themeColor={themeColor}
            $glowIntensity={glowIntensity}
            $enableFlicker={enableFlicker}
            onClick={() => setShowMobileKeyboard(!showMobileKeyboard)}
          >
            {showMobileKeyboard ? <KeyboardOff /> : <Keyboard />}
          </MobileKeyboardButton>

          {/* Render mobile keyboard input */}
          {showMobileKeyboard && (
            <MobileKeyboard
              $themeColor={themeColor}
              $glowIntensity={glowIntensity}
              $enableFlicker={enableFlicker}
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

          {/* Placeholder to scroll to the bottom of the output */}
          <div ref={endOfOutputRef} />
        </CRTContent>
      </CRTContainer>

      {/* CRT effect canvas */}
      <CRTEffectCanvas ref={crtCanvasRef} />
    </CRTScreen>
  );
}
