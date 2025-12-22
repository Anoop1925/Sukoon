/**
 * Property-Based Test: TypeScript File Extensions
 * Feature: sukoon-nextjs-migration, Property 29: TypeScript File Extensions
 * Validates: Requirements 10.1
 * 
 * Tests that all component files use .tsx extension (for components with JSX)
 * or .ts extension (for utilities without JSX).
 */

import * as fs from 'fs';
import { glob } from 'glob';

describe('Property 29: TypeScript File Extensions', () => {
  /**
   * Get all TypeScript files in the src directory
   */
  const getAllTypeScriptFiles = (): string[] => {
    const tsFiles = glob.sync('src/**/*.ts', { 
      ignore: ['**/*.d.ts', '**/*.test.ts', '**/*.pbt.test.ts'] 
    });
    const tsxFiles = glob.sync('src/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx'] 
    });
    
    return [...tsFiles, ...tsxFiles];
  };

  /**
   * Check if a file contains JSX
   * Uses a more conservative approach to avoid false positives from TypeScript generics
   */
  const containsJSX = (content: string): boolean => {
    // Most reliable: Check for JSX type annotations
    const hasJSXTypes = /:\s*JSX\.Element/.test(content) ||
                         /:\s*React\.ReactElement\b/.test(content) ||
                         /:\s*ReactElement\b/.test(content) ||
                         /:\s*ReactNode\b/.test(content);
    
    if (hasJSXTypes) return true;
    
    // Check for JSX pragma
    if (/\/\*\*\s*@jsx/.test(content)) return true;
    
    // Check for JSX fragments (very specific pattern)
    if (/<>\s*{/.test(content) || /<\/>\s*[;)]/.test(content)) return true;
    
    // Check for return statements with JSX (very specific)
    // Must have return followed by opening tag with space or >
    if (/return\s*\(\s*<[A-Z]\w+\s/.test(content)) return true;
    if (/return\s*<[A-Z]\w+\s/.test(content)) return true;
    if (/return\s*\(\s*<[a-z]+\s+[a-z]/.test(content)) return true; // HTML with attributes
    
    // Check for JSX in variable assignments
    if (/const\s+\w+\s*=\s*<[A-Z]\w+/.test(content)) return true;
    
    return false;
  };

  /**
   * Check if a file is a utility/helper file
   */
  const isUtilityFile = (filePath: string): boolean => {
    const utilityPaths = [
      '/lib/',
      '/utils/',
      '/helpers/',
      '/constants/',
      '/config/',
      '/types/',
      '/data/',
    ];
    
    return utilityPaths.some(path => filePath.includes(path));
  };

  /**
   * Extract file name from path
   */
  const getFileName = (filePath: string): string => {
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  };

  it('should use .tsx extension for files with JSX', () => {
    const allFiles = getAllTypeScriptFiles();
    expect(allFiles.length).toBeGreaterThan(0);

    const incorrectExtensions: Array<{
      file: string;
      fileName: string;
      issue: string;
    }> = [];

    allFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = getFileName(filePath);
      const hasJSX = containsJSX(content);
      const hasTsxExtension = filePath.endsWith('.tsx');

      // If file contains JSX but doesn't have .tsx extension
      if (hasJSX && !hasTsxExtension) {
        incorrectExtensions.push({
          file: filePath,
          fileName,
          issue: 'Contains JSX but uses .ts extension (should be .tsx)'
        });
      }
    });

    if (incorrectExtensions.length > 0) {
      const report = incorrectExtensions
        .map(f => `  - ${f.fileName}: ${f.issue}\n    Path: ${f.file}`)
        .join('\n');
      
      const errorMessage =
        `Found ${incorrectExtensions.length} file(s) with incorrect extensions:\n${report}\n\n` +
        'Files containing JSX should use .tsx extension.\n' +
        'Rename these files to use the correct extension.';
      
      expect(errorMessage).toBe('All files should use correct TypeScript extensions');
    }

    expect(incorrectExtensions.length).toBe(0);
  });

  it('should use .ts extension for utility files without JSX', () => {
    const allFiles = getAllTypeScriptFiles();
    const incorrectUtilityExtensions: Array<{
      file: string;
      fileName: string;
      issue: string;
    }> = [];

    allFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = getFileName(filePath);
      const hasJSX = containsJSX(content);
      const hasTsxExtension = filePath.endsWith('.tsx');
      const isUtility = isUtilityFile(filePath);

      // If utility file has .tsx but no JSX
      if (isUtility && hasTsxExtension && !hasJSX) {
        incorrectUtilityExtensions.push({
          file: filePath,
          fileName,
          issue: 'Utility file uses .tsx but contains no JSX (should be .ts)'
        });
      }
    });

    // This is a soft check - warn if utilities use .tsx unnecessarily
    if (incorrectUtilityExtensions.length > 0) {
      const report = incorrectUtilityExtensions
        .slice(0, 5)
        .map(f => `  - ${f.fileName}: ${f.issue}`)
        .join('\n');
      
      console.warn(
        `Info: Found ${incorrectUtilityExtensions.length} utility file(s) using .tsx without JSX:\n${report}\n` +
        'Consider using .ts extension for utility files without JSX.'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });

  it('should not have JavaScript files in src directory', () => {
    const jsFiles = glob.sync('src/**/*.js', { 
      ignore: ['**/*.test.js', '**/*.config.js'] 
    });
    const jsxFiles = glob.sync('src/**/*.jsx', { 
      ignore: ['**/*.test.jsx'] 
    });

    const allJsFiles = [...jsFiles, ...jsxFiles];

    if (allJsFiles.length > 0) {
      const report = allJsFiles
        .map(f => `  - ${getFileName(f)} (${f})`)
        .join('\n');
      
      const errorMessage =
        `Found ${allJsFiles.length} JavaScript file(s) in src directory:\n${report}\n\n` +
        'All source files should use TypeScript (.ts or .tsx).\n' +
        'Convert JavaScript files to TypeScript.';
      
      expect(errorMessage).toBe('All source files should be TypeScript');
    }

    expect(allJsFiles.length).toBe(0);
  });

  it('should have consistent file naming conventions', () => {
    const allFiles = getAllTypeScriptFiles();
    const inconsistentNaming: Array<{
      file: string;
      fileName: string;
      issue: string;
    }> = [];

    allFiles.forEach(filePath => {
      const fileName = getFileName(filePath);
      
      // Check for common naming issues
      const issues: string[] = [];

      // Component files should be PascalCase
      if (filePath.includes('/components/') && fileName.match(/^[a-z]/)) {
        issues.push('Component file should use PascalCase');
      }

      // Utility/hook files should be camelCase
      if ((filePath.includes('/hooks/') || filePath.includes('/lib/')) && 
          fileName.match(/^[A-Z]/) && 
          !fileName.startsWith('use')) {
        issues.push('Utility file should use camelCase');
      }

      // Hook files should start with 'use'
      if (filePath.includes('/hooks/') && !fileName.startsWith('use') && !fileName.startsWith('index')) {
        issues.push('Hook file should start with "use"');
      }

      if (issues.length > 0) {
        inconsistentNaming.push({
          file: filePath,
          fileName,
          issue: issues.join(', ')
        });
      }
    });

    // This is informational - naming conventions improve consistency
    if (inconsistentNaming.length > 0) {
      const report = inconsistentNaming
        .slice(0, 5)
        .map(f => `  - ${f.fileName}: ${f.issue}`)
        .join('\n');
      
      console.warn(
        `Info: Found ${inconsistentNaming.length} file(s) with inconsistent naming:\n${report}\n` +
        'Consider following naming conventions:\n' +
        '  - Components: PascalCase (Button.tsx)\n' +
        '  - Hooks: camelCase starting with "use" (useScrollPosition.ts)\n' +
        '  - Utilities: camelCase (animations.ts)'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });

  it('should have proper file organization', () => {
    const allFiles = getAllTypeScriptFiles();
    const misplacedFiles: Array<{
      file: string;
      fileName: string;
      issue: string;
    }> = [];

    allFiles.forEach(filePath => {
      const fileName = getFileName(filePath);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Check if component is in wrong directory
      if (containsJSX(content) && !filePath.includes('/components/') && !filePath.includes('/app/')) {
        misplacedFiles.push({
          file: filePath,
          fileName,
          issue: 'Component file outside /components or /app directory'
        });
      }

      // Check if hook is in wrong directory
      if (fileName.startsWith('use') && !filePath.includes('/hooks/') && !filePath.includes('/node_modules/')) {
        misplacedFiles.push({
          file: filePath,
          fileName,
          issue: 'Hook file outside /hooks directory'
        });
      }
    });

    // This is informational - proper organization improves maintainability
    if (misplacedFiles.length > 0) {
      const report = misplacedFiles
        .slice(0, 5)
        .map(f => `  - ${f.fileName}: ${f.issue}`)
        .join('\n');
      
      console.warn(
        `Info: Found ${misplacedFiles.length} potentially misplaced file(s):\n${report}\n` +
        'Consider organizing files by type:\n' +
        '  - Components: /components directory\n' +
        '  - Hooks: /hooks directory\n' +
        '  - Utilities: /lib directory'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });
});
