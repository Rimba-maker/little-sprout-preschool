import type { PhotoKey } from './photos';

/**
 * Names, prices, accreditation, and quotes are placeholders the school
 * replaces with real data.
 */

export const nav = [
  { href: '#filosofi', label: 'Tentang' },
  { href: '#program', label: 'Program' },
  { href: '#kurikulum', label: 'Kurikulum' },
  { href: '#fasilitas', label: 'Fasilitas' },
  { href: '#biaya', label: 'Biaya' },
] as const;

export const trust = [
  '12+ Tahun Berpengalaman',
  'Akreditasi A',
  'ECCD Certified Teachers',
  'Bilingual ID-EN Program',
] as const;

export const philosophy = {
  title: 'Filosofi Kami',
  body: [
    'Kami percaya, masa pra-sekolah adalah tentang menumbuhkan rasa ingin tahu, bukan menjejalkan informasi.',
    'Anak-anak di Little Sprout belajar dengan tangan mereka, dengan pertanyaan mereka, dan dengan ritme mereka sendiri.',
    'Kami menggabungkan filosofi Reggio Emilia (anak sebagai protagonis pembelajaran), Montessori (kemandirian dan lingkungan terstruktur), dan play-based learning, karena ketiganya bukan pilihan, tapi pelengkap.',
  ],
  principles: [
    {
      title: 'Child-Led Learning',
      body: 'Anak menentukan minat. Guru mendampingi, bukan memerintah. Kurikulum fleksibel sesuai exploration anak.',
      photo: 'phil-childled' as PhotoKey,
      note: 'Hari ini kami meneliti kenapa cat air bisa bercampur.',
    },
    {
      title: 'Learn Through Play',
      body: 'Semua pembelajaran via play: building, art, music, outdoor exploration. Karena play adalah work untuk anak.',
      photo: 'phil-play' as PhotoKey,
      note: 'Menara paling tinggi hari ini: 14 balok.',
    },
    {
      title: 'Whole-Child Development',
      body: 'Bukan hanya cognitive. Social-emotional, physical, creative: semua sama pentingnya untuk anak usia dini.',
      photo: 'phil-whole' as PhotoKey,
      note: 'Pelukan pagi adalah bagian dari kurikulum.',
    },
  ],
};

export interface Program {
  name: string;
  age: string;
  ratio: string;
  hours: string;
  focus: string;
  days: string;
  price: string;
  photo: PhotoKey;
}

export const programs: Program[] = [
  { name: 'Toddler Class', age: '2–3 tahun', ratio: '1:4', hours: 'Half-day 08:30–11:30', focus: 'Motorik, basic vocabulary, social play', days: 'Senin–Jumat', price: 'Rp 2,8 jt', photo: 'prog-toddler' },
  { name: 'Nursery', age: '3–4 tahun', ratio: '1:6', hours: 'Half-day atau full-day sampai 14:00', focus: 'Language development, fine motor, friendship', days: 'Senin–Jumat', price: 'Rp 3,2–4,5 jt', photo: 'prog-nursery' },
  { name: 'Pre-K', age: '4–5 tahun', ratio: '1:8', hours: 'Full-day 08:30–14:30', focus: 'Literacy, numeracy basics, creative expression', days: 'Senin–Jumat', price: 'Rp 4,5–5,5 jt', photo: 'prog-prek' },
  { name: 'Kindergarten / TK B', age: '5–6 tahun', ratio: '1:10', hours: 'Full-day 08:30–15:00', focus: 'School readiness, reading and writing, independence', days: 'Senin–Jumat', price: 'Rp 5,5–6,8 jt', photo: 'prog-kinder' },
];

