// Animation variants and utilities for consistent smooth animations across the app

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
}

// Fade variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
}

// Scale variants
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
}

export const scaleInBounce = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { type: 'spring', stiffness: 300, damping: 25 }
}

// Stagger container for list animations
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
}

// Stagger for grid items
export const staggerGrid = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15
    }
  }
}

export const gridItem = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
}

// Modal/overlay variants
export const overlayVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 }
}

export const modalVariant = {
  initial: { opacity: 0, scale: 0.92, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 28 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 }
  }
}

// Drawer/slide variants
export const drawerVariant = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: '-100%', transition: { duration: 0.2 } }
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: '100%', transition: { duration: 0.2 } }
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { y: '100%', transition: { duration: 0.2 } }
  }
}

// Hover animations for cards
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
}

export const card3DHover = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.03,
    transition: { duration: 0.3 }
  }
}

// Button hover spring animation
export const buttonSpring = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 400, damping: 20 }
}

// Floating animation for decorative elements
export const floatAnimation = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

export const floatAnimationSlow = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Pulse/glow animation
export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(230, 57, 70, 0.3)',
      '0 0 40px rgba(230, 57, 70, 0.5)',
      '0 0 20px rgba(230, 57, 70, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Scroll indicator animation
export const scrollIndicator = {
  animate: {
    y: [0, 8, 0],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Counter/number animation helper
export const numberCountUp = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: 0.2
    }
  }
}

// Skeleton loading animation
export const skeletonPulse = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Success/checkmark animation
export const successCheck = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: 'easeOut' },
      opacity: { duration: 0.3 }
    }
  }
}

// Shake animation for errors
export const shakeAnimation = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
}

// Accordion/collapsible variants
export const accordionContent = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2 }
    }
  }
}

// Easing functions
export const easings = {
  smooth: [0.4, 0, 0.2, 1],
  smoothIn: [0.4, 0, 1, 1],
  smoothOut: [0, 0, 0.2, 1],
  bounce: { type: 'spring', stiffness: 300, damping: 20 },
  gentle: { type: 'spring', stiffness: 200, damping: 25 },
  snappy: { type: 'spring', stiffness: 400, damping: 30 }
}

// Scroll-triggered animation config
export const viewportConfig = {
  once: true,
  margin: '-80px',
  amount: 0.3
}

// Helper function to create delay-based stagger
export const staggerDelay = (index, baseDelay = 0.1) => ({
  delay: index * baseDelay
})
