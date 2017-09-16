class View {
    constructor(viewModel) {
        this.viewModel = viewModel;

        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggle = this.toggle.bind(this);
                
        this.init();
    }

    init() {
        this.todoForm = document.getElementById('todo-form');
        this.addInput = document.getElementById('add-input');
        this.todoList = document.getElementById('todo-list');

        this.todoForm.addEventListener('submit', this.addTodoItem.bind(this));
        this.viewModel.getData().forEach(o => this.add(o, false));

        // buttons for debug
        this.listModelButton = document.getElementById('show-model-list');
        this.listUlButton = document.getElementById('show-ul-list');
        this.listModelButton.addEventListener('click', this.showListModel.bind(this));
        this.listUlButton.addEventListener('click', this.showListUL.bind(this));

        this.messageElement = document.getElementById('message');
        this.color_index = 0;
        this.colors = ['green', 'blue', 'grey', 'lightblue', 'brown', 'lime', 'limegreen', 'maroon', 'magenta'];
        
    }

    set message(text) {
        this.messageElement.textContent = text;
        this.messageElement.style.color = this.colors[this.color_index];
        if (++this.color_index === this.colors.length) {
            this.color_index = 0;
        }
    }

    add({task, done}, addToModel = true) {

        if (addToModel) {
            this.viewModel.add({task, done});
        }

        let todoItem = new TodoItem({task, done}, this.remove, this.update, this.toggle);
        this.todoList.appendChild(todoItem.element);
    }

    addTodoItem(event) {
        event.preventDefault();
    
        let title = this.addInput.value;
    
        if (title === '') {
            return alert('Необходимо ввести название задачи.');
        }

        this.add({task: title});
        this.addInput.value = '';

        this.message = `добавили: ${title}`;

    }

    remove(todoItem) {
        this.viewModel.remove(todoItem.title, (message) => {
            this.todoList.removeChild(todoItem.element);
            todoItem.destroy();
            todoItem = null; 
            this.message = message;               
        });        
    }

    update(task, newtask) {
        this.viewModel.update({task, newtask}, (message) => {
            const ul = this.todoList;
            for (let i=0; i< ul.childNodes.length; i++) {
                if (ul.childNodes[i].nodeName == "LI") {
                    let item = ul.childNodes[i].children[1].textContent;
                    if (item == task) {
                        item = newtask;                    
                    }
                }
            }
            this.message = message;
        });
    }

    toggle(task) {
        this.viewModel.toggle(task, (message) => {
            this.message = message;
        });
    }

    // buttons for debug
    showListModel() {
        this.viewModel.showModel();
    }

    showListUL() {
        let ul = this.todoList,
            list = [];

        for (let i = 0; i < ul.childNodes.length; i++) {
            if (ul.childNodes[i].nodeName == "LI") {
                let task = ul.childNodes[i].children[1].textContent;
                list.push(task);
            }
        }

        console.log(`ul.curren_list :`, list);    
    }
}
/////////////////////////////////////////////////////////
class TodoItem {
    constructor({task, done}, onDelete = () => {}, onUpdate = () => {}, onToggle = () => {}) {
        this.title = task;
        this.done = done;
        
        this.isEditing = false;
        this.onDelete = onDelete;
        this.onUpdate = onUpdate;
        this.onToggle = onToggle;
                
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.initialize();
    }

    initialize() {
        this.checkbox = createElement('input', { type: 'checkbox', className: 'checkbox', onchange: this.handleToggle });
        this.label = createElement('label', { className: 'title' }, this.title);
        this.editInput = createElement('input', { type: 'text', className: 'textfield' });
        this.editButton = createElement('button', { className: 'edit', onclick: this.handleEdit }, 'Изменить');
        this.deleteButton = createElement('button', { className: 'delete', onclick: this.handleDelete }, 'Удалить');
        let className = (this.done) ? 'todo-item completed' : 'todo-item';
        this.element = createElement('li', { className }, this.checkbox, this.label, this.editInput, this.editButton, this.deleteButton);
    }

    destroy() {
        this.checkbox.onchange = null;
        this.editButton.onclick = null;
        this.deleteButton.onclick = null;
    }

    handleEdit(event) {
        this.edit();
    }

    handleToggle(event) {
        this.toggle();
    }

    handleDelete(event) {
        this.onDelete(this);
    }
    
    edit() {
        if (this.isEditing) {
            this.isEditing = false;
            this.onUpdate(this.label.textContent, this.editInput.value);
            this.title = this.editInput.value; // !
            this.label.textContent = this.editInput.value;
            this.editButton.textContent = 'Изменить';
            this.element.classList.remove('editing');
            
        } else {
            this.isEditing = true;
            this.editInput.value = this.label.textContent;
            this.editButton.textContent = 'Сохранить';
            this.element.classList.add('editing'); 
        }
    }

    toggle() {
        this.element.classList.toggle('completed');
        //this.done = !this.done;
        this.onToggle(this.title);
    }
    
}
