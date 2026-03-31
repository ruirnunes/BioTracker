import type { Request, Response } from 'express';
import supabase from '../supabaseClient.js';

/**
 * LOGIN
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    // Authenticate user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Handle Supabase errors
    if (error) {
      console.log('LOGIN ERROR:', error);

      if (error.message.toLowerCase().includes('invalid')) {
        return res.status(401).json({
          message: 'Invalid email or password',
        });
      }

      return res.status(400).json({
        message: error.message,
      });
    }

    // Ensure session exists
    if (!data.session) {
      return res.status(401).json({
        message: 'Login failed. No session returned.',
      });
    }

    // Success response
    return res.status(200).json({
      user: data.user,
      session: data.session,
    });

  } catch (err) {
    console.error('LOGIN ERROR:', err);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/**
 * REGISTER
 */
export const register = async (req: Request, res: Response) => {
  console.log('BODY:', req.body);

  try {
    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || 'Anonymous',
        },
      },
    });

    // Handle Supabase errors (robust)
    if (error) {
      console.log('SUPABASE ERROR:', error);

      const msg = error.message.toLowerCase();

      if (msg.includes('already')) {
        return res.status(409).json({
          message: 'User already exists. Please login instead.',
        });
      }

      if (msg.includes('password')) {
        return res.status(400).json({
          message: 'Password does not meet security requirements.',
        });
      }

      if (msg.includes('email')) {
        return res.status(400).json({
          message: 'Invalid email format.',
        });
      }

      if (msg.includes('rate') || error.status === 429) {
        return res.status(429).json({
          message: 'Too many attempts. Please try again later.',
        });
      }

      return res.status(400).json({
        message: error.message || 'Registration failed',
      });
    }

    // Safety check
    if (!data.user) {
      return res.status(400).json({
        message: 'User creation failed',
      });
    }

    // Insert into users table (fallback if trigger fails)
    const { error: userError } = await supabase.from('users').insert([
      {
        id: data.user.id,
        name: name || 'Anonymous',
      },
    ]);

    if (userError) {
      console.error('USER INSERT ERROR:', userError.message);
    }

    // Success response (session may be null)
    return res.status(200).json({
      user: data.user,
      session: data.session ?? null,
    });

  } catch (err) {
    console.error('REGISTER ERROR:', err);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};