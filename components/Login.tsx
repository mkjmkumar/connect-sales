import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from('loginme')
        .select('*');
      console.log('Test query result:', { data, error });
    }
    testConnection();
  }, []);

  useEffect(() => {
    async function testInsert() {
      const { data, error } = await supabase
        .from('loginme')
        .insert({ username: 'test_user', usurped: 'test_password' })
        .select();
      console.log('Test insert result:', { data, error });
    }
    testInsert();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    console.log('Attempting login with username:', username);

    try {
      // First, get all rows
      const { data: allData, error: allError } = await supabase
        .from('loginme')
        .select('*');

      console.log('All data in loginme table:', allData);

      if (allError) throw allError;

      // Then, try to find the specific username
      const { data, error } = await supabase
        .from('loginme')
        .select('*')
        .eq('username', username.trim());

      console.log('Supabase response for specific username:', { data, error });

      if (error) throw error;

      if (data && data.length > 0) {
        console.log('Matching data found:', data);
        setMessage('DB Connection working - Username found');
      } else {
        console.log('No matching data found');
        setMessage('Username not found');
      }
    } catch (error) {
      console.error('Full error object:', error);
      setMessage(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </div>
        </form>
        {message && <p className={`mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
      </div>
    </div>
  );
}