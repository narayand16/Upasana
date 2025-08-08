#!/usr/bin/env node

/**
 * Content Generation Script for Shrimat Dasbodh
 * 
 * This script generates:
 * - 20 dashak JSON files (dashak-1.json to dashak-20.json)
 * - 200 sama markdown files (10 samas per dashak)
 * 
 * Usage: node generate-dasbodh-content.js
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const BOOK_ID = 'shrimat-dasbodh';
const TOTAL_DASHAKS = 20;
const SAMAS_PER_DASHAK = 10;

// Helper function to convert number to Devanagari
function toDevanagariNumber(num) {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return num.toString().split('').map(digit => devanagariDigits[Number.parseInt(digit, 10)]).join('');
}

// Helper function to ensure directory exists
function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

// Generate dashak files
function generateDashaks() {
  const dashaksDir = join(__dirname, 'src', 'content', 'dashaks');
  ensureDir(dashaksDir);

  for (let dashakNum = 1; dashakNum <= TOTAL_DASHAKS; dashakNum++) {
    const dashakId = `dashak-${dashakNum}`;
    const devanagariNum = toDevanagariNumber(dashakNum);
    
    // Generate samas array for this dashak
    const samas = [];
    for (let samasNum = 1; samasNum <= SAMAS_PER_DASHAK; samasNum++) {
      samas.push(`${BOOK_ID}-${dashakId}-samas-${samasNum}`);
    }

    const dashakData = {
      bookId: BOOK_ID,
      title: `Dashak ${dashakNum}`,
      titleDevanagari: `दशक ${devanagariNum}`,
      number: dashakNum,
      description: `The ${dashakNum}${getOrdinalSuffix(dashakNum)} chapter of Shrimat Dasbodh`,
      samas: samas
    };

    const filePath = join(dashaksDir, `${dashakId}.json`);
    writeFileSync(filePath, JSON.stringify(dashakData, null, 2));
    console.log(`✓ Generated ${dashakId}.json`);
  }
}

// Generate sama files
function generateSamas() {
  const samasDir = join(__dirname, 'src', 'content', 'samas');
  ensureDir(samasDir);

  for (let dashakNum = 1; dashakNum <= TOTAL_DASHAKS; dashakNum++) {
    const dashakId = `dashak-${dashakNum}`;
    
    for (let samasNum = 1; samasNum <= SAMAS_PER_DASHAK; samasNum++) {
      const samasId = `${BOOK_ID}-${dashakId}-samas-${samasNum}`;
      const devanagariDashak = toDevanagariNumber(dashakNum);
      const devanagariSama = toDevanagariNumber(samasNum);

      const samaContent = `---
dashakId: "${dashakId}"
title: "Samas ${samasNum}"
titleDevanagari: "समा ${devanagariSama}"
number: ${samasNum}
description: "Samas ${samasNum} from Dashak ${dashakNum} of Shrimat Dasbodh"
---

## समा ${devanagariSama} - दशक ${devanagariDashak}

<!-- TODO: Add the actual Sanskrit/Marathi content here -->

**Placeholder Content - Dashak ${dashakNum}, Samas ${samasNum}**

This is a placeholder for the actual content of Samas ${samasNum} from Dashak ${dashakNum} of Shrimat Dasbodh by Sant Ramdas Swami.

### Instructions for Content Addition:
1. Replace this placeholder with the actual Sanskrit/Marathi verses
2. Add English translation if needed
3. Include any commentary or explanations
4. Use proper Devanagari formatting

### Content Structure Suggestion:
\`\`\`
## समा ${devanagariSama}

[Original Sanskrit/Marathi verse in Devanagari]

_[Translation in preferred language]_

[Any commentary or explanation]
\`\`\`

---
**Book:** श्रीमद् दासबोध (Shrimat Dasbodh)  
**Author:** संत रामदास स्वामी (Sant Ramdas Swami)  
**Dashak:** ${dashakNum} | **Sama:** ${samasNum}
`;

      const filePath = join(samasDir, `${samasId}.md`);
      writeFileSync(filePath, samaContent);
      console.log(`✓ Generated ${samasId}.md`);
    }
  }
}

// Helper function for ordinal suffixes
function getOrdinalSuffix(num) {
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }
  
  switch (lastDigit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Main execution
console.log('🚀 Starting content generation for Shrimat Dasbodh...');
console.log(`📊 Generating ${TOTAL_DASHAKS} dashaks with ${SAMAS_PER_DASHAK} samas each (${TOTAL_DASHAKS * SAMAS_PER_DASHAK} total files)`);

try {
  console.log('\n📁 Generating dashak files...');
  generateDashaks();
  
  console.log('\n📄 Generating sama files...');
  generateSamas();
  
  console.log('\n✅ Content generation completed successfully!');
  console.log(`📈 Generated ${TOTAL_DASHAKS} dashak files and ${TOTAL_DASHAKS * SAMAS_PER_DASHAK} sama files`);
  console.log('\n📝 Next steps:');
  console.log('1. Review the generated files');
  console.log('2. Replace placeholder content with actual verses');
  console.log('3. Test the navigation in your app');
  console.log('4. Commit the changes to git');
  
} catch (error) {
  console.error('❌ Error during content generation:', error);
  process.exit(1);
}
