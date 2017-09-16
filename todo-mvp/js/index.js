let tasks = [
    {task:'Выспаться', done: false},
    {task:'Еще раз выспаться', done: false},
    {task:'Еще чуть-чуть'}
];

const model = new Model(tasks);
const presenter = new Presenter(model);
const view = new View(presenter);

presenter.initialize(view);