
import { SOCIAL_PLATFORMS } from "./constants";

interface ReadmeData {
  identity: {
    name: string;
    role: string;
    roles: string;
    location: string;
    education: string;
    currentWork: string;
    learning: string;
    about: string;
    github: string;
    website: string;
    tagline: string;
    bannerUrl: string;
    gifUrl: string;
    focus: string;
    approach: string;
    mindset: string;
    company: string;
    showVisitorCount: boolean;
    showTrophies: boolean;
    showTopLangs: boolean;
    showStatsCard: boolean;
    showStreak: boolean;
    showActivityGraph: boolean;
    showQuotes: boolean;
    showTopRepo: boolean;
  };
  techStack: {
    selected: string[];
    theme: 'dark' | 'light';
    includeSnake: boolean;
    includeStats: boolean;
  };
  socials: Record<string, string>;
}

export function generateMarkdown(data: ReadmeData): string {
  const { identity, techStack, socials } = data;
  let md = `<div align="center">\n\n`;

  // 1. Banner
  if (identity.bannerUrl) {
    md += `<img src="${identity.bannerUrl}" width="100%" alt="Cover Image"/>\n\n`;
  }

  // 2. Default Top GIF Animation
  md += `<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">\n\n`;

  // 3. Typing SVG
  const roles = [identity.role, ...identity.roles.split(',').map(r => r.trim())].filter(Boolean);
  if (roles.length > 0) {
    md += `<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=10B981&center=true&vCenter=true&width=600&lines=${encodeURIComponent(roles.join(';'))}" alt="Typing Animation" />\n\n`;
  }

  // 4. About Me Section (2-column table)
  md += `## 💫 Architectural Summary\n\n`;
  md += `<table align="center">\n<tr>\n<td align="left">\n\n`;
  
  if (identity.name) md += `### I am ${identity.name}\n\n`;
  if (identity.location) md += `📍 **Location:** ${identity.location}\n\n`;
  if (identity.company) md += `🏢 **Team:** ${identity.company}\n\n`;
  if (identity.education) md += `🎓 **Education:** ${identity.education}\n\n`;
  if (identity.focus) md += `🚀 **Current Focus:** ${identity.focus}\n\n`;
  if (identity.learning) md += `🌱 **Learning:** ${identity.learning}\n\n`;
  if (identity.about) md += `> ${identity.about}\n\n`;
  
  md += `</td>\n<td align="center">\n\n`;
  const codingGif = identity.gifUrl || "https://raw.githubusercontent.com/Satyam-Umrao/Satyam-Umrao/main/lets-code.gif";
  md += `<img src="${codingGif}" width="350" alt="Coding Animation"/>\n\n`;
  md += `</td>\n</tr>\n</table>\n\n`;

  // 5. Tech Stack
  if (techStack.selected.length > 0) {
    md += `## 💻 Tech Toolbox\n\n`;
    md += `<p align="center">\n`;
    md += `  <a href="https://skillicons.dev">\n`;
    md += `    <img src="https://skillicons.dev/icons?i=${techStack.selected.join(',')}&theme=${techStack.theme}" />\n`;
    md += `  </a>\n`;
    md += `</p>\n\n`;
  }

  // 6. GitHub Stats Section
  if (identity.showStatsCard || identity.showStreak || identity.showTopLangs) {
    md += `## 📊 Developer Metrics\n\n`;
    const username = identity.github || 'your-name';
    const theme = techStack.theme === 'dark' ? 'dark' : 'light';
    
    md += `<p align="center">\n`;
    if (identity.showStatsCard) {
      md += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&hide_border=false&include_all_commits=true&count_private=true" alt="Stats" />\n`;
    }
    
    if (identity.showStreak) {
      md += `  <img src="https://nirzak-streak-stats.vercel.app/?user=${username}&theme=${theme}&hide_border=false" alt="Streak" />\n`;
    }

    if (identity.showTopLangs) {
      md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&hide_border=false&layout=compact" alt="Languages" />\n`;
    }
    md += `</p>\n\n`;
  }

  // 7. GitHub Trophies
  if (identity.showTrophies && identity.github) {
    md += `## 🏆 Hall of Fame\n\n`;
    md += `<p align="center">\n`;
    md += `  <img src="https://github-trophies.vercel.app/?username=${identity.github}" alt="Trophies" />\n`;
    md += `</p>\n\n`;
  }

  // 8. Random Dev Quote
  if (identity.showQuotes) {
    md += `### ✍️ Random Dev Quote\n`;
    md += `<p align="center">\n`;
    md += `  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical" alt="Quote" />\n`;
    md += `</p>\n\n`;
  }

  // 9. Activity Graph
  if (identity.showActivityGraph && identity.github) {
    md += `## 📈 Activity Architecture\n\n`;
    md += `<p align="center">\n`;
    md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${identity.github}&theme=github-compact" alt="activity graph" width="100%" />\n`;
    md += `</p>\n\n`;
  }

  // 10. Contributions (Snake Animation)
  if (techStack.includeSnake && identity.github) {
    md += `## 🐍 Contributions Grid\n\n`;
    md += `<picture>\n`;
    md += `  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake-dark.svg" />\n`;
    md += `  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg" />\n`;
    md += `  <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg" />\n`;
    md += `</picture>\n\n`;
  }

  // 11. Connect with Me
  const validSocials = Object.entries(socials).filter(([_, val]) => val);
  if (validSocials.length > 0 || identity.website) {
    md += `## 🌐 Forge Connections\n\n`;
    md += `<p align="center">\n`;
    validSocials.forEach(([id, val]) => {
      const platform = SOCIAL_PLATFORMS.find(p => p.id === id);
      if (platform) {
        md += `<a href="${platform.prefix}${val}" target="_blank">\n`;
        md += `<img src="${platform.iconUrl}" width="50" alt="${platform.label}"/>\n`;
        md += `</a>\n&nbsp;&nbsp;&nbsp;\n`;
      }
    });
    if (identity.website) {
      md += `<a href="${identity.website}" target="_blank">\n`;
      md += `<img src="https://cdn-icons-png.flaticon.com/128/1006/1006771.png" width="50" alt="Website"/>\n`;
      md += `</a>\n`;
    }
    md += `</p>\n\n`;
  }

  // 12. Footer Tagline
  if (identity.tagline) {
    md += `---\n\n### ✨ *"${identity.tagline}"* ✨\n\n`;
  }

  // 13. Visitor Count
  if (identity.showVisitorCount && identity.github) {
    md += `<div align="center">\n`;
    md += `[![](https://visitcount.itsvg.in/api?id=${identity.github}&icon=0&color=0)](https://visitcount.itsvg.in)\n`;
    md += `</div>\n\n`;
  }

  md += `\n</div>`;
  return md;
}
