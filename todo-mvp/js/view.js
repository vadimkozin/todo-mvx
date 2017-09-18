class View {
    constructor(presenter) {
        this.presenter = presenter;

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
        this.presenter.getData().forEach(o => this.add(o, false));

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
            this.presenter.add({task, done});
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

        this.message = `добавили: '${title}'`;

    }

    remove(todoItem) {
        this.presenter.remove(todoItem.title, (message) => {
            this.todoList.removeChild(todoItem.element);
            todoItem.destroy();
            todoItem = null;
            this.message = message;               
        });        
    }

    update(task, newtask) {
        this.presenter.update({task, newtask}, (message) => {
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
        this.presenter.toggle(task, (message) => this.message = message);
    }

    // buttons for debug
    showListModel() {
        this.presenter.showModel();
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
