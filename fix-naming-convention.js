#!/usr/bin/env node

/**
 * Fix Naming Convention Script
 * 
 * This script fixes the naming convention from "sama" to "samas" throughout the codebase:
 * 1. Renames all content files from *-sama-* to *-samas-*
 * 2. Updates all references in dashak JSON files
 * 3. Updates variable names and route parameters in code files
 * 4. Updates type definitions
 * 
 * Usage: node fix-naming-convention.js
 */

import { readFileSync, writeFileSync, renameSync, readdirSync, statSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to recursively get all files
function getAllFiles(dir, extensions = []) {
  const files = [];
  
  function scan(directory) {
    const items = readdirSync(directory);
    
    for (const item of items) {
      const fullPath = join(directory, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (extensions.length === 0 || extensions.includes(extname(item))) {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

// Step 1: Rename all sama files to samas files
function renameSamaFiles() {
  console.log('🔄 Step 1: Renaming sama files to samas files...');
  
  const samasDir = join(__dirname, 'src', 'content', 'samas');
  const files = readdirSync(samasDir).filter(file => file.includes('-sama-'));
  
  let renamedCount = 0;
  
  for (const file of files) {
    const oldPath = join(samasDir, file);
    const newFileName = file.replace('-sama-', '-samas-');
    const newPath = join(samasDir, newFileName);
    
    try {
      renameSync(oldPath, newPath);
      console.log(`✓ Renamed: ${file} → ${newFileName}`);
      renamedCount++;
    } catch (error) {
      console.error(`❌ Failed to rename ${file}:`, error.message);
    }
  }
  
  console.log(`📊 Renamed ${renamedCount} files\n`);
}

// Step 2: Update dashak JSON files
function updateDashakFiles() {
  console.log('🔄 Step 2: Updating dashak JSON files...');
  
  const dashaksDir = join(__dirname, 'src', 'content', 'dashaks');
  const files = readdirSync(dashaksDir).filter(file => file.endsWith('.json'));
  
  let updatedCount = 0;
  
  for (const file of files) {
    const filePath = join(dashaksDir, file);
    const content = readFileSync(filePath, 'utf-8');
    
    try {
      const data = JSON.parse(content);
      
      // Update samas array - replace "sama" with "samas" in IDs
      if (data.samas && Array.isArray(data.samas)) {
        data.samas = data.samas.map(samaId => samaId.replace('-sama-', '-samas-'));
        
        const updatedContent = JSON.stringify(data, null, 2);
        writeFileSync(filePath, updatedContent);
        console.log(`✓ Updated: ${file}`);
        updatedCount++;
      }
    } catch (error) {
      console.error(`❌ Failed to update ${file}:`, error.message);
    }
  }
  
  console.log(`📊 Updated ${updatedCount} dashak files\n`);
}

// Step 3: Update code files
function updateCodeFiles() {
  console.log('🔄 Step 3: Updating code files...');
  
  const srcDir = join(__dirname, 'src');
  const codeFiles = getAllFiles(srcDir, ['.astro', '.ts', '.tsx', '.js', '.jsx']);
  
  let updatedCount = 0;
  
  const replacements = [
    // Route parameter
    { from: /\[samaId\]/g, to: '[samasId]' },
    { from: /samaId:/g, to: 'samasId:' },
    { from: /samaId\s*=/g, to: 'samasId =' },
    { from: /samaId\s*\)/g, to: 'samasId)' },
    { from: /samaId\s*,/g, to: 'samasId,' },
    { from: /samaId\s*}/g, to: 'samasId}' },
    
    // Variable names and properties
    { from: /const\s+samaId/g, to: 'const samasId' },
    { from: /let\s+samaId/g, to: 'let samasId' },
    { from: /\.samaId/g, to: '.samasId' },
    { from: /params\.\s*samaId/g, to: 'params.samasId' },
    
    // File path references
    { from: /-sama-/g, to: '-samas-' },
    
    // Type names
    { from: /SamaEntry/g, to: 'SamasEntry' },
    { from: /type\s+Sama\s/g, to: 'type Samas ' },
    
    // Collection references
    { from: /'samas',\s*\(\s*sama\s*\)/g, to: "'samas', (samas)" },
    { from: /getCollection\(\s*'samas',\s*\(\s*sama\s*\)\s*=>/g, to: "getCollection('samas', (samas) =>" },
    
    // Variable names in loops and functions
    { from: /\.map\(\s*sama\s*=>/g, to: '.map(samas =>' },
    { from: /\.filter\(\s*sama\s*=>/g, to: '.filter(samas =>' },
    { from: /\.find\(\s*sama\s*=>/g, to: '.find(samas =>' },
    
    // Object destructuring and properties
    { from: /{\s*sama\s*}/g, to: '{ samas }' },
    { from: /{\s*sama\s*,/g, to: '{ samas,' },
    { from: /,\s*sama\s*}/g, to: ', samas }' },
    
    // Function parameters
    { from: /\(\s*sama\s*\)/g, to: '(samas)' },
    { from: /\(\s*sama\s*,/g, to: '(samas,' },
    { from: /,\s*sama\s*\)/g, to: ', samas)' },
  ];
  
  for (const filePath of codeFiles) {
    let content = readFileSync(filePath, 'utf-8');
    let hasChanges = false;
    
    for (const { from, to } of replacements) {
      if (from.test(content)) {
        content = content.replace(from, to);
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      writeFileSync(filePath, content);
      console.log(`✓ Updated: ${filePath.replace(`${__dirname}/`, '')}`);
      updatedCount++;
    }
  }
  
  console.log(`📊 Updated ${updatedCount} code files\n`);
}

// Step 4: Update generation scripts
function updateGenerationScripts() {
  console.log('🔄 Step 4: Updating generation scripts...');
  
  const scripts = [
    'generate-dasbodh-content.js',
    'csv-import.js'
  ];
  
  let updatedCount = 0;
  
  for (const script of scripts) {
    const scriptPath = join(__dirname, script);
    
    try {
      let content = readFileSync(scriptPath, 'utf-8');
      
      // Update script content
      content = content.replace(/-sama-/g, '-samas-');
      content = content.replace(/sama\s*=/g, 'samas =');
      content = content.replace(/sama\s*\)/g, 'samas)');
      content = content.replace(/sama\s*,/g, 'samas,');
      content = content.replace(/sama_number/g, 'samas_number');
      content = content.replace(/samaNum/g, 'samasNum');
      content = content.replace(/samaId/g, 'samasId');
      content = content.replace(/Sama\s+\${/g, 'Samas ${');
      content = content.replace(/sama "/g, 'samas "');
      content = content.replace(/"Sama /g, '"Samas ');
      
      writeFileSync(scriptPath, content);
      console.log(`✓ Updated: ${script}`);
      updatedCount++;
    } catch (error) {
      console.log(`⚠️  Script ${script} not found or failed to update`);
    }
  }
  
  console.log(`📊 Updated ${updatedCount} generation scripts\n`);
}

// Main execution
console.log('🚀 Starting naming convention fix...');
console.log('This will rename files and update code references from "sama" to "samas"\n');

try {
  renameSamaFiles();
  updateDashakFiles();
  updateCodeFiles();
  updateGenerationScripts();
  
  console.log('✅ Naming convention fix completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Test the application navigation');
  console.log('2. Check for any remaining references to "sama"');
  console.log('3. Update route file name from [samaId].astro to [samasId].astro');
  console.log('4. Run the build to verify everything works');
  
} catch (error) {
  console.error('❌ Error during naming convention fix:', error);
  process.exit(1);
}
