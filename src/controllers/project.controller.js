import Project from '../models/project.js';


export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findByIdAndUpdate(projectId, { state: false }, { new: true });
        res.status(200).json(project);
    } catch (e) {
        res.status(500).json(`Error ${e}`);
    }
}


export const searchProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const projects = await Project.find({ _id: projectId, state: true });
        res.status(200).json(projects);
    } catch (e) {
        res.status(500).json(`Error ${e}`);
    }
}

export const createProject = async (req, res) => {
    try {
        const { title, description, code, authorName, image } = req.body;
        const project = new Project({ title, description, code, authorName, image });
        await project.save();

        res.status(201).json(project);
    } catch (e) {
        res.status(500).json(`Error ${e}`);
    }
}


export const editProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const { title, description, code } = req.body;

        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (code) updateFields.code = code;

        const project = await Project.findByIdAndUpdate(projectId, updateFields, { new: true });

        res.status(200).json(project);
    } catch (e) {
        res.status(500).json(`Error ${e}`);
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ state: true });
        res.status(200).json(projects);
    } catch (e) {
        res.status(500).json(`Error ${e}`);
    }
}


