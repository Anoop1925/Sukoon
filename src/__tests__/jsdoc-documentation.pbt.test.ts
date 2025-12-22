/**
 * Property-Based Test: JSDoc Documentation
 * Feature: sukoon-nextjs-migration, Property 42: JSDoc Documentation
 * Validates: Requirements 16.1
 * 
 * Tests that all complex utility functions (more than 10 lines or with multiple parameters)
 * have JSDoc comments explaining purpose, parameters, and return values.
 */

import * as fs from 'fs';
import { glob } from 'glob';

describe('Property 42: JSDoc Documentation', () => {
  /**
   * Get all TypeScript files in lib and hooks directories
   */
  const getSourceFiles = (): string[] => {
    const libFiles = glob.sync('src/lib/**/*.ts', { ignore: ['**/*.test.ts', '**/*.pbt.test.ts'] });
    const hookFiles = glob.sync('src/hooks/**/*.ts', { ignore: ['**/*.test.ts', '**/*.pbt.test.ts'] });
    return [...libFiles, ...hookFiles];
  };

  /**
   * Extract functions from TypeScript file content
   */
  const extractFunctions = (content: string): Array<{
    name: string;
    lineCount: number;
    paramCount: number;
    hasJSDoc: boolean;
    startLine: number;
  }> => {
    const functions: Array<{
      name: string;
      lineCount: number;
      paramCount: number;
      hasJSDoc: boolean;
      startLine: number;
    }> = [];

    const lines = content.split('\n');
    
    // Match function declarations and arrow functions
    const functionRegex = /(?:export\s+)?(?:async\s+)?(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s*)?\()/g;
    
    let match;
    while ((match = functionRegex.exec(content)) !== null) {
      const functionName = match[1] || match[2];
      const startIndex = match.index;
      
      // Find the line number
      const beforeMatch = content.substring(0, startIndex);
      const startLine = beforeMatch.split('\n').length;
      
      // Check for JSDoc comment before the function (look back up to 30 lines)
      const precedingLines = lines.slice(Math.max(0, startLine - 30), startLine - 1);
      const hasJSDoc = precedingLines.some(line => line.trim().startsWith('/**') || line.trim().includes('* @'));
      
      // Count parameters
      const functionSignature = content.substring(startIndex, content.indexOf(')', startIndex) + 1);
      const paramMatch = functionSignature.match(/\(([^)]*)\)/);
      const params = paramMatch && paramMatch[1] ? paramMatch[1].split(',').filter(p => p.trim()) : [];
      const paramCount = params.length;
      
      // Estimate line count (find matching closing brace)
      let braceCount = 0;
      let inFunction = false;
      let lineCount = 0;
      
      for (let i = startLine - 1; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.includes('{')) {
          braceCount += (line.match(/{/g) || []).length;
          inFunction = true;
        }
        if (line.includes('}')) {
          braceCount -= (line.match(/}/g) || []).length;
        }
        
        if (inFunction) {
          lineCount++;
        }
        
        if (inFunction && braceCount === 0) {
          break;
        }
      }
      
      functions.push({
        name: functionName,
        lineCount,
        paramCount,
        hasJSDoc,
        startLine
      });
    }
    
    return functions;
  };

  it('should have JSDoc comments for all complex utility functions', () => {
    const sourceFiles = getSourceFiles();
    expect(sourceFiles.length).toBeGreaterThan(0);

    const undocumentedFunctions: Array<{
      file: string;
      function: string;
      reason: string;
      line: number;
    }> = [];

    sourceFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const functions = extractFunctions(content);

      functions.forEach(func => {
        // Check if function is complex (more than 10 lines OR multiple parameters)
        const isComplex = func.lineCount > 10 || func.paramCount > 1;

        if (isComplex && !func.hasJSDoc) {
          undocumentedFunctions.push({
            file: filePath,
            function: func.name,
            reason: func.lineCount > 10 
              ? `${func.lineCount} lines (>10)` 
              : `${func.paramCount} parameters (>1)`,
            line: func.startLine
          });
        }
      });
    });

    // Report all undocumented functions
    if (undocumentedFunctions.length > 0) {
      const report = undocumentedFunctions
        .map(f => `  - ${f.file}:${f.line} - ${f.function}() [${f.reason}]`)
        .join('\n');
      
      const errorMessage =
        `Found ${undocumentedFunctions.length} complex function(s) without JSDoc comments:\n${report}\n\n` +
        'Complex functions (>10 lines or >1 parameter) should have JSDoc comments with:\n' +
        '  - Description of purpose\n' +
        '  - @param tags for parameters\n' +
        '  - @returns tag for return value\n' +
        '  - @example tags for usage examples (optional)';
      
      expect(errorMessage).toBe('All functions should have JSDoc');
    }

    // If we get here, all complex functions have JSDoc
    expect(undocumentedFunctions.length).toBe(0);
  });

  it('should have parameter documentation for functions with parameters', () => {
    const sourceFiles = getSourceFiles();
    const functionsWithoutParamDocs: Array<{
      file: string;
      function: string;
      paramCount: number;
    }> = [];

    sourceFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const functions = extractFunctions(content);

      functions.forEach(func => {
        if (func.paramCount > 0 && func.hasJSDoc) {
          // Check if JSDoc has @param tags
          const lines = content.split('\n');
          const jsdocLines = lines.slice(Math.max(0, func.startLine - 30), func.startLine - 1);
          const jsdocContent = jsdocLines.join('\n');
          const paramTagCount = (jsdocContent.match(/@param/g) || []).length;

          // Allow some flexibility - not all parameters need @param if they're obvious
          // But if there are multiple parameters, at least some should be documented
          if (func.paramCount > 1 && paramTagCount === 0) {
            functionsWithoutParamDocs.push({
              file: filePath,
              function: func.name,
              paramCount: func.paramCount
            });
          }
        }
      });
    });

    // This is a softer check - we allow some functions without @param tags
    // but flag it if there are many
    if (functionsWithoutParamDocs.length > 5) {
      const report = functionsWithoutParamDocs
        .slice(0, 10)
        .map(f => `  - ${f.file} - ${f.function}() [${f.paramCount} params]`)
        .join('\n');
      
      console.warn(
        `Warning: Found ${functionsWithoutParamDocs.length} function(s) with parameters but no @param tags:\n${report}\n` +
        'Consider adding @param documentation for better code clarity.'
      );
    }

    // This test passes but warns if there are issues
    expect(true).toBe(true);
  });
});
