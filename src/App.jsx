


import React, { useState, useEffect , useRef} from 'react';

import { TypeAnimation } from 'react-type-animation';

function App() {
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef(null);
  const [historyIndex, setHistoryIndex] = useState(null);
  const inputRef = React.useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commandHistory]);


 
  const availableCommands = [
    { name: 'help', desc: 'Show this help message' },
    { name: 'about', desc: 'Learn about me' },
    { name: 'skills', desc: 'View my technical skills' },
    { name: 'projects', desc: 'List my projects' },
    { name: 'education', desc: 'View my education' },
    { name: 'experience', desc: 'View my work experience' },
    { name: 'clear', desc: 'Clear the terminal' }
  ];
  
  

  const projects = [
    {
      title: "Simple Keylogger",
      description: "A basic keylogger program in Python that records and logs keystrokes. Created for educational purposes to understand keylogging mechanics.",
      tech: ["Python", "System Programming"],
      link: "https://github.com/xyntha0/simple-keylogger"
    },
    {
      title: "Art Of Code",
      description: "Python tool that converts images into ASCII art, saving results as PNG and plain text. Compatible with terminal displays and text editors.",
      tech: ["Python", "Image Processing"],
      link: "https://github.com/xyntha0/art-of-code"
    },
    {
      title: "Ethical Hacking With Scripts",
      description: "Collection of automation scripts for penetration testing and vulnerability assessment.",
      tech: ["Python", "Bash", "Security Tools"],
      link: "https://github.com/xyntha0/hacking-scripts"
    },
    {
      title: "Bash Commons",
      description: "Reusable Bash functions for common tasks including logging, assertions, and string manipulation.",
      tech: ["Bash", "Testing"],
      link: "https://github.com/xyntha0/bash-commons"
    },
    {
      title: "Toolkit-By-Cpp",
      description: "Security toolkit including login, cipher, and hash functions implemented in C++.",
      tech: ["C++", "Cryptography"],
      link: "https://github.com/xyntha0/toolkit-by-cpp"
    }
  ];

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    let output = '';

    switch(command) {
      case 'help':
        output = `
Available commands:
  about        - Learn about me
  skills       - View my technical skills
  projects     - List my projects
  education    - View my education
  experience   - View my work experience
  clear        - Clear the terminal
  help         - Show this help message
`;
        break;
      case 'about':
        output = `
About Ilyas Mouhssin:
--------------------
Based in Rabat, MA | LinkedIn: Ilyas Mouhssin | Github: xyntha0

I'm a passionate cybersecurity enthusiast and developer specializing in computer science and offensive security. 
My journey with Hack The Box has deepened my expertise in advanced penetration testing and Red Teaming. 
I specialize in Python, C, and C++, using them to craft secure, scalable, and efficient solutions.

Always eager to learn, adapt, and push the boundaries of cybersecurity.
`;
        break;
      case 'skills':
        output = `
Technical Skills:
---------------
• Security Analysis & Testing
  - Penetration Testing
  - Vulnerability Assessment
  - Red Team Operations
  - Memory Manipulation

• Programming Languages
  - Python
  - C/C++
  - Bash Scripting

• Security Tools
  - SIEM Tools
  - IDS/IPS
  - Firewall Management
`;
        break;
      case 'projects':
        output = projects.map(project => `
${project.title}
${'-'.repeat(project.title.length)}
${project.description}
Tech: ${project.tech.join(', ')}
Repo: ${project.link}
`).join('\n');
        break;
      case 'education':
        output = `
Education:
---------
2022 - 2024 | Computer Science and Engineering
Mohammed VI Polytechnic University (UM6P)

Focus Areas:
• Cybersecurity & Ethical Hacking
• System Architecture
• Data Structures & Algorithms
• Computer Networks & Cloud Computing

Professional Certificate in Cybersecurity (In Progress)
Google / Coursera / UM6P / Morocco Digital Academy

42 School – Benguerir | 42 Network
• Systems programming, network fundamentals, and peer-based learning
• Projects in C, shell scripting, and system security
`;
        break;
      case 'experience':
        output = `
Professional Experience:
----------------------
Security Analyst Intern | CyberShield Solutions (Remote)
Jan 2025 – Mar 2025
- Conducted vulnerability assessments using Nmap and Wireshark
- Assisted in compliance auditing and mitigation planning

Cybersecurity Assistant | AtlasTech IT Services, Rabat
Sep 2024 – Dec 2024
- Monitored networks with SIEM tools
- Helped implement MFA and endpoint security

IT Support Technician | Freelance
2023 – 2024
- Diagnosed and resolved user-level security issues
- Implemented antivirus and access control solutions
`;
        break;
      case 'clear':
        setCommandHistory([]);
        return;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setCommandHistory([...commandHistory, { command: cmd, output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <TypeAnimation
            sequence={[
              'Welcome to Ilyas Mouhssin\'s Portfolio Terminal\nType "help" for available commands.',
              1000
            ]}
            wrapper="div"
            cursor={true}
            repeat={0}
            className="text-xl"
          />
        </div>
        
        <div className="space-y-2">
          {commandHistory.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center">
                <span className="text-blue-500">guest@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-purple-500">{currentDirectory}</span>
                <span className="text-white">$ </span>
                <span className="ml-1">{item.command}</span>
              </div>
              <pre className="whitespace-pre-wrap">{item.output}</pre>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex items-center">
          <span className="text-blue-500">guest@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-purple-500">{currentDirectory}</span>
          <span className="text-white">$ </span>
          <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              if (commandHistory.length > 0) {
                const newIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(historyIndex - 1, 0);
                const previousCmd = commandHistory[newIndex].command;
                setInputValue(previousCmd);
                setHistoryIndex(newIndex);
          
                // Wait for value to update, then move cursor to the end
                setTimeout(() => {
                  inputRef.current?.focus();
                  inputRef.current?.setSelectionRange(previousCmd.length, previousCmd.length);
                }, 0);
              }
            } else if (e.key === 'ArrowDown') {
              if (historyIndex !== null) {
                const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                const nextCmd = commandHistory[newIndex]?.command || '';
                setInputValue(nextCmd);
                setHistoryIndex(newIndex === commandHistory.length - 1 ? null : newIndex);
          
                setTimeout(() => {
                  inputRef.current?.focus();
                  inputRef.current?.setSelectionRange(nextCmd.length, nextCmd.length);
                }, 0);
              }
            } else if (e.key === 'Tab') {
              e.preventDefault(); // prevent default tabbing

              const input = inputValue.toLowerCase().trim();
              const matches = availableCommands.filter(cmd =>
                cmd.name.startsWith(input)
              );
          
              if (matches.length === 1) {
                // Auto-complete to the full command
                setInputValue(matches[0].name);
              } else if (matches.length > 1) {
                const output = matches.map(cmd => `${cmd.name.padEnd(12)} - ${cmd.desc}`).join('\n');
                setCommandHistory([...commandHistory, { command: inputValue, output }]);
              }
            } else {
              setHistoryIndex(null);
            }
          }}
          className="flex-1 ml-1 bg-transparent outline-none border-none"
          autoFocus
        />
        </form>
      </div>
    </div>
  );
}

export default App;

