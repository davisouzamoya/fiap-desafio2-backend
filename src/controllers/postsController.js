import postsModel from '../models/postsModel.js';
import user from '../models/user.js';

const listPosts = async (req, res) => {
  const posts = await postsModel.find();
  res.status(200).json({ posts });
};


const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await postsModel.findById(id);
    if (!post) {
        return res.status(404).json({ message: 'Post não encontrado' });
    }
    res.status(200).json({ post });
};

const createPost = async (req, res) => {
    const { titulo, conteudo, autor, email } = req.body;
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
        return res.status(404).json({ 
            message: 'Usuário não encontrado' 
        });
    }
    if (!existingUser.is_teacher) {
        return res.status(403).json({ 
            message: 'Permissão negada: apenas professores podem criar posts' 
        });
    }

    

    const newPost = await postsModel.create({ 
        titulo, 
        conteudo, 
        autor, 
        userId:existingUser._id 
    });
    res.status(201).json({ newPost });
};

const updatePost = async (req, res) => {
    const { id,titulo, conteudo, autor,email } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
        return res.status(404).json({ 
            message: 'Usuário não encontrado' 
        });
    }
    if (!existingUser.is_teacher) {
        return res.status(403).json({ 
            message: 'Permissão negada: apenas professores podem editar posts' 
        });
    }

    const updatedPost = await postsModel.findByIdAndUpdate(id, { 
      titulo, 
      conteudo, 
      autor, 
      userId:existingUser._id  
    }, { 
      new: true 
    });
    if (!updatedPost) {
        return res.status(404).json({ 
            message: 'Post não encontrado' 
        });
    }

    res.status(200).json({ updatedPost });
};


const deletePost = async (req, res) => {
    const { id } = req.params;

    const post = await postsModel.findById(id);
    if (!post) {
        return res.status(404).json({ 
            message: 'Post não encontrado' 
        });
    }

    const existingUser = await user.findById(post.userId);
    if (!existingUser) {
        return res.status(404).json({ 
            message: 'Usuário não encontrado' 
        });
    }
    if (!existingUser.is_teacher) {
        return res.status(403).json({ 
            message: 'Permissão negada: apenas professores podem excluir posts' 
        });
    }

    await postsModel.findByIdAndDelete(id);

    res.status(200).json({ 
        message: 'Post deletado com sucesso' 
    });
};


const searchPosts = async (req, res) => {
  const searchTerms = req.query.q.split(',');
  console.log('searchPosts');
  console.log('searchTerms: ' + searchTerms);

  const queryArr = searchTerms.map(term => ({
      $or: [
          { titulo: { $regex: term.trim(), $options: 'i' } },
          { conteudo: { $regex: term.trim(), $options: 'i' } }
      ]
  }));

  try {
      const posts = await postsModel.find({ $or: queryArr });
      console.log('results');
      console.log(posts);
      res.status(200).json({ posts });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar posts' });
  }
};



export default { listPosts, getPostById, createPost, updatePost, deletePost, searchPosts };
