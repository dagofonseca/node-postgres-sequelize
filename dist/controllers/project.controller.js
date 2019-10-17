"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjects = getProjects;
exports.getProject = getProject;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;

var _Project = _interopRequireDefault(require("../models/Project"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getProjects(req, res) {
  _Project["default"].findAll().then(function (projects) {
    return res.json({
      message: "".concat(projects.length, " found"),
      data: projects
    });
  })["catch"](function (error) {
    return res.status(500).send(error.name);
  });
}

function getProject(req, res) {
  var id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).send('Invalid Id.');
  }

  _Project["default"].findOne({
    where: {
      id: id
    }
  }).then(function (project) {
    return res.json({
      message: "project found",
      data: project
    });
  })["catch"](function (error) {
    return res.status(500).send(error.name);
  });
}

function createProject(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      priority = _req$body.priority,
      description = _req$body.description,
      deliverydate = _req$body.deliverydate;

  _Project["default"].create({
    name: name,
    priority: priority,
    description: description,
    deliverydate: deliverydate
  }, {
    fields: ['name', 'priority', 'description', 'deliverydate']
  }).then(function (newProject) {
    if (newProject) {
      res.json({
        message: "Project created succesfully",
        data: newProject
      });
    }
  })["catch"](function (error) {
    res.status(500).send(error.name);
  });
}

function updateProject(req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      name = _req$body2.name,
      priority = _req$body2.priority,
      description = _req$body2.description,
      deliverydate = _req$body2.deliverydate;

  if (isNaN(id)) {
    return res.status(400).send('Invalid Id.');
  }

  _Project["default"].findOne({
    attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
    where: {
      id: id
    }
  }).then(function (project) {
    project.update({
      name: name,
      priority: priority,
      description: description,
      deliverydate: deliverydate
    });
    res.json({
      message: 'Project updated succesfully',
      data: project
    });
  })["catch"](function (error) {
    return res.status(500).send(error.name);
  });
}

function deleteProject(req, res) {
  var id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).send('Invalid Id.');
  }

  _Project["default"].destroy({
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