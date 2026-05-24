'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Loader2,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ConsultationForm {
  name: string
  whatsapp: string
  email: string
  complaint: string
  message: string
}

export function ContactPage() {
  const { navigateTo } = useStore()
  const { toast } = useToast()
  const [form, setForm] = useState<ConsultationForm>({
    name: '',
    whatsapp: '',
    email: '',
    complaint: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationForm, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ConsultationForm, string>> = {}
    if (!form.name.trim()) newErrors.name = 'Nama lengkap wajib diisi'
    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi'
    } else if (!/^(\+62|62|0)8\d{8,12}$/.test(form.whatsapp.replace(/[\s-]/g, ''))) {
      newErrors.whatsapp = 'Format nomor WhatsApp tidak valid'
    }
    if (!form.complaint.trim()) newErrors.complaint = 'Keluhan wajib diisi'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          whatsapp: form.whatsapp,
          email: form.email || undefined,
          complaint: form.complaint,
          message: form.message || undefined,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
        toast({
          title: 'Konsultasi Terkirim!',
          description: 'Tim kami akan segera menghubungi Anda.',
        })
      } else {
        toast({
          title: 'Gagal Mengirim',
          description: 'Terjadi kesalahan. Silakan coba lagi.',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Gagal Mengirim',
        description: 'Terjadi kesalahan jaringan. Silakan coba lagi.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Halo Herbal Nusantara, saya ingin berkonsultasi.`
    )
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank')
  }

  const contactInfo = [
    {
      icon: <Phone className="size-5" />,
      label: 'WhatsApp',
      value: '0812-3456-7890',
      href: 'https://wa.me/6281234567890',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: <Mail className="size-5" />,
      label: 'Email',
      value: 'info@herbalnusantara.id',
      href: 'mailto:info@herbalnusantara.id',
      color: 'text-herbal',
      bg: 'bg-herbal-lighter',
    },
    {
      icon: <MapPin className="size-5" />,
      label: 'Alamat',
      value: 'Jl. Herbal Sehat No. 123, Jakarta Selatan',
      href: null,
      color: 'text-herbal',
      bg: 'bg-herbal-lighter',
    },
    {
      icon: <Clock className="size-5" />,
      label: 'Jam Operasional',
      value: 'Senin - Sabtu, 08:00 - 17:00 WIB',
      href: null,
      color: 'text-amber',
      bg: 'bg-amber-light',
    },
  ]

  const socialLinks = [
    { icon: <Instagram className="size-5" />, label: 'Instagram', href: '#' },
    { icon: <Facebook className="size-5" />, label: 'Facebook', href: '#' },
    { icon: <Twitter className="size-5" />, label: 'Twitter', href: '#' },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="herbal-gradient text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-white/80 hover:text-white cursor-pointer"
                  onClick={() => navigateTo('home')}
                >
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">
                  Kontak
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-4xl font-bold">Hubungi Kami</h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Kami siap membantu Anda. Konsultasikan keluhan kesehatan Anda secara gratis.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left - Contact Info */}
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl font-bold text-foreground mb-6">Hubungi Kami</h2>

            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-xl ${item.bg} transition-colors`}
                >
                  <div className={`shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center ${item.color} shadow-sm`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium ${item.color} hover:underline`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground text-sm">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-8" />

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Ikuti Kami</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-herbal-lighter text-herbal flex items-center justify-center hover:bg-herbal hover:text-white transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp Direct */}
            <div className="mt-8">
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="size-5" />
                Chat Langsung via WhatsApp
              </Button>
            </div>
          </motion.div>

          {/* Right - Consultation Form */}
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            {submitted ? (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-herbal-lighter rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="size-10 text-herbal" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Konsultasi Terkirim!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Terima kasih telah menghubungi kami. Tim ahli kami akan segera
                    merespons konsultasi Anda melalui WhatsApp dalam 1x24 jam.
                  </p>
                  <Button
                    variant="outline"
                    className="border-herbal text-herbal hover:bg-herbal hover:text-white"
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: '', whatsapp: '', email: '', complaint: '', message: '' })
                    }}
                  >
                    Kirim Konsultasi Lain
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-herbal-lighter rounded-lg flex items-center justify-center">
                      <MessageCircle className="size-5 text-herbal" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      Konsultasi Gratis
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Ceritakan keluhan Anda, kami akan merekomendasikan herbal yang tepat
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nama Lengkap <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap Anda"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">
                        No. WhatsApp <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="whatsapp"
                        placeholder="Contoh: 081234567890"
                        value={form.whatsapp}
                        onChange={(e) =>
                          setForm({ ...form, whatsapp: e.target.value })
                        }
                        className={errors.whatsapp ? 'border-destructive' : ''}
                      />
                      {errors.whatsapp && (
                        <p className="text-xs text-destructive">
                          {errors.whatsapp}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-muted-foreground">(opsional)</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@contoh.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>

                    {/* Complaint */}
                    <div className="space-y-2">
                      <Label htmlFor="complaint">
                        Keluhan <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="complaint"
                        placeholder="Ceritakan keluhan kesehatan Anda..."
                        rows={4}
                        value={form.complaint}
                        onChange={(e) =>
                          setForm({ ...form, complaint: e.target.value })
                        }
                        className={errors.complaint ? 'border-destructive' : ''}
                      />
                      {errors.complaint && (
                        <p className="text-xs text-destructive">
                          {errors.complaint}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Pesan Tambahan{' '}
                        <span className="text-muted-foreground">(opsional)</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Informasi tambahan yang ingin Anda sampaikan..."
                        rows={3}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-herbal hover:bg-herbal-dark text-white font-semibold gap-2"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Kirim Konsultasi
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Dengan mengirim formulir ini, Anda menyetujui{' '}
                      <span
                        className="text-herbal cursor-pointer hover:underline"
                        onClick={() => navigateTo('privacy')}
                      >
                        Kebijakan Privasi
                      </span>{' '}
                      kami.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
