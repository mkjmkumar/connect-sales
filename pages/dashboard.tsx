import { withAuth } from '../components/withAuth';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Dashboard content */}
    </div>
  );
}

export default withAuth(Dashboard);