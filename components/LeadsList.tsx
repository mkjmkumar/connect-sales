import useSWR from "swr";
import { useStore } from "../store/useStore";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function LeadsList() {
  const { data, error } = useSWR("/api/leads", fetcher);
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');

  if (error) return <div>Failed to load leads</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {/* View Toggle Buttons */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setViewMode('list')} className={`mr-2 ${viewMode === 'list' ? 'active-class' : ''}`}>List View</button>
        <button onClick={() => setViewMode('board')} className={`${viewMode === 'board' ? 'active-class' : ''}`}>Board View</button>
      </div>
      
      {viewMode === 'list' ? (
        // ... Existing List View Code with added filters and pagination ...
        <ul>
          {data.map((lead) => (
            <li key={lead.id}>{lead.name}</li>
          ))}
        </ul>
      ) : (
        // ... Implement Board View with Kanban ...
        <div>Board View</div>
      )}
    </>
  );
}

export default LeadsList;