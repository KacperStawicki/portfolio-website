export const TIMELINE_EVENTS = [
  {
    year: 2016,
    description:
      "Dipped my toes into programming, wrestling with C++ on my own - it was a groovy time.",
  },
  {
    year: 2020,
    description:
      "The web development bug bit me during high school classes - and man, did I catch it!",
  },
  {
    year: 2022,
    description:
      "Landed my first gig as a junior frontend developer - far out!",
  },
  {
    year: 2024,
    description:
      "Digging deeper into frontend wizardry, but also jamming on AI, backend, game development, and more - it's been a wild ride!",
  },
];

export const JOKES = [
  "Why do programmers prefer dark mode? Because it's outta sight, man!",
  "How many programmers does it take to change a light bulb? None, man, that's a hardware gig.",
  "Why do Java developers wear glasses? 'Cause they can't C#, daddy-o.",
  "Why don't programmers like nature? Too many bugs, man!",
  "Why was the JavaScript developer sad? Because they didn’t know how to 'null' their feelings.",
  "What's a programmer's favorite place to hang out? The Foo Bar, daddy-o!",
  "Why did the developer go broke? Because they used up all their cache!",
  "How do you comfort a JavaScript bug? You console it, man.",
  "Why did the computer cross the road? To fetch the data on the other side, cool cat!",
  "Why do Python programmers love the outdoors? Because they love the path of least resistance.",
  "How do developers stay cool? They keep their code well-ventilated, dig?",
];

export const MOTIVATIONS = [
  "Keep on truckin'! Every bug you squash is one more step on your journey.",
  "Success isn't where it's at; happiness is the real trip, man.",
  "Stay cool, keep learning. The sky ain't the limit, dig?",
  "Every far-out developer got there by tackling problems they weren't ready for until they made it happen.",
  "Code like the wind, fast and free. Errors are just another groove in the learning jam.",
  "The code you write today will echo in the halls of tech tomorrow—make it sing, man!",
  "In the dance of code, every misstep is a chance to learn a new move, dig?",
  "A bug is just a puzzle waiting for your cool solutions, keep grooving!",
  "Don't just code, create! You're building the future, one line at a time.",
  "Keep jamming with your code, man. Even the greatest tunes had a few wrong notes at first.",
  "Every challenge you face is just another riff in your developer's journey, keep playing!",
  "Stay curious, stay cool. The best developers are always learning, always evolving.",
];

export const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "contact",
  "clear",
  "joke",
  "motivate",
  "theme",
  "timeline",
  "glow",
  "history",
  "flicker",
];

export const COMMAND_RESPONSES = {
  help: `Available commands: ${AVAILABLE_COMMANDS.join(", ")}`,
  about:
    "Hi! I’m a self-made front-end developer with a couple of years under my belt. I’ve been tinkering mainly with Next.js and TypeScript, while dabbling in all sorts of libraries. But hey, I’m always open to new technologies—I’ve got a real itch for learning the latest and greatest in the tech world. I’m a bit of a lone wolf when it comes to problem-solving, always up for a challenge that pushes my limits. But don’t get me wrong, I’m a friendly sort, and I get along just fine working in a team. My goal? To create top-notch experiences for both my colleagues and the folks who use my apps. When I’m not glued to a screen, you’ll find me brewing a perfect cup of tea or wandering through the woods, soaking in the sights and sounds of nature. At home, I’m knee-deep in all things tech—whether it’s fixing up old consoles, diving into video games, or just hacking away at a new project. If you’re curious to know more, don’t be shy! Drop me a line on LinkedIn or send over an email! Just type the contact command, and I’ll walk you through the rest.",
  contact:
    "You can reach me at stawicki.k02@gmail.com or groove with me on LinkedIn: www.linkedin.com/in/kacper-stawicki-0541512a9",
  easteregg:
    "Far out! You found the Easter Egg! Here's a secret: The best way to predict the future is to invent it, dig?",
  default: (cmd: string) => `Command not found: ${cmd}`,
};
