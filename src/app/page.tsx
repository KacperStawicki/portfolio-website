"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
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

export default function Terminal() {
  const [command, setCommand] = useState<string>("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<string>("255, 184, 0"); // Default to Amber (in RGB)
  const [hue, setHue] = useState<number>(40); // Starting hue value corresponding to Amber
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [glowIntensity, setGlowIntensity] = useState<number>(1); // Default glow intensity
  const [adjustingGlow, setAdjustingGlow] = useState<boolean>(false);
  const [adjustingTheme, setAdjustingTheme] = useState<boolean>(false);
  const crtCanvasRef = useRef<HTMLCanvasElement>(null);
  const endOfOutputRef = useRef<HTMLDivElement>(null);

  useScanlinesEffect(crtCanvasRef, themeColor);

  /////////////////////////////////////////////////////////////////////////////////////////////// TYPING FUNCTION

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading) return; // Prevent typing when loading

      const { key } = e;

      if (adjustingGlow) {
        if (key === "ArrowRight") {
          setGlowIntensity((prev) => Math.min(prev + 0.1, 1)); // Increase glow, max 1
        } else if (key === "ArrowLeft") {
          setGlowIntensity((prev) => Math.max(prev - 0.1, 0)); // Decrease glow, min 0
        } else if (key === "Escape") {
          setAdjustingGlow(false); // Exit glow adjustment mode
        }
      } else if (adjustingTheme) {
        if (key === "ArrowRight") {
          setHue((prev) => (prev + 10) % 360); // Increase hue and wrap around at 360
          const [r, g, b] = hslToRgb((hue + 10) % 360, 100, 50);
          setThemeColor(`${r}, ${g}, ${b}`); // Live update theme color in RGB format
        } else if (key === "ArrowLeft") {
          setHue((prev) => (prev - 10 + 360) % 360); // Decrease hue and wrap around at 0
          const [r, g, b] = hslToRgb((hue - 10 + 360) % 360, 100, 50);
          setThemeColor(`${r}, ${g}, ${b}`); // Live update theme color in RGB format
        } else if (key === "Escape") {
          setAdjustingTheme(false); // Exit theme adjustment mode
        }
      } else {
        if (key === "Enter") {
          handleCommand(command.trim().toLowerCase());
          setCommandHistory((prev) => [...prev, command.trim().toLowerCase()]);
          setHistoryIndex(-1); // Reset the history index after each command
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
            // Start navigating through history
            setHistoryIndex(commandHistory.length - 1);
            setCommand(commandHistory[commandHistory.length - 1]);
          }
        } else if (key === "ArrowDown") {
          if (historyIndex >= 0 && historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex]);
          } else if (historyIndex === commandHistory.length - 1) {
            // If at the end of history, reset to empty command
            setHistoryIndex(-1);
            setCommand("");
          }
        } else if (key.length === 1) {
          updateCommand(command + key);
        } else if (key === "Tab") {
          e.preventDefault(); // Prevent default tab behavior
          if (suggestions.length > 0) {
            setCommand(suggestions[0]); // Auto-complete with the first suggestion
            setSuggestions([]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    command,
    suggestions,
    loading,
    historyIndex,
    commandHistory,
    adjustingGlow,
    adjustingTheme,
    hue,
  ]);

  const updateCommand = (newCommand: string) => {
    setCommand(newCommand);
    setSuggestions(
      availableCommands.filter((cmd) =>
        cmd.startsWith(newCommand.toLowerCase())
      )
    );
  };

  /////////////////////////////////////////////////////////////////////////////////////////////// COMMANDS & SCROLLING

  useEffect(() => {
    // Scroll to the bottom whenever the output or command changes
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
      // Handle the history command
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
    return ""; // Return empty string to prevent immediate output
  };

  /////////////////////////////////////////////////////////////////////////////////////////////// MAIN RETURN

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
                'Type "help" for a list of commands. Use "Tab" to autocomplete commands. For best experience use Firefox.',
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
                line.responseText // Directly render JSX
              )}
            </div>
          ))}
          {loading && (
            <>
              <LoadingIndicator
                $themeColor={themeColor}
                $glowIntensity={glowIntensity}
              >
                Thinking...
              </LoadingIndicator>
            </>
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
          <div ref={endOfOutputRef} /> {/* Dummy element to scroll to */}
        </CRTContent>
      </CRTContainer>
      <CRTEffectCanvas ref={crtCanvasRef} />
    </CRTScreen>
  );
}
