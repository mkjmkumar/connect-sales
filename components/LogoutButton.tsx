import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
}