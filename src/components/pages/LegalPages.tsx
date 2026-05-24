'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Phone, FileText, Shield, Heart } from 'lucide-react'

const privacyContent = {
  title: 'Kebijakan Privasi',
  lastUpdated: '1 Januari 2025',
  sections: [
    {
      heading: 'Pendahuluan',
      content:
        'Herbal Nusantara ("kami") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat Anda menggunakan website dan layanan kami.',
    },
    {
      heading: 'Informasi yang Kami Kumpulkan',
      content:
        'Kami dapat mengumpulkan informasi berikut: (a) Informasi Pribadi: nama, alamat email, nomor telepon/WhatsApp, alamat pengiriman yang Anda berikan saat mendaftar, membuat pesanan, atau menghubungi kami. (b) Informasi Transaksi: riwayat pembelian, detail pesanan, metode pembayaran. (c) Informasi Teknis: alamat IP, jenis browser, sistem operasi, halaman yang dikunjungi, waktu akses. (d) Informasi dari Cookie dan Teknologi Serupa.',
    },
    {
      heading: 'Penggunaan Informasi',
      content:
        'Informasi yang kami kumpulkan digunakan untuk: memproses dan mengirim pesanan Anda, memberikan layanan konsultasi kesehatan herbal, mengirimkan notifikasi tentang pesanan dan produk, meningkatkan kualitas layanan dan pengalaman pengguna, mengirimkan informasi promosi (dengan persetujuan Anda), menganalisis penggunaan website untuk peningkatan layanan, memenuhi kewajiban hukum yang berlaku.',
    },
    {
      heading: 'Perlindungan Data',
      content:
        'Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi informasi pribadi Anda dari akses tidak sah, pengubahan, pengungkapan, atau penghancuran. Ini termasuk enkripsi data, akses terbatas, dan pemantauan keamanan secara berkala.',
    },
    {
      heading: 'Cookie',
      content:
        'Website kami menggunakan cookie untuk meningkatkan pengalaman browsing Anda. Cookie membantu kami mengingat preferensi Anda, memahami bagaimana Anda menggunakan website kami, dan memberikan konten yang relevan. Anda dapat mengatur preferensi cookie melalui pengaturan browser Anda.',
    },
    {
      heading: 'Pihak Ketiga',
      content:
        'Kami dapat membagikan informasi Anda dengan: penyedia layanan pengiriman untuk pengiriman pesanan, penyedia layanan pembayaran untuk memproses transaksi, penyedia layanan hosting dan teknologi untuk menjalankan website kami, pihak berwenang jika diwajibkan oleh hukum. Kami tidak menjual informasi pribadi Anda kepada pihak ketiga.',
    },
    {
      heading: 'Hak Anda',
      content:
        'Anda memiliki hak untuk: mengakses informasi pribadi yang kami simpan tentang Anda, meminta perbaikan informasi yang tidak akurat, meminta penghapusan informasi pribadi Anda, menarik persetujuan untuk penggunaan data tertentu, mengajukan keluhan kepada otoritas perlindungan data.',
    },
    {
      heading: 'Kontak',
      content:
        'Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di: Email: info@herbalnusantara.id, WhatsApp: 0812-3456-7890, Alamat: Jl. Herbal Sehat No. 123, Jakarta Selatan.',
    },
  ],
}

