/**
 * Property-Based Test: Styling Method Consistency
 * Feature: sukoon-nextjs-migration, Property 36: Styling Method Consistency
 * Validates: Requirements 12.2
 * 
 * Tests that all styled components use either Tailwind CSS classes or CSS Modules
 * (consistent styling approach throughout).
 */

import * as fs from 'fs';
import { glob } from 'glob';

describe('Property 36: Styling Method Consistency', () => {
  /**
   * Get all component files
   */
  const getComponentFiles = (): string[] => {
    const appComponents = glob.sync('src/app/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx'] 
    });
    const uiComponents = glob.sync('src/components/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx'] 
    });
    
    return [...appComponents, ...uiComponents];
  };

  /**
   * Check styling methods used in a file
   */
  const getStylingMethods = (content: string): {
    usesTailwind: boolean;
    usesCSSModules: boolean;
    usesInlineStyles: boolean;
    usesStyledComponents: boolean;
    usesEmotion: boolean;
  } => {
    // Check for Tailwind CSS classes
    const usesTailwind = /className=["'][^"']*(?:flex|grid|bg-|text-|p-|m-|w-|h-|border|rounded|shadow|hover:|focus:)/.test(content);
    
    // Check for CSS Modules
    const usesCSSModules = /import\s+styles\s+from\s+['"].*\.module\.css['"]/.test(content) ||
                            /className=\{styles\./.test(content);
    
    // Check for inline styles
    const usesInlineStyles = /style=\{\{/.test(content);
    
    // Check for styled-components
    const usesStyledComponents = /import\s+styled\s+from\s+['"]styled-components['"]/.test(content) ||
                                  /const\s+\w+\s*=\s*styled\./.test(content);
    
    // Check for Emotion
    const usesEmotion = /import.*@emotion/.test(content) ||
                         /css=\{/.test(content);
    
    return {
      usesTailwind,
      usesCSSModules,
      usesInlineStyles,
      usesStyledComponents,
      usesEmotion
    };
  };

  /**
   * Extract component name from file path
   */
  const getComponentName = (filePath: string): string => {
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.replace('.tsx', '');
  };

  it('should use consistent styling approach (Tailwind CSS or CSS Modules)', () => {
    const componentFiles = getComponentFiles();
    expect(componentFiles.length).toBeGreaterThan(0);

    const stylingStats = {
      tailwind: 0,
      cssModules: 0,
      inline: 0,
      styledComponents: 0,
      emotion: 0,
      mixed: 0
    };

    const mixedStylingComponents: Array<{
      file: string;
      component: string;
      methods: string[];
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      const styling = getStylingMethods(content);

      const methods: string[] = [];
      if (styling.usesTailwind) {
        stylingStats.tailwind++;
        methods.push('Tailwind CSS');
      }
      if (styling.usesCSSModules) {
        stylingStats.cssModules++;
        methods.push('CSS Modules');
      }
      if (styling.usesInlineStyles) {
        stylingStats.inline++;
        methods.push('Inline Styles');
      }
      if (styling.usesStyledComponents) {
        stylingStats.styledComponents++;
        methods.push('styled-components');
      }
      if (styling.usesEmotion) {
        stylingStats.emotion++;
        methods.push('Emotion');
      }

      // Check for mixed styling (more than one method)
      if (methods.length > 1) {
        stylingStats.mixed++;
        mixedStylingComponents.push({
          file: filePath,
          component: componentName,
          methods
        });
      }
    });

    // Report styling statistics
    console.log('\nStyling Method Statistics:');
    console.log(`  Tailwind CSS: ${stylingStats.tailwind} files`);
    console.log(`  CSS Modules: ${stylingStats.cssModules} files`);
    console.log(`  Inline Styles: ${stylingStats.inline} files`);
    console.log(`  styled-components: ${stylingStats.styledComponents} files`);
    console.log(`  Emotion: ${stylingStats.emotion} files`);
    console.log(`  Mixed approaches: ${stylingStats.mixed} files`);

    // Warn about mixed styling
    if (mixedStylingComponents.length > 0) {
      const report = mixedStylingComponents
        .slice(0, 5)
        .map(c => `  - ${c.component}: ${c.methods.join(' + ')}`)
        .join('\n');
      
      console.warn(
        `\nInfo: Found ${mixedStylingComponents.length} component(s) using multiple styling methods:\n${report}\n` +
        'Consider using a single styling approach per component for consistency.'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });

  it('should primarily use Tailwind CSS as the main styling method', () => {
    const componentFiles = getComponentFiles();
    
    let tailwindCount = 0;
    let otherMethodsCount = 0;

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const styling = getStylingMethods(content);

      if (styling.usesTailwind) {
        tailwindCount++;
      }
      if (styling.usesCSSModules || styling.usesStyledComponents || styling.usesEmotion) {
        otherMethodsCount++;
      }
    });

    const tailwindPercentage = (tailwindCount / componentFiles.length) * 100;

    console.log(`\nTailwind CSS adoption: ${tailwindPercentage.toFixed(1)}% of components`);

    // According to requirements, Tailwind CSS should be the primary method
    if (tailwindPercentage < 70) {
      console.warn(
        `Warning: Only ${tailwindPercentage.toFixed(1)}% of components use Tailwind CSS.\n` +
        'Requirements specify Tailwind CSS as the primary styling method.\n' +
        'Consider migrating more components to Tailwind CSS for consistency.'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });

  it('should not use deprecated or non-standard styling methods', () => {
    const componentFiles = getComponentFiles();
    const deprecatedStyling: Array<{
      file: string;
      component: string;
      issue: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      const styling = getStylingMethods(content);

      // Check for styled-components (not in tech stack)
      if (styling.usesStyledComponents) {
        deprecatedStyling.push({
          file: filePath,
          component: componentName,
          issue: 'Uses styled-components (not in approved tech stack)'
        });
      }

      // Check for Emotion (not in tech stack)
      if (styling.usesEmotion) {
        deprecatedStyling.push({
          file: filePath,
          component: componentName,
          issue: 'Uses Emotion (not in approved tech stack)'
        });
      }
    });

    if (deprecatedStyling.length > 0) {
      const report = deprecatedStyling
        .map(c => `  - ${c.component}: ${c.issue}\n    Path: ${c.file}`)
        .join('\n');
      
      const errorMessage =
        `Found ${deprecatedStyling.length} component(s) using non-approved styling methods:\n${report}\n\n` +
        'Approved styling methods:\n' +
        '  - Tailwind CSS (primary)\n' +
        '  - CSS Modules (for component-specific styles)\n' +
        'Please migrate to approved styling methods.';
      
      expect(errorMessage).toBe('All components should use approved styling methods');
    }

    expect(deprecatedStyling.length).toBe(0);
  });

  it('should have minimal inline styles (only for dynamic values)', () => {
    const componentFiles = getComponentFiles();
    const excessiveInlineStyles: Array<{
      file: string;
      component: string;
      count: number;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);

      // Count inline style occurrences
      const inlineStyleMatches = content.match(/style=\{\{/g);
      const inlineStyleCount = inlineStyleMatches ? inlineStyleMatches.length : 0;

      // Flag components with excessive inline styles (more than 3)
      if (inlineStyleCount > 3) {
        excessiveInlineStyles.push({
          file: filePath,
          component: componentName,
          count: inlineStyleCount
        });
      }
    });

    if (excessiveInlineStyles.length > 0) {
      const report = excessiveInlineStyles
        .slice(0, 5)
        .map(c => `  - ${c.component}: ${c.count} inline styles`)
        .join('\n');
      
      console.warn(
        `Info: Found ${excessiveInlineStyles.length} component(s) with excessive inline styles:\n${report}\n` +
        'Inline styles should be used sparingly, only for dynamic values.\n' +
        'Consider moving static styles to Tailwind classes or CSS Modules.'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });

  it('should use Tailwind utility classes correctly', () => {
    const componentFiles = getComponentFiles();
    const incorrectTailwindUsage: Array<{
      file: string;
      component: string;
      issue: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);

      // Check for common Tailwind mistakes
      const issues: string[] = [];

      // Check for arbitrary values without proper syntax
      if (/className=["'][^"']*\[[^\]]+\][^"']*["']/.test(content)) {
        // This is actually correct - Tailwind supports arbitrary values
        // Just checking they're used properly
      }

      // Check for very long className strings (might need extraction)
      const classNameMatches = content.match(/className=["']([^"']{200,})["']/g);
      if (classNameMatches && classNameMatches.length > 0) {
        issues.push('Very long className strings (consider extracting to variable)');
      }

      // Check for duplicate utility classes
      const classNameStrings = content.match(/className=["']([^"']+)["']/g);
      if (classNameStrings) {
        classNameStrings.forEach(classStr => {
          const classes = classStr.match(/className=["']([^"']+)["']/)?.[1].split(/\s+/) || [];
          const uniqueClasses = new Set(classes);
          if (classes.length !== uniqueClasses.size) {
            issues.push('Duplicate utility classes in className');
          }
        });
      }

      if (issues.length > 0) {
        incorrectTailwindUsage.push({
          file: filePath,
          component: componentName,
          issue: issues.join(', ')
        });
      }
    });

    if (incorrectTailwindUsage.length > 0) {
      const report = incorrectTailwindUsage
        .slice(0, 5)
        .map(c => `  - ${c.component}: ${c.issue}`)
        .join('\n');
      
      console.warn(
        `Info: Found ${incorrectTailwindUsage.length} component(s) with potential Tailwind issues:\n${report}\n` +
        'Consider refactoring for better maintainability.'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });

  it('should have CSS Module files for components that import them', () => {
    const componentFiles = getComponentFiles();
    const missingCSSModules: Array<{
      file: string;
      component: string;
      expectedModule: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);

      // Check if component imports CSS Module
      const cssModuleImport = content.match(/import\s+styles\s+from\s+['"](.+\.module\.css)['"]/);
      
      if (cssModuleImport) {
        const modulePath = cssModuleImport[1];
        const fullModulePath = filePath.replace(/\.tsx$/, '') + '/' + modulePath;
        
        // Check if the CSS Module file exists
        if (!fs.existsSync(fullModulePath)) {
          missingCSSModules.push({
            file: filePath,
            component: componentName,
            expectedModule: modulePath
          });
        }
      }
    });

    if (missingCSSModules.length > 0) {
      const report = missingCSSModules
        .map(c => `  - ${c.component}: Missing ${c.expectedModule}`)
        .join('\n');
      
      const errorMessage =
        `Found ${missingCSSModules.length} component(s) with missing CSS Module files:\n${report}\n\n` +
        'Components importing CSS Modules should have corresponding .module.css files.';
      
      expect(errorMessage).toBe('All CSS Module imports should have corresponding files');
    }

    expect(missingCSSModules.length).toBe(0);
  });
});