export const curriculum = [
  { title: 'Reggio Emilia Approach', body: 'Anak sebagai aktif protagonis. Learning melalui project dan investigasi.', photo: 'curr-reggio' as PhotoKey },
  { title: 'Montessori Method', body: 'Lingkungan terstruktur dengan material self-correcting. Mengasah konsentrasi dan kemandirian.', photo: 'curr-montessori' as PhotoKey },
  { title: 'Play-Based Learning', body: 'Free play, guided play, dan structured play untuk berbagai goal pembelajaran.', photo: 'curr-play' as PhotoKey },
  { title: 'Bilingual (Indonesia + English)', body: 'Native English teacher di setiap kelas. Indonesian sebagai mother tongue tetap dilestarikan.', photo: 'curr-bilingual' as PhotoKey },
  { title: 'Mindfulness dan Social-Emotional', body: 'Mindfulness untuk anak (yoga pagi, breathing exercise). Social-emotional learning explicit.', photo: 'curr-mindful' as PhotoKey },
  { title: 'Outdoor dan Nature', body: 'Minimum 1 jam outdoor setiap hari. Garden, sandpit, climbing, exploration.', photo: 'curr-outdoor' as PhotoKey },
];

export interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
  photo?: PhotoKey;
}

export const schedule: ScheduleItem[] = [
  { time: '08:30', title: 'Welcome dan Free Play', desc: 'Anak tiba dan bebas bereksplorasi di lingkungan yang sudah disiapkan guru.', photo: 'day-welcome' },
  { time: '09:00', title: 'Morning Circle', desc: 'Yoga ringan, lagu bersama, dan sharing pagi.', photo: 'day-circle' },
  { time: '09:30', title: 'Project Time', desc: 'Theme-based learning: investigasi, eksperimen, eksplorasi kreatif.', photo: 'day-project' },
  { time: '10:30', title: 'Healthy Snack dan Conversation', desc: 'Snack bergizi dan percakapan ringan untuk membangun social skills.', photo: 'day-snack' },
  { time: '11:00', title: 'Outdoor Play dan Nature', desc: 'Gerak bebas di luar: climbing, sandpit, garden.', photo: 'day-outdoor' },
  { time: '12:00', title: 'Lunch', desc: 'Makan siang catering halal yang sehat. Allergy-friendly options tersedia.', photo: 'day-lunch' },
  { time: '12:45', title: 'Quiet Time / Nap', desc: 'Untuk program full-day. Istirahat penting bagi tumbuh kembang.' },
  { time: '14:00', title: 'Creative Expression', desc: 'Art, music, drama: ekspresi diri lewat berbagai media.', photo: 'day-creative' },
  { time: '15:00', title: 'Pickup Time', desc: 'Hari berakhir. Daily report via app langsung ke orangtua.' },
];

export interface Teacher {
  name: string;
  role: string;
  creds: string;
  langs: string[];
  bio: string;
  photo: PhotoKey;
  /** CSS object-position for the portrait crop. */
  pos?: string;
}

export const teachers: Teacher[] = [
  { name: 'Ms. Linda Hartono, M.Ed.', role: 'Director', creds: 'S2 Early Childhood Education · 15+ tahun', langs: ['ID', 'EN'], bio: 'Memimpin kurikulum dan menemani setiap keluarga baru saat campus tour.', photo: 'teach-linda' },
  { name: 'Ms. Sarah Thompson', role: 'Lead Teacher Pre-K', creds: 'Native English speaker · Australia', langs: ['EN'], bio: 'Membangun percakapan bahasa Inggris lewat cerita dan proyek.', photo: 'teach-sarah', pos: '96% 32%' },
  { name: 'Ms. Putri Wulandari, S.Pd.', role: 'Lead Teacher Nursery', creds: 'S1 PAUD UPI · ECCD Certified', langs: ['ID', 'EN'], bio: 'Mendampingi anak 3–4 tahun belajar berteman dan berbahasa.', photo: 'teach-putri' },
  { name: 'Ms. Maya Rachmawati, B.Ed.', role: 'Lead Teacher Toddler', creds: 'ECCD Certified', langs: ['ID', 'EN'], bio: 'Sabar, hangat, dan paham ritme anak 2–3 tahun.', photo: 'teach-maya' },
  { name: 'Pak Reza Kurniawan', role: 'Music dan Movement', creds: 'Specialist musik anak', langs: ['ID', 'EN'], bio: 'Mengajak anak bergerak dan bernyanyi lewat keyboard, drum, dan ukulele.', photo: 'teach-reza' },
  { name: 'Ms. Fatma Anggraeni', role: 'Art dan Creative Expression', creds: 'Specialist seni anak', langs: ['ID'], bio: 'Menyiapkan tanah liat, kain, dan bahan bekas untuk karya anak.', photo: 'teach-fatma' },
  { name: 'Pak Bayu Pratama', role: 'Outdoor dan Physical Education', creds: 'Specialist gerak dan olahraga anak', langs: ['ID', 'EN'], bio: 'Memandu satu jam outdoor setiap hari: panjat, pasir, dan kebun.', photo: 'teach-bayu' },
  { name: 'Ms. Lia Indriani, Psikolog', role: 'Child Psychologist', creds: 'Konsultan tumbuh kembang', langs: ['ID'], bio: 'Bekerja bersama guru dan orangtua untuk strategi yang konsisten di rumah.', photo: 'teach-lia' },
];

