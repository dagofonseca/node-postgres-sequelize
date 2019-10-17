import { Router } from 'express';
import { createTask, getTask, getTasksByProject,
    getTasks, updateTask, deleteTask } from "../controllers/task.controller";

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTask);
router.get('/project/:projectid', getTasksByProject);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

export default router;