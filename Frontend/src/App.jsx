import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { pageTransition } from './utils/animations'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  )
}

import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Trainers from './pages/Trainers'
import Membership from './pages/Membership'
import BMICalculator from './pages/BMICalculator'
import Workouts from './pages/Workouts'
import DietPlans from './pages/DietPlans'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import TrainerDashboard from './pages/TrainerDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageUsers from './pages/admin/ManageUsers'
import ManageTrainers from './pages/admin/ManageTrainers'
import ManagePlans from './pages/admin/ManagePlans'
import ManageBranches from './pages/admin/ManageBranches'
import ManageWorkouts from './pages/admin/ManageWorkouts'
import ManageDietPlans from './pages/admin/ManageDietPlans'
import ManageGallery from './pages/admin/ManageGallery'
import ManageTransfer from './pages/admin/ManageTransfer'
import ManageFooter from './pages/admin/ManageFooter'
import ManageLegal from './pages/admin/ManageLegal'
import ManageTestimonials from './pages/admin/ManageTestimonials'
import ManageActivities from './pages/admin/ManageActivities'
import ManageContent from './pages/admin/ManageContent'
import ManageNavbar from './pages/admin/ManageNavbar'
import ManageTheme from './pages/admin/ManageTheme'
import ManageMasterData from './pages/admin/ManageMasterData'
import ManagePayments from './pages/admin/ManagePayments'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Branches from './pages/Branches'
import ProtectedRoute from './components/shared/ProtectedRoute'
import AdminRoute from './components/shared/AdminRoute'
import TrainerRoute from './components/shared/TrainerRoute'

function App() {
  const location = useLocation()

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' },
          success: { iconTheme: { primary: 'rgb(var(--color-primary))', secondary: '#fff' } },
        }}
      />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<PageTransition><Home /></PageTransition>} />
            <Route path="about" element={<PageTransition><About /></PageTransition>} />
            <Route path="trainers" element={<PageTransition><Trainers /></PageTransition>} />
            <Route path="membership" element={<PageTransition><Membership /></PageTransition>} />
            <Route path="bmi-calculator" element={<PageTransition><BMICalculator /></PageTransition>} />
            <Route path="workouts" element={<PageTransition><Workouts /></PageTransition>} />
            <Route path="diet-plans" element={<PageTransition><DietPlans /></PageTransition>} />
            <Route path="gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="branches" element={<PageTransition><Branches /></PageTransition>} />
            <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
            <Route path="reset-password/:token" element={<PageTransition><ResetPassword /></PageTransition>} />
            <Route path="dashboard" element={<PageTransition><ProtectedRoute><UserDashboard /></ProtectedRoute></PageTransition>} />
            <Route path="trainer" element={<PageTransition><TrainerRoute><TrainerDashboard /></TrainerRoute></PageTransition>} />
            <Route path="admin" element={<PageTransition><AdminRoute><AdminDashboard /></AdminRoute></PageTransition>} />
            <Route path="admin/users" element={<PageTransition><AdminRoute><ManageUsers /></AdminRoute></PageTransition>} />
            <Route path="admin/trainers" element={<PageTransition><AdminRoute><ManageTrainers /></AdminRoute></PageTransition>} />
            <Route path="admin/plans" element={<PageTransition><AdminRoute><ManagePlans /></AdminRoute></PageTransition>} />
            <Route path="admin/branches" element={<PageTransition><AdminRoute><ManageBranches /></AdminRoute></PageTransition>} />
            <Route path="admin/workouts" element={<PageTransition><AdminRoute><ManageWorkouts /></AdminRoute></PageTransition>} />
            <Route path="admin/diet-plans" element={<PageTransition><AdminRoute><ManageDietPlans /></AdminRoute></PageTransition>} />
            <Route path="admin/gallery" element={<PageTransition><AdminRoute><ManageGallery /></AdminRoute></PageTransition>} />
            <Route path="admin/transfer" element={<PageTransition><AdminRoute><ManageTransfer /></AdminRoute></PageTransition>} />
            <Route path="admin/footer" element={<PageTransition><AdminRoute><ManageFooter /></AdminRoute></PageTransition>} />
            <Route path="admin/legal" element={<PageTransition><AdminRoute><ManageLegal /></AdminRoute></PageTransition>} />
            <Route path="admin/testimonials" element={<PageTransition><AdminRoute><ManageTestimonials /></AdminRoute></PageTransition>} />
            <Route path="admin/activities" element={<PageTransition><AdminRoute><ManageActivities /></AdminRoute></PageTransition>} />
            <Route path="admin/content" element={<PageTransition><AdminRoute><ManageContent /></AdminRoute></PageTransition>} />
            <Route path="admin/navbar" element={<PageTransition><AdminRoute><ManageNavbar /></AdminRoute></PageTransition>} />
            <Route path="admin/theme" element={<PageTransition><AdminRoute><ManageTheme /></AdminRoute></PageTransition>} />
            <Route path="admin/master-data" element={<PageTransition><AdminRoute><ManageMasterData /></AdminRoute></PageTransition>} />
            <Route path="admin/payments" element={<PageTransition><AdminRoute><ManagePayments /></AdminRoute></PageTransition>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
