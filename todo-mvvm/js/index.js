let tasks = [
    {task:'Выспаться', done: false},
    {task:'Еще раз выспаться', done: false},
    {task:'Еще чуть-чуть'}
];
const model = new Model(tasks);
const viewModel = new ViewModel(model);
const view = new View(viewModel);