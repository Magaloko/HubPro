import { useMemo } from 'react'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { TrendingUp, Users, Eye, Heart, Share2, MessageCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { analyticsData } from '../../data/mockData'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler)

const statCards = [
  { label: 'Gesamtreichweite', value: analyticsData.overview.totalReach, format: (v) => v.toLocaleString('de-DE'), icon: Eye, change: '+12.4%', positive: true, color: 'bg-blue-500' },
  { label: 'Social Posts', value: analyticsData.overview.totalPosts, format: (v) => v, icon: Share2, change: '+8', positive: true, color: 'bg-purple-500' },
  { label: 'Blog-Artikel', value: analyticsData.overview.totalArticles, format: (v) => v, icon: MessageCircle, change: '+3', positive: true, color: 'bg-green-500' },
  { label: 'Avg. Engagement', value: analyticsData.overview.avgEngagement, format: (v) => v + '%', icon: Heart, change: '+0.5%', positive: true, color: 'bg-pink-500' },
]

export default function PerformanceDashboard() {
  // Reach trend chart
  const reachChartData = useMemo(() => ({
    labels: analyticsData.monthlyGrowth.map(d => d.month),
    datasets: [
      {
        label: 'Reichweite',
        data: analyticsData.monthlyGrowth.map(d => d.reach),
        borderColor: '#4c6ef5',
        backgroundColor: 'rgba(76, 110, 245, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#4c6ef5',
      },
    ],
  }), [])

  const reachChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `Reichweite: ${ctx.parsed.y.toLocaleString('de-DE')}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (v) => (v / 1000) + 'K',
          color: '#9ca3af',
        },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
      x: {
        ticks: { color: '#9ca3af' },
        grid: { display: false },
      },
    },
  }

  // Platform doughnut
  const platformChartData = useMemo(() => ({
    labels: analyticsData.platformBreakdown.map(p => p.platform),
    datasets: [{
      data: analyticsData.platformBreakdown.map(p => p.reach),
      backgroundColor: analyticsData.platformBreakdown.map(p => p.color),
      borderWidth: 0,
      hoverOffset: 8,
    }],
  }), [])

  const platformChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#9ca3af', padding: 16, usePointStyle: true },
      },
    },
    cutout: '65%',
  }

  // Weekly engagement bar chart
  const weeklyChartData = useMemo(() => ({
    labels: analyticsData.weeklyData.map(d => d.day),
    datasets: [
      {
        label: 'Posts',
        data: analyticsData.weeklyData.map(d => d.posts),
        backgroundColor: 'rgba(76, 110, 245, 0.7)',
        borderRadius: 6,
      },
      {
        label: 'Engagement %',
        data: analyticsData.weeklyData.map(d => d.engagement),
        backgroundColor: 'rgba(168, 85, 247, 0.7)',
        borderRadius: 6,
      },
    ],
  }), [])

  const weeklyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#9ca3af', padding: 16, usePointStyle: true },
      },
    },
    scales: {
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
      x: {
        ticks: { color: '#9ca3af' },
        grid: { display: false },
      },
    },
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, format, icon: Icon, change, positive, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{format(value)}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reach trend - 2 cols */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Reichweiten-Entwicklung</h3>
          <div className="h-64">
            <Line data={reachChartData} options={reachChartOptions} />
          </div>
        </div>

        {/* Platform breakdown */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Plattform-Verteilung</h3>
          <div className="h-64">
            <Doughnut data={platformChartData} options={platformChartOptions} />
          </div>
        </div>
      </div>

      {/* Weekly activity */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Wöchentliche Aktivität</h3>
        <div className="h-64">
          <Bar data={weeklyChartData} options={weeklyChartOptions} />
        </div>
      </div>

      {/* Platform detail table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Plattform-Details</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Plattform</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase px-4 py-3">Posts</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase px-4 py-3">Engagement</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase px-4 py-3">Reichweite</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {analyticsData.platformBreakdown.map((p) => (
              <tr key={p.platform} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{p.platform}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">{p.posts}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">{p.engagement}%</td>
                <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-white">{p.reach.toLocaleString('de-DE')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
