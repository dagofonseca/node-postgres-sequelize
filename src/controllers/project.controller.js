import Project from "../models/Project";

export function getProjects(req, res) {
    Project.findAll()
        .then(projects => res.json({ message: `${projects.length} found`, data: projects }))
        .catch(error => res.status(500).send(error.name));
}

export function getProject(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send('Invalid Id.');
    }

    Project.findOne({ where: { id } })
        .then(project => res.json({ message: `project found`, data: project }))
        .catch(error => res.status(500).send(error.name));
}

export function createProject(req, res) {
    const { name, priority, description, deliverydate } = req.body;
    Project.create({
        name,
        priority,
        description,
        deliverydate
    }, {
        fields: ['name', 'priority', 'description', 'deliverydate']
    }).then((newProject) => {
        if (newProject) {
            res.json({
                message: "Project created succesfully",
                data: newProject
            });
        }
    }).catch(error => {
        res.status(500).send(error.name);
    })
}

export function updateProject(req, res) {
    const { id } = req.params;
    const { name, priority, description, deliverydate } = req.body;

    if (isNaN(id)) {
        return res.status(400).send('Invalid Id.');
    }

    Project.findOne({
        attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
        where: { id } 
    })
        .then(project => {
            project.update({
                name,
                priority,
                description,
                deliverydate
            })
            res.json({
                message: 'Project updated succesfully',
                data: project
            })
        })
        .catch(error => res.status(500).send(error.name));
}

export function deleteProject(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send('Invalid Id.');
    }

    Project.destroy({ where: { id } })
        .then(deleteCount => res.json({ message: ` ${deleteCount} deleted` }))
        .catch(error => res.status(500).send(error.name));
}