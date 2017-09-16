class Controller {
    initialize(model, view) {
        this.model = model;
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

    toggle(task, cb) {
        console.log(`Переключаем: '${task}'`);
        this.model.toggle(task);
        cb(`переключили: '${task}'`);
    }

}