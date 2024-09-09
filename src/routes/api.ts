import express from 'express';
import { generateJwt, verifyJwt } from '../utils/jwt';
import { Login, User } from '../utils/user';
import { authenticate, users } from '../utils/db';
import { omit } from '../utils/utils';

const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

router.get('/me', (req, res) => {
  // get the jwt from the request

  // if there is no jwt, return 401

  // if there is a jwt, verify it

  // if the verification fails, return 403

  // if the verification succeeds, return the user data
});

router.get('/secret', (req, res) => {
  // get the jwt from the request

  // if there is no jwt, return 401

  // if there is a jwt, verify it

  // if the verification fails, return 403

  // if the verification succeeds, fetch the full user data, and return the secret
});

router.post('/login', async (req, res) => {
  const payload = req.body as Login;
  try {
    // locate user in "db"

    // if there is no user, return 403 / 404

    // use the user data to generate a JWT

    // send the JWT to the client
  } catch (error) {
    res.status(400).json({ error: 'Failed to generate JWT' });
  }
});

export default router;