export interface Facility {
  title: string;
  photo: PhotoKey;
  points: string[];
}

export const facilities: Facility[] = [
  { title: 'Indoor Classrooms', photo: 'fac-class', points: ['4 ruang kelas dengan natural light', 'Montessori material lengkap', 'Reading corner dengan 500+ buku', 'AC dan ventilasi baik'] },
  { title: 'Outdoor Playground', photo: 'fac-play', points: ['600 m² outdoor space', 'Sandpit, climbing structure, swings', 'Garden untuk planting activity', 'Shade dan water station'] },
  { title: 'Art dan Creative Studio', photo: 'fac-art', points: ['Dedicated art room', 'Easels, clay, fabric, recyclable materials', 'Display wall untuk karya anak'] },
  { title: 'Music dan Movement Room', photo: 'fac-music', points: ['Wooden floor untuk dance dan yoga', 'Keyboard, drums, ukulele', 'Sound system'] },
  { title: 'Library Corner', photo: 'fac-library', points: ['1.000+ buku bilingual', 'Reading nook yang cozy', 'Storytelling sessions'] },
  { title: 'Dining dan Kitchen', photo: 'fac-dining', points: ['Healthy catered meals (halal certified)', 'Allergy-friendly options', 'Snack time included'] },
];

export const safety = [
  'CCTV di setiap area',
  'Health screening daily',
  'Secure access (keycard)',
  'First aid certified, semua staff',
];

export const tuition = {
  monthly: [
    { program: 'Toddler half-day', month: 'Rp 2,8 jt', year: 'Rp 30 jt' },
    { program: 'Nursery half-day', month: 'Rp 3,2 jt', year: 'Rp 35 jt' },
    { program: 'Nursery full-day', month: 'Rp 4,5 jt', year: 'Rp 49 jt' },
    { program: 'Pre-K', month: 'Rp 5 jt', year: 'Rp 54 jt' },
    { program: 'Kindergarten', month: 'Rp 6 jt', year: 'Rp 65 jt' },
  ],
  oneTime: [
    { item: 'Registrasi', price: 'Rp 3 jt' },
    { item: 'Material dan seragam tahunan', price: 'Rp 5 jt' },
    { item: 'Activity fee (excursion, special events)', price: 'Rp 3 jt' },
  ],
  included: ['Healthy meals (lunch + snack)', 'All learning materials', '2 sets uniform (school + sport)', 'Quarterly parent meeting', 'Year-end show dan exhibition'],
  excluded: ['Transportasi (antar-jemput private +Rp 1,5 jt/bulan)', 'Field trip extra', 'Summer camp'],
  sibling: 'Sibling discount 15% untuk anak ke-2',
};

export interface Testimonial {
  quote: string;
  who: string;
  detail: string;
  photo: PhotoKey;
}

