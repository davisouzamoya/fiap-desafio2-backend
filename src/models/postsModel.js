import { Schema,model } from 'mongoose';

const postSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default model('posts',postSchema);
