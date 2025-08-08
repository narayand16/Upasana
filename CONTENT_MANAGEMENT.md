# Content Management for Shrimat Dasbodh

This directory contains tools and templates for efficiently managing the large amount of content in Shrimat Dasbodh.

## Quick Setup (Recommended)

### Option 1: Generate Placeholder Files
```bash
# Run the generation script
node generate-dasbodh-content.js
```

This will create:
- 20 dashak JSON files
- 200 sama markdown files with placeholders
- Proper file naming and structure

### Option 2: CSV-Based Content Management

1. **Create content in a spreadsheet** (Excel, Google Sheets)
2. **Export as CSV** 
3. **Use the CSV import script** to generate files

#### CSV Format:
```csv
dashak_number,sama_number,title,title_devanagari,description,content,translation
1,1,"Sama 1","समा १","Introduction to the path","[Sanskrit/Marathi text]","[Translation]"
1,2,"Sama 2","समा २","The nature of reality","[Sanskrit/Marathi text]","[Translation]"
...
```

## Content Addition Workflow

### Step 1: Generate Structure
```bash
node generate-dasbodh-content.js
```

### Step 2: Add Content Gradually
- Start with one dashak at a time
- Replace placeholder content in the generated `.md` files
- Test navigation as you go

### Step 3: Bulk Content Addition (Optional)
- Prepare content in CSV format
- Use the CSV import script (see csv-import.js)

## File Structure

```
src/content/
├── books/
│   └── shrimat-dasbodh.json
├── dashaks/
│   ├── dashak-1.json
│   ├── dashak-2.json
│   └── ... (20 files)
└── samas/
    ├── shrimat-dasbodh-dashak-1-sama-1.md
    ├── shrimat-dasbodh-dashak-1-sama-2.md
    └── ... (200 files)
```

## Content Guidelines

### Sama File Template
```markdown
---
dashakId: "dashak-X"
title: "Sama Y"
titleDevanagari: "समा Y"
number: Y
description: "Brief description"
---

## समा Y - दशक X

[Original verse in Devanagari]

_[Translation]_

[Commentary or explanation]
```

### Tips for Efficient Content Addition

1. **Use Find & Replace**: For systematic placeholder replacement
2. **Version Control**: Commit frequently to track progress
3. **Incremental Testing**: Test navigation after adding each dashak
4. **Content Validation**: Use consistent formatting across all files

## Next Steps

1. Run the generation script
2. Pick one dashak to start with
3. Replace placeholders with actual content
4. Test the app navigation
5. Repeat for remaining dashaks

This approach allows you to:
- ✅ Generate all files instantly
- ✅ Add content incrementally
- ✅ Maintain consistent structure
- ✅ Track progress easily
- ✅ Test as you go
