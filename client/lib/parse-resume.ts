import * as pdfjs from "pdfjs-dist";

// Use a more reliable CDN for the worker and ensure the version matches
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * OpenResume-inspired parsing logic.
 * The core idea is:
 * 1. Read PDF text items.
 * 2. Group them by line.
 * 3. Use scoring and heuristics to find Name, Email, Skills, Experience.
 */

export interface ParsedResume {
  name: string;
  email: string;
  skills: string[];
  experience: number;
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const EXPERIENCE_REGEX = /(\d+)\s*(?:\+)?\s*years/i;
const SKILLS_LIST = [
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "SQL",
  "Machine Learning",
  "Data Analysis",
  "Project Management",
  "Communication",
  "Leadership",
  "Customer Support",
  "Sales",
  "Marketing",
  "Cloud Computing",
  "AWS",
  "Azure",
];

export const parseResumeFromPdf = async (file: File): Promise<ParsedResume> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = "";
    const lines: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageItems = textContent.items as any[];

      // Sort items by vertical position (y) then horizontal position (x)
      pageItems.sort((a, b) => {
        if (a.transform[5] !== b.transform[5]) {
          return b.transform[5] - a.transform[5]; // Top to bottom
        }
        return a.transform[4] - b.transform[4]; // Left to right
      });

      let currentLine = "";
      let lastY = -1;
      for (const item of pageItems) {
        if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
          lines.push(currentLine.trim());
          currentLine = "";
        }
        currentLine += item.str + " ";
        lastY = item.transform[5];
      }
      lines.push(currentLine.trim());
      fullText += lines.join("\n") + "\n";
    }

    // 1. Extract Name (Usually the first non-empty line with content)
    const name =
      lines.find((line) => line.length > 2 && !EMAIL_REGEX.test(line)) ||
      "Unknown";

    // 2. Extract Email
    const emailMatch = fullText.match(EMAIL_REGEX);
    const email = emailMatch ? emailMatch[0] : "N/A";

    // 3. Extract Skills (Keyword matching)
    const foundSkills = SKILLS_LIST.filter((skill) =>
      fullText.toLowerCase().includes(skill.toLowerCase()),
    );

    // 4. Extract Experience (Regex)
    const expMatches = fullText.match(new RegExp(EXPERIENCE_REGEX, "gi"));
    let experience = 0;
    if (expMatches) {
      const years = expMatches.map((m) => parseInt(m.match(/\d+/)?.[0] || "0"));
      experience = Math.max(...years);
    }

    return {
      name,
      email,
      skills: foundSkills,
      experience,
    };
  } catch (error) {
    console.warn("Browser-side PDF parsing failed, falling back to backend:", error);
    // Return empty/default data so the backend can handle the full parsing
    return {
      name: "Unknown",
      email: "N/A",
      skills: [],
      experience: 0,
    };
  }
};