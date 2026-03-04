import { useState, useCallback } from 'react'
import { AppProvider, useApp, VIEWS } from './contexts/AppContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout/Layout'
import LoginPage from './components/Auth/LoginPage'
import SocialHub from './components/SocialMedia/SocialHub'
import SEOHub from './components/SEO/SEOHub'
import SocialDiscovery from './components/Discovery/SocialDiscovery'
import KeywordExplorer from './components/Discovery/KeywordExplorer'
import PerformanceDashboard from './components/Analytics/PerformanceDashboard'
import PostAnalytics from './components/Analytics/PostAnalytics'
import { socialPosts as initialPosts, seoArticles as initialArticles } from './data/mockData'

function AppContent() {
  const { user, isClient } = useAuth()
  const { currentView, addNotification } = useApp()

  // State for data
  const [posts, setPosts] = useState(initialPosts)
  const [articles, setArticles] = useState(initialArticles)

  const handleUpdatePost = useCallback((updatedPost) => {
    setPosts(prev => {
      const exists = prev.find(p => p.id === updatedPost.id)
      if (exists) {
        return prev.map(p => p.id === updatedPost.id ? updatedPost : p)
      }
      return [updatedPost, ...prev]
    })
    addNotification({ type: 'success', message: 'Post erfolgreich gespeichert' })
  }, [addNotification])

  const handleUpdateArticle = useCallback((updatedArticle) => {
    setArticles(prev => {
      const exists = prev.find(a => a.id === updatedArticle.id)
      if (exists) {
        return prev.map(a => a.id === updatedArticle.id ? updatedArticle : a)
      }
      return [updatedArticle, ...prev]
    })
    addNotification({ type: 'success', message: 'Artikel erfolgreich gespeichert' })
  }, [addNotification])

  if (!user) return <LoginPage />

  const renderView = () => {
    switch (currentView) {
      case VIEWS.SOCIAL_DISCOVERY:
        return <SocialDiscovery />
      case VIEWS.KEYWORD_EXPLORER:
        return <KeywordExplorer />
      case VIEWS.SOCIAL_HUB:
        return <SocialHub posts={posts} onUpdatePost={handleUpdatePost} isClient={isClient} />
      case VIEWS.SEO_CONTENT:
        return <SEOHub articles={articles} onUpdateArticle={handleUpdateArticle} isClient={isClient} />
      case VIEWS.DASHBOARD:
        return <PerformanceDashboard />
      case VIEWS.POST_ANALYTICS:
        return <PostAnalytics posts={posts} />
      default:
        return <PerformanceDashboard />
    }
  }

  return (
    <Layout>
      {renderView()}
    </Layout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  )
}
