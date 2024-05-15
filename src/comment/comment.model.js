import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({

    project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: false
    },

    nombre: {
        type: String,
        required: [true, 'No puede comentar sin texto']
    },

    descripcion: {
        type: String,
        required: [true, 'No puede comentar sin texto']
    },
    
});

export default mongoose.model('comment', commentSchema);