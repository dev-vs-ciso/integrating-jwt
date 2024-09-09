import express from 'express';
import { generateJwt } from '../utils/jwt';
import { Login } from '../utils/user';
import { authenticate } from '../utils/db';

const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

router.get('/me', (req, res) => {
  if (!req.cookies.jwt) {
    console.error('No user cookie found');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log(`Found user cookie (it should be a JWT): ${req.cookies.user}`);
});

router.get('/secret', (req, res) => {
  if (!req.cookies.jwt) {
    console.error('No user cookie found');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log(`Found user cookie (it should be a JWT): ${req.cookies.user}`);
});

router.post('/login', async (req, res) => {
  const payload = req.body as Login;
  try {
    // locate user in "db"
    const user = authenticate(payload);
    if (!user) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const token = await generateJwt(user);
    res.header('Set-Cookie', `jwt=${token}; HttpOnly; Secure`);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: 'Failed to generate JWT' });
  }
});

export default router;