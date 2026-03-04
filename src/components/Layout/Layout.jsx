import Sidebar from './Sidebar'
import Header from './Header'
import Notifications from '../shared/Notifications'
import { useApp } from '../../contexts/AppContext'

export default function Layout({ children }) {
  const { sidebarOpen } = useApp()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <Header />
      <main className={`pt-16 min-h-screen transition-all ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
      <Notifications />
    </div>
  )
}
