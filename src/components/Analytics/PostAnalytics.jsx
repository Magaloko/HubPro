import { useState, useMemo } from 'react'
import { Instagram, Linkedin, Facebook, Video, Eye, Heart, Share2, MessageCircle, ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, Filter } from 'lucide-react'

const platformIcons = { Instagram, LinkedIn: Linkedin, Facebook, TikTok: Video }
const platformColors = {
  Instagram: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20',
  LinkedIn: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
  Facebook: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  TikTok: 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700',
}

export default function PostAnalytics({ posts }) {
  const [sortBy, setSortBy] = useState('reach')
  const [filterPlatform, setFilterPlatform] = useState('all')

  const publishedPosts = useMemo(() => {
    return posts
      .filter(p => p.stage >= 5 && p.metrics)
      .filter(p => filterPlatform === 'all' || p.platform === filterPlatform)
      .sort((a, b) => (b.metrics[sortBy] || 0) - (a.metrics[sortBy] || 0))
  }, [posts, sortBy, filterPlatform])

  const totalMetrics = useMemo(() => {
    return publishedPosts.reduce((acc, p) => ({
      likes: acc.likes + (p.metrics.likes || 0),
      shares: acc.shares + (p.metrics.shares || 0),
      comments: acc.comments + (p.metrics.comments || 0),
      reach: acc.reach + (p.metrics.reach || 0),
    }), { likes: 0, shares: 0, comments: 0, reach: 0 })
  }, [publishedPosts])

  return (
    <div className="space-y-6">
      {/* Total metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Reichweite', value: totalMetrics.reach, icon: Eye, color: 'text-blue-600' },
          { label: 'Likes', value: totalMetrics.likes, icon: Heart, color: 'text-pink-600' },
          { label: 'Shares', value: totalMetrics.shares, icon: Share2, color: 'text-green-600' },
          { label: 'Kommentare', value: totalMetrics.comments, icon: MessageCircle, color: 'text-purple-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{value.toLocaleString('de-DE')}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={filterPlatform} onChange={e => setFilterPlatform(e.target.value)} className="input w-auto">
          <option value="all">Alle Plattformen</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Facebook">Facebook</option>
          <option value="TikTok">TikTok</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input w-auto">
          <option value="reach">Nach Reichweite</option>
          <option value="likes">Nach Likes</option>
          <option value="shares">Nach Shares</option>
          <option value="comments">Nach Kommentaren</option>
        </select>
      </div>

      {/* Post cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publishedPosts.map((post, index) => {
          const PIcon = platformIcons[post.platform] || Eye
          const totalEngagement = (post.metrics.likes || 0) + (post.metrics.shares || 0) + (post.metrics.comments || 0)
          const engagementRate = post.metrics.reach > 0 ? ((totalEngagement / post.metrics.reach) * 100).toFixed(1) : 0

          return (
            <div key={post.id} className="card p-5 hover:shadow-md transition-all">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full ${platformColors[post.platform]}`}>
                  <PIcon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{post.platform}</span>
                </div>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.scheduledDate).toLocaleDateString('de-DE')}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-500 mb-4 line-clamp-2">{post.content}</p>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {[
                  { label: 'Reach', val: post.metrics.reach, icon: Eye },
                  { label: 'Likes', val: post.metrics.likes, icon: Heart },
                  { label: 'Shares', val: post.metrics.shares, icon: Share2 },
                  { label: 'Kommentare', val: post.metrics.comments, icon: MessageCircle },
                ].map(({ label, val, icon: MIcon }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <MIcon className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-500">{label}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{val.toLocaleString('de-DE')}</span>
                  </div>
                ))}
              </div>

              {/* Engagement rate */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500">Engagement Rate</span>
                <span className={`flex items-center gap-1 text-sm font-bold ${engagementRate > 5 ? 'text-green-600' : engagementRate > 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  {engagementRate}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {publishedPosts.length === 0 && (
        <div className="card p-12 text-center">
          <Eye className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Keine veröffentlichten Posts mit Metriken gefunden</p>
        </div>
      )}
    </div>
  )
}
