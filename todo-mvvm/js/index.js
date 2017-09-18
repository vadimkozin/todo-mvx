let tasks = [
    {task:'Выспаться (mvvm)', done: false},
    {task:'Еще раз (mvvm)', done: false},
    {task:'Еще чуть-чуть (mvvm)'}
];
const model = new Model(tasks);
const viewModel = new ViewModel(model);
const view = new View(viewModel);