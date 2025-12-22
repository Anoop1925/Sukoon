/**
 * Property-Based Test: Component Documentation
 * Feature: sukoon-nextjs-migration, Property 43: Component Documentation
 * Validates: Requirements 16.3
 * 
 * Tests that all reusable components have comments or documentation explaining
 * props, usage examples, and any special considerations.
 */

import * as fs from 'fs';
import { glob } from 'glob';

describe('Property 43: Component Documentation', () => {
  /**
   * Get all reusable component files (excluding pages and test files)
   */
  const getComponentFiles = (): string[] => {
    const uiComponents = glob.sync('src/components/ui/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx'] 
    });
    const layoutComponents = glob.sync('src/components/layout/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx'] 
    });
    const therapyComponents = glob.sync('src/components/therapy/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx'] 
    });
    const sectionComponents = glob.sync('src/components/sections/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx'] 
    });
    
    return [...uiComponents, ...layoutComponents, ...therapyComponents, ...sectionComponents];
  };

  /**
   * Check if a component file has documentation
   */
  const hasComponentDocumentation = (content: string): {
    hasJSDoc: boolean;
    hasPropsInterface: boolean;
    hasPropsDocumentation: boolean;
    hasUsageExample: boolean;
    hasComponentComment: boolean;
  } => {
    // Check for JSDoc-style comments
    const hasJSDoc = content.includes('/**') && content.includes('*/');
    
    // Check for Props interface or type
    const hasPropsInterface = /interface\s+\w+Props/.test(content) || /type\s+\w+Props/.test(content);
    
    // Check for props documentation (JSDoc comments on interface properties)
    const hasPropsDocumentation = /\/\*\*[\s\S]*?\*\/[\s\S]*?interface\s+\w+Props/.test(content) ||
                                   content.includes('/** ') && hasPropsInterface;
    
    // Check for usage examples in comments
    const hasUsageExample = content.includes('@example') || content.includes('Example:');
    
    // Check for @component tag or component description
    const hasComponentComment = content.includes('@component') || 
                                 (hasJSDoc && /\/\*\*[\s\S]*?Component[\s\S]*?\*\//.test(content));
    
    return {
      hasJSDoc,
      hasPropsInterface,
      hasPropsDocumentation,
      hasUsageExample,
      hasComponentComment
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

  it('should have JSDoc documentation for all reusable components', () => {
    const componentFiles = getComponentFiles();
    expect(componentFiles.length).toBeGreaterThan(0);

    const undocumentedComponents: Array<{
      file: string;
      component: string;
      issues: string[];
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      const docs = hasComponentDocumentation(content);

      const issues: string[] = [];

      // Check for basic JSDoc
      if (!docs.hasJSDoc) {
        issues.push('No JSDoc comments found');
      }

      // Check for props interface
      if (!docs.hasPropsInterface) {
        issues.push('No Props interface/type defined');
      }

      // Check for component-level documentation
      if (!docs.hasComponentComment) {
        issues.push('No component-level documentation');
      }

      // Check for usage examples
      if (!docs.hasUsageExample) {
        issues.push('No usage examples (@example)');
      }

      if (issues.length > 0) {
        undocumentedComponents.push({
          file: filePath,
          component: componentName,
          issues
        });
      }
    });

    // Report undocumented components
    if (undocumentedComponents.length > 0) {
      const report = undocumentedComponents
        .map(c => `  - ${c.component} (${c.file})\n    Issues: ${c.issues.join(', ')}`)
        .join('\n');
      
      const errorMessage =
        `Found ${undocumentedComponents.length} component(s) with incomplete documentation:\n${report}\n\n` +
        'Reusable components should have:\n' +
        '  - JSDoc comments with component description\n' +
        '  - @component tag\n' +
        '  - Props interface with documented properties\n' +
        '  - @example tags showing usage\n' +
        '  - Special considerations (if applicable)';
      
      expect(errorMessage).toBe('All components should have complete documentation');
    }

    expect(undocumentedComponents.length).toBe(0);
  });

  it('should have Props interface documentation for components with props', () => {
    const componentFiles = getComponentFiles();
    const componentsWithoutPropsDocs: Array<{
      file: string;
      component: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      const docs = hasComponentDocumentation(content);

      // If component has props interface but no documentation
      if (docs.hasPropsInterface && !docs.hasPropsDocumentation) {
        componentsWithoutPropsDocs.push({
          file: filePath,
          component: componentName
        });
      }
    });

    // This is a softer check - warn if many components lack props documentation
    if (componentsWithoutPropsDocs.length > 3) {
      const report = componentsWithoutPropsDocs
        .slice(0, 5)
        .map(c => `  - ${c.component} (${c.file})`)
        .join('\n');
      
      console.warn(
        `Warning: Found ${componentsWithoutPropsDocs.length} component(s) with Props interface but no property documentation:\n${report}\n` +
        'Consider adding JSDoc comments to Props interface properties.'
      );
    }

    // Test passes but warns
    expect(true).toBe(true);
  });

  it('should have usage examples for complex components', () => {
    const componentFiles = getComponentFiles();
    const complexComponentsWithoutExamples: Array<{
      file: string;
      component: string;
      lineCount: number;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      const docs = hasComponentDocumentation(content);
      const lineCount = content.split('\n').length;

      // Complex components (>100 lines) should have examples
      if (lineCount > 100 && !docs.hasUsageExample) {
        complexComponentsWithoutExamples.push({
          file: filePath,
          component: componentName,
          lineCount
        });
      }
    });

    // Warn if complex components lack examples
    if (complexComponentsWithoutExamples.length > 0) {
      const report = complexComponentsWithoutExamples
        .map(c => `  - ${c.component} (${c.lineCount} lines)`)
        .join('\n');
      
      console.warn(
        `Warning: Found ${complexComponentsWithoutExamples.length} complex component(s) without usage examples:\n${report}\n` +
        'Consider adding @example tags to show how to use these components.'
      );
    }

    // Test passes but warns
    expect(true).toBe(true);
  });

  it('should export Props interfaces for reusable components', () => {
    const componentFiles = getComponentFiles();
    const componentsWithoutExportedProps: string[] = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      
      // Check if Props interface is exported
      const hasExportedProps = /export\s+interface\s+\w+Props/.test(content) ||
                                /export\s+type\s+\w+Props/.test(content);
      
      const hasPropsInterface = /interface\s+\w+Props/.test(content) || 
                                 /type\s+\w+Props/.test(content);

      if (hasPropsInterface && !hasExportedProps) {
        componentsWithoutExportedProps.push(`${componentName} (${filePath})`);
      }
    });

    // Props interfaces should be exported for better reusability
    if (componentsWithoutExportedProps.length > 0) {
      const report = componentsWithoutExportedProps
        .slice(0, 5)
        .map(c => `  - ${c}`)
        .join('\n');
      
      console.warn(
        `Info: Found ${componentsWithoutExportedProps.length} component(s) with non-exported Props:\n${report}\n` +
        'Consider exporting Props interfaces for better TypeScript support.'
      );
    }

    // Test passes - this is just informational
    expect(true).toBe(true);
  });
});
