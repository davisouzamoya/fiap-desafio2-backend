import postsModel from '../models/postsModel.js';
import user from '../models/user.js';

const listPosts = async (req, res) => {
  try {
    const posts = await postsModel.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar posts', error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar post', error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { titulo, conteudo, autor, email } = req.body;
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (!existingUser.is_teacher) {
      return res.status(403).json({ message: 'Permissão negada: apenas professores podem criar posts' });
    }

    const newPost = await postsModel.create({
      titulo,
      conteudo,
      autor,
      userId: existingUser._id,
    });
    
    res.status(201).json({ message: 'Post criado com sucesso', newPost });
  } catch (error) {
    
    res.status(500).json({ message: 'Erro ao criar post', error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id, titulo, conteudo, autor, email } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (!existingUser.is_teacher) {
      return res.status(403).json({ message: 'Permissão negada: apenas professores podem editar posts' });
    }

    const updatedPost = await postsModel.findByIdAndUpdate(
      id,
      { titulo, conteudo, autor },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    res.status(200).json({ message: 'Post atualizado com sucesso', updatedPost });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar post', error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postsModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    await postsModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar post', error: error.message });
  }
};

const searchPosts = async (req, res) => {
  try {
    const searchTerms = req.query.q || '';
    const queryArr = searchTerms.split(',').map((term) => ({
      $or: [
        { titulo: { $regex: term.trim(), $options: 'i' } },
        { conteudo: { $regex: term.trim(), $options: 'i' } },
      ],
    }));

    const posts = await postsModel.find({ $and: queryArr });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar posts', error: error.message });
  }
};

export default { listPosts, getPostById, createPost, updatePost, deletePost, searchPosts };
