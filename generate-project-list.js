const fs = require("fs");
const path = require("path");

const START_TAG = "<!-- PROJECT-LIST-START -->";
const END_TAG = "<!-- PROJECT-LIST-END -->";
const INDEX_FILE = path.join(__dirname, "index.html");

// Gather project folders
const projectDirs = fs
  .readdirSync(__dirname, { withFileTypes: true })
  .filter(
    (dirent) =>
      dirent.isDirectory() &&
      /^\d{2}-/.test(dirent.name) &&
      fs.existsSync(path.join(__dirname, dirent.name, "index.html"))
  )
  .map((dirent) => ({
    folder: dirent.name,
    number: parseInt(dirent.name.split("-")[0], 10),
    title: dirent.name
      .split("-")
      .slice(1)
      .join(" ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
  }))
  .sort((a, b) => a.number - b.number);

const projectCount = projectDirs.length;

// Read index.html
let indexHtml = fs.readFileSync(INDEX_FILE, "utf-8");

// Find indentation for project list
const startMatch = indexHtml.match(new RegExp(`^(\\s*)${START_TAG}`, "m"));
const endIndex = indexHtml.indexOf(END_TAG);

if (!startMatch || endIndex === -1) {
  console.error(
    "❌ Could not find PROJECT-LIST-START or PROJECT-LIST-END in index.html."
  );
  process.exit(1);
}

const indent = startMatch[1];

// Generate project list HTML with correct indent
const projectListHtml =
  indent +
  "<ul>" +
  projectDirs
    .map(
      (p) =>
        `${indent}  <li><a href="${p.folder}/index.html">Project ${String(
          p.number
        ).padStart(2, "0")}: ${p.title}</a></li>`
    )
    .join("") +
  "" +
  indent +
  "</ul>";

// Replace list in file
const fullPattern = new RegExp(`${START_TAG}[\\s\\S]*?${END_TAG}`, "g");
const replacement = `${START_TAG}${projectListHtml}${indent}${END_TAG}`;
indexHtml = indexHtml.replace(fullPattern, replacement);

// Replace <h1> with project count info
indexHtml = indexHtml.replace(
  /<h1>.*?<\/h1>/s,
  `<h1>My <span class="count">${projectCount}</span> Projects</h1>`
);

// Save the updated file
fs.writeFileSync(INDEX_FILE, indexHtml);
console.log(`✅ index.html updated with ${projectCount} projects.`);
