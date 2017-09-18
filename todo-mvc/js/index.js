let tasks = [
    {task:'Выспаться (mvc)', done: false},
    {task:'Еще раз (mvc)', done: false},
    {task:'Еще чуть-чуть (mvc)'}
];

const model = new Model(tasks);
const controller = new Controller();
const view = new View(model, controller);

controller.initialize(model, view);