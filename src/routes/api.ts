import express from 'express';
import { generateJwt, verifyJwt } from '../utils/jwt';
import { Login } from '../utils/user';
import { authenticate } from '../utils/db';

const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

router.get('/me', (req, res) => {
  if (!req.cookies.user) {
    console.error('No user cookie found');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log(`Found user cookie (it should be a JWT): ${req.cookies.user}`);
  const verification = verifyJwt(req.cookies.user);
  if (verification.status === 'failed') {
    return res.status(403).json({ error: 'Verification failed' });
  }

  res.send(verification.payload);
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
      return res.status(403).json({ error: 'No such user' });
    }

    const token = await generateJwt(user);
    res.header('Set-Cookie', `user=${token}; HttpOnly`);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: 'Failed to generate JWT' });
  }
});

export default router;