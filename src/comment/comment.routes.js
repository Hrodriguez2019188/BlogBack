import { validateFields } from '../middlewares/validateField.js';
import express from 'express';
import { check } from 'express-validator';
import {  addComment, getCommentsByProject } from '../comment/comment.controller.js'; 

const router = express.Router();



router.post('/', [
    check('projectId', 'El ID del post es requerido').notEmpty(),
    check('nombre', 'El ID del post es requerido').notEmpty(),
    check('descripcion', 'El ID del post es requerido').notEmpty(),
    validateFields
], addComment);

router.get('/:projectId', getCommentsByProject);


export default router;