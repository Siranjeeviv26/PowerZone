import { motion } from 'framer-motion'
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, fadeIn, viewportConfig, staggerDelay } from '../../utils/animations'

const directionVariants = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  fade: fadeIn,
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  stagger = false,
  staggerDelay: staggerDelayProp = 0.1,
  viewport = viewportConfig
}) {
  const variant = directionVariants[direction] || fadeInUp

  // Apply delay to the variant transition
  const customTransition = {
    ...variant.transition,
    delay,
  }

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={customTransition}
      whileInView={stagger ? undefined : variant.animate}
      viewport={stagger ? undefined : viewport}
      className={className}
    >
      {stagger && Array.isArray(children) ? (
        <motion.div
          initial={{}}
          animate={{
            transition: {
              staggerChildren: staggerDelayProp,
              delayChildren: delay
            }
          }}
        >
          {children.map((child, index) => (
            <motion.div key={child.key || index} variants={staggerDelay(index, staggerDelayProp)}>
              {child}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}

// Export stagger wrapper for convenience
export function StaggerContainer({ children, className = '', delay = 0, staggerDelay: sd = 0.1 }) {
  return (
    <motion.div
      initial={{}}
      animate={{
        transition: {
          staggerChildren: sd,
          delayChildren: delay
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', index = 0, delay = 0.1 }) {
  return (
    <motion.div
      variants={staggerDelay(index, delay)}
      className={className}
    >
      {children}
    </motion.div>
  )
}
