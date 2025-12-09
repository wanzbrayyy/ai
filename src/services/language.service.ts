import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translations: any = {
    en: {
      home: 'Home',
      features: 'Features',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up',
      getStarted: 'Get Started',
      exploreTech: 'Explore Our Tech',
      whyChoose: 'Why Choose',
      welcome: 'Welcome to the Future with',
      subtitle: 'We build cutting-edge artificial intelligence solutions that empower businesses and drive innovation forward.',
      advancedProcessing: 'Advanced Processing',
      advancedProcessingDesc: 'Leverage our state-of-the-art neural networks for unparalleled data processing and insights.',
      intelligentAutomation: 'Intelligent Automation',
      intelligentAutomationDesc: 'Automate complex tasks and workflows with smart agents that learn and adapt to your needs.',
      predictiveAnalytics: 'Predictive Analytics',
      predictiveAnalyticsDesc: 'Gain a competitive edge with highly accurate predictions and forecasts powered by our AI models.',
      robustSecurity: 'Robust Security',
      robustSecurityDesc: 'Ensure your data is protected with enterprise-grade security and privacy features built-in.',
      cookieConsent: 'We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.',
      learnMore: 'Learn more',
      accept: 'Accept',
      aboutTitle: 'Crafting Intelligence, <br />Designing the Future',
      aboutDesc1: "AI Wanzofc was founded by a team of passionate innovators, researchers, and engineers dedicated to pushing the boundaries of what's possible with artificial intelligence. We believe in creating technology that is not only powerful but also accessible, secure, and beneficial for everyone.",
      aboutDesc2: 'Our mission is to democratize AI, providing businesses of all sizes with the tools they need to innovate, grow, and lead in their respective industries. From intelligent automation to predictive analytics, we are your trusted partner in the digital transformation journey.',
      loginToAccount: 'Login to your account',
      createAnAccount: 'Create a new account',
      or: 'or',
      emailAddress: 'Email address',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      alreadyHaveAccount: 'Already have an account?',
      fullName: 'Full Name',
      confirmPassword: 'Confirm Password',
      allRightsReserved: 'All Rights Reserved.',
      faq: 'FAQ',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Have questions? We have answers. If you can\'t find what you\'re looking for, feel free to contact us.',
      faqItems: [
        { q: 'What is AI Wanzofc?', a: 'AI Wanzofc is a leading platform for developing and deploying artificial intelligence solutions. We provide tools for machine learning, data analysis, and automation to help businesses innovate and grow.' },
        { q: 'How secure is my data?', a: 'Security is our top priority. We use enterprise-grade encryption, multi-factor authentication, and continuous monitoring to ensure your data is always protected.' },
        { q: 'What kind of support do you offer?', a: 'We offer 24/7 support through email and live chat. Our dedicated team of experts is always ready to assist you with any technical questions or issues you may have.' },
        { q: 'Can I integrate AI Wanzofc with other platforms?', a: 'Yes, our platform is designed for flexibility. We offer a comprehensive API that allows for seamless integration with a wide range of third-party services and applications.' }
      ],
      dashboard: 'Dashboard',
      logout: 'Logout',
      loggingIn: 'Logging in...',
      signingUp: 'Signing up...',
      invalidForm: 'Please fill out the form correctly.',
      loginFailed: 'Login failed. Please check your credentials.',
      signupFailed: 'Signup failed. Please try again later.',
      passwordsMismatch: 'Passwords do not match.',
      welcomeBack: 'Welcome Back',
      apiUsage: 'API Usage',
      requestsUsed: 'Requests Used',
      of: 'of',
      dailyLimit: 'Daily Limit',
      apiKeys: 'Your API Keys',
      noKeys: 'You haven\'t generated any API keys yet.',
      generateKey: 'Generate New Key',
      generating: 'Generating...',
      key: 'Key',
      created: 'Created',
      todaysRequests: 'Today\'s Requests',
      copy: 'Copy',
      copied: 'Copied!',
      availableModels: 'Available Models',
      modelName: 'Model Name',
      size: 'Size',
      modified: 'Modified',
      // Docs Page Translations
      docs: 'Docs',
      docsTitle: 'API Documentation',
      docsSubtitle: 'Integrate the power of AI Wanzofc into your applications with our simple and powerful API.',
      apiEndpoint: 'API Endpoint',
      authentication: 'Authentication',
      authDesc: 'Authenticate your API requests by including your API key in the `x-api-key` header. You can generate and manage your keys in the dashboard.',
      modelsList: 'Models List',
      modelsListDesc: 'Here is the list of currently available models you can use in your requests.',
      requestExample: 'Request Example',
      requestExampleDesc: 'Below is an example of how to make a request to the chat completion endpoint using cURL.',
    },
    id: {
      home: 'Beranda',
      features: 'Fitur',
      about: 'Tentang',
      contact: 'Kontak',
      login: 'Masuk',
      signup: 'Daftar',
      getStarted: 'Mulai',
      exploreTech: 'Jelajahi Teknologi Kami',
      whyChoose: 'Mengapa Memilih',
      welcome: 'Selamat Datang di Masa Depan bersama',
      subtitle: 'Kami membangun solusi kecerdasan buatan terdepan yang memberdayakan bisnis dan mendorong inovasi ke depan.',
      advancedProcessing: 'Pemrosesan Canggih',
      advancedProcessingDesc: 'Manfaatkan jaringan saraf canggih kami untuk pemrosesan dan wawasan data yang tak tertandingi.',
      intelligentAutomation: 'Otomatisasi Cerdas',
      intelligentAutomationDesc: 'Otomatiskan tugas dan alur kerja yang kompleks dengan agen cerdas yang belajar dan beradaptasi dengan kebutuhan Anda.',
      predictiveAnalytics: 'Analitik Prediktif',
      predictiveAnalyticsDesc: 'Dapatkan keunggulan kompetitif dengan prediksi dan prakiraan yang sangat akurat yang didukung oleh model AI kami.',
      robustSecurity: 'Keamanan yang Kuat',
      robustSecurityDesc: 'Pastikan data Anda dilindungi dengan fitur keamanan dan privasi tingkat perusahaan yang sudah terpasang.',
      cookieConsent: 'Kami menggunakan cookie untuk meningkatkan pengalaman menjelajah Anda dan menganalisis lalu lintas kami. Dengan mengklik "Terima", Anda menyetujui penggunaan cookie kami.',
      learnMore: 'Pelajari lebih lanjut',
      accept: 'Terima',
      aboutTitle: 'Menciptakan Kecerdasan, <br />Merancang Masa Depan',
      aboutDesc1: 'AI Wanzofc didirikan oleh tim inovator, peneliti, dan insinyur yang bersemangat untuk mendorong batas-batas kemungkinan dengan kecerdasan buatan. Kami percaya dalam menciptakan teknologi yang tidak hanya kuat, tetapi juga dapat diakses, aman, dan bermanfaat bagi semua orang.',
      aboutDesc2: 'Misi kami adalah mendemokratisasi AI, menyediakan bisnis dari semua ukuran dengan alat yang mereka butuhkan untuk berinovasi, tumbuh, dan memimpin di industri masing-masing. Dari otomatisasi cerdas hingga analitik prediktif, kami adalah mitra tepercaya Anda dalam perjalanan transformasi digital.',
      loginToAccount: 'Masuk ke akun Anda',
      createAnAccount: 'Buat akun baru',
      or: 'atau',
      emailAddress: 'Alamat email',
      password: 'Kata sandi',
      rememberMe: 'Ingat saya',
      forgotPassword: 'Lupa kata sandi Anda?',
      alreadyHaveAccount: 'Sudah punya akun?',
      fullName: 'Nama Lengkap',
      confirmPassword: 'Konfirmasi Kata Sandi',
      allRightsReserved: 'Hak Cipta Dilindungi.',
      faq: 'Tanya Jawab',
      faqTitle: 'Pertanyaan yang Sering Diajukan',
      faqSubtitle: 'Punya pertanyaan? Kami punya jawabannya. Jika Anda tidak dapat menemukan yang Anda cari, jangan ragu untuk menghubungi kami.',
      faqItems: [
        { q: 'Apa itu AI Wanzofc?', a: 'AI Wanzofc adalah platform terkemuka untuk mengembangkan dan menerapkan solusi kecerdasan buatan. Kami menyediakan alat untuk pembelajaran mesin, analisis data, dan otomatisasi untuk membantu bisnis berinovasi dan berkembang.' },
        { q: 'Seberapa aman data saya?', a: 'Keamanan adalah prioritas utama kami. Kami menggunakan enkripsi tingkat perusahaan, otentikasi multi-faktor, dan pemantauan berkelanjutan untuk memastikan data Anda selalu terlindungi.' },
        { q: 'Dukungan seperti apa yang Anda tawarkan?', a: 'Kami menawarkan dukungan 24/7 melalui email dan live chat. Tim ahli kami yang berdedikasi selalu siap membantu Anda dengan pertanyaan teknis atau masalah apa pun yang mungkin Anda miliki.' },
        { q: 'Bisakah saya mengintegrasikan AI Wanzofc dengan platform lain?', a: 'Ya, platform kami dirancang untuk fleksibilitas. Kami menawarkan API komprehensif yang memungkinkan integrasi tanpa batas dengan berbagai layanan dan aplikasi pihak ketiga.' }
      ],
      dashboard: 'Dasbor',
      logout: 'Keluar',
      loggingIn: 'Sedang masuk...',
      signingUp: 'Mendaftar...',
      invalidForm: 'Harap isi formulir dengan benar.',
      loginFailed: 'Gagal masuk. Silakan periksa kredensial Anda.',
      signupFailed: 'Gagal mendaftar. Silakan coba lagi nanti.',
      passwordsMismatch: 'Kata sandi tidak cocok.',
      welcomeBack: 'Selamat Datang Kembali',
      apiUsage: 'Penggunaan API',
      requestsUsed: 'Permintaan Digunakan',
      of: 'dari',
      dailyLimit: 'Batas Harian',
      apiKeys: 'Kunci API Anda',
      noKeys: 'Anda belum membuat kunci API apa pun.',
      generateKey: 'Buat Kunci Baru',
      generating: 'Membuat...',
      key: 'Kunci',
      created: 'Dibuat',
      todaysRequests: 'Permintaan Hari Ini',
      copy: 'Salin',
      copied: 'Tersalin!',
      availableModels: 'Model yang Tersedia',
      modelName: 'Nama Model',
      size: 'Ukuran',
      modified: 'Diubah',
      // Docs Page Translations
      docs: 'Dokumentasi',
      docsTitle: 'Dokumentasi API',
      docsSubtitle: 'Integrasikan kekuatan AI Wanzofc ke dalam aplikasi Anda dengan API kami yang sederhana dan kuat.',
      apiEndpoint: 'Endpoint API',
      authentication: 'Otentikasi',
      authDesc: 'Otentikasi permintaan API Anda dengan menyertakan kunci API Anda di header `x-api-key`. Anda dapat membuat dan mengelola kunci Anda di dasbor.',
      modelsList: 'Daftar Model',
      modelsListDesc: 'Berikut adalah daftar model yang saat ini tersedia yang dapat Anda gunakan dalam permintaan Anda.',
      requestExample: 'Contoh Permintaan',
      requestExampleDesc: 'Di bawah ini adalah contoh cara membuat permintaan ke endpoint penyelesaian obrolan menggunakan cURL.',
    }
  };

  private currentLang = signal<'en' | 'id'>('en');

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('lang') as 'en' | 'id';
      if (savedLang) {
        this.currentLang.set(savedLang);
      }
    }

    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lang', this.currentLang());
      }
    });
  }

  setLanguage(lang: 'en' | 'id'): void {
    this.currentLang.set(lang);
  }

  translate(key: string): any {
    return this.translations[this.currentLang()][key] || key;
  }
}