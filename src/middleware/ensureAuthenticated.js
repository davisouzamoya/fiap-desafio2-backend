import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader

  try {
    const decoded = jwt.verify(token, 'f67c2bcbfcfa30fccb36f72dca22a817');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default ensureAuthenticated;