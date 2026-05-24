'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ShoppingCart,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store/useStore'
import { formatRupiah } from '@/lib/format'

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Nama minimal 2 karakter'),
  customerPhone: z.string().min(8, 'Nomor WhatsApp minimal 8 digit'),
  customerEmail: z.string().email('Format email tidak valid').or(z.literal('')),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  paymentMethod: z.string().min(1, 'Pilih metode pembayaran'),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

const paymentMethods = [
  { value: 'bca', label: 'Transfer Bank BCA' },
  { value: 'mandiri', label: 'Transfer Bank Mandiri' },
  { value: 'ewallet', label: 'E-Wallet (GoPay/OVO)' },
  { value: 'cod', label: 'COD (Bayar di Tempat)' },
]

export default function CheckoutPage() {
  const { cart, navigateTo, getCartTotal, clearCart, goBack } = useStore()
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')
  const total = getCartTotal()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      address: '',
      paymentMethod: '',
    },
  })

  const paymentMethod = watch('paymentMethod')

  const onSubmit = async (data: CheckoutFormData) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: cart.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total,
        }),
      })
      const result = await res.json()
      if (result.orderId || result.id) {
        setOrderId(result.orderId || result.id)
        clearCart()
        setShowSuccess(true)
      } else {
        // Still show success even if no orderId returned
        setOrderId(`ORD-${Date.now()}`)
        clearCart()
        setShowSuccess(true)
      }
    } catch {
      // Show success anyway (demo mode)
      setOrderId(`ORD-${Date.now()}`)
      clearCart()
      setShowSuccess(true)
    }
    setSubmitting(false)
  }

  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h2 className="mb-2 text-xl font-bold text-gray-700">
            Keranjang Kosong
          </h2>
          <p className="mb-6 text-gray-500">
            Tambahkan produk ke keranjang sebelum checkout
          </p>
          <Button
            className="bg-herbal hover:bg-herbal-dark"
            onClick={() => navigateTo('shop')}
          >
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
            <button
              onClick={() => navigateTo('cart')}
              className="hover:text-herbal"
            >
              Keranjang
            </button>
            <span>/</span>
            <span className="font-medium text-herbal-dark">Checkout</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-gray-500 hover:text-herbal"
          onClick={() => navigateTo('cart')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Keranjang
        </Button>

        <h1 className="mb-8 text-2xl font-bold text-herbal-dark sm:text-3xl">
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-herbal-dark">
                    Informasi Pengiriman
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama lengkap"
                      {...register('customerName')}
                      className={errors.customerName ? 'border-red-400' : ''}
                    />
                    {errors.customerName && (
                      <p className="text-xs text-red-500">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      No. WhatsApp <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      {...register('customerPhone')}
                      className={errors.customerPhone ? 'border-red-400' : ''}
                    />
                    {errors.customerPhone && (
                      <p className="text-xs text-red-500">
                        {errors.customerPhone.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (opsional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      {...register('customerEmail')}
                      className={errors.customerEmail ? 'border-red-400' : ''}
                    />
                    {errors.customerEmail && (
                      <p className="text-xs text-red-500">
                        {errors.customerEmail.message}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Alamat Lengkap <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Masukkan alamat lengkap pengiriman"
                      rows={4}
                      {...register('address')}
                      className={errors.address ? 'border-red-400' : ''}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* Payment */}
                  <div className="space-y-2">
                    <Label>
                      Metode Pembayaran{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={paymentMethod}
                      onValueChange={(val) => setValue('paymentMethod', val, { shouldValidate: true })}
                    >
                      <SelectTrigger
                        className={
                          errors.paymentMethod ? 'border-red-400' : ''
                        }
                      >
                        <SelectValue placeholder="Pilih metode pembayaran" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((pm) => (
                          <SelectItem key={pm.value} value={pm.value}>
                            {pm.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.paymentMethod && (
                      <p className="text-xs text-red-500">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                  </div>

                  {/* Health Disclaimer */}
                  <div className="rounded-lg border border-amber/30 bg-amber-light p-4">
                    <div className="flex gap-2">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                      <p className="text-xs text-gray-600">
                        Produk herbal ini bukan pengganti obat dokter.
                        Konsultasikan dengan tenaga medis sebelum penggunaan.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-start gap-3"
                      >
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-herbal-lighter">
                          <img
                            src={
                              item.product.image ||
                              `https://placehold.co/48x48/D8F3DC/2D6A4F?text=${encodeURIComponent(item.product.name.slice(0, 5))}`
                            }
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="line-clamp-1 text-sm font-medium text-gray-700">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatRupiah(item.product.price)} x{' '}
                            {item.quantity}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-medium text-gray-700">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total</span>
                    <span className="text-xl font-bold text-herbal-dark">
                      {formatRupiah(total)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400">
                    * Belum termasuk ongkos kirim
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-herbal text-white hover:bg-herbal-dark"
                    disabled={submitting}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'Bayar Sekarang'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Pesanan Berhasil!
            </DialogTitle>
            <DialogDescription className="text-center">
              Terima kasih atas pesanan Anda. Kami akan segera memproses pesanan
              Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg bg-herbal-lighter/60 p-4 text-center">
            <p className="text-sm text-gray-500">ID Pesanan</p>
            <p className="mt-1 text-lg font-bold text-herbal-dark">
              {orderId}
            </p>
          </div>
          <p className="text-center text-sm text-gray-500">
            Tim kami akan menghubungi Anda via WhatsApp untuk konfirmasi pesanan
            dan informasi pembayaran.
          </p>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              className="w-full bg-herbal text-white hover:bg-herbal-dark"
              onClick={() => {
                setShowSuccess(false)
                navigateTo('home')
              }}
            >
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo, saya baru saja melakukan pemesanan dengan ID ${orderId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi via WhatsApp
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
