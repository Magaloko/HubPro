import { useState, useMemo } from 'react'
import { Compass, TrendingUp, Zap, Copy, RefreshCw, Sparkles, Instagram, Linkedin, Facebook, Video, ArrowUpRight, Target, Lightbulb } from 'lucide-react'

const HOOK_FORMULAS = [
  { id: 'aida', name: 'AIDA', desc: 'Attention - Interest - Desire - Action', icon: Target },
  { id: 'pas', name: 'PAS', desc: 'Problem - Agitate - Solution', icon: Zap },
  { id: 'bab', name: 'BAB', desc: 'Before - After - Bridge', icon: ArrowUpRight },
  { id: 'fab', name: 'FAB', desc: 'Feature - Advantage - Benefit', icon: Lightbulb },
]

const VIRAL_HOOKS = [
  { id: 1, hook: 'Stoppt alles! Das müsst ihr sehen...', formula: 'aida', category: 'Aufmerksamkeit', platform: 'Instagram' },
  { id: 2, hook: '3 Fehler, die 90% aller Unternehmen machen (und wie du sie vermeidest)', formula: 'pas', category: 'Bildung', platform: 'LinkedIn' },
  { id: 3, hook: 'Vor 6 Monaten hatte ich 0 Follower. Heute: 50.000. Hier ist mein System:', formula: 'bab', category: 'Storytelling', platform: 'Instagram' },
  { id: 4, hook: 'Unpopuläre Meinung: Content Qualität > Content Quantität', formula: 'aida', category: 'Meinung', platform: 'LinkedIn' },
  { id: 5, hook: 'Das hat uns niemand gesagt, als wir gegründet haben...', formula: 'pas', category: 'Storytelling', platform: 'TikTok' },
  { id: 6, hook: 'POV: Du entdeckst den einfachsten Marketing-Hack aller Zeiten', formula: 'bab', category: 'Aufmerksamkeit', platform: 'TikTok' },
  { id: 7, hook: 'Warum verlierst du Follower? Die Antwort überrascht dich.', formula: 'pas', category: 'Bildung', platform: 'Instagram' },
  { id: 8, hook: 'Das Tool, das mein Business verändert hat (kein Clickbait)', formula: 'fab', category: 'Empfehlung', platform: 'LinkedIn' },
  { id: 9, hook: 'Speichere diesen Post - du wirst ihn brauchen!', formula: 'aida', category: 'Aufmerksamkeit', platform: 'Instagram' },
  { id: 10, hook: 'Die Wahrheit über Social Media, die niemand ausspricht:', formula: 'pas', category: 'Meinung', platform: 'TikTok' },
]

const TRENDING_TOPICS = [
  { id: 1, topic: 'KI im Content Marketing', platform: 'LinkedIn', volume: 12400, growth: 156, category: 'Technologie' },
  { id: 2, topic: 'Authentischer Content', platform: 'Instagram', volume: 8700, growth: 89, category: 'Strategie' },
  { id: 3, topic: 'Short-Form Video', platform: 'TikTok', volume: 45200, growth: 234, category: 'Format' },
  { id: 4, topic: 'Personal Branding 2024', platform: 'LinkedIn', volume: 6300, growth: 67, category: 'Strategie' },
  { id: 5, topic: 'UGC Marketing', platform: 'Instagram', volume: 15800, growth: 123, category: 'Strategie' },
  { id: 6, topic: 'Community Building', platform: 'Facebook', volume: 4200, growth: 45, category: 'Engagement' },
  { id: 7, topic: 'Micro-Influencer', platform: 'Instagram', volume: 9100, growth: 78, category: 'Kooperation' },
  { id: 8, topic: 'LinkedIn Carousel', platform: 'LinkedIn', volume: 7500, growth: 112, category: 'Format' },
]

const platformIconMap = { Instagram, LinkedIn: Linkedin, Facebook, TikTok: Video }
const platformColorMap = { Instagram: 'text-pink-500', LinkedIn: 'text-blue-600', Facebook: 'text-blue-500', TikTok: 'text-gray-800 dark:text-gray-200' }

export default function SocialDiscovery() {
  const [activeTab, setActiveTab] = useState('trends')
  const [filterFormula, setFilterFormula] = useState('all')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [copiedId, setCopiedId] = useState(null)

  const filteredHooks = useMemo(() => {
    return VIRAL_HOOKS.filter(h => {
      const matchesFormula = filterFormula === 'all' || h.formula === filterFormula
      const matchesPlatform = filterPlatform === 'all' || h.platform === filterPlatform
      return matchesFormula && matchesPlatform
    })
  }, [filterFormula, filterPlatform])

  const copyHook = (hook) => {
    navigator.clipboard?.writeText(hook.hook)
    setCopiedId(hook.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-brand-600 to-purple-600">
        <div className="flex items-center gap-3 mb-2">
          <Compass className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">Social Discovery Engine</h2>
        </div>
        <p className="text-brand-100 text-sm">
          Entdecke Trends, generiere Viral Hooks und finde datengetriebene Inspiration für deinen Content.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'trends', label: 'Trending Topics', icon: TrendingUp },
          { id: 'hooks', label: 'Viral Hooks', icon: Zap },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-brand-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Trending Topics */}
      {activeTab === 'trends' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRENDING_TOPICS.map((topic) => {
            const PIcon = platformIconMap[topic.platform] || Compass
            return (
              <div key={topic.id} className="card p-4 hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="badge bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">{topic.category}</span>
                  <PIcon className={`w-4 h-4 ${platformColorMap[topic.platform]}`} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 transition-colors">
                  {topic.topic}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{topic.volume.toLocaleString('de-DE')} Mentions</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    +{topic.growth}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Viral Hooks */}
      {activeTab === 'hooks' && (
        <div className="space-y-4">
          {/* Formula cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HOOK_FORMULAS.map(({ id, name, desc, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setFilterFormula(filterFormula === id ? 'all' : id)}
                className={`card p-3 text-left transition-all ${filterFormula === id ? 'ring-2 ring-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'hover:shadow-md'}`}
              >
                <Icon className={`w-5 h-5 mb-2 ${filterFormula === id ? 'text-brand-600' : 'text-gray-400'}`} />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select value={filterPlatform} onChange={e => setFilterPlatform(e.target.value)} className="input w-auto">
              <option value="all">Alle Plattformen</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="TikTok">TikTok</option>
            </select>
          </div>

          {/* Hooks list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredHooks.map((hook) => {
              const PIcon = platformIconMap[hook.platform] || Sparkles
              return (
                <div key={hook.id} className="card p-4 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <PIcon className={`w-4 h-4 ${platformColorMap[hook.platform]}`} />
                        <span className="badge bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 uppercase text-[10px]">
                          {hook.formula}
                        </span>
                        <span className="text-xs text-gray-400">{hook.category}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                        "{hook.hook}"
                      </p>
                    </div>
                    <button
                      onClick={() => copyHook(hook)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-brand-600 transition-colors shrink-0"
                      title="Kopieren"
                    >
                      {copiedId === hook.id ? (
                        <span className="text-green-500 text-xs font-medium">Kopiert!</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
