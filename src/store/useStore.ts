import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  price: number
  originalPrice: number | null
  image: string
  images: string | null
  form: string | null
  composition: string | null
  dosage: string | null
  bpomNumber: string | null
  pirtNumber: string | null
  categoryId: string
  category?: { id: string; name: string; slug: string; icon: string | null }
  complaints?: { complaint: { id: string; name: string; slug: string } }[]
  isBestSeller: boolean
  isNew: boolean
  isActive: boolean
  testimonials?: Testimonial[]
  faqs?: ProductFaq[]
}

export interface ProductFaq {
  id: string
  question: string
  answer: string
  sortOrder: number
}

export interface Testimonial {
  id: string
  name: string
  location: string | null
  rating: number
  content: string
  image: string | null
  productId: string | null
  isFeatured: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  description: string | null
  sortOrder: number
  _count?: { products: number }
}

export interface Complaint {
  id: string
  name: string
  slug: string
  description: string
  education: string
  sortOrder: number
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
  category: string | null
  createdAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export type PageName =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'category'
  | 'solution'
  | 'solution-detail'
  | 'education'
  | 'education-detail'
  | 'about'
  | 'testimonials'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'privacy'
  | 'terms'
  | 'disclaimer'

interface StoreState {
  // Navigation
  currentPage: PageName
  pageParams: Record<string, string | undefined>
  navigateTo: (page: PageName, params?: Record<string, string | undefined>) => void
  goBack: () => void
  history: Array<{ page: PageName; params: Record<string, string | undefined> }>

  // Cart
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number

  // Shop filters
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  filterByCategory: string | null
  setFilterByCategory: (categoryId: string | null) => void
  filterByComplaint: string | null
  setFilterByComplaint: (complaintId: string | null) => void
  filterByForm: string | null
  setFilterByForm: (form: string | null) => void

  // Mobile menu
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void

  // Cart drawer
  cartDrawerOpen: boolean
  setCartDrawerOpen: (open: boolean) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Navigation
      currentPage: 'home',
      pageParams: {},
      history: [],

      navigateTo: (page, params = {}) => {
        const state = get()
        set({
          currentPage: page,
          pageParams: params,
          history: [...state.history.slice(-20), { page: state.currentPage, params: state.pageParams }],
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        set({ mobileMenuOpen: false })
      },

      goBack: () => {
        const state = get()
        if (state.history.length > 0) {
          const prev = state.history[state.history.length - 1]
          set({
            currentPage: prev.page,
            pageParams: prev.params,
            history: state.history.slice(0, -1),
          })
        } else {
          set({ currentPage: 'home', pageParams: {} })
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },

      // Cart
      cart: [],

      addToCart: (product, quantity = 1) => {
        const state = get()
        const existing = state.cart.find((item) => item.product.id === product.id)
        if (existing) {
          set({
            cart: state.cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          set({ cart: [...state.cart, { product, quantity }] })
        }
        set({ cartDrawerOpen: true })
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.product.id !== productId) })
      },

      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },

      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0)
      },

      // Shop filters
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      sortBy: 'bestseller',
      setSortBy: (sort) => set({ sortBy: sort }),
      filterByCategory: null,
      setFilterByCategory: (categoryId) => set({ filterByCategory: categoryId }),
      filterByComplaint: null,
      setFilterByComplaint: (complaintId) => set({ filterByComplaint: complaintId }),
      filterByForm: null,
      setFilterByForm: (form) => set({ filterByForm: form }),

      // Mobile menu
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      // Cart drawer
      cartDrawerOpen: false,
      setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
    }),
    {
      name: 'herbal-store',
      partialize: (state) => ({
        cart: state.cart,
        currentPage: state.currentPage,
      }),
    }
  )
)
