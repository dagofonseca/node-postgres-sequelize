import { Router } from 'express';
import { createProject, getProjects, getProject, deleteProject, updateProject } from "../controllers/project.controller";

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;