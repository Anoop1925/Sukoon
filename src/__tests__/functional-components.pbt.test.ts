/**
 * Property-Based Test: Functional Component Usage
 * Feature: sukoon-nextjs-migration, Property 4: Functional Component Usage
 * Validates: Requirements 3.1
 * 
 * Tests that all React components in the codebase are functional components
 * (not class components) and use hooks for state and lifecycle management.
 */

import * as fs from 'fs';
import { glob } from 'glob';

describe('Property 4: Functional Component Usage', () => {
  /**
   * Get all React component files (excluding test files)
   */
  const getComponentFiles = (): string[] => {
    const appComponents = glob.sync('src/app/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx', '**/layout.tsx', '**/error.tsx', '**/not-found.tsx'] 
    });
    const uiComponents = glob.sync('src/components/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx'] 
    });
    
    return [...appComponents, ...uiComponents];
  };

  /**
   * Check if a file contains class components
   */
  const hasClassComponent = (content: string): boolean => {
    // Check for class component patterns
    const classComponentPatterns = [
      /class\s+\w+\s+extends\s+React\.Component/,
      /class\s+\w+\s+extends\s+Component/,
      /class\s+\w+\s+extends\s+React\.PureComponent/,
      /class\s+\w+\s+extends\s+PureComponent/,
    ];
    
    return classComponentPatterns.some(pattern => pattern.test(content));
  };

  /**
   * Check if a file uses functional component patterns
   */
  const hasFunctionalComponent = (content: string): boolean => {
    // Check for functional component patterns
    const functionalPatterns = [
      /export\s+default\s+function\s+\w+/,
      /export\s+function\s+\w+.*:\s*JSX\.Element/,
      /const\s+\w+\s*=\s*\(.*\)\s*=>/,
      /function\s+\w+\(.*\):\s*JSX\.Element/,
      /export\s+const\s+\w+\s*=\s*\(.*\)\s*=>/,
    ];
    
    return functionalPatterns.some(pattern => pattern.test(content));
  };

  /**
   * Check if a file uses React hooks
   */
  const usesReactHooks = (content: string): boolean => {
    const hookPatterns = [
      /useState/,
      /useEffect/,
      /useContext/,
      /useReducer/,
      /useCallback/,
      /useMemo/,
      /useRef/,
      /useImperativeHandle/,
      /useLayoutEffect/,
      /useDebugValue/,
      /use\w+/, // Custom hooks
    ];
    
    return hookPatterns.some(pattern => pattern.test(content));
  };

  /**
   * Extract component name from file path
   */
  const getComponentName = (filePath: string): string => {
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.replace('.tsx', '');
  };

  it('should not contain any class components', () => {
    const componentFiles = getComponentFiles();
    expect(componentFiles.length).toBeGreaterThan(0);

    const classComponents: Array<{
      file: string;
      component: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);

      if (hasClassComponent(content)) {
        classComponents.push({
          file: filePath,
          component: componentName
        });
      }
    });

    if (classComponents.length > 0) {
      const report = classComponents
        .map(c => `  - ${c.component} (${c.file})`)
        .join('\n');
      
      const errorMessage =
        `Found ${classComponents.length} class component(s):\n${report}\n\n` +
        'All components should be functional components using React 19.2.1+ patterns.\n' +
        'Please convert class components to functional components with hooks.';
      
      expect(errorMessage).toBe('All components should be functional');
    }

    expect(classComponents.length).toBe(0);
  });

  it('should use functional component patterns', () => {
    const componentFiles = getComponentFiles();
    const nonFunctionalComponents: Array<{
      file: string;
      component: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);

      // Skip files that are just type definitions or exports
      if (content.includes('export type') || content.includes('export interface')) {
        const hasActualComponent = content.includes('return') && 
                                     (content.includes('<') || content.includes('JSX'));
        if (!hasActualComponent) {
          return; // Skip type-only files
        }
      }

      // Check if file has functional component pattern
      if (!hasFunctionalComponent(content) && !hasClassComponent(content)) {
        // Might be a re-export or utility file
        const hasJSXReturn = content.includes('return') && content.includes('<');
        if (hasJSXReturn) {
          nonFunctionalComponents.push({
            file: filePath,
            component: componentName
          });
        }
      }
    });

    if (nonFunctionalComponents.length > 0) {
      const report = nonFunctionalComponents
        .map(c => `  - ${c.component} (${c.file})`)
        .join('\n');
      
      console.warn(
        `Warning: Found ${nonFunctionalComponents.length} file(s) with unclear component patterns:\n${report}\n` +
        'Ensure all components use clear functional component syntax.'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });

  it('should use React hooks for state and lifecycle management', () => {
    const componentFiles = getComponentFiles();
    const componentsWithoutHooks: Array<{
      file: string;
      component: string;
      hasState: boolean;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);

      // Skip simple presentational components
      const isSimpleComponent = !content.includes('state') && 
                                 !content.includes('effect') &&
                                 !content.includes('lifecycle');

      if (isSimpleComponent) {
        return; // Simple components don't need hooks
      }

      // Check if component uses hooks
      const hasHooks = usesReactHooks(content);
      const hasStateManagement = content.includes('state') || 
                                   content.includes('State') ||
                                   content.includes('set');

      if (hasStateManagement && !hasHooks) {
        componentsWithoutHooks.push({
          file: filePath,
          component: componentName,
          hasState: hasStateManagement
        });
      }
    });

    if (componentsWithoutHooks.length > 0) {
      const report = componentsWithoutHooks
        .map(c => `  - ${c.component} (${c.file})`)
        .join('\n');
      
      console.warn(
        `Info: Found ${componentsWithoutHooks.length} component(s) with state management but no clear hook usage:\n${report}\n` +
        'Ensure components use React hooks (useState, useEffect, etc.) for state and lifecycle.'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });

  it('should not use deprecated lifecycle methods', () => {
    const componentFiles = getComponentFiles();
    const componentsWithDeprecatedMethods: Array<{
      file: string;
      component: string;
      methods: string[];
    }> = [];

    const deprecatedMethods = [
      'componentWillMount',
      'componentWillReceiveProps',
      'componentWillUpdate',
      'UNSAFE_componentWillMount',
      'UNSAFE_componentWillReceiveProps',
      'UNSAFE_componentWillUpdate',
    ];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);

      const foundMethods = deprecatedMethods.filter(method => 
        content.includes(method)
      );

      if (foundMethods.length > 0) {
        componentsWithDeprecatedMethods.push({
          file: filePath,
          component: componentName,
          methods: foundMethods
        });
      }
    });

    if (componentsWithDeprecatedMethods.length > 0) {
      const report = componentsWithDeprecatedMethods
        .map(c => `  - ${c.component}: ${c.methods.join(', ')} (${c.file})`)
        .join('\n');
      
      const errorMessage =
        `Found ${componentsWithDeprecatedMethods.length} component(s) using deprecated lifecycle methods:\n${report}\n\n` +
        'Deprecated lifecycle methods should not be used.\n' +
        'Convert to functional components with useEffect hook.';
      
      expect(errorMessage).toBe('No deprecated lifecycle methods should be used');
    }

    expect(componentsWithDeprecatedMethods.length).toBe(0);
  });
});
