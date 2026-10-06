import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaDumbbell, FaUsers, FaUserTie, FaCrown, FaImages,
  FaMoneyBill, FaEnvelope, FaChartBar, FaHome, FaTachometerAlt,
  FaBars, FaTimes, FaSignOutAlt, FaMapMarkerAlt, FaAppleAlt,
  FaExchangeAlt, FaGlobe, FaFileAlt, FaQuoteLeft, FaRunning, FaEdit, FaLink,
  FaPalette, FaDatabase, FaCamera, FaTag, FaMoneyBillWave,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../../store/slices/authSlice'
import api from '../../utils/api'
import toast from 'react-hot-toast'
import { fadeInUp, staggerContainer, staggerItem, viewportConfig, buttonSpring, floatAnimation, floatAnimationSlow, cardHover, modalVariant, drawerVariant, pageTransition } from '../../utils/animations'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt },
  { to: '/admin/users', label: 'Members', icon: FaUsers },
  { to: '/admin/trainers', label: 'Trainers', icon: FaUserTie },
  { to: '/admin/plans', label: 'Plans', icon: FaCrown },
  { to: '/admin/branches', label: 'Branches', icon: FaMapMarkerAlt },
  { to: '/admin/transfer', label: 'Transfer', icon: FaExchangeAlt },
  { to: '/admin/payments', label: 'Payments', icon: FaMoneyBillWave },
  { to: '/admin/content', label: 'Site Content', icon: FaEdit },
  { to: '/admin/navbar', label: 'Navbar', icon: FaLink },
  { to: '/admin/footer', label: 'Footer', icon: FaGlobe },
  { to: '/admin/theme', label: 'Theme', icon: FaPalette },
  { to: '/admin/workouts', label: 'Workouts', icon: FaDumbbell },
  { to: '/admin/diet-plans', label: 'Diet Plans', icon: FaAppleAlt },
  { to: '/admin/gallery', label: 'Gallery', icon: FaImages },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FaQuoteLeft },
  { to: '/admin/legal', label: 'Legal', icon: FaFileAlt },
  { to: '/', label: 'View Site', icon: FaHome },
]

