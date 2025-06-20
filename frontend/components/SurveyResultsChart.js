import { forwardRef } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Paleta de colores para los gráficos
const CHART_COLORS = {
  background: [
    'rgba(79, 70, 229, 0.6)',   // Índigo
    'rgba(16, 185, 129, 0.6)',  // Verde
    'rgba(245, 158, 11, 0.6)',  // Amarillo
    'rgba(239, 68, 68, 0.6)',   // Rojo
    'rgba(139, 92, 246, 0.6)',  // Morado
    'rgba(236, 72, 153, 0.6)',  // Rosa
    'rgba(14, 165, 233, 0.6)',  // Azul Cielo
    'rgba(34, 197, 94, 0.6)',   // Esmeralda
  ],
  border: [
    'rgba(79, 70, 229, 1)',     // Índigo
    'rgba(16, 185, 129, 1)',    // Verde
    'rgba(245, 158, 11, 1)',    // Amarillo
    'rgba(239, 68, 68, 1)',     // Rojo
    'rgba(139, 92, 246, 1)',    // Morado
    'rgba(236, 72, 153, 1)',    // Rosa
    'rgba(14, 165, 233, 1)',    // Azul Cielo
    'rgba(34, 197, 94, 1)',     // Esmeralda
  ]
};

// Colores y estilos del gráfico
const TEXT_COLOR = '#e5e7eb';    // gris-300
const GRID_COLOR = '#374151';    // gris-700
const TOOLTIP_BG = '#1f2937';    // gris-800
const FONT_SIZE = 12;

// Configuración visual
const THEME = {
  textColor: TEXT_COLOR,
  gridColor: GRID_COLOR,
  tooltipBg: TOOLTIP_BG,
  font: { size: FONT_SIZE }
};

// Procesa los datos de la pregunta para el gráfico
const getChartData = (question, chartType) => {
  const labels = question.options.map(opt => opt.text);
  const data = question.options.map(opt => opt.votes);
  const totalVotes = data.reduce((sum, votes) => sum + votes, 0);

  // Múltiples colores solo para gráficos de sector circular
  const useMultipleColors = chartType === 'doughnut';
  const backgroundColor = useMultipleColors 
    ? CHART_COLORS.background.slice(0, data.length)
    : CHART_COLORS.background[0];
  
  const borderColor = useMultipleColors
    ? CHART_COLORS.border.slice(0, data.length)
    : CHART_COLORS.border[0];

  return {
    labels,
    datasets: [{
      label: `Respuestas (Total: ${totalVotes})`,
      data,
      backgroundColor,
      borderColor,
      borderWidth: 1,
      tension: 0.4,
    }],
  };
};

// Configuración base para todos los gráficos
const getBaseOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: THEME.textColor,
        font: THEME.font
      }
    },
    title: { display: false },
    tooltip: {
      backgroundColor: THEME.tooltipBg,
      titleColor: THEME.textColor,
      bodyColor: THEME.textColor,
      borderColor: THEME.gridColor,
      borderWidth: 1
    }
  },
});

// Configuración específica para gráficos de barras
const getAxisOptions = () => ({
  scales: {
    x: {
      ticks: {
        color: THEME.textColor,
        font: THEME.font
      },
      grid: {
        color: THEME.gridColor,
        borderColor: THEME.gridColor
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        color: THEME.textColor,
        font: THEME.font
      },
      grid: {
        color: THEME.gridColor,
        borderColor: THEME.gridColor
      }
    }
  }
});

// Genera las opciones para el grafico circular (el de barras va por defecto)
const getChartOptions = (chartType) => {
  const baseOptions = getBaseOptions();

  if (chartType === 'doughnut') {
    return {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        legend: {
          position: 'bottom',
          labels: {
            color: THEME.textColor,
            font: THEME.font,
            padding: 20
          }
        },
      },
    };
  }

  return {
    ...baseOptions,
    ...getAxisOptions()
  };
};

// Contenedor con altura fija para el gráfico
const ChartContainer = ({ children }) => (
  <div style={{ height: '400px' }}>
    {children}
  </div>
);

// Componente principal del gráfico de resultados
const SurveyResultsChart = forwardRef(({ question, chartType }, ref) => {
  const data = getChartData(question, chartType);
  const options = getChartOptions(chartType);

  // Renderiza el tipo de gráfico correspondiente
  const renderChart = () => {
    const chartProps = { ref, data, options };

    switch (chartType) {
      case 'doughnut':
        return <Doughnut {...chartProps} />;
      case 'bar':
      default:
        return <Bar {...chartProps} />;
    }
  };

  return (
    <ChartContainer>
      {renderChart()}
    </ChartContainer>
  );
});

SurveyResultsChart.displayName = 'SurveyResultsChart';

export default SurveyResultsChart; 