import React from 'react';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const thresholds = {
  temperature: 34,
  heartRate: 100,
  respirationRate: 20
};

const getColor = (value, threshold) => {
  return value > threshold ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)';
};

const VitalSignChart = ({ vitalSigns, loading }) => {
  const [chartData, setChartData] = useState({});

    useEffect(() => {
      const dates = vitalSigns.map(vs => format(new Date(vs.createdAt), 'PPpp'));
      const temperatures = vitalSigns.map(vs => parseFloat(vs.temperature));
      const heartRates = vitalSigns.map(vs => vs.heart_rate);
      const respirationRates = vitalSigns.map(vs => parseFloat(vs.respiration_rate));
  
      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointBackgroundColor: temperatures.map(temp => getColor(temp, thresholds.temperature)),
          },
          {
            label: 'Heart Rate (bpm)',
            data: heartRates,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            pointBackgroundColor: heartRates.map(hr => getColor(hr, thresholds.heartRate)),
          },
          {
            label: 'Respiration Rate (breaths/min)',
            data: respirationRates,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            pointBackgroundColor: respirationRates.map(rr => getColor(rr, thresholds.respirationRate)),
          },
        ]
      });
    }, [vitalSigns]);

  return (
    <div>
      {vitalSigns.length > 0 ? 
        <Line data={chartData} />
      :
      <Typography component="body2" variant="subtitle2" gutterBottom>
        No chart data available
      </Typography>
    }
    </div>
  );
};

export default VitalSignChart;