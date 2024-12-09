interface Options {
  onEnter?: (element: HTMLElement) => void;
  onSubmit?: (element: HTMLElement) => void;
  onLeave?: (element: HTMLElement) => void;
  editingElementClassName?: string;
  submitKey?: string;
}

type EditableElementsMap = Map<HTMLElement, { 
  focus: (event: FocusEvent) => void; 
  blur: (event: FocusEvent) => void;
  keydown: (event: KeyboardEvent) => void;
}>

export class EditElement {
  private selector: string;
  private options: Options;
  private editableElementsMap: EditableElementsMap = new Map();

  constructor(selector: string, options: Options) {
    this.selector = selector;
    this.options = { ...{ submitKey: 'Enter' }, ...options };
    this.init();
  }

  /**
   * Grab and Setup target Elements
   */
  private init() {
    document.querySelectorAll(this.selector).forEach((element) => {

      // Make Sure element exist
      if (!(element instanceof HTMLElement)) return;

      // Apply Event Listeners to Elements
      const focusListener = () => this.enterEditing(element);
      const keydownListener = (event: KeyboardEvent) => this.submitEditing(element, event);
      const blurListener = () => this.leaveEditing(element);
      element.addEventListener('focus', focusListener);
      element.addEventListener('blur', blurListener);
      element.addEventListener('keydown', keydownListener);
  
      // Record element as Key and Event Listeners as Value, in Map
      this.editableElementsMap.set(element, {
        focus: focusListener,
        blur: blurListener,
        keydown: keydownListener
      });
  
      // Toggle some Accessability attrs
      element.setAttribute('contenteditable', 'true');
      element.setAttribute('role', 'textbox');
      element.setAttribute('aria-editable', 'true');
      element.setAttribute('tabindex', '0');
    });
  }

  /**
   * When enter(focus) editable
   */
  private enterEditing(element: HTMLElement) {
    element.setAttribute('aria-busy', 'true');
   
    if (this.options.editingElementClassName) {
      element.classList.add(this.options.editingElementClassName);
    }
   
    this.options.onEnter?.(element);
  }

   /**
   * When submit(specific key pressed) editable
   */
  private submitEditing(element: HTMLElement, event: KeyboardEvent) {
    if (event.key === this.options.submitKey) {
      event.preventDefault();
      this.options.onSubmit?.(element);
    }
  }

   /**
   * When leave(blur - unfocus) editable
   */
  private leaveEditing(element: HTMLElement) {
    element.setAttribute('aria-busy', 'false');
    if (this.options.editingElementClassName) {
      element.classList.remove(this.options.editingElementClassName);
    }
    this.options.onLeave?.(element);
  }

  /**
   * Remove editable attrs and records by element
   */
  private removeEditableByElement(element: HTMLElement) {
    const listeners = this.editableElementsMap.get(element);
    if (listeners) {
      element.removeEventListener('focus', listeners.focus);
      element.removeEventListener('blur', listeners.blur);
      element.removeEventListener('keydown', listeners.keydown);
      this.editableElementsMap.delete(element);
    }
    ['contenteditable', 'role', 'aria-editable', 'tabindex', 'aria-busy'].forEach(attr => element.removeAttribute(attr));
  }

  /**
   * Remove all editable attrs and record
   */
  public destroyAllEditable() {
    this.editableElementsMap.forEach((_, element) => {
      this.removeEditableByElement(element)
    });
  }

  /**
   * Remove {target querySelector string} editable attrs and record
   */
  public destroyTargetEditable(selector: string) {
    for (let element of this.editableElementsMap.keys()) {
      if (element.matches(selector)) {
        this.removeEditableByElement(element);
      }
    }
  }
}

export default EditElement;