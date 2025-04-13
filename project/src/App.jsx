import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

function App() {
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const projects = [
    {
      title: "Simple Keylogger",
      description: "A basic keylogger program in Python that records and logs keystrokes. Created for educational purposes to understand keylogging mechanics.",
      tech: ["Python", "System Programming"]
    },
    {
      title: "Art Of Code",
      description: "Python tool that converts images into ASCII art, saving results as PNG and plain text. Compatible with terminal displays and text editors.",
      tech: ["Python", "Image Processing"]
    },
    {
      title: "Ethical Hacking With Scripts",
      description: "Collection of automation scripts for penetration testing and vulnerability assessment.",
      tech: ["Python", "Bash", "Security Tools"]
    },
    {
      title: "Bash Commons",
      description: "Reusable Bash functions for common tasks including logging, assertions, and string manipulation.",
      tech: ["Bash", "Testing"]
    },
    {
      title: "Toolkit-By-Cpp",
      description: "Security toolkit including login, cipher, and hash functions implemented in C++.",
      tech: ["C++", "Cryptography"]
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
• Software Development & System Architecture
• Data Structures & Algorithms
• AI & Machine Learning
• Computer Networks & Cloud Computing
`;
        break;
      case 'experience':
        output = `
Professional Experience:
----------------------
Cybersecurity Engineer | Red Team Specialist
June 2023 - Present

• Conducted penetration testing and vulnerability assessments
• Developed automation scripts for ethical hacking
• Participated in CTF challenges
• Researched memory manipulation techniques
• Assisted in incident response and forensic investigations
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
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex items-center">
          <span className="text-blue-500">guest@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-purple-500">{currentDirectory}</span>
          <span className="text-white">$ </span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 ml-1 bg-transparent outline-none border-none"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}

export default App;