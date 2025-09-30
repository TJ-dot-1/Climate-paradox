import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { climateDataAPI } from '../utils/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const Data = () => {
  const [climateData, setClimateData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClimateData();
  }, []);

  const fetchClimateData = async () => {
    try {
      setLoading(true);
      const [dataRes, categoriesRes] = await Promise.all([
        climateDataAPI.getAll(),
        climateDataAPI.getCategories()
      ]);
      
      setClimateData(dataRes.data.data);
      setCategories(categoriesRes.data.data);
    } catch (error) {
      console.error('Error fetching climate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = selectedCategory === 'all' 
    ? climateData 
    : climateData.filter(item => item.category === selectedCategory);

  const renderChart = (dataItem, index) => {
    const chartData = {
      labels: dataItem.dataPoints.map(dp => dp.label),
      datasets: [
        {
          label: dataItem.title,
          data: dataItem.dataPoints.map(dp => dp.value),
          backgroundColor: dataItem.dataPoints.map(dp => dp.color || getRandomColor()),
          borderColor: dataItem.dataPoints.map(dp => dp.color || getRandomColor()),
          borderWidth: 2,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: dataItem.title,
        },
      },
    };

    switch (dataItem.visualizationType) {
      case 'line':
        return <Line key={index} data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie key={index} data={chartData} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut key={index} data={chartData} options={chartOptions} />;
      case 'radar':
        return <Radar key={index} data={chartData} options={chartOptions} />;
      default:
        return <Bar key={index} data={chartData} options={chartOptions} />;
    }
  };

  const getRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#FFE66D', '#6A0572', '#1A535C',
      '#FF9F1C', '#2EC4B6', '#E71D36', '#011627', '#FDFFFC'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) {
    return <div className="loading">Loading climate data...</div>;
  }

  return (
    <div className="container">
      <div className="hero-section">
        <h1>Climate Data & Analysis</h1>
        <p>Explore the numbers behind Kenya's climate paradox</p>
      </div>

      {/* Category Filter */}
      <section style={{ marginBottom: '2rem' }}>
        <div className="card">
          <h3>Filter by Category</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Data
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Grid */}
      <section>
        <div className="grid grid-2">
          {filteredData.map((dataItem, index) => (
            <div key={index} className="chart-container">
              {renderChart(dataItem, index)}
              <div style={{ marginTop: '1rem' }}>
                <p><strong>Description:</strong> {dataItem.description}</p>
                <p><strong>Source:</strong> {dataItem.source}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>No data found</h3>
            <p>Try selecting a different category or check back later for more data.</p>
          </div>
        )}
      </section>

      {/* Key Insights */}
      <section style={{ marginTop: '3rem' }}>
        <div className="card">
          <h2>Key Insights</h2>
          <div className="grid grid-2">
            <div>
              <h3>🌍 The Paradox</h3>
              <ul style={{ lineHeight: '1.8' }}>
                <li>Kenya contributes less than 0.1% of global greenhouse gas emissions</li>
                <li>Yet it ranks among the most vulnerable countries to climate change</li>
                <li>This represents a fundamental climate injustice</li>
              </ul>
            </div>
            <div>
              <h3>💡 The Solution</h3>
              <ul style={{ lineHeight: '1.8' }}>
                <li>Massive potential for renewable energy (geothermal, wind, solar)</li>
                <li>Climate-smart agriculture practices</li>
                <li>International climate finance and technology transfer</li>
                <li>Community-based adaptation strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Data;