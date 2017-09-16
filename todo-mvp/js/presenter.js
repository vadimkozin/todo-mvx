class Presenter {
    constructor(model) {
        this.model = model;        
    }

    initialize(view) {
        this.view = view;
    }

    remove (task, cb) {
        console.log(`Удаляем: '${task}'`);
        this.model.remove(task, () =>  {   
            cb(`удалили: '${task}'`);
        });

    }

    update ( { task, newtask }, cb ) {
        console.log(`Обновляем: '${task}' --> '${newtask}'`);
        this.model.update({task, newtask}, () => {
            cb(`'${task}' --> '${newtask}'`);
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
        console.log(`Переключаем: '${task}'`);
        this.model.toggle(task);
        cb(`переключили: '${task}'`);
    }

}