export const testimonials: Testimonial[] = [
  { quote: 'Anak saya pemalu, di sekolah lama dia mostly diam. Di Little Sprout, guru sabar build confidence dia gradually. 6 bulan, dia jadi kid yang antusias cerita harinya.', who: 'Ibu Sari dan Pak Andre', detail: 'Orangtua Mika, 5 tahun', photo: 'fam-sari' },
  { quote: 'Sebagai working parents, kami butuh full-day yang trustworthy. Communication dengan guru via app daily, kami merasa connected ke harinya anak.', who: 'Keluarga Hartanto', detail: 'Orangtua Aiden, 3 tahun', photo: 'fam-hartanto' },
  { quote: 'Sebagai expat family, English curriculum penting untuk kami. Tapi appreciate banget Little Sprout juga lestarikan Bahasa Indonesia, anak kami bilingual confident.', who: 'The Thompson Family', detail: 'Australian expat', photo: 'fam-thompson' },
  { quote: 'Anak kami punya speech delay. Tim guru work closely dengan child psychologist, kami parents dapat consistent strategy untuk di rumah. Progress signifikan.', who: 'Ibu Maya', detail: 'Orangtua Reza, 4 tahun', photo: 'fam-maya' },
];

/** Photo gallery wall shown between Fasilitas and Biaya. */
export const moments: { photo: PhotoKey; caption: string }[] = [
  { photo: 'mom-1', caption: 'Menara setinggi badan' },
  { photo: 'mom-2', caption: 'Berani sampai puncak' },
  { photo: 'mom-3', caption: 'Nada pertama' },
  { photo: 'mom-4', caption: 'Ini keluargaku' },
  { photo: 'mom-5', caption: 'Satu balok, satu ide' },
  { photo: 'mom-6', caption: 'Berhitung dengan tangan' },
  { photo: 'mom-7', caption: 'Belajar nada berdua' },
  { photo: 'mom-8', caption: 'Teman-teman sekelas' },
];

export const tour = {
  title: 'Kunjungi Kampus Kami',
  body: 'Cara terbaik mengenal sekolah adalah datang langsung. Kami host campus tour 30–45 menit, atau Open House bulanan untuk yang mau full experience.',
  options: [
    { title: 'Private Campus Tour', points: ['30–45 menit dengan Director', 'Hari Selasa–Kamis, by appointment', 'Lihat kelas saat anak-anak belajar', 'Q&A langsung'], cta: 'Book Tour', visit: 'Private Campus Tour', photo: 'tour-private' as PhotoKey },
    { title: 'Monthly Open House', points: ['Sabtu pertama setiap bulan', '09:00–11:30, dengan kegiatan untuk anak', 'Meet teachers', 'Q&A panel + tour campus'], cta: 'Daftar Open House', visit: 'Monthly Open House', photo: 'tour-open' as PhotoKey },
  ],
};

export const faqs = [
  { q: 'Anak saya bisa Bahasa Inggris pasif aja, bisa adapt?', a: 'Bisa banget. Banyak anak kami starting position seperti itu, guru bilingual support smooth.' },
  { q: 'Apakah ada trial day?', a: 'Ya, 1 day trial setelah tour (gratis). Anak bisa coba ikut kelas.' },
  { q: 'Bagaimana sistem komunikasi orangtua-sekolah?', a: 'Daily report via app (foto, aktivitas, mood), weekly parent newsletter, quarterly 1-on-1 meeting.' },
  { q: 'Bagaimana jika anak picky eater?', a: 'Kami berikan opsi dan gently encourage. Tidak ada force feeding.' },
  { q: 'Apakah ada child psychologist?', a: 'Yes, in-house consulting. Untuk concerns developmental, kami punya support system.' },
  { q: 'Saya berencana cuti melahirkan, bisa hold spot?', a: 'Bisa, deposit 50% untuk hold spot up to 6 bulan.' },
  { q: 'Apakah kurikulum bisa transition ke SD internasional?', a: 'Iya, alumni kami transition ke ACG, SPH, JIS, BIS, dll dengan baik.' },
];

export const branches = [
  { name: 'Jakarta Selatan', tel: '+6221000000' },
  { name: 'BSD Serpong', tel: '+6221000000' },
  { name: 'Surabaya', tel: '+6231000000' },
];

export const bookingOptions = {
  programs: ['Toddler Class (2–3 thn)', 'Nursery (3–4 thn)', 'Pre-K (4–5 thn)', 'Kindergarten (5–6 thn)'],
  branches: branches.map((b) => b.name),
  visits: ['Private Campus Tour', 'Monthly Open House'],
};
