import Task from "../models/Task";

export function getTasks(req, res) {
    Task.findAll({ order: [ 
            ['name']
        ]})
        .then(tasks => res.json({ message: `${tasks.length} found`, data: tasks }))
        .catch(error => res.status(500).send(error));
}

export function getTask(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send('Invalid Id.');
    }

    Task.findOne({ where: { id } })
        .then(task => res.json({ message: `Task found`, data: task }))
        .catch(error => res.status(500).send(error.name));
}

export function getTasksByProject(req, res) {
    const { projectid } = req.params;

    if (isNaN(projectid)) {
        return res.status(400).send('Invalid Id.');
    }

    Task.findAll({ where: { projectid } })
        .then(tasks => res.json({ message: `${tasks.length} tasks found`, data: tasks }))
        .catch(error => res.status(500).send(error.name));
}

export function createTask(req, res) {
    const { name, done, projectid } = req.body;
    Task.create({
        name,
        projectid,
        done,        
    }, {
        fields: ['name', 'done', 'projectid']
    }).then((newTask) => {
        if (newTask) {
            res.json({
                message: "Task created succesfully",
                data: newTask
            });
        }
    }).catch(error => {
        res.status(500).send(error.name);
    })
}

export function updateTask(req, res) {
    const { id } = req.params;
    const { name, done, projectid } = req.body;

    if (isNaN(id)) {
        return res.status(400).send('Invalid Id.');
    }

    Task.findOne({
        attributes: ['id', 'name', 'done', 'projectid'],
        where: { id } 
    })
        .then(task => {
            task.update({
                name,
                done,
                projectid
            })
            res.json({
                message: 'Task updated succesfully',
                data: task
            })
        })
        .catch(error => res.status(500).send(error.name));
}

export function deleteTask(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send('Invalid Id.');
    }

    Task.destroy({ where: { id } })
        .then(deleteCount => res.json({ message: ` ${deleteCount} deleted` }))
        .catch(error => res.status(500).send(error.name));
}