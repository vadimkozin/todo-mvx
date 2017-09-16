class Model {
    constructor(listTasks) {
        this.store = {};
        this.addList(listTasks);
    }

    add({task, done = true}) {
        this.store[task] = done;
        return this;
    }

    addList(listTasks) {
        listTasks.forEach(o => {
            this.add({task: o.task, done: o.done});
        });
        return this;
    }

    get(task) {
        return this.store[task];
    }

    getAll() {

        let items = [];

        for (let p in this.store) {
            items.push({task: p, done: this.store[p]});
        }

        return items;
    }

    getAllObj() {
        return this.store;
    }

    update({task, newtask}, cb) {
        let done = this.store[task];
        if (done !== undefined) {
            this.remove(task);
            this.add({task:newtask, done});
        }
        if (cb) cb();
        return this;
    }

    remove(task, cb) {
        delete this.store[task];
        if (cb) cb();
        return this;
    }

    toggle(task) {
        if (this.store[task] !== undefined) {
            this.store[task] = !this.store[task];
        }
        return this;
    }

    show(msg) {
        console.log(`${msg} :`,  this.getAllObj());
    }
    
}