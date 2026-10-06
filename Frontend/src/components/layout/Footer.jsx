import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaDumbbell, FaFacebook, FaInstagram, FaTwitter, FaYoutube,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight
} from 'react-icons/fa'
import api from '../../utils/api'
import LegalModal from '../shared/LegalModal'
import { fadeInUp, staggerContainer, staggerItem, cardHover, easings } from '../../utils/animations'

const footerLinks = {
  'Quick Links': [
    { to: '/about', label: 'About Us' },
    { to: '/trainers', label: 'Our Trainers' },
    { to: '/membership', label: 'Membership Plans' },
    { to: '/workouts', label: 'Workout Programs' },
    { to: '/branches', label: 'Our Branches' },
    { to: '/gallery', label: 'Gallery' },
  ],
  'Services': [
    { to: '/trainers', label: 'Personal Training' },
    { to: '/diet-plans', label: 'Nutrition Plans' },
    { to: '/bmi-calculator', label: 'BMI Calculator' },
    { to: '/workouts', label: 'Group Classes' },
    { to: '/membership', label: 'Online Coaching' },
  ],
}

const EMPTY = {
  address: '',
  phone: '',
  email: '',
  weekdayHours: '',
  weekendHours: '',
  facebook: '#',
  instagram: '#',
  twitter: '#',
  youtube: '#',
  showFacebook: true,
  showInstagram: true,
  showTwitter: true,
  showYoutube: true,
}

export default function Footer() {
  const [settings, setSettings] = useState(EMPTY)
  const [legalModal, setLegalModal] = useState(null)

  useEffect(() => {
    api.get('/settings/footer')
      .then(({ data }) => {
        const s = data.settings
        setSettings({
          address: s.address || '',
          phone: s.phone || '',
          email: s.email || '',
          weekdayHours: s.weekdayHours || '',
          weekendHours: s.weekendHours || '',
          facebook: s.facebook || '#',
          instagram: s.instagram || '#',
          twitter: s.twitter || '#',
          youtube: s.youtube || '#',
          showFacebook: s.showFacebook !== false,
          showInstagram: s.showInstagram !== false,
          showTwitter: s.showTwitter !== false,
          showYoutube: s.showYoutube !== false,
        })
      })
      .catch(() => {})
  }, [])

  const socials = [
    settings.showFacebook && { icon: FaFacebook, href: settings.facebook, color: '#1877f2' },
    settings.showInstagram && { icon: FaInstagram, href: settings.instagram, color: '#e1306c' },
    settings.showTwitter && { icon: FaTwitter, href: settings.twitter, color: '#1da1f2' },
    settings.showYoutube && { icon: FaYoutube, href: settings.youtube, color: '#ff0000' },
  ].filter(Boolean)

  return (
    <>
    <motion.footer
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, margin: '-100px' }}
      transition={fadeInUp.transition}
      className="bg-dark-100 border-t border-white/5"
    >
      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-r from-primary/20 to-secondary/10 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Oswald' }}>
                JOIN OUR FITNESS COMMUNITY
              </h3>
              <p className="text-gray-400 text-sm">Get weekly tips, workout plans, and exclusive offers.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field sm:max-w-xs"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary whitespace-nowrap flex items-center justify-center gap-2"
              >
                Subscribe <FaArrowRight className="text-sm" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div variants={staggerItem}>
            <Link to="/" className="flex items-center gap-3 mb-6" whileHover={{ scale: 1.03 }}>
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 180, scale: 1.1, transition: { duration: 0.4 } }}
              >
                <FaDumbbell className="text-white text-lg" />
              </motion.div>
              <span className="text-2xl font-black text-white" style={{ fontFamily: 'Oswald' }}>
                POWER<span className="text-primary">ZONE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transforming lives through fitness since 2014. World-class equipment,
              expert trainers, and a community that pushes you to be your best.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, color }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.15, y: -3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  className="w-9 h-9 bg-dark-300 border border-dark-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:border-primary/50"
                  style={{ borderColor: `${color}40` }}
                >
                  <Icon className="text-gray-400 hover:text-white text-sm" style={{ color }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div key={title} variants={staggerItem}>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <motion.li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-primary text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <motion.span
                        className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-200"
                        animate={{ width: '0.75rem' }}
                        initial={{ width: 0 }}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <motion.div
                  className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <FaMapMarkerAlt className="text-primary text-sm" />
                </motion.div>
                <span className="text-gray-400 text-sm">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: -10 }}
                >
                  <FaPhone className="text-primary text-sm" />
                </motion.div>
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-primary text-sm transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <FaEnvelope className="text-primary text-sm" />
                </motion.div>
                <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-primary text-sm transition-colors">
                  {settings.email}
                </a>
              </li>
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 bg-dark-200 rounded-xl border border-dark-400 hover:border-primary/30 transition-colors duration-300"
            >
              <p className="text-xs text-gray-500 mb-1">Opening Hours</p>
              <p className="text-sm text-white font-medium">{settings.weekdayHours}</p>
              <p className="text-sm text-white font-medium">{settings.weekendHours}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ delay: 0.5 }}
        className="border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PowerZone Gym. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button onClick={() => setLegalModal('privacy')} className="text-gray-500 hover:text-primary text-xs transition-colors">Privacy Policy</button>
            <button onClick={() => setLegalModal('terms')} className="text-gray-500 hover:text-primary text-xs transition-colors">Terms of Service</button>
          </div>
        </div>
      </motion.div>
    </motion.footer>
    {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
  </>
  )
}
