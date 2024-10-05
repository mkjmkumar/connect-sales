import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const { data, error } = await supabase
      .from('loginme')
      .select('uuid')
    .eq('myusername', username.trim())
    .eq('isactive', 1)
    .eq('mypassword', password.trim())
      .single();

    if (error) throw error;

    if (data) {
      // Here you should implement proper password checking
      // For demonstration, we're just checking if the user exists
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
}
