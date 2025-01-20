import user from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;

// Chave secreta consistente com o middleware
const SECRET_KEY = 'f67c2bcbfcfa30fccb36f72dca22a817';

const listUsers = async (req, res) => {
  try {
    const usuarios = await user.find();
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await user.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, nome } = req.body;

    if (!id || !nome) {
      return res.status(400).json({ message: 'ID e nome são obrigatórios' });
    }

    const usuario = await user.findByIdAndUpdate(id, { nome }, { new: true });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nome, email, password, is_teacher } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await hash(password, 8);

    const novoUsuario = await user.create({
      nome,
      email,
      password: hashedPassword,
      is_teacher,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', novoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await user.findByIdAndDelete(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const passwordMatched = await compare(password, existingUser.password);

    if (!passwordMatched) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
};

export default {
  listUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
  loginUser,
};
