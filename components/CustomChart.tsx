import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: '# of Leads',
      data: [12, 19, 3],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor:'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

function CustomChart() {
  return <Bar data={data} />;
}

export default CustomChart;