export function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)
  const [uploading, setUploading] = useState(false)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((s) => s.auth)
  const fileRef = useRef()

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('avatar', file)
    setUploading(true)
    try {
      const { data } = await api.put('/users/profile/avatar', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      dispatch(setUser(data.user))
      toast.success('Profile photo updated!')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="h-screen bg-dark flex overflow-hidden">
      {/* Floating background elements */}
      <motion.div animate={floatAnimation.animate} className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div animate={floatAnimationSlow.animate} className="absolute bottom-10 right-10 w-56 h-56 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Mobile backdrop with animation */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar with drawer animation */}
      <motion.aside
        variants={drawerVariant}
        initial={sidebarOpen ? 'open' : 'closed'}
        animate={sidebarOpen ? 'open' : 'closed'}
        className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto flex-shrink-0 flex flex-col bg-dark-100 border-r border-dark-400 ${sidebarOpen ? 'w-64' : 'lg:w-16'}`}
      >
        <div className={`flex items-center ${sidebarOpen ? 'gap-3 px-6' : 'justify-center px-3'} py-5 border-b border-dark-400`}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <FaDumbbell className="text-white text-sm" />
          </motion.div>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-black text-white"
              style={{ fontFamily: 'Oswald' }}
            >
              ADMIN PANEL
            </motion.span>
          )}
        </div>

        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {navItems.map((item) => (
              <motion.div key={item.to} variants={staggerItem}>
                <Link
                  to={item.to}
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                  className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-xl mb-1 text-sm font-medium transition-all ${
                    pathname === item.to ? 'bg-primary/15 text-primary border border-primary/20' : 'text-gray-400 hover:bg-dark-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    className="text-base flex-shrink-0"
                  >
                    <item.icon />
                  </motion.div>
                  {sidebarOpen && item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </nav>

        <div className="px-2 pb-4">
          <motion.button
            onClick={() => { dispatch(logout()); navigate('/') }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm`}
          >
            <motion.div whileHover={{ rotate: 90 }}>
              <FaSignOutAlt className="flex-shrink-0" />
            </motion.div>
            {sidebarOpen && 'Logout'}
          </motion.button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col min-w-0">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-dark-100 border-b border-dark-400 px-4 md:px-6 py-4 flex items-center justify-between"
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="flex items-center gap-3">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            <button
              onClick={() => fileRef.current?.click()}
              title="Click to update profile photo"
              className="relative group flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-transparent group-hover:border-primary transition-colors" />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold"
                >
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </motion.div>
              )}
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {uploading ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaCamera className="text-white text-[10px]" />
                )}
              </div>
            </button>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-gray-300 text-sm hidden sm:block"
            >
              {user?.name || 'Admin'}
            </motion.span>
          </div>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-1 p-4 md:p-6 overflow-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [dashData, setDashData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(({ data }) => setDashData(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const stats = dashData ? [
    { label: 'Total Members', value: dashData.stats?.totalUsers?.toLocaleString() ?? '—', change: `+${dashData.stats?.newSignups ?? 0} new`, icon: FaUsers, color: '#e63946' },
    { label: 'Active Trainers', value: dashData.stats?.totalTrainers?.toLocaleString() ?? '—', change: 'Certified', icon: FaUserTie, color: '#f4a261' },
    { label: 'Monthly Revenue', value: dashData.stats?.monthlyRevenue ? `₹${(dashData.stats.monthlyRevenue / 100000).toFixed(1)}L` : '₹0', change: 'This month', icon: FaMoneyBill, color: '#22c55e' },
    { label: 'New Signups', value: dashData.stats?.newSignups?.toLocaleString() ?? '0', change: 'Last 30 days', icon: FaChartBar, color: '#4361ee' },
  ] : []

  const recentUsers = dashData?.recentUsers ?? []

  const quickActions = [
    { label: 'Add Trainer', icon: FaUserTie, to: '/admin/trainers', color: '#f4a261' },
    { label: 'Manage Plans', icon: FaCrown, to: '/admin/plans', color: '#e63946' },
    { label: 'Manage Gallery', icon: FaImages, to: '/admin/gallery', color: '#4361ee' },
    { label: 'Diet Plans', icon: FaAppleAlt, to: '/admin/diet-plans', color: '#22c55e' },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Hero Section with page transition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Oswald' }}>DASHBOARD OVERVIEW</h1>
          <p className="text-gray-400 text-sm">Welcome back, Admin! Here's what's happening today.</p>
        </motion.div>

        {/* Stats with stagger */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {loading ? (
            [0, 1, 2, 3].map((i) => (
              <motion.div key={i} variants={staggerItem} className="glass-card p-5 animate-pulse">
                <div className="h-10 w-10 bg-dark-400 rounded-xl mb-4" />
                <div className="h-6 bg-dark-400 rounded w-20 mb-2" />
                <div className="h-3 bg-dark-400 rounded w-28" />
              </motion.div>
            ))
          ) : (
            stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card p-5"
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon style={{ color: stat.color }} />
                  </motion.div>
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: i * 0.1 + 0.3 }}
                    className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full"
                  >
                    {stat.change}
                  </motion.span>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-2xl font-black text-white mb-1"
                  style={{ fontFamily: 'Oswald' }}
                >
                  {stat.value}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.25 }}
                  className="text-gray-400 text-xs"
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Recent Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
          whileHover={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between mb-5"
          >
            <h2 className="text-white font-bold flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                <FaUsers className="text-primary" />
              </motion.div>
              Recent Members
            </h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="text-primary text-sm hover:underline cursor-pointer"
            >
              View all
            </motion.div>
          </motion.div>

          {loading ? (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-3"
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div key={i} variants={staggerItem} className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 bg-dark-400 rounded-full" />
                  <div className="flex-1">
                    <div className="h-3 bg-dark-400 rounded w-32 mb-1" />
                    <div className="h-3 bg-dark-400 rounded w-48" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : recentUsers.length === 0 ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-500 text-sm text-center py-4"
            >
              No members yet
            </motion.p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="overflow-x-auto"
            >
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-xs border-b border-dark-400">
                    {['Member', 'Plan', 'Joined', 'Status'].map((h) => (
                      <th key={h} className="pb-3 pr-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((m, i) => (
                    <motion.tr
                      key={i}
                      variants={staggerItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border-b border-dark-400/50 hover:bg-dark-300/50 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          {m.avatar ? (
                            <motion.img
                              src={m.avatar}
                              alt={m.name}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              whileHover={{ scale: 1.1 }}
                            />
                          ) : (
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0"
                            >
                              {m.name?.charAt(0) || '?'}
                            </motion.div>
                          )}
                          <div>
                            <div className="text-white text-sm font-medium">{m.name}</div>
                            <div className="text-gray-500 text-xs">{m.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm text-gray-300">{m.membership?.plan?.name || '—'}</td>
                      <td className="py-3 pr-4 text-sm text-gray-400">
                        {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="py-3">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            m.membership?.status === 'active'  ? 'bg-green-500/10 text-green-400'  :
                            m.membership?.status === 'expired' ? 'bg-red-500/10 text-red-400'      :
                            m.membership?.status === 'frozen'  ? 'bg-blue-500/10 text-blue-400'    :
                            m.membership?.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400':
                            'bg-gray-500/10 text-gray-500'
                          }`}
                        >
                          {m.membership?.status
                            ? m.membership.status.charAt(0).toUpperCase() + m.membership.status.slice(1)
                            : 'No Plan'}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions with stagger and hover effects */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {quickActions.map((action, i) => (
            <motion.div key={i} variants={staggerItem}>
              <Link
                to={action.to}
                className="glass-card p-5 text-center hover:border-primary/30 transition-all"
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <action.icon style={{ color: action.color }} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-sm font-medium"
                >
                  {action.label}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div animate={floatAnimation.animate} className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div animate={floatAnimationSlow.animate} className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </AdminLayout>
  )
}
