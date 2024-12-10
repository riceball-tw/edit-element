import { EditElement } from '../dist/index.mjs'

const editables = new EditElement(`[data-target]`, {
  onEnter: (element) => {
    element.setAttribute('data-entered', '')
  },
  onSubmit: (element) => {
    element.setAttribute('data-submitted', '')
  },
  onLeave: (element) => {
    element.setAttribute('data-leave', '')
  },
  editingElementClassName: 'active',
  // submitKey : 'Enter'
});

// Destory All Editable Element Button
document.querySelector(`[data-destroy-button]`).addEventListener("click", () => {
  editables.destroyAllEditable()
})

// Destory {target querySelector string} Editable Element Button 
document.querySelector(`[data-destroy-specific-button]`).addEventListener("click", () => {
  editables.destroyTargetEditable(`[data-target-bar]`)
})

