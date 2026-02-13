import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Dashboard from './pages/Dashboard'
import PendingTasks from './pages/PendingTasks'
import MyTribes from './pages/MyTribes'
import FocusSessions from './pages/FocusSessions'
import Analytics from './pages/Analytics'

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container py-8">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/pending-tasks" element={<PendingTasks />} />
                    <Route path="/my-tribes" element={<MyTribes />} />
                    <Route path="/focus-sessions" element={<FocusSessions />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
