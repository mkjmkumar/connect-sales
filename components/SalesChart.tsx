import dynamic from 'next/dynamic';

const DynamicSalesChart = dynamic(() => import('./SalesChart'), { ssr: false, loading: () => <p>Loading Chart...</p> });

function Dashboard() {
  return (
    <div>
      <DynamicSalesChart />
      {/* Other components */}
    </div>
  );
}

export default Dashboard;