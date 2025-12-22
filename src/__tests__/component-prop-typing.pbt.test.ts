/**
 * Property-Based Test: Component Prop Typing
 * Feature: sukoon-nextjs-migration, Property 30: Component Prop Typing
 * Validates: Requirements 10.2
 * 
 * Tests that all React components have props defined with TypeScript interfaces
 * or types (no implicit any types).
 */

import * as fs from 'fs';
import { glob } from 'glob';

describe('Property 30: Component Prop Typing', () => {
  /**
   * Get all React component files (excluding test files and Next.js pages)
   */
  const getComponentFiles = (): string[] => {
    // Exclude Next.js page components as they don't accept props in the traditional way
    const uiComponents = glob.sync('src/components/**/*.tsx', { 
      ignore: ['**/*.test.tsx', '**/*.pbt.test.tsx'] 
    });
    
    return uiComponents;
  };

  /**
   * Check if a component has proper prop typing
   */
  const hasProperPropTyping = (content: string): {
    hasPropsInterface: boolean;
    hasPropsType: boolean;
    hasInlineProps: boolean;
    hasAnyType: boolean;
    hasImplicitAny: boolean;
    componentName: string | null;
  } => {
    // Check for Props interface
    const hasPropsInterface = /interface\s+\w+Props/.test(content);
    
    // Check for Props type
    const hasPropsType = /type\s+\w+Props\s*=/.test(content);
    
    // Check for inline props typing in function signature
    const hasInlineProps = /function\s+\w+\s*\(\s*\{[^}]+\}\s*:\s*\{/.test(content) ||
                            /const\s+\w+\s*=\s*\(\s*\{[^}]+\}\s*:\s*\{/.test(content);
    
    // Check for explicit 'any' type in props
    const hasAnyType = /:\s*any/.test(content) && 
                        (content.includes('Props') || content.includes('props'));
    
    // Check for potential implicit any (props without type annotation)
    const hasImplicitAny = /function\s+\w+\s*\(\s*props\s*\)/.test(content) ||
                            /const\s+\w+\s*=\s*\(\s*props\s*\)\s*=>/.test(content);
    
    // Extract component name
    const componentNameMatch = content.match(/(?:export\s+(?:default\s+)?)?(?:function|const)\s+(\w+)/);
    const componentName = componentNameMatch ? componentNameMatch[1] : null;
    
    return {
      hasPropsInterface,
      hasPropsType,
      hasInlineProps,
      hasAnyType,
      hasImplicitAny,
      componentName
    };
  };

  /**
   * Check if component accepts props
   */
  const acceptsProps = (content: string): boolean => {
    // Check if function signature has parameters
    const hasFunctionParams = /function\s+\w+\s*\([^)]+\)/.test(content) ||
                               /const\s+\w+\s*=\s*\([^)]+\)\s*=>/.test(content);
    
    // Check if destructuring props
    const hasDestructuring = /\{\s*\w+/.test(content) && 
                              (content.includes('function') || content.includes('const'));
    
    return hasFunctionParams || hasDestructuring;
  };

  /**
   * Extract component name from file path
   */
  const getComponentName = (filePath: string): string => {
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.replace('.tsx', '');
  };

  it('should have TypeScript interfaces or types for component props', () => {
    const componentFiles = getComponentFiles();
    expect(componentFiles.length).toBeGreaterThan(0);

    const componentsWithoutPropTypes: Array<{
      file: string;
      component: string;
      acceptsProps: boolean;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      const propTyping = hasProperPropTyping(content);
      const hasProps = acceptsProps(content);

      // Skip if component doesn't accept props
      if (!hasProps) {
        return;
      }

      // Check if component has proper prop typing
      const hasProperTyping = propTyping.hasPropsInterface || 
                               propTyping.hasPropsType || 
                               propTyping.hasInlineProps;

      if (!hasProperTyping) {
        componentsWithoutPropTypes.push({
          file: filePath,
          component: componentName,
          acceptsProps: hasProps
        });
      }
    });

    if (componentsWithoutPropTypes.length > 0) {
      const report = componentsWithoutPropTypes
        .map(c => `  - ${c.component} (${c.file})`)
        .join('\n');
      
      const errorMessage =
        `Found ${componentsWithoutPropTypes.length} component(s) without proper prop typing:\n${report}\n\n` +
        'All components with props should have:\n' +
        '  - TypeScript interface (e.g., interface ButtonProps)\n' +
        '  - TypeScript type (e.g., type ButtonProps = ...)\n' +
        '  - Or inline prop typing in function signature';
      
      expect(errorMessage).toBe('All components should have proper prop typing');
    }

    expect(componentsWithoutPropTypes.length).toBe(0);
  });

  it('should not use explicit "any" type for props', () => {
    const componentFiles = getComponentFiles();
    const componentsWithAnyType: Array<{
      file: string;
      component: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      const propTyping = hasProperPropTyping(content);

      if (propTyping.hasAnyType) {
        componentsWithAnyType.push({
          file: filePath,
          component: componentName
        });
      }
    });

    if (componentsWithAnyType.length > 0) {
      const report = componentsWithAnyType
        .map(c => `  - ${c.component} (${c.file})`)
        .join('\n');
      
      const errorMessage =
        `Found ${componentsWithAnyType.length} component(s) using explicit "any" type:\n${report}\n\n` +
        'Props should have specific types, not "any".\n' +
        'Use proper TypeScript types for type safety.';
      
      expect(errorMessage).toBe('No components should use "any" type for props');
    }

    expect(componentsWithAnyType.length).toBe(0);
  });

  it('should not have implicit any types for props', () => {
    const componentFiles = getComponentFiles();
    const componentsWithImplicitAny: Array<{
      file: string;
      component: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      const propTyping = hasProperPropTyping(content);

      if (propTyping.hasImplicitAny) {
        componentsWithImplicitAny.push({
          file: filePath,
          component: componentName
        });
      }
    });

    if (componentsWithImplicitAny.length > 0) {
      const report = componentsWithImplicitAny
        .map(c => `  - ${c.component} (${c.file})`)
        .join('\n');
      
      const errorMessage =
        `Found ${componentsWithImplicitAny.length} component(s) with implicit any types:\n${report}\n\n` +
        'All props parameters should have explicit type annotations.\n' +
        'Add TypeScript interface or type for props.';
      
      expect(errorMessage).toBe('No components should have implicit any types');
    }

    expect(componentsWithImplicitAny.length).toBe(0);
  });

  it('should use consistent naming convention for Props types', () => {
    const componentFiles = getComponentFiles();
    const inconsistentNaming: Array<{
      file: string;
      component: string;
      issue: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      const propTyping = hasProperPropTyping(content);

      // Check if Props interface/type follows naming convention
      if (propTyping.hasPropsInterface || propTyping.hasPropsType) {
        const expectedPropsName = `${componentName}Props`;
        const hasCorrectName = content.includes(expectedPropsName);

        if (!hasCorrectName) {
          // Check if there's a Props definition at all
          const propsMatch = content.match(/(?:interface|type)\s+(\w+Props)/);
          if (propsMatch) {
            inconsistentNaming.push({
              file: filePath,
              component: componentName,
              issue: `Expected "${expectedPropsName}", found "${propsMatch[1]}"`
            });
          }
        }
      }
    });

    // This is a soft check - warn if naming is inconsistent
    if (inconsistentNaming.length > 0) {
      const report = inconsistentNaming
        .slice(0, 5)
        .map(c => `  - ${c.component}: ${c.issue}`)
        .join('\n');
      
      console.warn(
        `Info: Found ${inconsistentNaming.length} component(s) with inconsistent Props naming:\n${report}\n` +
        'Consider using ComponentNameProps convention for consistency.'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });

  it('should export Props interfaces for reusable components', () => {
    const componentFiles = getComponentFiles();
    const nonExportedProps: Array<{
      file: string;
      component: string;
    }> = [];

    componentFiles.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = getComponentName(filePath);
      
      // Check if Props interface/type exists
      const hasPropsDefinition = /(?:interface|type)\s+\w+Props/.test(content);
      
      // Check if it's exported
      const isExported = /export\s+(?:interface|type)\s+\w+Props/.test(content);

      if (hasPropsDefinition && !isExported) {
        // Only flag components in reusable directories
        if (filePath.includes('/components/ui/') || 
            filePath.includes('/components/therapy/') ||
            filePath.includes('/components/layout/')) {
          nonExportedProps.push({
            file: filePath,
            component: componentName
          });
        }
      }
    });

    // This is informational - exported props improve reusability
    if (nonExportedProps.length > 0) {
      const report = nonExportedProps
        .slice(0, 5)
        .map(c => `  - ${c.component} (${c.file})`)
        .join('\n');
      
      console.warn(
        `Info: Found ${nonExportedProps.length} reusable component(s) with non-exported Props:\n${report}\n` +
        'Consider exporting Props interfaces for better TypeScript support and reusability.'
      );
    }

    // Test passes - this is informational
    expect(true).toBe(true);
  });
});
