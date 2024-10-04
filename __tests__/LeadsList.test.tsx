import { render, screen } from '@testing-library/react';
import LeadsList from '../components/LeadsList';
import { SWRConfig } from 'swr';

test('renders leads list', async () => {
  render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <LeadsList />
    </SWRConfig>
  );
  
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
});