class ViewModel {
    constructor(model) {
        this.model = model;        
    }

    remove (task, cb) {
        console.log(`Удаляем: ${task}`);
        this.model.remove(task, () =>  {   
            cb(`удалили: '${task}'`);
        });

    }

    update ( { task, newtask }, cb ) {
        console.log(`Обновляем: ${task} --> ${newtask}`);
        this.model.update({task, newtask}, () => {
            cb(`изменили: '${task}' --> '${newtask}'`);
        });
    }

    getData() {
        return this.model.getAll();
    }

    add({task, done}) {
        this.model.add({task, done});
    }

    showModel() {
        this.model.show('model.current_list');
    }

    toggle(task, cb) {
        this.model.toggle(task);
        cb(`переключили: '${task}'`);
    }

}