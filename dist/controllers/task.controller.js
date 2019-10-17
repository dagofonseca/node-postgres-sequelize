"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTasks = getTasks;
exports.getTask = getTask;
exports.getTasksByProject = getTasksByProject;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;

var _Task = _interopRequireDefault(require("../models/Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTasks(req, res) {
  _Task["default"].findAll({
    order: [['name']]
  }).then(function (tasks) {
    return res.json({
      message: "".concat(tasks.length, " found"),
      data: tasks
    });
  })["catch"](function (error) {
    return res.status(500).send(error);
  });
}

function getTask(req, res) {
  var id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).send('Invalid Id.');
  }

  _Task["default"].findOne({
    where: {
      id: id
    }
  }).then(function (task) {
    return res.json({
      message: "Task found",
      data: task
    });
  })["catch"](function (error) {
    return res.status(500).send(error.name);
  });
}

function getTasksByProject(req, res) {
  var projectid = req.params.projectid;

  if (isNaN(projectid)) {
    return res.status(400).send('Invalid Id.');
  }

  _Task["default"].findAll({
    where: {
      projectid: projectid
    }
  }).then(function (tasks) {
    return res.json({
      message: "".concat(tasks.length, " tasks found"),
      data: tasks
    });
  })["catch"](function (error) {
    return res.status(500).send(error.name);
  });
}

function createTask(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      done = _req$body.done,
      projectid = _req$body.projectid;

  _Task["default"].create({
    name: name,
    projectid: projectid,
    done: done
  }, {
    fields: ['name', 'done', 'projectid']
  }).then(function (newTask) {
    if (newTask) {
      res.json({
        message: "Task created succesfully",
        data: newTask
      });
    }
  })["catch"](function (error) {
    res.status(500).send(error.name);
  });
}

function updateTask(req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      name = _req$body2.name,
      done = _req$body2.done,
      projectid = _req$body2.projectid;

  if (isNaN(id)) {
    return res.status(400).send('Invalid Id.');
  }

  _Task["default"].findOne({
    attributes: ['id', 'name', 'done', 'projectid'],
    where: {
      id: id
    }
  }).then(function (task) {
    task.update({
      name: name,
      done: done,
      projectid: projectid
    });
    res.json({
      message: 'Task updated succesfully',
      data: task
    });
  })["catch"](function (error) {
    return res.status(500).send(error.name);
  });
}

function deleteTask(req, res) {
  var id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).send('Invalid Id.');
  }

  _Task["default"].destroy({
    where: {
      id: id
    }
  }).then(function (deleteCount) {
    return res.json({
      message: " ".concat(deleteCount, " deleted")
    });
  })["catch"](function (error) {
    return res.status(500).send(error.name);
  });
}