const termsContent = {
  title: 'Syarat & Ketentuan',
  lastUpdated: '1 Januari 2025',
  sections: [
    {
      heading: 'Ketentuan Umum',
      content:
        'Dengan mengakses dan menggunakan website Herbal Nusantara, Anda menyetujui untuk terikat dengan Syarat & Ketentuan ini. Kami berhak mengubah syarat dan ketentuan ini kapan saja tanpa pemberitahuan terlebih dahulu. Penggunaan layanan kami secara berkelanjutan setelah perubahan berarti Anda menyetujui perubahan tersebut.',
    },
    {
      heading: 'Produk & Harga',
      content:
        'Kami berusaha menampilkan informasi produk dan harga seakurat mungkin. Namun, kesalahan dapat terjadi. Kami berhak memperbaiki kesalahan informasi kapan saja. Harga produk dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Harga yang berlaku adalah harga pada saat pesanan dibuat. Semua harga sudah termasuk PPN kecuali dinyatakan lain.',
    },
    {
      heading: 'Pemesanan & Pembayaran',
      content:
        'Pemesanan dianggap sah setelah pembayaran berhasil dikonfirmasi. Kami menerima berbagai metode pembayaran termasuk transfer bank dan e-wallet. Pembayaran harus dilakukan dalam batas waktu yang ditentukan. Jika pembayaran tidak diterima dalam batas waktu, pesanan akan otomatis dibatalkan. Kami berhak menolak pesanan dengan alasan tertentu.',
    },
    {
      heading: 'Pengiriman & Penerimaan',
      content:
        'Estimasi waktu pengiriman yang kami berikan adalah perkiraan dan dapat berbeda dari aktual. Kami tidak bertanggung jawab atas keterlambatan yang disebabkan oleh pihak ketiga (jasa pengiriman, cuaca, bencana alam). Risiko atas produk berpindah kepada Anda setelah produk diserahkan kepada jasa pengiriman. Penerima wajib memeriksa kondisi produk saat diterima.',
    },
    {
      heading: 'Pengembalian & Refund',
      content:
        'Pengembalian produk dapat dilakukan dalam 7 hari setelah penerimaan dengan kondisi: produk dalam keadaan segel belum dibuka, produk tidak melewati tanggal kedaluwarsa, disertai bukti pembelian. Produk yang dikembalikan karena alasan kesalahan pengiriman atau produk rusak akan mendapat penggantian penuh termasuk ongkos kirim. Pengembalian karena alasan lain akan diproses sesuai kebijakan yang berlaku.',
    },
    {
      heading: 'Batasan Tanggung Jawab',
      content:
        'Produk herbal kami bukan merupakan obat medis dan tidak dimaksudkan untuk mendiagnosa, mengobati, menyembuhkan, atau mencegah penyakit apapun. Kami tidak bertanggung jawab atas efek samping yang mungkin timbul dari penggunaan produk kami. Kami menyarankan Anda untuk berkonsultasi dengan tenaga medis sebelum menggunakan produk herbal, terutama jika sedang hamil, menyusui, atau mengonsumsi obat lain.',
    },
    {
      heading: 'Hak Kekayaan Intelektual',
      content:
        'Seluruh konten di website ini termasuk teks, gambar, logo, dan desain adalah milik Herbal Nusantara dan dilindungi oleh hukum hak kekayaan intelektual yang berlaku. Penggunaan konten tanpa izin tertulis dari kami dilarang keras.',
    },
  ],
}

