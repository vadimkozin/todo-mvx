let tasks = [
    {task:'Выспаться (mvp)', done: false},
    {task:'Еще раз (mvp)', done: false},
    {task:'Еще чуть-чуть (mvp)'}
];

const model = new Model(tasks);
const presenter = new Presenter(model);
const view = new View(presenter);

presenter.initialize(view);