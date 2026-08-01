const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projects.js');
let content = fs.readFileSync(filePath, 'utf8');

// Update stacks to React/Web
content = content.replace(/name: "CrochetHub",([\s\S]*?)stack: \["Flutter", "Firebase", "Dart"\],/, 'name: "CrochetHub",$1stack: ["React", "Firebase", "TypeScript"],');
content = content.replace(/name: "Minnie Miss",([\s\S]*?)stack: \["Flutter", "Firebase", "Dart"\],/, 'name: "Minnie Miss",$1stack: ["React", "Firebase", "TypeScript"],');
content = content.replace(/name: "Remember To-Do",([\s\S]*?)stack: \["Flutter", "Dart", "Hive", "Provider"\],/, 'name: "Remember To-Do",$1stack: ["React", "TypeScript", "Tailwind CSS"],');
content = content.replace(/name: "RideCare Access Now",([\s\S]*?)stack: \["Flutter", "Dart", "Firebase", "Google Maps SDK"\],/, 'name: "RideCare Access Now",$1stack: ["React", "TypeScript", "Firebase", "Google Maps SDK"],');
content = content.replace(/name: "Onyx",([\s\S]*?)stack: \["Flutter", "Dart"\],/, 'name: "Onyx",$1stack: ["React", "TypeScript", "Tailwind CSS"],');
content = content.replace(/name: "iTax Harmony Hub",([\s\S]*?)stack: \["Flutter", "Dart", "Framer Motion", "Material 3"\],/, 'name: "iTax Harmony Hub",$1stack: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],');

// Define Pickd
const pickdProject = `  {
    id: "pickd",
    number: "00",
    name: "Pickd",
    logo: null,
    tagline: "A modern, intelligent job matching and tracking assistant",
    problem: "The job search process is fragmented across multiple platforms, spreadsheets, and emails. Candidates struggle to track applications, follow up at the right time, and manage interview schedules without losing context.",
    solution: "Developed Pickd to unify the job search experience. It acts as an intelligent assistant that tracks applications, parsing job descriptions to match candidate skills, and providing a clean dashboard for managing the entire hiring pipeline.",
    stack: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    features: [
      "Application tracking pipeline: visualize where you stand with every company",
      "Intelligent skill matching: compares your resume against job descriptions",
      "Automated follow-up reminders: never miss an opportunity to reconnect",
      "Clean, distraction-free UI: focuses entirely on the tasks that move the needle"
    ],
    github: "https://github.com/J-Derek/pickd",
    live: null,
    screenshot: null,
    color: "#ff3366",
    status: "Shipped · 2025"
  },`;

// Insert Pickd at the top of the array
content = content.replace('export const projects = [', 'export const projects = [\n' + pickdProject);

// Renumber projects
let counter = 1;
content = content.replace(/number: "\\d{2}",/g, (match) => {
  const numStr = counter < 10 ? "0" + counter : "" + counter;
  counter++;
  return 'number: "' + numStr + '",';
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated projects.js');