const disclaimerContent = {
  title: 'Disclaimer Kesehatan',
  lastUpdated: '1 Januari 2025',
  sections: [
    {
      heading: 'Pernyataan Umum',
      content:
        'Produk yang dijual oleh Herbal Nusantara adalah produk herbal tradisional dan BUKAN obat medis. Produk-produk kami dibuat dari bahan-bahan alami dan telah terdaftar di Badan Pengawas Obat dan Makanan (BPOM). Informasi yang disediakan di website ini hanya bertujuan untuk edukasi dan bukan merupakan nasihat medis.',
    },
    {
      heading: 'Bukan Pengganti Obat Medis',
      content:
        'Produk herbal kami tidak dimaksudkan untuk mendiagnosa, mengobati, menyembuhkan, atau mencegah penyakit apapun. Produk herbal sebaiknya digunakan sebagai suplemen kesehatan pelengkap, bukan pengganti obat-obatan yang diresepkan oleh dokter. Selalu prioritaskan saran medis profesional untuk kondisi kesehatan yang serius.',
    },
    {
      heading: 'Konsultasi dengan Tenaga Medis',
      content:
        'Kami sangat menyarankan Anda untuk berkonsultasi dengan dokter, apoteker, atau tenaga medis profesional lainnya sebelum menggunakan produk herbal kami, terutama jika: Anda sedang hamil atau menyusui, Anda sedang mengonsumsi obat resep, Anda memiliki kondisi kesehatan kronis, Anda sedang menjalani pengobatan medis tertentu, Anda memiliki riwayat alergi terhadap bahan herbal tertentu.',
    },
    {
      heading: 'Hasil yang Bervariasi',
      content:
        'Hasil dari penggunaan produk herbal dapat bervariasi pada setiap individu. Faktor-faktor seperti kondisi tubuh, pola hidup, dan konsistensi penggunaan dapat mempengaruhi efektivitas produk. Testimoni yang ditampilkan di website ini adalah pengalaman pribadi pelanggan dan tidak menjamin hasil yang sama untuk semua orang.',
    },
    {
      heading: 'Peringatan Khusus',
      content:
        'Produk herbal kami tidak dianjurkan untuk digunakan oleh: ibu hamil dan menyusui tanpa konsultasi dokter, anak-anak di bawah usia 12 tahun tanpa pengawasan orang dewasa, individu dengan riwayat alergi terhadap bahan herbal tertentu. Jika Anda mengalami reaksi alergi atau efek samping setelah menggunakan produk kami, segera hentikan penggunaan dan hubungi tenaga medis.',
    },
    {
      heading: 'Informasi di Website',
      content:
        'Informasi kesehatan yang disediakan di website ini bersifat umum dan edukatif. Meskipun kami berusaha untuk menyajikan informasi yang akurat dan terkini, kami tidak memberikan jaminan bahwa semua informasi adalah lengkap, akurat, atau mutakhir. Herbal Nusantara tidak bertanggung jawab atas tindakan yang diambil berdasarkan informasi di website ini tanpa konsultasi medis terlebih dahulu.',
    },
    {
      heading: 'Perubahan',
      content:
        'Herbal Nusantara berhak mengubah disclaimer ini kapan saja tanpa pemberitahuan. Perubahan akan berlaku segera setelah dipublikasikan di website. Dengan terus menggunakan website dan produk kami, Anda menyetujui perubahan disclaimer ini.',
    },
  ],
}

const legalIcons: Record<string, React.ReactNode> = {
  'Kebijakan Privasi': <Shield className="size-5" />,
  'Syarat & Ketentuan': <FileText className="size-5" />,
  'Disclaimer Kesehatan': <Heart className="size-5" />,
}

export function LegalPages() {
  const { currentPage, navigateTo } = useStore()

  const contentMap: Record<string, typeof privacyContent> = {
    privacy: privacyContent,
    terms: termsContent,
    disclaimer: disclaimerContent,
  }

  const content = contentMap[currentPage]

  if (!content) return null

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
                  {content.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-3">
            {legalIcons[content.title]}
            <h1 className="text-3xl md:text-4xl font-bold">{content.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Terakhir diperbarui: {content.lastUpdated}
          </p>

          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
                  {index + 1}. {section.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {section.content}
                </p>
                {index < content.sections.length - 1 && (
                  <Separator className="mt-8" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-herbal-lighter/50 rounded-2xl p-6 md:p-8">
            <h3 className="font-bold text-foreground mb-2">Pertanyaan?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Jika Anda memiliki pertanyaan mengenai halaman ini, jangan ragu untuk menghubungi kami.
            </p>
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50 gap-2"
              onClick={() => {
                const msg = encodeURIComponent(
                  `Halo Herbal Nusantara, saya ingin bertanya mengenai ${content.title}.`
                )
                window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank')
              }}
            >
              <Phone className="size-4" />
              Hubungi via WhatsApp
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
