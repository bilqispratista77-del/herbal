'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useStore, type PageName } from '@/store/useStore'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import CartDrawer from '@/components/layout/CartDrawer'
import HomePage from '@/components/pages/HomePage'
import ShopPage from '@/components/pages/ShopPage'
import ProductDetailPage from '@/components/pages/ProductDetailPage'
import CartPage from '@/components/pages/CartPage'
import CheckoutPage from '@/components/pages/CheckoutPage'
import { CategoryPage } from '@/components/pages/CategoryPage'
import { SolutionPage } from '@/components/pages/SolutionPage'
import { SolutionDetailPage } from '@/components/pages/SolutionDetailPage'
import { EducationPage } from '@/components/pages/EducationPage'
import { EducationDetailPage } from '@/components/pages/EducationDetailPage'
import { AboutPage } from '@/components/pages/AboutPage'
import { TestimonialsPage } from '@/components/pages/TestimonialsPage'
import { ContactPage } from '@/components/pages/ContactPage'
import { LegalPages } from '@/components/pages/LegalPages'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

function PageRouter() {
  const currentPage = useStore((s) => s.currentPage)

  const pages: Record<PageName, React.ReactNode> = {
    home: <HomePage />,
    shop: <ShopPage />,
    'product-detail': <ProductDetailPage />,
    cart: <CartPage />,
    checkout: <CheckoutPage />,
    category: <CategoryPage />,
    solution: <SolutionPage />,
    'solution-detail': <SolutionDetailPage />,
    education: <EducationPage />,
    'education-detail': <EducationDetailPage />,
    about: <AboutPage />,
    testimonials: <TestimonialsPage />,
    contact: <ContactPage />,
    privacy: <LegalPages />,
    terms: <LegalPages />,
    disclaimer: <LegalPages />,
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {pages[currentPage]}
      </motion.div>
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageRouter />
      </main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
    </div>
  )
}
