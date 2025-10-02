export interface Language {
  code: string;
  name: string;
  acceptableAnswers: string[];
  samples: string[];
}

export const languages: Language[] = [
  {
    code: 'es',
    name: 'Spanish',
    acceptableAnswers: ['spanish', 'español', 'spa', 'es'],
    samples: [
      'El que mucho abarca, poco aprieta',
      'No hay mal que por bien no venga',
      'A caballo regalado no se le mira el diente',
      'Más vale tarde que nunca',
      'Hola, ¿cómo estás?'
    ]
  },
  {
    code: 'fr',
    name: 'French',
    acceptableAnswers: ['french', 'français', 'francais', 'fra', 'fr'],
    samples: [
      'Bonjour, comment allez-vous?',
      'C\'est la vie',
      'Petit à petit, l\'oiseau fait son nid',
      'L\'argent ne fait pas le bonheur',
      'Qui vivra verra'
    ]
  },
  {
    code: 'de',
    name: 'German',
    acceptableAnswers: ['german', 'deutsch', 'deu', 'de'],
    samples: [
      'Guten Tag, wie geht es Ihnen?',
      'Übung macht den Meister',
      'Aller Anfang ist schwer',
      'Morgenstund hat Gold im Mund',
      'Zeit ist Geld'
    ]
  },
  {
    code: 'ja',
    name: 'Japanese',
    acceptableAnswers: ['japanese', '日本語', 'jpn', 'ja'],
    samples: [
      'こんにちは、お元気ですか？',
      '七転び八起き',
      '花より団子',
      '猿も木から落ちる',
      '一期一会'
    ]
  },
  {
    code: 'zh',
    name: 'Chinese',
    acceptableAnswers: ['chinese', 'mandarin', '中文', 'zho', 'zh'],
    samples: [
      '你好，你好吗？',
      '一分耕耘，一分收获',
      '熟能生巧',
      '时间就是金钱',
      '千里之行，始于足下'
    ]
  },
  {
    code: 'ko',
    name: 'Korean',
    acceptableAnswers: ['korean', '한국어', 'kor', 'ko'],
    samples: [
      '안녕하세요, 어떻게 지내세요?',
      '백지장도 맞들면 낫다',
      '티끌 모아 태산',
      '세 살 버릇 여든까지 간다',
      '시작이 반이다'
    ]
  },
  {
    code: 'ar',
    name: 'Arabic',
    acceptableAnswers: ['arabic', 'العربية', 'ara', 'ar'],
    samples: [
      'مرحبا، كيف حالك؟',
      'الصبر مفتاح الفرج',
      'العلم نور',
      'في التأني السلامة',
      'الصديق وقت الضيق'
    ]
  },
  {
    code: 'ru',
    name: 'Russian',
    acceptableAnswers: ['russian', 'русский', 'rus', 'ru'],
    samples: [
      'Здравствуйте, как дела?',
      'Терпение и труд всё перетрут',
      'Повторение - мать учения',
      'Лучше поздно, чем никогда',
      'Век живи, век учись'
    ]
  },
  {
    code: 'pt',
    name: 'Portuguese',
    acceptableAnswers: ['portuguese', 'português', 'portugues', 'por', 'pt'],
    samples: [
      'Olá, como você está?',
      'Quem não arrisca, não petisca',
      'Devagar se vai ao longe',
      'Águas passadas não movem moinhos',
      'Deus ajuda quem cedo madruga'
    ]
  },
  {
    code: 'it',
    name: 'Italian',
    acceptableAnswers: ['italian', 'italiano', 'ita', 'it'],
    samples: [
      'Ciao, come stai?',
      'Chi va piano, va sano e va lontano',
      'L\'appetito vien mangiando',
      'Meglio tardi che mai',
      'Chi dorme non piglia pesci'
    ]
  },
  {
    code: 'hi',
    name: 'Hindi',
    acceptableAnswers: ['hindi', 'हिन्दी', 'hin', 'hi'],
    samples: [
      'नमस्ते, आप कैसे हैं?',
      'अभ्यास से सिद्धि होती है',
      'जैसी करनी वैसी भरनी',
      'बूँद बूँद से सागर भरता है',
      'समय सबसे कीमती है'
    ]
  },
  {
    code: 'nl',
    name: 'Dutch',
    acceptableAnswers: ['dutch', 'nederlands', 'nld', 'nl'],
    samples: [
      'Hallo, hoe gaat het met je?',
      'Oefening baart kunst',
      'Beter laat dan nooit',
      'Alle begin is moeilijk',
      'Tijd is geld'
    ]
  },
  {
    code: 'sv',
    name: 'Swedish',
    acceptableAnswers: ['swedish', 'svenska', 'swe', 'sv'],
    samples: [
      'Hej, hur mår du?',
      'Övning ger färdighet',
      'Bättre sent än aldrig',
      'Borta bra men hemma bäst',
      'Tid är pengar'
    ]
  },
  {
    code: 'pl',
    name: 'Polish',
    acceptableAnswers: ['polish', 'polski', 'pol', 'pl'],
    samples: [
      'Cześć, jak się masz?',
      'Praktyka czyni mistrza',
      'Lepiej późno niż wcale',
      'Nie ma tego złego, co by na dobre nie wyszło',
      'Czas to pieniądz'
    ]
  },
  {
    code: 'tr',
    name: 'Turkish',
    acceptableAnswers: ['turkish', 'türkçe', 'turkce', 'tur', 'tr'],
    samples: [
      'Merhaba, nasılsın?',
      'Pratik mükemmel yapar',
      'Geç olsun güç olmasın',
      'Damlaya damlaya göl olur',
      'Zaman paradır'
    ]
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    acceptableAnswers: ['vietnamese', 'tiếng việt', 'vie', 'vi'],
    samples: [
      'Xin chào, bạn khỏe không?',
      'Có công mài sắt có ngày nên kim',
      'Muộn còn hơn không',
      'Thời gian là vàng bạc',
      'Học thầy không tày học bạn'
    ]
  },
  {
    code: 'th',
    name: 'Thai',
    acceptableAnswers: ['thai', 'ไทย', 'tha', 'th'],
    samples: [
      'สวัสดี คุณสบายดีไหม?',
      'ฝึกหัดทำให้เก่ง',
      'สายดีกว่าไม่มา',
      'เวลาคือทอง',
      'น้ำหยดเป็นคลอง'
    ]
  },
  {
    code: 'el',
    name: 'Greek',
    acceptableAnswers: ['greek', 'ελληνικά', 'ell', 'el'],
    samples: [
      'Γεια σου, πώς είσαι?',
      'Η πρακτική οδηγεί στην τελειότητα',
      'Καλύτερα αργά παρά ποτέ',
      'Ο χρόνος είναι χρήμα',
      'Η αρχή είναι το ήμισυ του παντός'
    ]
  },
  {
    code: 'he',
    name: 'Hebrew',
    acceptableAnswers: ['hebrew', 'עברית', 'heb', 'he'],
    samples: [
      'שלום, מה שלומך?',
      'תרגול עושה שלמות',
      'מוטב מאוחר מאשר אף פעם',
      'זמן הוא כסף',
      'התחלה טובה חצי הנחמה'
    ]
  },
  {
    code: 'sw',
    name: 'Swahili',
    acceptableAnswers: ['swahili', 'kiswahili', 'swa', 'sw'],
    samples: [
      'Habari, habari yako?',
      'Mazoezi hufanya ustadi',
      'Afadhali kuchelewa kuliko kutofika',
      'Maji yakimwagika hayazoleki',
      'Haba na haba hujaza kibaba'
    ]
  },
  {
    code: 'id',
    name: 'Indonesian',
    acceptableAnswers: ['indonesian', 'bahasa indonesia', 'ind', 'id'],
    samples: [
      'Halo, apa kabar?',
      'Latihan membuat sempurna',
      'Lebih baik terlambat daripada tidak sama sekali',
      'Waktu adalah uang',
      'Air beriak tanda tak dalam'
    ]
  },
  {
    code: 'fi',
    name: 'Finnish',
    acceptableAnswers: ['finnish', 'suomi', 'fin', 'fi'],
    samples: [
      'Hei, mitä kuuluu?',
      'Harjoitus tekee mestarin',
      'Parempi myöhään kuin ei milloinkaan',
      'Aika on rahaa',
      'Ei mikään synny tyhjästä'
    ]
  },
  {
    code: 'cs',
    name: 'Czech',
    acceptableAnswers: ['czech', 'čeština', 'cestina', 'ces', 'cs'],
    samples: [
      'Ahoj, jak se máš?',
      'Cvičení dělá mistra',
      'Lepší pozdě než nikdy',
      'Čas jsou peníze',
      'Bez práce nejsou koláče'
    ]
  },
  {
    code: 'ro',
    name: 'Romanian',
    acceptableAnswers: ['romanian', 'română', 'romana', 'ron', 'ro'],
    samples: [
      'Bună, ce mai faci?',
      'Exercițiul duce la desăvârșire',
      'Mai bine mai târziu decât niciodată',
      'Timpul este bani',
      'Cine se scoală de dimineață, departe ajunge'
    ]
  }
];
