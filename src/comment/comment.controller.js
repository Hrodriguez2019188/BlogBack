import comment from '../comment/comment.model.js';
import Project from '../models/project.js';
import mongoose from 'mongoose';


export const addComment = async (req, res) => {
    try {
        const { projectId, nombre, descripcion } = req.body; // Agrega título y descripción desde el cuerpo de la solicitud

        // Crea un nuevo comentario utilizando el modelo userHasComment
        const nuevoComentario = new comment({
            project: projectId,
            nombre: nombre, // Asigna el título proporcionado
            descripcion: descripcion // Asigna la descripción proporcionada
        });

        await nuevoComentario.save(); // Guarda el nuevo comentario en la base de datos

        res.status(200).json({
            msg: 'Comentario enviado',
            comentario: nuevoComentario, // Devuelve el comentario creado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};


export const getCommentsByProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Verifica que projectId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                msg: 'ProjectId no es válido'
            });
        }

        // Busca los comentarios asociados al proyecto
        const comentarios = await comment.find({ project: projectId });

        // Verifica si hay comentarios
        if (comentarios.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron comentarios para este proyecto'
            });
        }

        // Devuelve los comentarios encontrados
        res.status(200).json({
            comentarios,
        });
    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
        res.status(500).json({
            msg: 'Error del servidor, hable con el administrador',
        });
    }
};