"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _project = require("../controllers/project.controller");

var router = (0, _express.Router)();
router.get('/', _project.getProjects);
router.get('/:id', _project.getProject);
router.post('/', _project.createProject);
router.put('/:id', _project.updateProject);
router["delete"]('/:id', _project.deleteProject);
var _default = router;
exports["default"] = _default;