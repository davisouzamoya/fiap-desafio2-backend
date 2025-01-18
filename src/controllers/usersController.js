import user from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
const { hash,compare } = bcryptjs;


const listUsers = async (req, res) => {
  const usuarios = await user.find();
  res.status(200).json({ usuarios });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const usuario = await user.findById(id);
  if (!usuario) {
      return res.status(404).json({ 
        message: 'Usuário não encontrado' 
      });
  }

  res.status(200).json({ usuario });
};

const updateUser = async (req, res) => {
  const { id,nome } = req.body;

  if (!id || !nome ) {
      return res.status(400).json({ 
        message: 'Nome, email e senha são obrigatórios' 
      });
  }
  

  const usuario = await user.findByIdAndUpdate(id, { 
      nome   
  }, { new: true });

  if (!usuario) {
      return res.status(404).json({ 
        message: 'Usuário não encontrado' 
      });
  }

  res.status(200).json({ usuario });
};

const createUser = async (req, res) => {
    const { nome, email, password, is_teacher } = req.body;

    if (!nome || !email || !password) {
        return res.status(400).json({ 
          message: 'Nome, email e senha são obrigatórios' 
        });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ 
          message: 'Email já cadastrado' 
        });
    }

    const hashedPassword = await hash(password, 8);

    const novoUsuario = await user.create({ 
        nome, 
        email, 
        password:hashedPassword, 
        is_teacher 
    });

    res.status(201).json({ novoUsuario });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const usuario = await user.findByIdAndDelete(id);
    if (!usuario) {
        return res.status(404).json({ 
          message: 'Usuário não encontrado' 
        });
    }

    res.status(200).json({ 
      message: 'Usuário deletado com sucesso' 
    });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if ( !email || !password) {
      return res.status(400).json({ 
        message: 'email e senha são obrigatórios' 
      });
  }

  const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ 
        message: 'Usuário não encontrado' 
      });
    }

    const passwordMatched = await compare(password, existingUser.password);

    if (!passwordMatched) {
      return res.status(401).json({ 
        message: 'Email ou senha incorretas' 
      });
    }


    const token = jwt.sign({}, 'f67c2bcbfcfa30fccb36f72dca22a817', {
      subject: existingUser._id.toString(),
      expiresIn: '1d',
    });

    return res.status(401).json({ 
      token
    });
};

export default { 
  listUsers, 
  getUserById, 
  updateUser, 
  createUser, 
  deleteUser,
  loginUser
};
