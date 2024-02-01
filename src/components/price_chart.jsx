import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PriceChart(props) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price History',
      },
    },
  };

  const data = {
    labels:  props.labels,
    datasets: [
    {
      label: "Price",
      data: props.data,
      borderColor: '#000000',
    }]
  }

  return(
    <div style={{ position: "relative", height: "100%" }}>
      <Line options={options} data={data} />
    </div>
    );
}
