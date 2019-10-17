"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _task = require("../controllers/task.controller");

var router = (0, _express.Router)();
router.get('/', _task.getTasks);
router.get('/:id', _task.getTask);
router.get('/project/:projectid', _task.getTasksByProject);
router.post('/', _task.createTask);
router["delete"]('/:id', _task.deleteTask);
router.put('/:id', _task.updateTask);
var _default = router;
exports["default"] = _default;