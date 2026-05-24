import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Herbal Nusantara database...\n')

  // ========================================
  // CATEGORIES
  // ========================================
  console.log('📋 Creating categories...')
  const categories = await Promise.all([
    db.category.create({
      data: {
        name: 'Herbal Pencernaan',
        slug: 'herbal-pencernaan',
        icon: 'Stomach',
        description: 'Produk herbal untuk menjaga kesehatan sistem pencernaan Anda. Terbuat dari bahan-bahan alami pilihan yang telah terbukti membantu mengatasi berbagai keluhan pencernaan.',
        sortOrder: 1,
      },
    }),
    db.category.create({
      data: {
        name: 'Herbal Stamina',
        slug: 'herbal-stamina',
        icon: 'Zap',
        description: 'Rangkaian produk herbal untuk meningkatkan stamina dan energi tubuh. Cocok untuk Anda yang aktif beraktivitas dan membutuhkan tambahan energi alami.',
        sortOrder: 2,
      },
    }),
    db.category.create({
      data: {
        name: 'Herbal Wanita',
        slug: 'herbal-wanita',
        icon: 'Heart',
        description: 'Produk herbal khusus dirancang untuk menjaga kesehatan wanita. Formula alami yang membantu mengatasi berbagai kebutuhan kesehatan khusus wanita.',
        sortOrder: 3,
      },
    }),
    db.category.create({
      data: {
        name: 'Herbal Detox',
        slug: 'herbal-detox',
        icon: 'Shield',
        description: 'Produk detoksifikasi herbal untuk membersihkan tubuh dari racun dan zat berbahaya. Membantu memulihkan vitalitas tubuh secara alami.',
        sortOrder: 4,
      },
    }),
    db.category.create({
      data: {
        name: 'Herbal Imunitas',
        slug: 'herbal-imunitas',
        icon: 'ShieldCheck',
        description: 'Produk herbal peningkat daya tahan tubuh. Formula dari bahan alami Indonesia yang terbukti efektif memperkuat sistem imun.',
        sortOrder: 5,
      },
    }),
    db.category.create({
      data: {
        name: 'Herbal Kesehatan Jantung',
        slug: 'herbal-jantung',
        icon: 'HeartPulse',
        description: 'Produk herbal untuk menjaga kesehatan jantung dan pembuluh darah. Terbuat dari bahan alami yang membantu menjaga tekanan darah dan kolesterol tetap normal.',
        sortOrder: 6,
      },
    }),
  ])

  const categoryMap = new Map(categories.map((c) => [c.name, c.id]))
  console.log(`✅ Created ${categories.length} categories\n`)

  // ========================================
  // COMPLAINTS
  // ========================================
  console.log('📋 Creating complaints...')
  const complaints = await Promise.all([
    db.complaint.create({
      data: {
        name: 'Asam Lambung',
        slug: 'asam-lambung',
        description: 'Kondisi ketika asam lambung naik ke kerongkongan menyebabkan rasa perih di dada dan tenggorokan. Sering disebabkan oleh pola makan tidak teratur dan stres.',
        education: 'Pendekatan herbal untuk asam lambung berfokus pada bahan-bahan yang bersifat antasida alami, seperti kunyit, jahe, dan lidah buaya. Herbal ini bekerja menetralkan asam lambung berlebih sekaligus melindungi lapisan lambung. Konsumsi rutin herbal pencernaan dapat membantu mengurangi frekuensi gejala asam lambung secara signifikan.',
        sortOrder: 1,
      },
    }),
    db.complaint.create({
      data: {
        name: 'Kolesterol',
        slug: 'kolesterol',
        description: 'Kadar kolesterol tinggi dalam darah dapat meningkatkan risiko penyakit jantung dan stroke. Kondisi ini sering tidak menunjukkan gejala namun sangat berbahaya jika dibiarkan.',
        education: 'Beberapa herbal seperti daun salam, temulawak, dan minyak zaitun memiliki senyawa yang terbukti membantu menurunkan kolesterol LDL. Herbal ini bekerja dengan cara menghambat penyerapan kolesterol di usus dan meningkatkan pembuangan kolesterol melalui empedu. Kombinasi herbal dengan pola hidup sehat memberikan hasil optimal dalam pengelolaan kolesterol.',
        sortOrder: 2,
      },
    }),
    db.complaint.create({
      data: {
        name: 'Diabetes',
        slug: 'diabetes',
        description: 'Penyakit metabolik yang ditandai dengan kadar gula darah tinggi akibat gangguan produksi atau penggunaan insulin. Memerlukan pengelolaan jangka panjang yang konsisten.',
        education: 'Herbal seperti daun salam, brotowali, dan mengkudu memiliki kemampuan membantu menurunkan gula darah secara alami. Senyawa aktif dalam herbal ini bekerja mirip insulin dalam membantu sel menyerap glukosa. Meski herbal membantu, penderita diabetes tetap perlu memantau gula darah secara berkala dan berkonsultasi dengan dokter.',
        sortOrder: 3,
      },
    }),
    db.complaint.create({
      data: {
        name: 'Nyeri Sendi',
        slug: 'nyeri-sendi',
        description: 'Rasa sakit dan kaku pada persendian yang dapat disebabkan oleh radang sendi, asam urat, atau keausan tulang rawan. Sering dialami oleh usia lanjut namun juga bisa menyerang usia muda.',
        education: 'Herbal anti-inflamasi seperti kunyit, jahe merah, dan sambiloto efektif meredakan peradangan pada sendi. Kunyit mengandung curcumin yang kuat sebagai anti-inflamasi alami, sedangkan jahe merah membantu mengurangi pembengkakan. Perawatan herbal jangka panjang dikombinasikan dengan olahraga ringan dapat meningkatkan mobilitas sendi secara signifikan.',
        sortOrder: 4,
      },
    }),
    db.complaint.create({
      data: {
        name: 'Maag',
        slug: 'maag',
        description: 'Gangguan pencernaan yang menyebabkan rasa sakit, mual, dan perih pada lambung. Sering dipicu oleh makanan pedas, asam, atau jadwal makan yang tidak teratur.',
        education: 'Pendekatan herbal untuk maag menggunakan bahan-bahan yang melindungi lapisan lambung seperti lidah buaya, temulawak, dan kayu manis. Herbal ini membantu mengurangi peradangan lambung dan meningkatkan produksi lendir pelindung. Teh herbal hangat yang dikonsumsi secara rutin dapat menjadi bagian dari pengelolaan maag sehari-hari.',
        sortOrder: 5,
      },
    }),
    db.complaint.create({
      data: {
        name: 'Tekanan Darah Tinggi',
        slug: 'tekanan-darah-tinggi',
        description: 'Kondisi ketika tekanan darah secara konsisten berada di atas normal (>140/90 mmHg). Dapat meningkatkan risiko penyakit jantung, stroke, dan gangguan ginjal.',
        education: 'Herbal seperti daun salam, seledri, dan bawang putih memiliki sifat vasodilator yang membantu melancarkan aliran darah. Senyawa aktif dalam herbal ini membantu merelaksasi pembuluh darah sehingga tekanan darah dapat turun secara alami. Penderita hipertensi disarankan mengombinasikan herbal dengan pola makan rendah garam dan olahraga teratur.',
        sortOrder: 6,
      },
    }),
    db.complaint.create({
      data: {
        name: 'Insomnia',
        slug: 'insomnia',
        description: 'Gangguan tidur yang ditandai dengan kesulitan memulai atau mempertahankan tidur. Dapat menyebabkan kelelahan, gangguan konsentrasi, dan penurunan kualitas hidup.',
        education: 'Herbal seperti chamomile, lavender, dan passion flower memiliki efek menenangkan yang membantu meningkatkan kualitas tidur. Valerian root sering disebut sebagai "obat tidur alami" karena kemampuannya menginduksi relaksasi. Mengombinasikan herbal dengan rutinitas tidur yang baik dan menghindari kafein di malam hari dapat mengatasi insomnia secara efektif.',
        sortOrder: 7,
      },
    }),
    db.complaint.create({
      data: {
        name: 'Kurang Nafsu Makan',
        slug: 'kurang-nafsu-makan',
        description: 'Kondisi penurunan keinginan untuk makan yang dapat menyebabkan kekurangan nutrisi dan penurunan berat badan. Sering dialami oleh anak-anak dan orang yang sedang sakit.',
        education: 'Herbal seperti temulawak, kunyit, dan jahe merupakan karminatif alami yang membantu meningkatkan nafsu makan. Temulawak terbukti merangsang produksi enzim pencernaan dan empedu sehingga mempercepat proses pencernaan. Madu herbal yang dikonsumsi sebelum makan juga efektif meningkatkan selera makan terutama pada anak-anak.',
        sortOrder: 8,
      },
    }),
  ])

  const complaintMap = new Map(complaints.map((c) => [c.name, c.id]))
  console.log(`✅ Created ${complaints.length} complaints\n`)

  // ========================================
  // PRODUCTS
  // ========================================
  console.log('📋 Creating products...')

  const productsData = [
    {
      name: 'Madu Habbatussauda Premium',
      slug: 'madu-habbatussauda-premium',
      shortDesc: 'Madu murni berkualitas tinggi yang dikombinasikan dengan Habbatussauda (Jintan Hitam) untuk meningkatkan daya tahan tubuh secara optimal.',
      description: 'Madu Habbatussauda Premium adalah perpaduan sempurna antara madu murni pilihan dan Habbatussauda (Nigella Sativa) berkualitas tinggi. Habbatussauda dikenal sebagai "obat segala penyakit" sejak ribuan tahun lalu dan telah dibuktikan melalui berbagai penelitian ilmiah.\n\n**Manfaat Utama:**\n• Meningkatkan sistem kekebalan tubuh\n• Membantu meningkatkan nafsu makan\n• Kaya antioksidan alami\n• Membantu mempercepat penyembuhan\n• Menjaga kesehatan pencernaan\n\nMadu yang digunakan adalah madu murni tanpa campuran gula, dipanen langsung dari peternakan lebah terpercaya di Indonesia. Diperkaya dengan ekstrak kurma untuk memberikan rasa yang lezat dan nutrisi tambahan.',
      price: 85000,
      originalPrice: 120000,
      image: '/products/madu-habbatussauda-premium.png',
      form: 'cair',
      composition: 'Madu Murni, Habbatussauda (Nigella Sativa), Ekstrak Kurma',
      dosage: '2 sendok makan sehari (pagi dan malam sebelum tidur)',
      bpomNumber: 'TR183612311',
      categoryId: categoryMap.get('Herbal Imunitas')!,
      isBestSeller: true,
      isNew: false,
      complaints: ['Kurang Nafsu Makan'],
    },
    {
      name: 'Jus Manggis Plus',
      slug: 'jus-manggis-plus',
      shortDesc: 'Jus manggis premium yang kaya akan xanthone dan antioksidan tinggi untuk proses detoksifikasi tubuh secara menyeluruh.',
      description: 'Jus Manggis Plus dibuat dari buah manggis pilihan yang dipanen pada saat matang sempurna untuk memastikan kandungan xanthone yang maksimal. Xanthone adalah senyawa antioksidan super yang memiliki kemampuan 100 kali lebih kuat dari vitamin C.\n\n**Manfaat Utama:**\n• Mendetoksifikasi tubuh dari racun dan radikal bebas\n• Membantu menurunkan kolesterol LDL\n• Anti-inflamasi alami yang kuat\n• Meningkatkan sistem kekebalan tubuh\n• Menjaga kesehatan kulit dari dalam\n\nDiperkaya dengan ekstrak rosella dan madu untuk meningkatkan khasiat dan memberikan rasa yang menyegarkan. Diproses dengan teknologi modern tanpa bahan pengawet.',
      price: 75000,
      originalPrice: 95000,
      image: '/products/jus-manggis-plus.png',
      form: 'cair',
      composition: 'Ekstrak Buah Manggis, Ekstrak Rosella, Madu Murni, Air Murni',
      dosage: '30 ml sehari (1 kali sebelum makan)',
      bpomNumber: 'TR173612345',
      categoryId: categoryMap.get('Herbal Detox')!,
      isBestSeller: true,
      isNew: false,
      complaints: ['Kolesterol'],
    },
    {
      name: 'Kapsul Kunyit Putih',
      slug: 'kapsul-kunyit-putih',
      shortDesc: 'Kapsul ekstrak kunyit putih (Curcuma zedoaria) yang kaya curcuminoid untuk meningkatkan imunitas dan antioksidan alami.',
      description: 'Kapsul Kunyit Putih mengandung ekstrak Curcuma zedoaria berkualitas tinggi yang diproses dengan teknologi standar farmasi. Kunyit putih memiliki kandungan curcuminoid yang lebih tinggi dibanding kunyit kuning biasa.\n\n**Manfaat Utama:**\n• Antioksidan kuat untuk melawan radikal bebas\n• Membantu proses detoksifikasi hati\n• Meningkatkan sistem kekebalan tubuh\n• Anti-kanker alami (studi pendukung)\n• Membantu mengatasi gangguan pencernaan\n\nSetiap kapsul mengandung 500 mg ekstrak kunyit putih yang setara dengan 5 gram kunyit putih segar. Dikemas dalam bentuk kapsul vegetarian yang mudah dikonsumsi.',
      price: 65000,
      image: '/products/kapsul-kunyit-putih.png',
      form: 'kapsul',
      composition: 'Ekstrak Kunyit Putih (Curcuma Zedoaria) 500 mg',
      dosage: '2 kapsul sehari (pagi dan malam setelah makan)',
      bpomNumber: 'TR153612678',
      categoryId: categoryMap.get('Herbal Imunitas')!,
      isBestSeller: false,
      isNew: false,
      complaints: [],
    },
    {
      name: 'Minyak Zaitun Extra Virgin',
      slug: 'minyak-zaitun-extra-virgin',
      shortDesc: 'Minyak zaitun extra virgin murni kualitas premium untuk menjaga kesehatan jantung, menurunkan kolesterol, dan meningkatkan stamina.',
      description: 'Minyak Zaitun Extra Virgin kami diperas secara langsung dari buah zaitun segar tanpa proses kimia atau pemanasan. Merupakan minyak zaitun dengan grade tertinggi yang kaya akan asam oleat, polifenol, dan vitamin E.\n\n**Manfaat Utama:**\n• Menurunkan kolesterol LDL dan meningkatkan HDL\n• Menjaga kesehatan jantung dan pembuluh darah\n• Kaya antioksidan dan anti-inflamasi alami\n• Meningkatkan stamina dan energi\n• Menjaga kesehatan kulit dan rambut\n\nBisa dikonsumsi langsung atau digunakan sebagai bahan masakan. Dapat juga digunakan sebagai minyak pijat untuk kesehatan tubuh bagian luar.',
      price: 95000,
      originalPrice: 130000,
      image: '/products/minyak-zaitun-extra-virgin.png',
      form: 'cair',
      composition: '100% Minyak Zaitun Extra Virgin (Olea Europaea)',
      dosage: '1-2 sendok makan sehari (bisa dicampur makanan)',
      bpomNumber: 'TR193612901',
      categoryId: categoryMap.get('Herbal Stamina')!,
      isBestSeller: true,
      isNew: false,
      complaints: ['Kolesterol'],
    },
    {
      name: 'Teh Herbal Asam Lambung',
      slug: 'teh-herbal-asam-lambung',
      shortDesc: 'Teh herbal khusus formulasi untuk mengatasi asam lambung dan maag. Terbuat dari campuran herbal pencernaan pilihan.',
      description: 'Teh Herbal Asam Lambung adalah formulasi khusus dari berbagai herbal yang telah terbukti membantu mengatasi masalah asam lambung. Diracik oleh ahli herbalis berpengalaman dengan komposisi yang seimbang.\n\n**Manfaat Utama:**\n• Menetralkan asam lambung berlebih\n• Melindungi lapisan lambung\n• Mengurangi rasa perih dan mual\n• Membantu pencernaan yang sehat\n• Menenangkan saluran cerna\n\nRasa hangat dan menyegarkan, cocok diminum setelah makan atau sebelum tidur. Dikemas dalam sachet praktis yang mudah diseduh kapan saja dan di mana saja.',
      price: 55000,
      image: '/products/teh-herbal-asam-lambung.png',
      form: 'teh',
      composition: 'Sambiloto, Temulawak, Daun Jambu Biji, Kayu Manis, Jahe',
      dosage: '1-2 sachet sehari (seduh dengan air panas 200ml)',
      bpomNumber: 'TR143613234',
      categoryId: categoryMap.get('Herbal Pencernaan')!,
      isBestSeller: false,
      isNew: false,
      complaints: ['Asam Lambung', 'Maag'],
    },
    {
      name: 'Kapsul Daun Salam',
      slug: 'kapsul-daun-salam',
      shortDesc: 'Kapsul ekstrak daun salam yang membantu menurunkan gula darah dan tekanan darah tinggi secara alami.',
      description: 'Kapsul Daun Salam mengandung ekstrak daun salam (Syzygium polyanthum) berkualitas tinggi yang telah digunakan selama ratusan tahun sebagai obat tradisional Indonesia. Penelitian modern membuktikan khasiat daun salam dalam menjaga kesehatan metabolik.\n\n**Manfaat Utama:**\n• Membantu menurunkan gula darah secara alami\n• Membantu menjaga tekanan darah normal\n• Menurunkan kolesterol dan trigliserida\n• Anti-diabetes alami\n• Membantu mengatasi masalah pencernaan\n\nSetiap kapsul mengandung 400 mg ekstrak daun salam terstandarisasi. Aman dikonsumsi dalam jangka panjang sebagai suplemen kesehatan harian.',
      price: 45000,
      image: '/products/kapsul-daun-salam.png',
      form: 'kapsul',
      composition: 'Ekstrak Daun Salam (Syzygium Polyanthum) 400 mg',
      dosage: '2 kapsul 3 kali sehari (setelah makan)',
      bpomNumber: 'TR133613567',
      categoryId: categoryMap.get('Herbal Kesehatan Jantung')!,
      isBestSeller: false,
      isNew: false,
      complaints: ['Diabetes', 'Tekanan Darah Tinggi'],
    },
    {
      name: 'Madu Propolis',
      slug: 'madu-propolis',
      shortDesc: 'Madu murni yang diperkaya dengan propolis lebah untuk perlindungan maksimal terhadap penyakit dan peningkatan imunitas.',
      description: 'Madu Propolis adalah kombinasi premium antara madu murni Indonesia dan propolis lebah berkualitas tinggi. Propolis adalah zat resin yang dikumpulkan lebah dari tunas pohon dan digunakan sebagai pertahanan alami sarang lebah.\n\n**Manfaat Utama:**\n• Antibakteri dan antivirus alami yang sangat kuat\n• Meningkatkan sistem kekebalan tubuh drastis\n• Mempercepat penyembuhan luka dan infeksi\n• Antioksidan tinggi untuk anti-aging\n• Membantu mengatasi masalah pernapasan\n\nPropolis mengandung lebih dari 300 senyawa aktif termasuk flavonoid, asam fenolat, dan ester yang bekerja sinergis dengan madu untuk memberikan perlindungan optimal bagi tubuh.',
      price: 120000,
      originalPrice: 150000,
      image: '/products/madu-propolis.png',
      form: 'cair',
      composition: 'Madu Murni, Propolis Lebah (20%), Royal Jelly',
      dosage: '2 sendok makan sehari (pagi dan malam)',
      bpomNumber: 'TR203613890',
      categoryId: categoryMap.get('Herbal Imunitas')!,
      isBestSeller: false,
      isNew: true,
      complaints: [],
    },
    {
      name: 'Serbuk Kunyit Asam',
      slug: 'serbuk-kunyit-asam',
      shortDesc: 'Serbuk kunyit asam tradisional untuk menjaga kesehatan wanita, mengatasi nyeri haid, dan merawat kecantikan dari dalam.',
      description: 'Serbuk Kunyit Asam adalah resep warisan nenek moyang yang dikemas secara modern tanpa mengurangi khasiatnya. Perpaduan kunyit dan asam jawa ini telah digunakan selama berabad-abad oleh wanita Indonesia untuk menjaga kesehatan dan kecantikan.\n\n**Manfaat Utama:**\n• Meredakan nyeri saat menstruasi\n• Menjaga kesehatan organ reproduksi wanita\n• Mencerahkan dan merawat kulit dari dalam\n• Membantu melancarkan siklus haid\n• Antioksidan alami untuk anti-aging\n\nDibuat dari kunyit segar pilihan dan asam jawa asli yang diolah dengan metode tradisional. Tinggal seduh dengan air hangat dan tambahkan madu sesuai selera.',
      price: 35000,
      image: '/products/serbuk-kunyit-asam.png',
      form: 'serbuk',
      composition: 'Serbuk Kunyit, Asam Jawa, Gula Aren, Jahe, Kayu Manis',
      dosage: '1 sendok makan seduh dengan 200ml air hangat, 2 kali sehari',
      bpomNumber: 'TR123614123',
      categoryId: categoryMap.get('Herbal Wanita')!,
      isBestSeller: false,
      isNew: false,
      complaints: [],
    },
    {
      name: 'Kapsul Omega-3 Salmon',
      slug: 'kapsul-omega-3-salmon',
      shortDesc: 'Kapsul minyak salmon Alaska yang kaya Omega-3 (EPA & DHA) untuk menjaga kesehatan jantung, otak, dan persendian.',
      description: 'Kapsul Omega-3 Salmon mengandung minyak salmon Alaska murni yang kaya asam lemak esensial EPA dan DHA. Diproduksi dengan teknologi molekuler distillation untuk memastikan kemurnian dan bebas dari logam berat.\n\n**Manfaat Utama:**\n• Menjaga kesehatan jantung dan pembuluh darah\n• Menurunkan kolesterol dan trigliserida\n• Menjaga tekanan darah tetap normal\n• Meningkatkan fungsi otak dan daya ingat\n• Mengurangi peradangan pada sendi\n\nSetiap kapsul mengandung 1000 mg minyak salmon dengan EPA 180mg dan DHA 120mg. Teruji secara laboratorium untuk memastikan kualitas dan keamanannya.',
      price: 150000,
      originalPrice: 185000,
      image: '/products/kapsul-omega-3-salmon.png',
      form: 'kapsul',
      composition: 'Minyak Ikan Salmon (EPA 180mg, DHA 120mg), Vitamin E',
      dosage: '1-2 kapsul sehari (setelah makan)',
      bpomNumber: 'TR213614456',
      categoryId: categoryMap.get('Herbal Kesehatan Jantung')!,
      isBestSeller: false,
      isNew: false,
      complaints: ['Kolesterol', 'Tekanan Darah Tinggi'],
    },
    {
      name: 'Herbal Joint Care',
      slug: 'herbal-joint-care',
      shortDesc: 'Formula herbal khusus untuk menjaga kesehatan sendi, mengurangi nyeri, dan meningkatkan mobilitas persendian.',
      description: 'Herbal Joint Care adalah formula herbal komprehensif yang dirancang khusus untuk menjaga kesehatan persendian. Mengombinasikan beberapa herbal anti-inflamasi terkuat dari alam Indonesia dalam satu kapsul.\n\n**Manfaat Utama:**\n• Mengurangi nyeri dan peradangan pada sendi\n• Membantu regenerasi tulang rawan\n• Meningkatkan fleksibilitas dan mobilitas sendi\n• Anti-inflamasi alami yang kuat\n• Membantu mengatasi asam urat\n\nDiformulasikan dengan Kunyit (curcumin 95%), Jahe Merah, Sambiloto, dan Glucosamine alami dari tulang rawan ikan. Cocok untuk usia 30 tahun ke atas yang mulai merasakan keluhan sendi.',
      price: 110000,
      image: '/products/herbal-joint-care.png',
      form: 'kapsul',
      composition: 'Curcumin 95%, Ekstrak Jahe Merah, Sambiloto, Glucosamine Sulfate, Chondroitin',
      dosage: '2 kapsul 2 kali sehari (setelah makan)',
      bpomNumber: 'TR223614789',
      categoryId: categoryMap.get('Herbal Stamina')!,
      isBestSeller: false,
      isNew: true,
      complaints: ['Nyeri Sendi'],
    },
    {
      name: 'Madu Anak Vitalitas',
      slug: 'madu-anak-vitalitas',
      shortDesc: 'Madu herbal khusus untuk anak yang membantu meningkatkan nafsu makan, daya tahan tubuh, dan vitalitas.',
      description: 'Madu Anak Vitalitas diformulasikan khusus untuk kebutuhan anak-anak usia 1-12 tahun. Menggunakan madu murni sebagai base yang dikombinasikan dengan berbagai herbal pilihan yang aman untuk anak.\n\n**Manfaat Utama:**\n• Meningkatkan nafsu makan anak\n• Meningkatkan daya tahan tubuh agar tidak mudah sakit\n• Membantu proses pertumbuhan dan perkembangan\n• Menambah vitalitas dan konsentrasi\n• Rasa manis alami yang disukai anak\n\nDiperkaya dengan temulawak, meniran, dan jeruk nipis yang telah lama dikenal sebagai herbal favorit untuk anak-anak. Aman dikonsumsi setiap hari karena terbuat dari 100% bahan alami.',
      price: 70000,
      image: '/products/madu-anak-vitalitas.png',
      form: 'cair',
      composition: 'Madu Murni, Ekstrak Temulawak, Ekstrak Meniran, Perasan Jeruk Nipis',
      dosage: '1-2 sendok teh sehari (sesuaikan usia anak)',
      bpomNumber: 'TR163615012',
      categoryId: categoryMap.get('Herbal Stamina')!,
      isBestSeller: false,
      isNew: false,
      complaints: ['Kurang Nafsu Makan'],
    },
    {
      name: 'Teh Detox Senna',
      slug: 'teh-detox-senna',
      shortDesc: 'Teh detox herbal dengan daun senna untuk membantu membersihkan pencernaan dan mendetoksifikasi tubuh secara lembut.',
      description: 'Teh Detox Senna adalah teh herbal yang mengombinasikan daun senna dengan berbagai herbal pelengkap untuk proses detoxifikasi tubuh yang lembut namun efektif. Daun senna telah digunakan selama ribuan tahun sebagai pelancar pencernaan alami.\n\n**Manfaat Utama:**\n• Melancarkan BAB dan membersihkan saluran cerna\n• Mendetoksifikasi tubuh dari racun akumulatif\n• Mengurangi kembung dan perut busung\n• Membantu program diet dan penurunan berat badan\n• Menjaga kesehatan kulit melalui detox dari dalam\n\nDiformulasikan dengan dosis senna yang tepat agar aman untuk penggunaan rutin. Diperkaya dengan peppermint untuk rasa yang menyegarkan dan membantu mengurangi efek kram perut.',
      price: 40000,
      image: '/products/teh-detox-senna.png',
      form: 'teh',
      composition: 'Daun Senna, Peppermint, Daun Stevia, Kayu Manis, Lemon Grass',
      dosage: '1 sachet sehari (seduh dengan air panas 200ml, minum sebelum tidur)',
      bpomNumber: 'TR233615345',
      categoryId: categoryMap.get('Herbal Detox')!,
      isBestSeller: false,
      isNew: true,
      complaints: [],
    },
  ]

  const products = []
  for (const pData of productsData) {
    const { complaints: pComplaints, ...productFields } = pData
    const product = await db.product.create({
      data: {
        ...productFields,
        complaints: {
          create: pComplaints.map((cName) => ({
            complaintId: complaintMap.get(cName)!,
          })),
        },
      },
    })
    products.push(product)
  }

  const productMap = new Map(products.map((p) => [p.name, p.id]))
  console.log(`✅ Created ${products.length} products\n`)

  // ========================================
  // PRODUCT FAQS
  // ========================================
  console.log('📋 Creating product FAQs...')

  const faqsData: { productId: string; question: string; answer: string; sortOrder: number }[] = [
    // Madu Habbatussauda Premium
    {
      productId: productMap.get('Madu Habbatussauda Premium')!,
      question: 'Apakah aman dikonsumsi setiap hari?',
      answer: 'Ya, sangat aman dikonsumsi setiap hari. Madu Habbatussauda Premium terbuat dari 100% bahan alami dan telah terdaftar di BPOM. Dosis yang dianjurkan adalah 2 sendok makan sehari.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Madu Habbatussauda Premium')!,
      question: 'Bolehkah dikonsumsi oleh anak-anak?',
      answer: 'Bisa, namun untuk anak di bawah 5 tahun dosis dikurangi menjadi 1 sendok teh sehari. Untuk anak 5-12 tahun, 1 sendok makan sehari. Konsultasikan dengan dokter jika anak memiliki alergi madu.',
      sortOrder: 2,
    },
    {
      productId: productMap.get('Madu Habbatussauda Premium')!,
      question: 'Berapa lama sampai terasa khasiatnya?',
      answer: 'Khasiat umumnya mulai dirasakan dalam 1-2 minggu konsumsi rutin. Untuk hasil optimal dalam meningkatkan daya tahan tubuh, disarankan konsumsi minimal 1 bulan secara rutin.',
      sortOrder: 3,
    },
    // Jus Manggis Plus
    {
      productId: productMap.get('Jus Manggis Plus')!,
      question: 'Kapan waktu terbaik minum Jus Manggis Plus?',
      answer: 'Waktu terbaik adalah 30 menit sebelum makan pada pagi hari. Ini membantu penyerapan nutrisi yang lebih optimal. Bisa juga diminum sebelum tidur untuk membantu proses regenerasi sel saat tidur.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Jus Manggis Plus')!,
      question: 'Apakah ada efek samping?',
      answer: 'Secara umum tidak ada efek samping yang berarti karena terbuat dari bahan alami. Beberapa orang mungkin mengalami perubahan warna urine yang lebih gelap, ini normal dan menandakan proses detoxifikasi sedang berjalan.',
      sortOrder: 2,
    },
    // Kapsul Kunyit Putih
    {
      productId: productMap.get('Kapsul Kunyit Putih')!,
      question: 'Apa perbedaan kunyit putih dengan kunyit kuning biasa?',
      answer: 'Kunyit putih (Curcuma zedoaria) memiliki kandungan curcuminoid yang lebih tinggi dan khasiat antioksidan yang lebih kuat dibanding kunyit kuning. Kunyit putih juga memiliki sifat anti-kanker yang lebih potensial berdasarkan penelitian ilmiah.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Kapsul Kunyit Putih')!,
      question: 'Boleh dikonsumsi ibu hamil atau menyusui?',
      answer: 'Untuk ibu hamil, disarankan berkonsultasi dengan dokter terlebih dahulu. Untuk ibu menyusui, aman dikonsumsi karena justru dapat meningkatkan kualitas ASI dan daya tahan tubuh ibu.',
      sortOrder: 2,
    },
    // Minyak Zaitun Extra Virgin
    {
      productId: productMap.get('Minyak Zaitun Extra Virgin')!,
      question: 'Apakah bisa digunakan untuk memasak?',
      answer: 'Ya, bisa digunakan untuk memasak dengan suhu rendah hingga sedang (tidak digoreng dengan suhu sangat tinggi). Minyak zaitun extra virgin lebih baik dikonsumsi langsung atau dicampurkan dalam salad untuk mendapatkan manfaat maksimal.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Minyak Zaitun Extra Virgin')!,
      question: 'Bagaimana cara menyimpan yang benar?',
      answer: 'Simpan di tempat sejuk dan kering, terhindar dari sinar matahari langsung. Tutup rapat setelah penggunaan. Produk ini bisa bertahan hingga 18 bulan jika disimpan dengan benar.',
      sortOrder: 2,
    },
    // Teh Herbal Asam Lambung
    {
      productId: productMap.get('Teh Herbal Asam Lambung')!,
      question: 'Saya punya maag kronis, apakah ini aman?',
      answer: 'Ya, aman dan justru direkomendasikan untuk penderita maag kronis. Teh ini bersifat menenangkan lambung, bukan merangsang asam. Namun untuk kasus maag yang sangat parah, tetap disarankan berkonsultasi dengan dokter.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Teh Herbal Asam Lambung')!,
      question: 'Bisa diminum saat perut kosong?',
      answer: 'Dianjurkan diminum setelah makan atau 30 menit sebelum makan. Minum saat perut kosong mungkin tidak nyaman bagi beberapa orang dengan lambung sensitif.',
      sortOrder: 2,
    },
    // Kapsul Daun Salam
    {
      productId: productMap.get('Kapsul Daun Salam')!,
      question: 'Apakah bisa mengganti obat diabetes dokter?',
      answer: 'Tidak. Kapsul Daun Salam adalah suplemen herbal pendukung, bukan pengganti obat resep dokter. Konsultasikan dengan dokter Anda jika ingin mengombinasikan dengan obat diabetes yang sedang dikonsumsi.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Kapsul Daun Salam')!,
      question: 'Berapa lama efeknya terasa?',
      answer: 'Penurunan gula darah biasanya mulai terasa setelah 2-4 minggu konsumsi rutin. Hasil optimal biasanya terlihat setelah 2-3 bulan pemakaian teratur.',
      sortOrder: 2,
    },
    // Madu Propolis
    {
      productId: productMap.get('Madu Propolis')!,
      question: 'Apa itu propolis dan mengapa bermanfaat?',
      answer: 'Propolis adalah resin yang dikumpulkan lebah dari tunas pohon dan digunakan sebagai pertahanan alami sarang lebah dari bakteri dan virus. Propolis mengandung lebih dari 300 senyawa bioaktif yang sangat bermanfaat untuk sistem kekebalan tubuh manusia.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Madu Propolis')!,
      question: 'Bagaimana cara mengonsumsinya?',
      answer: 'Bisa langsung diminum 2 sendok makan sehari, atau dicampurkan ke dalam air hangat. Untuk sakit tenggorokan, bisa diteteskan langsung ke tenggorokan dan dibiarkan meresap beberapa saat.',
      sortOrder: 2,
    },
    // Serbuk Kunyit Asam
    {
      productId: productMap.get('Serbuk Kunyit Asam')!,
      question: 'Apakah bisa diminum saat haid?',
      answer: 'Ya, sangat dianjurkan! Serbuk Kunyit Asam justru paling bermanfaat saat haid karena membantu meredakan nyeri dan kram. Minum 2 kali sehari selama periode haid untuk hasil optimal.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Serbuk Kunyit Asam')!,
      question: 'Apakah aman untuk ibu hamil?',
      answer: 'Kunyit dalam jumlah normal aman untuk ibu hamil. Namun karena mengandung asam jawa yang bisa mempengaruhi contraksi rahim, sebaiknya konsultasikan dengan dokter kandungan terlebih dahulu.',
      sortOrder: 2,
    },
    // Kapsul Omega-3 Salmon
    {
      productId: productMap.get('Kapsul Omega-3 Salmon')!,
      question: 'Mengapa harus Omega-3 dari salmon?',
      answer: 'Salmon Alaska merupakan sumber Omega-3 (EPA & DHA) terbaik yang paling mudah diserap tubuh. Omega-3 dari ikan laut dingin lebih stabil dan berkualitas tinggi dibanding dari sumber nabati.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Kapsul Omega-3 Salmon')!,
      question: 'Apakah ada bau amis?',
      answer: 'Tidak. Kapsul menggunakan teknologi enteric coating yang mencegah bau amis dan menjamin penyerapan optimal di usus. Juga ditambahkan vitamin E sebagai antioksidan untuk menjaga kesegaran.',
      sortOrder: 2,
    },
    // Herbal Joint Care
    {
      productId: productMap.get('Herbal Joint Care')!,
      question: 'Untuk usia berapa produk ini cocok?',
      answer: 'Produk ini cocok untuk usia 30 tahun ke atas yang mulai merasakan keluhan sendi. Namun untuk pencegahan, bisa mulai dikonsumsi sejak usia 25 tahun, terutama bagi yang aktif berolahraga atau memiliki riwayat keluhan sendi.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Herbal Joint Care')!,
      question: 'Berapa lama sampai terasa hasilnya?',
      answer: 'Untuk pengurangan nyeri, biasanya terasa dalam 1-2 minggu. Untuk perbaikan jangka panjang pada kesehatan sendi, dibutuhkan konsumsi rutin selama minimal 2-3 bulan.',
      sortOrder: 2,
    },
    // Madu Anak Vitalitas
    {
      productId: productMap.get('Madu Anak Vitalitas')!,
      question: 'Dari usia berapa anak bisa minum madu ini?',
      answer: 'Aman untuk anak mulai usia 1 tahun. Untuk anak usia 1-3 tahun, berikan 1 sendok teh sehari. Usia 4-12 tahun, 1-2 sendok teh sehari. Jangan berikan madu pada bayi di bawah 1 tahun.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Madu Anak Vitalitas')!,
      question: 'Anak saya alergi, apakah aman?',
      answer: 'Produk ini terbuat dari bahan alami dan aman untuk sebagian besar anak. Namun jika anak memiliki riwayat alergi terhadap produk lebah atau herbal tertentu, disarankan berkonsultasi dengan dokter terlebih dahulu.',
      sortOrder: 2,
    },
    // Teh Detox Senna
    {
      productId: productMap.get('Teh Detox Senna')!,
      question: 'Bisa diminum setiap hari?',
      answer: 'Untuk program detox intensif, bisa diminum setiap hari selama 7-14 hari. Setelah itu, cukup 2-3 kali seminggu untuk pemeliharaan. Penggunaan jangka panjang setiap hari tidak disarankan agar sistem pencernaan tidak terlalu bergantung.',
      sortOrder: 1,
    },
    {
      productId: productMap.get('Teh Detox Senna')!,
      question: 'Apakah menyebabkan diare?',
      answer: 'Tidak menyebabkan diare. Teh ini bekerja melancarkan BAB secara normal. Jika terjadi BAB terlalu sering, kurangi dosis menjadi setengah sachet atau minum setiap dua hari sekali.',
      sortOrder: 2,
    },
  ]

  await db.productFaq.createMany({ data: faqsData })
  console.log(`✅ Created ${faqsData.length} product FAQs\n`)

  // ========================================
  // TESTIMONIALS
  // ========================================
  console.log('📋 Creating testimonials...')

  const testimonialsData = [
    {
      name: 'Ibu Sari Dewi',
      location: 'Jakarta Selatan',
      rating: 5,
      content: 'Sudah 3 bulan rutin konsumsi Madu Habbatussauda Premium untuk keluarga. Alhamdulillah, anak-anak jadi jarang sakit dan nafsu makan mereka meningkat. Kualitas madu benar-benar terasa berbeda dari produk lain yang pernah saya coba. Sangat recommended!',
      productId: productMap.get('Madu Habbatussauda Premium')!,
      isFeatured: true,
    },
    {
      name: 'Bapak Ahmad Fauzi',
      location: 'Bandung',
      rating: 5,
      content: 'Kolesterol saya turun dari 280 ke 210 setelah rutin minum Jus Manggis Plus dan Minyak Zaitun selama 2 bulan. Dokter saya juga kaget dengan hasilnya. Sekarang saya lebih percaya dengan pengobatan herbal. Terima kasih Herbal Nusantara!',
      productId: productMap.get('Jus Manggis Plus')!,
      isFeatured: true,
    },
    {
      name: 'Ibu Ratna Sari',
      location: 'Surabaya',
      rating: 5,
      content: 'Saya penderita asam lambung kronis sudah bertahun-tahun. Setelah minum Teh Herbal Asam Lambung selama 1 bulan, gejalanya berkurang drastis. Saya sudah bisa makan makanan favorit saya lagi tanpa takut kambuh. Luar biasa!',
      productId: productMap.get('Teh Herbal Asam Lambung')!,
      isFeatured: true,
    },
    {
      name: 'Bapak Budi Santoso',
      location: 'Yogyakarta',
      rating: 5,
      content: 'Nyeri sendi lutut saya yang sudah lama mengganggu aktivitas sehari-hari, alhamdulillah berkurang setelah minum Herbal Joint Care 3 minggu. Sekarang saya bisa jalan-jalan pagi lagi tanpa rasa sakit. Produk herbal yang benar-benar berkhasiat.',
      productId: productMap.get('Herbal Joint Care')!,
      isFeatured: true,
    },
    {
      name: 'Ibu Linda Permata',
      location: 'Semarang',
      rating: 5,
      content: 'Serbuk Kunyit Asam ini menjadi andalan saya setiap bulan. Nyeri haid yang biasanya sangat mengganggu jadi jauh berkurang. Rasanya juga enak, apalagi ditambah madu. Sudah recommended ke semua teman saya.',
      productId: productMap.get('Serbuk Kunyit Asam')!,
      isFeatured: false,
    },
    {
      name: 'Bapak Hendra Wijaya',
      location: 'Medan',
      rating: 5,
      content: 'Sebagai pekerja kantoran yang sering lembur, Madu Propolis sangat membantu menjaga stamina dan daya tahan tubuh. Selama setahun ini saya tidak pernah sakit. Investasi kesehatan yang sangat worth it!',
      productId: productMap.get('Madu Propolis')!,
      isFeatured: false,
    },
    {
      name: 'Ibu Dewi Lestari',
      location: 'Bali',
      rating: 5,
      content: 'Kapsul Daun Salam membantu menurunkan gula darah ayah saya yang diabetes. Setelah 2 bulan konsumsi rutin, gula darah puasanya turun dari 250 ke 180. Tentu saja tetap dikombinasikan dengan pola makan sehat dan obat dari dokter.',
      productId: productMap.get('Kapsul Daun Salam')!,
      isFeatured: false,
    },
    {
      name: 'Ibu Nurul Aini',
      location: 'Malang',
      rating: 5,
      content: 'Anak saya yang susah makan sekarang jadi lahap setelah diberi Madu Anak Vitalitas. Berat badannya juga naik 2 kg dalam sebulan. Senang rasanya melihat anak makan dengan lahap. Terima kasih Herbal Nusantara!',
      productId: productMap.get('Madu Anak Vitalitas')!,
      isFeatured: false,
    },
  ]

  await db.testimonial.createMany({ data: testimonialsData })
  console.log(`✅ Created ${testimonialsData.length} testimonials\n`)

  // ========================================
  // ARTICLES
  // ========================================
  console.log('📋 Creating articles...')

  const articlesData = [
    {
      title: 'Manfaat Kunyit untuk Kesehatan Tubuh',
      slug: 'manfaat-kunyit-untuk-kesehatan-tubuh',
      excerpt: 'Kunyit bukan hanya bumbu dapur biasa. Tanaman emas ini memiliki segudang manfaat kesehatan yang telah dibuktikan oleh penelitian ilmiah modern.',
      content: `Kunyit (Curcuma longa) adalah salah satu tanaman herbal paling berharga di Indonesia. Sejak ribuan tahun lalu, kunyit telah digunakan dalam pengobatan tradisional untuk berbagai keluhan kesehatan. Kandungan utama kunyit, yaitu curcumin, merupakan senyawa antioksidan dan anti-inflamasi yang sangat kuat.

Penelitian ilmiah modern telah membuktikan bahwa curcumin dalam kunyit memiliki kemampuan melawan radikal bebas yang 8 kali lebih kuat dari vitamin E dan 5 kali lebih kuat dari vitamin C. Senyawa ini juga terbukti mampu menghambat enzim penyebab peradangan, sehingga efektif untuk mengatasi berbagai kondisi inflamasi termasuk arthritis dan gangguan pencernaan.

Untuk mendapatkan manfaat maksimal, konsumsilah kunyit secara rutin dalam bentuk teh, kapsul, atau ditambahkan ke dalam masakan sehari-hari. Mengombinasikan kunyit dengan lada hitam dapat meningkatkan penyerapan curcumin hingga 2000%, sehingga khasiatnya lebih optimal dirasakan oleh tubuh.`,
      image: '/articles/manfaat-kunyit-untuk-kesehatan-tubuh.png',
      category: 'herbal-info',
    },
    {
      title: 'Tips Hidup Sehat dengan Herbal Alami',
      slug: 'tips-hidup-sehat-dengan-herbal-alami',
      excerpt: 'Mengintegrasikan herbal ke dalam gaya hidup sehari-hari dapat memberikan dampak positif yang signifikan bagi kesehatan secara keseluruhan.',
      content: `Hidup sehat bukan berarti harus mengeluarkan biaya besar. Indonesia kaya akan keanekaragaman herbal yang bisa menjadi bagian dari gaya hidup sehat harian Anda. Langkah pertama adalah memulai dengan herbal sederhana yang mudah didapat, seperti jahe, kunyit, dan serai yang bisa diseduh menjadi teh hangat di pagi hari.

Penting untuk mengenali kebutuhan tubuh Anda dan memilih herbal yang tepat. Jika Anda memiliki masalah pencernaan, temulawak dan daun jambu biji bisa menjadi pilihan. Untuk meningkatkan daya tahan tubuh, madu dan propolis adalah suplemen alami yang sangat baik. Konsultasikan dengan herbalis atau dokter yang memahami pengobatan herbal untuk mendapatkan rekomendasi yang sesuai.

Selain mengonsumsi herbal, jangan lupa untuk menyeimbangkan dengan pola hidup sehat lainnya: makan makanan bergizi seimbang, olahraga teratur, cukup tidur, dan kelola stres dengan baik. Herbal bekerja paling optimal ketika didukung oleh gaya hidup yang sehat secara menyeluruh.`,
      image: '/articles/tips-hidup-sehat-dengan-herbal-alami.png',
      category: 'tips',
    },
    {
      title: 'Cara Mengatasi Asam Lambung Secara Alami',
      slug: 'cara-mengatasi-asam-lambung-secara-alami',
      excerpt: 'Asam lambung bisa sangat mengganggu aktivitas sehari-hari. Pelajari cara mengatasinya secara alami dengan herbal Indonesia yang aman dan efektif.',
      content: `Asam lambung atau GERD (Gastroesophageal Reflux Disease) adalah kondisi yang sangat umum dialami masyarakat Indonesia. Gejalanya meliputi rasa perih di dada, mual, dan sensasi terbakar di tenggorokan. Penyebabnya bervariasi mulai dari pola makan tidak teratur, stres, hingga konsumsi makanan yang merangsang produksi asam lambung.

Beberapa herbal Indonesia telah terbukti efektif mengatasi asam lambung. Sambiloto memiliki sifat anti-inflamasi yang membantu menenangkan lapisan lambung. Temulawak merangsang produksi lendir pelindung lambung. Daun jambu biji membantu menetralkan kelebihan asam. Kombinasi herbal ini tersedia dalam bentuk teh yang praktis dikonsumsi sehari-hari.

Selain herbal, perhatikan juga pola makan Anda: makan dalam porsi kecil tapi sering, hindari makanan pedas dan asam, jangan makan terlalu larut malam, dan kunyah makanan dengan baik. Jika gejala asam lambung berlanjut meskipun sudah mencoba pengobatan alami, segera konsultasikan dengan dokter untuk pemeriksaan lebih lanjut.`,
      image: '/articles/cara-mengatasi-asam-lambung-secara-alami.png',
      category: 'herbal-info',
    },
    {
      title: 'Menjaga Imunitas di Musim Pancaroba',
      slug: 'menjaga-imunitas-di-musim-pancaroba',
      excerpt: 'Musim pancaroba membuat tubuh lebih rentan terhadap penyakit. Simak tips menjaga imunitas dengan herbal alami agar tetap sehat sepanjang tahun.',
      content: `Musim pancaroba atau peralihan musim adalah waktu yang paling rentan bagi tubuh. Perubahan suhu dan kelembapan yang drastis membuat sistem kekebalan tubuh bekerja ekstra keras. Banyak orang mengalami flu, batuk, dan demam pada masa ini. Oleh karena itu, penting untuk memperkuat daya tahan tubuh.

Madu Habbatussauda (jintan hitam) adalah salah satu herbal terbaik untuk meningkatkan imunitas. Rasulullah SAW menyebutnya sebagai "obat untuk segala penyakit" dan penelitian modern membuktikan bahwa habbatussauda mampu meningkatkan produksi sel imun secara signifikan. Jus manggis yang kaya xanthone juga menjadi pilihan tepat karena antioksidannya yang sangat kuat.

Selain mengonsumsi herbal, pastikan juga untuk istirahat yang cukup (7-8 jam per hari), minum air putih minimal 8 gelas sehari, dan hindari makanan yang diproses secara berlebihan. Vitamin D dari paparan sinar matahari pagi juga sangat penting untuk menjaga sistem imun tetap optimal.`,
      image: '/articles/menjaga-imunitas-di-musim-pancaroba.png',
      category: 'tips',
    },
    {
      title: 'Mengenal Lebih Dekat Habbatussauda',
      slug: 'mengenal-lebih-dekat-habbatussauda',
      excerpt: 'Habbatussauda atau jintan hitam memiliki sejarah panjang sebagai tanuhan obat. Temukan fakta menarik dan manfaat luar biasa dari biji kecil ini.',
      content: `Habbatussauda (Nigella Sativa) atau jintan hitam telah digunakan sebagai obat selama lebih dari 3000 tahun. Dalam pengobatan tradisional Mesir Kuno, biji ini ditemukan di makam Tutankhamun sebagai simbol kesehatan. Dalam pengobatan Islam, habbatussauda disebut dalam hadits sebagai "obat yang menyembuhkan segala penyakit kecuali kematian."

Lebih dari 600 penelitian ilmiah telah dilakukan untuk menguji khasiat habbatussauda. Hasilnya sangat menakjubkan: habbatussauda mengandung thymoquinone, senyawa yang memiliki aktivitas anti-kanker, anti-diabetes, anti-hipertensi, dan anti-bakteri. Biji kecil ini juga mengandung asam lemak esensial, vitamin, mineral, dan antioksidan yang bekerja sinergis untuk menjaga kesehatan tubuh secara menyeluruh.

Di Indonesia, habbatussauda paling populer dikonsumsi dalam bentuk minyak atau dikombinasikan dengan madu. Produk Madu Habbatussauda Premium dari Herbal Nusantara mengombinasikan kedua bahan superfood ini untuk memberikan manfaat yang lebih optimal. Konsumsi rutin 2 sendok makan sehari dapat membantu meningkatkan daya tahan tubuh, nafsu makan, dan kesehatan secara keseluruhan.`,
      image: '/articles/mengenal-lebih-dekat-habbatussauda.png',
      category: 'herbal-info',
    },
    {
      title: 'Panduan Lengkap Detox Tubuh secara Alami',
      slug: 'panduan-lengkap-detox-tubuh-secara-alami',
      excerpt: 'Detoxifikasi tubuh penting untuk menghilangkan racun yang terakumulasi. Pelajari cara melakukan detox yang aman dan efektif dengan bahan herbal alami.',
      content: `Tubuh kita setiap hari terpapar racun dari berbagai sumber: polusi udara, pestisida pada makanan, bahan pengawet, dan stres. Akumulasi racun ini dapat menyebabkan kelelahan kronis, kulit kusam, pencernaan bermasalah, dan menurunnya daya tahan tubuh. Detoxifikasi secara teratur membantu tubuh membersihkan diri dari racun-racun ini.

Detox herbal yang paling populer adalah menggunakan jus manggis, teh senna, dan kunyit putih. Jus manggis mengandung xanthone yang membantu membersihkan racun di tingkat selular. Teh senna melancarkan pembuangan racun melalui saluran pencernaan. Kunyit putih mendukung fungsi hati sebagai organ utama detoksifikasi. Kombinasi ketiga herbal ini memberikan efek detox yang menyeluruh.

Program detox yang disarankan adalah selama 7-14 hari, diimbangi dengan pola makan sehat (banyak sayur dan buah), minum air putih minimal 2 liter sehari, dan olahraga ringan secara teratur. Hindari makanan olahan, kafein, dan alkohol selama program detox berlangsung. Setelah program selesai, Anda akan merasakan tubuh yang lebih ringan, bugar, dan berenergi.`,
      image: '/articles/panduan-lengkap-detox-tubuh-secara-alami.png',
      category: 'healthy-living',
    },
  ]

  await db.article.createMany({ data: articlesData })
  console.log(`✅ Created ${articlesData.length} articles\n`)

  console.log('🎉 Seed completed successfully!')
  console.log(`\n📊 Summary:`)
  console.log(`  Categories: ${categories.length}`)
  console.log(`  Complaints: ${complaints.length}`)
  console.log(`  Products: ${products.length}`)
  console.log(`  FAQs: ${faqsData.length}`)
  console.log(`  Testimonials: ${testimonialsData.length}`)
  console.log(`  Articles: ${articlesData.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
