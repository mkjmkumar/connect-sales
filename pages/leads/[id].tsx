import { useRouter } from 'next/router';
import { useStore } from '../../store/useStore';
import { useEffect } from 'react';

function ViewLead() {
  const router = useRouter();
  const { id } = router.query;
  const { leads, fetchLeadById } = useStore();

  useEffect(() => {
    if (id) {
      fetchLeadById(id as string);
    }
  }, [id]);

  const lead = leads.find(l => l.id === id);

  if (!lead) return <div>Loading...</div>;

  return (
    <div>
      <h1>{lead.name}</h1>
      {/* Display lead details */}
    </div>
  );
}

export default ViewLead;