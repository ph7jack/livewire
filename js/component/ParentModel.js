export default class ParentModel {
    child = null
    parent = null
    parentModel = null

    constructor (child) {
        this.child = child
        this.parent = this.findParent(child)
        this.parentModel = child.getAttribute('wire:parent:model')
    }

    findParent (child) {
        return child.parentNode.closest('[wire\\:id]')
    }

    start () {
        this.child.__livewire.watch('model', value => {
            if (this.parent.__livewire.data[this.parentModel] != value) {
                console.log('child', value, this.parent.__livewire.data[this.parentModel])
                this.parent.__livewire.set(this.parentModel, value)
            }
        })

        this.parent.__livewire.watch(this.parentModel, value => {
            if (this.child.__livewire.data.model != value) {
                console.log('parent', value)
                this.child.__livewire.set('model', value)
            }
        })
    }
}
