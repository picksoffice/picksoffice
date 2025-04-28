# PicksOffice Button System Documentation

This document outlines the unified button system for the PicksOffice application. The button system provides consistency across the application while allowing for flexibility in different contexts.

## Button Component

The Button component is the main building block of the button system. It's highly customizable and supports various variants, colors, sizes, and states.

### Basic Usage

```jsx
import { Button } from '@/components/ui/button'

// Primary button (default)
<Button>Click me</Button>

// With variants
<Button variant="secondary">Secondary Button</Button>
<Button variant="tertiary">Tertiary Button</Button>
<Button variant="ghost">Ghost Button</Button>

// With different colors
<Button color="blue">Blue Button</Button>
<Button color="green">Green Button</Button>
<Button color="red">Red Button</Button>

// With different sizes
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
<Button size="xl">Extra Large Button</Button>

// Link button
<Button href="/path">Link Button</Button>

// Full width button
<Button fullWidth>Full Width Button</Button>

// Loading state
<Button isLoading>Loading...</Button>

// Disabled state
<Button disabled>Disabled Button</Button>
```

### Button Variants

1. **Primary (default)** - Filled background with white text
   ```jsx
   <Button variant="primary">Primary Button</Button>
   ```

2. **Secondary** - Outline with colored text
   ```jsx
   <Button variant="secondary">Secondary Button</Button>
   ```

3. **Tertiary** - No background, no border, just text with hover underline
   ```jsx
   <Button variant="tertiary">Tertiary Button</Button>
   ```

4. **Ghost** - Transparent background with hover effect
   ```jsx
   <Button variant="ghost">Ghost Button</Button>
   ```

### Button Colors

1. **Indigo (default)**
   ```jsx
   <Button color="indigo">Indigo Button</Button>
   ```

2. **Blue**
   ```jsx
   <Button color="blue">Blue Button</Button>
   ```

3. **Green**
   ```jsx
   <Button color="green">Green Button</Button>
   ```

4. **Red**
   ```jsx
   <Button color="red">Red Button</Button>
   ```

5. **Gray** (Only available for ghost variant)
   ```jsx
   <Button variant="ghost" color="gray">Gray Ghost Button</Button>
   ```

### Button Sizes

1. **Small**
   ```jsx
   <Button size="sm">Small Button</Button>
   ```

2. **Medium (default)**
   ```jsx
   <Button size="md">Medium Button</Button>
   ```

3. **Large**
   ```jsx
   <Button size="lg">Large Button</Button>
   ```

4. **Extra Large**
   ```jsx
   <Button size="xl">Extra Large Button</Button>
   ```

### Special States

1. **Loading**
   ```jsx
   <Button isLoading>Loading...</Button>
   ```

2. **Disabled**
   ```jsx
   <Button disabled>Disabled Button</Button>
   ```

3. **Full Width**
   ```jsx
   <Button fullWidth>Full Width Button</Button>
   ```

## IconButton Component

For icon-only buttons, use the IconButton component:

```jsx
import { IconButton } from '@/components/ui/button'
import { PlusIcon } from '@heroicons/react/24/outline'

<IconButton aria-label="Add item" variant="ghost">
  <PlusIcon className="h-5 w-5" />
</IconButton>
```

### IconButton Sizes

```jsx
<IconButton aria-label="Small icon" size="sm">
  <PlusIcon className="h-4 w-4" />
</IconButton>

<IconButton aria-label="Medium icon" size="md">
  <PlusIcon className="h-5 w-5" />
</IconButton>

<IconButton aria-label="Large icon" size="lg">
  <PlusIcon className="h-6 w-6" />
</IconButton>
```

## Button Usage Guidelines

1. **Primary Buttons** - Use for main actions (Submit, Save, Continue)
2. **Secondary Buttons** - Use for alternative actions (Cancel, Back, Reset)
3. **Tertiary Buttons** - Use for navigation or less important actions
4. **Ghost Buttons** - Use for contextual actions or toolbar buttons

## Color Usage Guidelines

1. **Indigo** - Default brand color, use for most buttons
2. **Blue** - Use for informational actions or alternative brand color
3. **Green** - Use for positive actions (Success, Confirm, Accept)
4. **Red** - Use for destructive actions (Delete, Remove, Cancel)
5. **Gray** - Use for neutral actions in ghost variant

## Accessibility

- Always include `aria-label` for IconButtons
- Use appropriate color contrast for all buttons
- Ensure focus states are visible
- Use disabled state appropriately and provide feedback when needed

## Examples of Common Patterns

### Form Submission

```jsx
<Button type="submit" isLoading={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save Changes'}
</Button>
```

### Action Buttons

```jsx
<div className="flex space-x-4">
  <Button variant="primary" color="green">Save</Button>
  <Button variant="secondary" color="red">Cancel</Button>
</div>
```

### Icon with Text

```jsx
<Button>
  <PlusIcon className="h-5 w-5 mr-2" />
  Add Item
</Button>
```

### Link Button

```jsx
<Button href="/dashboard" variant="tertiary">
  Go to Dashboard
</Button>
```

# PicksOffice Authentication Commands

This is important information for Claude Code to make sure authentication works correctly in this project.

## To run the backend server (Strapi)
```
cd backend
npm run develop
```

## To run the frontend (Next.js)
```
cd frontend
npm run dev
```

- analysiere und scanne das gesamte Projekt und sage mir was noch fehlt, welche verbesserung man machen könnte und was essenziell noch ist