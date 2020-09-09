const { getNextStatus, getDefaultStatus } = require('./statuses.js');

const initialState = () => ({ title: 'Todo', list: [] })

let todo = initialState();

const currentState = (_req, res) => res.json(todo);

const removeTask = (req, res) => {
  const newList = todo.list.filter((item) => item.id != req.params.id);
  Object.assign(todo, { list: newList });
  res.json(todo);
};

const resetTodo = (_req, res) => {
  todo = initialState();
  res.json(todo);
};

const updateStatus = (req, res) => {
  const item = todo.list.find((item) => item.id == req.params.id);
  item.status = getNextStatus(item.status);
  res.json(todo);
};

const updateTitle = (req, res) => {
  todo.title = req.body.title;
  res.json(todo);
};

const addTask = (req, res) => {
  const { list } = todo;
  const id = list.length ? list[list.length - 1].id + 1 : 0;
  const item = { id: id, task: req.body.task, status: getDefaultStatus() };
  todo.list.push(item);
  res.json(todo);
};

module.exports = {
  initiateState,
  currentState,
  removeTask,
  resetTodo,
  updateStatus,
  updateTitle,
  addTask
};