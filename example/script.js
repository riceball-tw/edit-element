import { EditElement } from '../dist/index.mjs'

const editables = new EditElement(`[data-target]`, {
  onEnter: (element) => {
    console.log('enter', element.textContent);
  },
  onSubmit: (element) => {
    console.log('submit', element.textContent);
  },
  onLeave: (element) => {
    console.log('leave', element.textContent);
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

