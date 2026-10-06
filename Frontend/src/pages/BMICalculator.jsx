import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalculator, FaWeight, FaRuler, FaInfoCircle } from 'react-icons/fa'
import SectionTitle from '../components/shared/SectionTitle'
import { fadeInUp, floatAnimation, floatAnimationSlow, buttonSpring, staggerContainer, staggerItem, viewportConfig } from '../utils/animations'

const bmiCategories = [
  { range: 'Underweight', min: 0, max: 18.5, color: '#3b82f6', advice: 'Consider a calorie-surplus diet and strength training program to build healthy mass.' },
  { range: 'Normal', min: 18.5, max: 25, color: '#22c55e', advice: 'Great job! Focus on maintaining your weight with balanced nutrition and regular exercise.' },
  { range: 'Overweight', min: 25, max: 30, color: '#f59e0b', advice: 'Consider a calorie-deficit diet combined with cardio and strength training.' },
  { range: 'Obese', min: 30, max: 100, color: '#ef4444', advice: 'Consult with our nutrition and fitness experts for a personalized transformation plan.' },
]

export default function BMICalculator() {
  const [form, setForm] = useState({ height: '', weight: '', age: '', gender: 'male', unit: 'metric' })
  const [result, setResult] = useState(null)

  const calculate = () => {
    const h = parseFloat(form.height)
    const w = parseFloat(form.weight)
    if (!h || !w) return

    let bmi
    if (form.unit === 'metric') {
      bmi = w / ((h / 100) ** 2)
    } else {
      bmi = (703 * w) / (h ** 2)
    }

    const category = bmiCategories.find((c) => bmi >= c.min && bmi < c.max)
    const idealMin = form.unit === 'metric' ? (18.5 * ((h / 100) ** 2)).toFixed(1) : (18.5 * h ** 2 / 703).toFixed(1)
    const idealMax = form.unit === 'metric' ? (24.9 * ((h / 100) ** 2)).toFixed(1) : (24.9 * h ** 2 / 703).toFixed(1)

    setResult({ bmi: bmi.toFixed(1), category, idealMin, idealMax })
  }

  const reset = () => { setForm({ height: '', weight: '', age: '', gender: 'male', unit: 'metric' }); setResult(null) }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-dark-100 overflow-hidden">
        {/* Decorative floating elements */}
        <motion.div animate={floatAnimation.animate} className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div animate={floatAnimationSlow.animate} className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'Oswald' }}>
              BMI <span className="gradient-text">CALCULATOR</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Calculate your Body Mass Index and get personalized fitness recommendations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding bg-dark">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <FaCalculator className="text-primary" />
                </div>
                <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Oswald' }}>Calculate Your BMI</h2>
              </div>

              {/* Unit Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className="text-gray-400 text-xs font-medium mb-2 block uppercase tracking-wider">Measurement Unit</label>
                <div className="flex bg-dark-300 rounded-full p-1 w-fit">
                  {['metric', 'imperial'].map((u) => (
                    <motion.button
                      key={u}
                      onClick={() => setForm({ ...form, unit: u })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${form.unit === u ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-gray-400 hover:text-white'}`}
                    >
                      {u}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                viewport={viewportConfig}
                className="space-y-4"
              >
                {/* Gender */}
                <motion.div
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <label className="text-gray-400 text-sm mb-2 block">Gender</label>
                  <div className="flex gap-3">
                    {['male', 'female'].map((g) => (
                      <motion.button
                        key={g}
                        onClick={() => setForm({ ...form, gender: g })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${form.gender === g ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-dark-300 text-gray-400 hover:bg-dark-400'}`}
                      >
                        {g === 'male' ? '♂ Male' : '♀ Female'}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Age */}
                <motion.div
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className="text-gray-400 text-sm mb-2 block">Age (years)</label>
                  <input type="number" placeholder="Enter your age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="input-field" />
                </motion.div>

                {/* Height */}
                <motion.div
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <FaRuler className="text-primary" />
                    Height ({form.unit === 'metric' ? 'cm' : 'inches'})
                  </label>
                  <input type="number" placeholder={form.unit === 'metric' ? 'e.g. 175' : 'e.g. 69'} value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} className="input-field" />
                </motion.div>

                {/* Weight */}
                <motion.div
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <FaWeight className="text-primary" />
                    Weight ({form.unit === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <input type="number" placeholder={form.unit === 'metric' ? 'e.g. 70' : 'e.g. 154'} value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="input-field" />
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <div className="flex gap-3 pt-2">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={calculate} {...buttonSpring} className="flex-1 btn-primary py-3">
                      Calculate BMI
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={reset} {...buttonSpring} className="px-6 bg-dark-300 hover:bg-dark-400 text-gray-300 rounded-full transition-colors">
                      Reset
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
            >
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card p-8 h-full"
                  >
                    <h3 className="text-2xl font-black text-white mb-8" style={{ fontFamily: 'Oswald' }}>Your Results</h3>

                    {/* BMI Display */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
                        className="relative w-48 h-48 mx-auto"
                      >
                        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                          <circle cx="100" cy="100" r="80" fill="none" stroke="#1a1a1a" strokeWidth="16" />
                          <motion.circle
                            cx="100" cy="100" r="80" fill="none"
                            stroke={result.category.color} strokeWidth="16"
                            strokeDasharray={`${Math.min(result.bmi / 40, 1) * 502} 502`}
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: 'spring', stiffness: 100, damping: 10 }}
                            className="text-5xl font-black text-white"
                            style={{ fontFamily: 'Oswald' }}
                          >
                            {result.bmi}
                          </motion.div>
                          <div className="text-sm text-gray-400">BMI Score</div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="inline-flex items-center px-6 py-2 rounded-full text-white font-bold mt-4"
                        style={{ backgroundColor: `${result.category.color}25`, border: `2px solid ${result.category.color}` }}
                      >
                        {result.category.range}
                      </motion.div>
                    </div>

                    {/* Advice */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-dark-300 rounded-xl p-4 mb-6 flex gap-3"
                    >
                      <FaInfoCircle className="text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm leading-relaxed">{result.category.advice}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center text-sm text-gray-400"
                    >
                      Ideal weight range: <span className="text-white font-semibold">{result.idealMin} – {result.idealMax} {form.unit === 'metric' ? 'kg' : 'lbs'}</span>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card p-8 h-full flex flex-col"
                  >
                    <h3 className="text-2xl font-black text-white mb-6" style={{ fontFamily: 'Oswald' }}>BMI Categories</h3>
                    <motion.div
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                      className="space-y-4"
                    >
                      {bmiCategories.map((cat, i) => (
                        <motion.div
                          key={i}
                          variants={staggerItem}
                          className="flex items-center justify-between p-4 bg-dark-300 rounded-xl"
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                            <span className="text-white font-medium">{cat.range}</span>
                          </div>
                          <span className="text-gray-400 text-sm">
                            {cat.max === 100 ? `≥ ${cat.min}` : `${cat.min} – ${cat.max}`}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-xl text-sm text-gray-400"
                    >
                      Fill in your details and click Calculate to see your personalized BMI result.
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}