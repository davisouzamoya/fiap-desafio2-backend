import { Schema,model } from 'mongoose';

const userSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true
    },
    is_teacher: {
        type: Boolean,
        default: true
    },password: { 
        type: String, 
        required: true,
    },createdAt:{
        type:Date,
        default:Date.now()
    }
});

export default model('usuarios',userSchema);
