'use client'

import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  AlertTriangle,
  ShoppingBag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store/useStore'
import { formatRupiah } from '@/lib/format'

export default function CartPage() {
  const {
    cart,
    navigateTo,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    clearCart,
  } = useStore()

  const total = getCartTotal()

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-herbal-lighter">
            <ShoppingCart className="h-12 w-12 text-herbal/40" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-700">
            Keranjang Anda Kosong
          </h2>
          <p className="mb-6 text-gray-500">
            Belum ada produk di keranjang belanja Anda
          </p>
          <Button
            className="bg-herbal hover:bg-herbal-dark"
            onClick={() => navigateTo('shop')}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Belanja Sekarang
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-herbal-lighter/40">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-herbal"
            >
              Beranda
            </button>
            <span>/</span>
            <span className="font-medium text-herbal-dark">Keranjang</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-herbal-dark sm:text-3xl">
              Keranjang Belanja
            </h1>
            <p className="mt-1 text-gray-500">
              {cart.length} item di keranjang Anda
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={clearCart}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Kosongkan
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <motion.div
                  key={item.product.id}
                  className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div
                    className="h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-herbal-lighter"
                    onClick={() =>
                      navigateTo('product-detail', {
                        slug: item.product.slug,
                      })
                    }
                  >
                    <img
                      src={
                        item.product.image ||
                        `https://placehold.co/96x96/D8F3DC/2D6A4F?text=${encodeURIComponent(item.product.name.slice(0, 8))}`
                      }
                      alt={item.product.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <button
                        onClick={() =>
                          navigateTo('product-detail', {
                            slug: item.product.slug,
                          })
                        }
                        className="line-clamp-2 text-left font-semibold text-gray-800 hover:text-herbal-dark"
                      >
                        {item.product.name}
                      </button>
                      <p className="mt-1 text-sm text-gray-500">
                        {formatRupiah(item.product.price)} / item
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Subtotal + Remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-herbal-dark">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Button
              variant="ghost"
              className="mt-6 text-gray-500 hover:text-herbal"
              onClick={() => navigateTo('shop')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Lanjut Belanja
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-herbal-dark">
                  Ringkasan Pesanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items summary */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex-1 text-gray-600">
                        {item.product.name}{' '}
                        <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                      <span className="font-medium text-gray-700">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="font-semibold text-gray-700">
                    {formatRupiah(total)}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-herbal-dark">Total</span>
                  <span className="text-xl font-bold text-herbal-dark">
                    {formatRupiah(total)}
                  </span>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-herbal text-white hover:bg-herbal-dark"
                  onClick={() => navigateTo('checkout')}
                >
                  Checkout
                </Button>

                <p className="text-center text-xs text-gray-400">
                  Belum termasuk ongkos kirim
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Health Disclaimer */}
        <div className="mt-12 rounded-xl border border-amber/30 bg-amber-light p-6">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
            <p className="text-sm text-gray-600">
              Produk herbal ini bukan pengganti obat dokter. Konsultasikan dengan
              tenaga medis sebelum penggunaan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
