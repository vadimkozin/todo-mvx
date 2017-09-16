let tasks = [
    {task:'Выспаться', done: false},
    {task:'Еще раз выспаться', done: false},
    {task:'Еще чуть-чуть'}
];

const model = new Model(tasks);
const controller = new Controller();
const view = new View(model, controller);

controller.initialize(model, view);