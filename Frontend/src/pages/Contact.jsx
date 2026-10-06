import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheck, FaPaperPlane } from 'react-icons/fa'
import PageHero from '../components/shared/PageHero'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { useSiteContent } from '../context/SiteContentContext'
import { fadeInUp, staggerContainer, staggerItem, viewportConfig, cardHover, buttonSpring, floatAnimation, floatAnimationSlow } from '../utils/animations'

const CONTACT_DEFAULTS = {
  heroBadge: 'Contact Us',
  heroTitle: 'GET IN',
  heroHighlight: 'TOUCH',
  heroSubtitle: "Have questions? We'd love to hear from you. Our team responds within 24 hours.",
  heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80',
}

export default function Contact() {
  const saved = useSiteContent('page_contact')
  const c = saved ? { ...CONTACT_DEFAULTS, ...saved } : CONTACT_DEFAULTS
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [contactData, setContactData] = useState({ address: '', phone: '', email: '', weekdayHours: '', weekendHours: '' })

  useEffect(() => {
    api.get('/settings/footer')
      .then(({ data }) => {
        const s = data.settings
        setContactData({
          address: s.address || '',
          phone: s.phone || '',
          email: s.email || '',
          weekdayHours: s.weekdayHours || '',
          weekendHours: s.weekendHours || '',
        })
      })
      .catch(() => {})
  }, [])

  const contactInfo = [
    { icon: FaMapMarkerAlt, label: 'Address', value: contactData.address, color: '#e63946' },
    { icon: FaPhone, label: 'Phone', value: contactData.phone, color: '#f4a261' },
    { icon: FaEnvelope, label: 'Email', value: contactData.email, color: '#4361ee' },
    { icon: FaClock, label: 'Hours', value: [contactData.weekdayHours, contactData.weekendHours].filter(Boolean).join('\n'), color: '#22c55e' },
  ].filter((item) => item.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
    toast.success("Message sent! We'll get back to you within 24 hours.")
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <>
      <PageHero badge={c.heroBadge} title={c.heroTitle} highlight={c.heroHighlight} subtitle={c.heroSubtitle} image={c.heroImage} />

      <section className="py-24 px-4 md:px-8 lg:px-16 bg-dark relative overflow-hidden">
        {/* Decorative floating elements */}
        <motion.div animate={floatAnimation.animate} className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div animate={floatAnimationSlow.animate} className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            viewport={viewportConfig}
            transition={fadeInUp.transition}
            className="flex gap-6 items-start mb-14"
          >
            <div className="w-1 self-stretch bg-gradient-to-b from-primary to-transparent rounded-full flex-shrink-0 min-h-[70px]" />
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Contact Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'Oswald' }}>
                LET'S <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CONNECT</span>
              </h2>
              <p className="text-gray-400 mt-2">Have questions? We'd love to hear from you.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              viewport={viewportConfig}
            >
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={cardHover.hover}
                  className="group relative overflow-hidden rounded-2xl border border-dark-400 hover:border-primary/25 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                  style={{ background: `linear-gradient(135deg, ${info.color}05 0%, #1a1a1a 50%)` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${info.color}18`, border: `1px solid ${info.color}28` }}>
                    <info.icon style={{ color: info.color }} className="text-base" />
                  </div>
                  <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">{info.label}</div>
                  <div className="text-white text-sm font-medium whitespace-pre-line leading-relaxed">{info.value}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-dark-200 border border-dark-400 rounded-2xl p-7">
                <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: 'Oswald' }}>SEND A MESSAGE</h2>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-14"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-20 h-20 bg-green-500/15 border border-green-500/25 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <FaCheck className="text-green-400 text-3xl" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Oswald' }}>Message Sent!</h3>
                    <p className="text-gray-400 text-sm">We'll respond within 24 hours.</p>
                    <motion.button
                      onClick={() => setSent(false)}
                      {...buttonSpring}
                      className="mt-6 px-6 py-2.5 border border-primary/30 hover:border-primary text-primary hover:text-white hover:bg-primary rounded-xl text-sm font-semibold transition-all duration-200"
                    >
                      Send Another
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <label className="text-gray-400 text-xs font-medium mb-1.5 block uppercase tracking-wider">Full Name <span className="text-red-400">*</span></label>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Smith" className="input-field" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <label className="text-gray-400 text-xs font-medium mb-1.5 block uppercase tracking-wider">Email <span className="text-red-400">*</span></label>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@email.com" className="input-field" />
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                      >
                        <label className="text-gray-400 text-xs font-medium mb-1.5 block uppercase tracking-wider">Phone</label>
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="input-field" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <label className="text-gray-400 text-xs font-medium mb-1.5 block uppercase tracking-wider">Subject <span className="text-red-400">*</span></label>
                        <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field">
                          <option value="">Select subject</option>
                          <option>Membership Inquiry</option>
                          <option>Personal Training</option>
                          <option>Group Classes</option>
                          <option>Corporate Programs</option>
                          <option>Other</option>
                        </select>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                    >
                      <label className="text-gray-400 text-xs font-medium mb-1.5 block uppercase tracking-wider">Message <span className="text-red-400">*</span></label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your fitness goals or questions..." className="input-field resize-none" />
                    </motion.div>
                    <motion.button type="submit" disabled={loading} {...buttonSpring} className="w-full btn-primary py-3.5 disabled:opacity-70 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-sm" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
