# edit-element

A lightweight and flexible JavaScript/TypeScript library for adding in-place editing functionality to HTML elements.

## Features

- 🖊️ Make any HTML element in-place editable
- ⚙️ CSM and ESM and TypeScript support
- ⌨️ Configurable editing classname and submit shortcut key
- ♿ Built-in accessibility support
- 🔧 Flexible event callbacks

## Installation

```bash
npm install edit-element
```

## Basic Usage

```typescript
import { EditElement } from '../dist/index.mjs';

// Make all elements with .editable class in-place editable
const editableElements = new EditElement('.editable');
```

## Advanced Usage
```typescript
import EditElement from 'edit-element';

// Make all elements with .editable class editable
const editableElements = new EditElement('.editable', {
  onEnter: (element) => {
    console.log('Editing started', element);
  },
  onSubmit: (element) => {
    console.log('Edit submitted', element.textContent);
  },
  onLeave: (element) => {
    console.log('Editing ended', element);
  },
  editingElementClassName: 'editing',
  submitKey: 'Enter',
});
```

## Configuration Options

### `Options` Interface

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `onEnter` | `(element: HTMLElement) => void` | Optional | `undefined` | Callback function when editing starts |
| `onSubmit` | `(element: HTMLElement) => void` | Optional | `undefined` | Callback function when edit is submitted |
| `onLeave` | `(element: HTMLElement) => void` | Optional | `undefined` | Callback function when editing ends |
| `editingElementClassName` | `string` | Optional | `undefined` | CSS class name added during editing |
| `submitKey` | `string` | Optional | `'Enter'` | Key to trigger submission |

## Methods

### `destroyAllEditable()`
Remove all editable elements.

```typescript
editableElements.destroyAllEditable();
```

### `destroyTargetEditable(selector: string)`
Remove all editable elements by matching the specific querySelector query.

```typescript
editableElements.destroyTargetEditable('.specific-editable');
```

## License

MIT License

## Contributing

Issues and pull requests are welcome!
