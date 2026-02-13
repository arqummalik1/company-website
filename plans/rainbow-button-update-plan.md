# Rainbow Border Button Update Plan

## Overview
Update the `RainbowBorderButton` component to have an animated rainbow border effect that matches the site's theme colors (blue → cyan → emerald spectrum).

## Current Implementation Issues
- The current button uses a simple gradient background
- No animated border effect
- Doesn't match the provided rainbow border specification

## Implementation Plan

### 1. Update RainbowBorderButton Component
**File:** `src/components/ui/RainbowBorderButton.tsx`

Changes needed:
- Add relative positioning and z-index for pseudo-element layering
- Use a dark/semi-transparent background for the button itself
- Create the rainbow border using CSS custom properties or inline styles
- The rainbow gradient should use theme colors: blue (#0066FF) → cyan (#06b6d4) → emerald (#10b981)

### 2. Add CSS Animation Keyframes
**File:** `src/index.css`

Add the rainbow animation keyframe:
```css
@keyframes rainbow-border {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 3. Color Scheme
Use theme-consistent colors for the rainbow:
- Primary: `#0066FF` (accent blue)
- Secondary: `#06b6d4` (cyan)  
- Tertiary: `#10b981` (emerald)
- Additional: `#8b5cf6` (purple for transition)
- Highlight: `#f472b6` (pink for visual interest)

This creates a cohesive gradient that matches the tech-forward theme.

### 4. Component Structure
```tsx
<button className="rainbow-border-button">
  <span className="content">{children}</span>
</button>

// CSS approach using pseudo-elements
.rainbow-border-button::before {
  // Animated gradient border
  background: linear-gradient(90deg, var(--accent), var(--cyan), var(--emerald), var(--cyan), var(--accent));
  background-size: 200% auto;
  animation: rainbow-border 3s linear infinite;
}

.rainbow-border-button::after {
  // Blur/glow effect
  filter: blur(12px);
}
```

### 5. Files to Modify
1. `src/components/ui/RainbowBorderButton.tsx` - Component logic and structure
2. `src/index.css` - Add animation keyframes and utility classes

### 6. Testing Checklist
- [ ] Button displays correctly in navbar (desktop)
- [ ] Button displays correctly in mobile menu
- [ ] Animation works in light mode
- [ ] Animation works in dark mode
- [ ] Hover states work correctly
- [ ] Focus states are accessible
- [ ] Animation respects `prefers-reduced-motion`

## Technical Notes
- The provided component uses `styled-jsx` but we'll use Tailwind CSS + custom CSS for consistency with the existing codebase
- The blur effect on `::after` creates a glow effect behind the button
- The animation should be smooth and performant using CSS transforms
