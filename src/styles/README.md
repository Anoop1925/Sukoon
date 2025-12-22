# CSS Modules Configuration

This project supports CSS Modules for component-specific styling alongside Tailwind CSS for utility-first styling.

## Usage

### CSS Modules

Create a CSS Module file with the `.module.css` extension:

```css
/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.primary {
  background-color: #0ea5e9;
  color: white;
}

.secondary {
  background-color: #d946ef;
  color: white;
}
```

Import and use in your component:

```tsx
import styles from './Button.module.css';

export function Button({ variant = 'primary' }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      Click me
    </button>
  );
}
```

### Combining with Tailwind CSS

You can combine CSS Modules with Tailwind classes:

```tsx
import styles from './Card.module.css';

export function Card() {
  return (
    <div className={`${styles.card} p-4 rounded-lg shadow-md`}>
      <h2 className="text-xl font-bold">Title</h2>
      <p className={styles.description}>Description text</p>
    </div>
  );
}
```

## Best Practices

1. **Use Tailwind for utilities**: Use Tailwind classes for spacing, colors, typography, etc.
2. **Use CSS Modules for complex components**: Use CSS Modules for component-specific styles that are hard to express with utilities
3. **Keep it scoped**: CSS Modules automatically scope styles to prevent conflicts
4. **Use meaningful class names**: Since they're scoped, you can use simple, semantic names

## File Naming Convention

- Component styles: `ComponentName.module.css`
- Page styles: `page.module.css`
- Layout styles: `layout.module.css`

## Configuration

CSS Modules are automatically enabled in Next.js for files with the `.module.css` extension. No additional configuration is needed - Next.js processes CSS Module files out of the box and generates unique class names to prevent style conflicts.

Simply create a file with the `.module.css` extension and import it in your component to use CSS Modules.
