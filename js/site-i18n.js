(() => {
  const LANGUAGE_LABELS = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
    fr: 'Français',
    de: 'Deutsch',
    es: 'Español',
    pt: 'Português',
    'zh-TW': '繁體中文',
  };

  const PAGE_CONFIG = {
    studio: {
      defaultLanguage: 'ko',
      storageKey: 'dosusu-language',
      supportedLanguages: ['ko', 'en'],
    },
    voiceleaf: {
      defaultLanguage: 'ko',
      storageKey: 'voiceleaf-language',
      supportedLanguages: ['ko', 'en'],
    },
    century: {
      defaultLanguage: 'ko',
      storageKey: 'centurydiary-language',
      supportedLanguages: ['ko', 'ja', 'en', 'fr', 'de', 'es', 'pt', 'zh-TW'],
    },
  };

  const TRANSLATIONS = {
    studio: {
      ko: {
        meta: {
          title: 'Dosusu - 일상에 보탬이 되는 앱',
          description: 'Dosusu - 일상에 보탬이 되는 앱을 만드는 개인 개발 스튜디오',
          ogDescription: '혼자 만들고 천천히 다듬는, 오래 곁에 둘 수 있는 작은 앱들',
        },
        nav: { apps: 'Apps', contact: 'Contact' },
        hero: {
          eyebrow: 'Independent app studio',
          title: '일상에 보탬이 되는 앱',
          lead: 'Dosusu는 개인 개발자가 혼자 만들고 천천히 다듬어가는 작은 앱 스튜디오입니다. 기록을 남기고, 알림을 놓치지 않고, 마음을 나누는 일처럼 생활 가까이에 있는 문제들을 단정한 앱으로 풀어갑니다.',
          primaryAction: '앱 둘러보기',
          secondaryAction: '문의하기',
        },
        principles: {
          useful: {
            title: 'Useful first',
            body: '작게 시작하더라도 실제로 쓰는 순간까지 자연스럽게 이어지도록 만듭니다.',
          },
          calm: {
            title: 'Calm by default',
            body: '앱이 앞에 나서기보다, 필요한 순간에만 조용히 도울 수 있게 다듬습니다.',
          },
          care: {
            title: 'Built with care',
            body: '개인 정보와 오래 남는 기록, 유료 기능은 서두르지 않고 신중하게 다룹니다.',
          },
        },
        apps: {
          eyebrow: 'Apps',
          title: '지금 만나볼 수 있는 앱',
          century: {
            tag: 'Diary',
            description: '오늘의 짧은 일기를 남기고, 해마다 같은 날짜의 기록을 다시 꺼내보는 감성 다이어리입니다.',
            link: 'CenturyDiary 보기',
          },
          pushshare: {
            tag: 'Notifications',
            description: '한 기기에서 받은 푸시 알림을 다른 기기로 이어 보내, 중요한 소식을 놓치지 않도록 도와줍니다.',
            link: 'PushShare 보기',
          },
          voiceleaf: {
            tag: 'Web service',
            description: '문장 목록을 번역과 음성이 포함된 Apple Books용 EPUB 학습책으로 변환하는 웹 서비스입니다.',
            link: 'VoiceLeaf 보기',
          },
        },
        footer: {
          copyright: '© {year} Dosusu. All rights reserved.',
        },
      },
      en: {
        meta: {
          title: 'Dosusu - Apps That Help Everyday Life',
          description: 'Dosusu - an independent app studio making apps that quietly help everyday life',
          ogDescription: 'Small apps made and refined slowly by an independent developer.',
        },
        nav: { apps: 'Apps', contact: 'Contact' },
        hero: {
          eyebrow: 'Independent app studio',
          title: 'Apps that help everyday life',
          lead: 'Dosusu is a small app studio run by an independent developer. I make calm, practical apps for everyday moments: keeping memories, sharing feelings, and making sure important notifications do not slip away.',
          primaryAction: 'Browse apps',
          secondaryAction: 'Contact',
        },
        principles: {
          useful: {
            title: 'Useful first',
            body: 'Even small features should carry naturally into the moments when people actually use them.',
          },
          calm: {
            title: 'Calm by default',
            body: 'The app should not demand attention. It should quietly help when it is needed.',
          },
          care: {
            title: 'Built with care',
            body: 'Personal data, long-term records, and paid features are handled carefully and without haste.',
          },
        },
        apps: {
          eyebrow: 'Apps',
          title: 'Apps you can use now',
          century: {
            tag: 'Diary',
            description: 'A gentle diary app for writing short daily entries and revisiting records from the same date across the years.',
            link: 'View CenturyDiary',
          },
          pushshare: {
            tag: 'Notifications',
            description: 'Forward push notifications from one device to another so important messages are easier to catch.',
            link: 'View PushShare',
          },
          voiceleaf: {
            tag: 'Web service',
            description: 'Turn sentence lists into Apple Books study EPUBs with translation and embedded audio.',
            link: 'View VoiceLeaf',
          },
        },
        footer: {
          copyright: '© {year} Dosusu. All rights reserved.',
        },
      },
    },
    voiceleaf: {
      ko: {
        meta: {
          title: 'VoiceLeaf - 문장을 듣기 학습 eBook으로',
          description: 'VoiceLeaf - 문장 목록을 번역과 음성이 포함된 Apple Books용 EPUB 학습책으로 변환하는 웹 서비스',
          ogDescription: '붙여넣은 텍스트를 번역, TTS 음성, Apple Books용 EPUB으로 변환합니다.',
        },
        nav: { home: 'Home', service: '서비스', scope: '지원 범위', contact: '문의' },
        hero: {
          eyebrow: 'Text to audio EPUB',
          title: '문장 목록을 듣기 학습 eBook으로',
          lead: 'VoiceLeaf는 직접 준비한 텍스트나 TXT 파일을 번역문과 음성이 포함된 Apple Books용 EPUB으로 변환하는 웹 서비스입니다. 아이패드나 아이폰에서 문장을 듣고 따라 읽는 학습 흐름을 빠르게 만들 수 있습니다.',
          primaryAction: 'VoiceLeaf 열기',
          secondaryAction: '지원 범위 보기',
        },
        preview: {
          label: 'Apple Books oriented',
          sentence: 'Jack thought that Miles was brave and adventurous.',
          translation: '잭은 마일즈가 용감하고 모험심이 강하다고 생각했다.',
          normal: '일반 속도',
          slow: '천천히',
        },
        flow: {
          eyebrow: 'Workflow',
          title: '붙여넣고, 확인하고, 다운로드합니다',
          input: {
            title: '텍스트 입력',
            body: '문장 목록을 붙여넣거나 TXT 파일을 올리고 원본 언어를 직접 선택합니다.',
          },
          options: {
            title: '번역과 음성 선택',
            body: '번역 언어, 일반/느린 음성, 전체 재생 MP3 옵션과 예상 용량을 확인합니다.',
          },
          download: {
            title: 'EPUB 생성',
            body: '결제 확인 후 Apple Books에서 열 수 있는 EPUB 또는 분권 ZIP을 생성합니다.',
          },
        },
        scope: {
          eyebrow: 'Support scope',
          title: 'iPhone/iPad Apple Books를 기준으로 만듭니다',
          body: '현재 서비스는 Apple Books에서 MP3가 포함된 EPUB을 재생하는 흐름을 우선 지원합니다. Android와 Google Play Books의 EPUB 오디오 재생은 보장하지 않습니다.',
          rights: '본인이 권리를 보유했거나 변환 허가를 받은 자료만 사용해야 합니다.',
          pricing: '대량 문서는 생성 비용과 파일 크기가 커질 수 있어, 생성 전 예상 금액과 분권 계획을 먼저 보여줍니다.',
        },
        cta: {
          title: 'VoiceLeaf 서비스로 이동',
          body: '문장을 붙여넣고 번역과 음성 옵션을 확인한 뒤 EPUB 생성을 시작하세요.',
          action: 'VoiceLeaf 열기',
        },
        footer: {
          copyright: '© {year} Dosusu. All rights reserved.',
          home: 'Dosusu Home',
        },
      },
      en: {
        meta: {
          title: 'VoiceLeaf - Turn sentences into audio study eBooks',
          description: 'VoiceLeaf - a web service that turns sentence lists into Apple Books EPUB study books with translation and audio',
          ogDescription: 'Convert pasted text into translation, TTS audio, and Apple Books-oriented EPUB files.',
        },
        nav: { home: 'Home', service: 'Service', scope: 'Support', contact: 'Contact' },
        hero: {
          eyebrow: 'Text to audio EPUB',
          title: 'Turn sentence lists into audio study eBooks',
          lead: 'VoiceLeaf converts your own text or TXT files into Apple Books-oriented EPUB study books with translation and embedded audio. It is designed for listening and repeat-reading on iPhone and iPad.',
          primaryAction: 'Open VoiceLeaf',
          secondaryAction: 'View support scope',
        },
        preview: {
          label: 'Apple Books oriented',
          sentence: 'Jack thought that Miles was brave and adventurous.',
          translation: 'Jack thought Miles was brave and adventurous.',
          normal: 'Normal pace',
          slow: 'Slow pace',
        },
        flow: {
          eyebrow: 'Workflow',
          title: 'Paste, confirm, and download',
          input: {
            title: 'Enter text',
            body: 'Paste a sentence list or upload a TXT file, then manually choose the source language.',
          },
          options: {
            title: 'Choose translation and audio',
            body: 'Review translation language, normal/slow audio, optional full playback MP3, estimated size, and volume splitting.',
          },
          download: {
            title: 'Generate EPUB',
            body: 'After payment confirmation, VoiceLeaf creates an EPUB or multi-volume ZIP for Apple Books.',
          },
        },
        scope: {
          eyebrow: 'Support scope',
          title: 'Built around iPhone and iPad Apple Books',
          body: 'VoiceLeaf currently prioritizes EPUB audio playback in Apple Books. Android and Google Play Books audio playback is not guaranteed.',
          rights: 'Use only content you own or have permission to convert.',
          pricing: 'Large documents can increase generation cost and file size, so estimated price and volume planning are shown before generation.',
        },
        cta: {
          title: 'Go to VoiceLeaf',
          body: 'Paste your text, review translation and audio options, then start generating your EPUB.',
          action: 'Open VoiceLeaf',
        },
        footer: {
          copyright: '© {year} Dosusu. All rights reserved.',
          home: 'Dosusu Home',
        },
      },
    },
    century: {
      ko: {
        meta: {
          title: 'CenturyDiary - 오늘을 남기고 다시 만나는 다이어리',
          description: 'CenturyDiary - 오늘의 기록을 남기고, 해마다 같은 날의 기억을 다시 만나는 감성 다이어리',
          ogDescription: '짧은 일기, 100년의 오늘, 감성 캔버스, 공유와 AI 기능을 담은 다이어리 앱',
        },
        nav: { home: 'Home', features: 'Features', contact: 'Contact' },
        hero: {
          eyebrow: 'Emotional diary app',
          lead: '오늘 적은 한 줄이, 몇 년 뒤 다시 꺼내 보는 기억이 되도록. CenturyDiary는 짧은 일기와 월별 커버플로우, 해마다 같은 날을 모아보는 100년의 오늘, 자유로운 감성 다이어리와 공유 기능을 함께 담았습니다.',
          badgeDaily: 'Daily diary',
          badgeTimeline: '100-year timeline',
          badgeCanvas: 'Canvas diary',
          badgeSocial: 'Social sharing',
        },
        mockup: {
          month: 'May 2026',
          today: 'Today',
          noteOne: '오늘의 마음',
          noteTwo: 'photo + text',
        },
        features: {
          eyebrow: 'Core experience',
          title: '가볍게 남기고, 오래 돌아보는 기록',
          daily: {
            title: '매일 남기는 짧은 일기',
            body: '오늘의 기분과 한두 문장을 부담 없이 적고, 필요할 때 사진을 곁들여 하루를 남깁니다.',
          },
          coverflow: {
            title: '월 단위 커버플로우',
            body: '한 달 동안 쌓인 기록을 카드처럼 넘겨보며, 지나간 날들의 분위기를 한눈에 느낄 수 있습니다.',
          },
          onThisDay: {
            title: '100년의 오늘',
            body: '1999년 5월 1일, 2000년 5월 1일, 2026년 5월 1일처럼 해마다 같은 날짜의 일기를 한곳에서 이어 봅니다.',
          },
          canvas: {
            title: '자유로운 감성 다이어리',
            body: '이미지와 텍스트를 원하는 위치에 놓고, 크기와 각도를 조절하며 나만의 페이지를 꾸밉니다.',
          },
          social: {
            title: '소셜 공유',
            body: '혼자 간직해도 좋고, 나누고 싶은 기록은 사람들과 공유하며 서로의 하루에 조용히 공감할 수 있습니다.',
          },
          ai: {
            title: '필요할 때 더하는 AI 기능',
            body: 'AI 댓글, 의미 기반 검색, 공유된 일기의 자동 번역을 유료 기능으로 제공합니다. 그 외의 기본 기록 기능은 무료로 사용할 수 있습니다.',
          },
        },
        visual: {
          eyebrow: 'Designed for memory',
          title: '기억의 온도가 남도록 기록하세요.',
          body: 'CenturyDiary는 보라와 핑크를 중심으로 한 부드러운 색감, 파스텔 종이 같은 배경, 가벼운 카드 UI로 쓰는 부담은 낮추고 다시 펼쳐보는 즐거움은 살렸습니다.',
        },
        footer: {
          copyright: '© {year} Dosusu. All rights reserved.',
          home: 'Dosusu Home',
          privacy: 'Privacy Policy',
          terms: 'Terms',
        },
      },
      ja: {
        meta: {
          title: 'CenturyDiary - 今日を残し、また出会う日記',
          description: 'CenturyDiary - 今日の記録と、毎年同じ日の思い出にまた出会える感性ダイアリー',
          ogDescription: '短い日記、100年の今日、キャンバス日記、共有、AI機能を備えた日記アプリ',
        },
        nav: { home: 'Home', features: 'Features', contact: 'Contact' },
        hero: {
          eyebrow: 'Emotional diary app',
          lead: '今日書いた一行が、何年か後にもう一度開きたくなる記憶になるように。CenturyDiaryには、短い日記、月ごとのカバーフロー、毎年同じ日を振り返る「100年の今日」、自由なキャンバス日記、共有機能が入っています。',
          badgeDaily: '毎日の記録',
          badgeTimeline: '100年の今日',
          badgeCanvas: 'キャンバス日記',
          badgeSocial: '共有',
        },
        mockup: { month: '2026年5月', today: '今日', noteOne: '今日の気持ち', noteTwo: '写真 + テキスト' },
        features: {
          eyebrow: 'Core experience',
          title: '気軽に残して、長く振り返る記録',
          daily: { title: '毎日つける短い日記', body: '今日の気分と一、二文を気軽に書き、必要なときは写真を添えて一日を残せます。' },
          coverflow: { title: '月ごとのカバーフロー', body: '一か月分の記録をカードのようにめくりながら、過ぎた日の空気をひと目で感じられます。' },
          onThisDay: { title: '100年の今日', body: '1999年5月1日、2000年5月1日、2026年5月1日のように、毎年同じ日の記録を一か所で続けて見られます。' },
          canvas: { title: '自由な感性ダイアリー', body: '画像とテキストを好きな場所に置き、サイズや角度を調整して自分だけのページを作れます。' },
          social: { title: 'ソーシャル共有', body: 'ひとりで大切に残すことも、誰かと分かち合いたい記録を共有して静かに共感し合うこともできます。' },
          ai: { title: '必要なときに使えるAI機能', body: 'AIコメント、意味ベース検索、共有された日記の自動翻訳を有料機能として提供します。基本的な記録機能は無料で使えます。' },
        },
        visual: { eyebrow: 'Designed for memory', title: '記憶の温度が残るように。', body: 'CenturyDiaryは紫とピンクを中心にしたやわらかな色、パステルの紙のような背景、軽いカードUIで、書く負担を下げながら見返す楽しさを残します。' },
        footer: { copyright: '© {year} Dosusu. All rights reserved.', home: 'Dosusu Home', privacy: 'Privacy Policy', terms: 'Terms' },
      },
      en: {
        meta: {
          title: 'CenturyDiary - Write today and meet it again',
          description: 'CenturyDiary - a gentle diary app for today’s records and memories from the same date across the years',
          ogDescription: 'Daily diary, On This Day, canvas diary, sharing, and optional AI features.',
        },
        nav: { home: 'Home', features: 'Features', contact: 'Contact' },
        hero: {
          eyebrow: 'Emotional diary app',
          lead: 'Let a line you write today become a memory you can open again years from now. CenturyDiary brings together short daily entries, monthly cover flow, On This Day across the years, freeform canvas diaries, and sharing.',
          badgeDaily: 'Daily diary',
          badgeTimeline: '100-year timeline',
          badgeCanvas: 'Canvas diary',
          badgeSocial: 'Social sharing',
        },
        mockup: { month: 'May 2026', today: 'Today', noteOne: 'Today’s mood', noteTwo: 'photo + text' },
        features: {
          eyebrow: 'Core experience',
          title: 'Write lightly, revisit for years',
          daily: { title: 'Short daily diary', body: 'Write today’s mood and a sentence or two without pressure, then add a photo when it helps the memory stay.' },
          coverflow: { title: 'Monthly cover flow', body: 'Flip through a month of records like cards and feel the atmosphere of past days at a glance.' },
          onThisDay: { title: 'On This Day', body: 'See entries from the same date across years, such as May 1, 1999, May 1, 2000, and May 1, 2026, in one continuous list.' },
          canvas: { title: 'Freeform canvas diary', body: 'Place images and text where you want, resize them, rotate them, and compose a page that feels like your own.' },
          social: { title: 'Social sharing', body: 'Keep entries private, or share the ones you want others to see and quietly connect through everyday moments.' },
          ai: { title: 'AI when you need it', body: 'Paid AI features include AI comments, semantic search, and automatic translation for shared diaries. Core diary features are free to use.' },
        },
        visual: { eyebrow: 'Designed for memory', title: 'Write so the feeling stays.', body: 'CenturyDiary uses soft purples and pinks, pastel paper-like backgrounds, and light card UI to make writing easy and revisiting enjoyable.' },
        footer: { copyright: '© {year} Dosusu. All rights reserved.', home: 'Dosusu Home', privacy: 'Privacy Policy', terms: 'Terms' },
      },
      fr: {
        meta: {
          title: 'CenturyDiary - Écrire aujourd’hui, le retrouver demain',
          description: 'CenturyDiary - un journal sensible pour retrouver les souvenirs du même jour au fil des années',
          ogDescription: 'Journal quotidien, Aujourd’hui dans les années, canevas libre, partage et fonctions IA.',
        },
        nav: { home: 'Accueil', features: 'Fonctions', contact: 'Contact' },
        hero: {
          eyebrow: 'Journal émotionnel',
          lead: 'Qu’une ligne écrite aujourd’hui devienne un souvenir à rouvrir dans quelques années. CenturyDiary réunit les notes du jour, le cover flow mensuel, les souvenirs du même jour au fil des ans, un journal libre sur canevas et le partage.',
          badgeDaily: 'Journal quotidien',
          badgeTimeline: 'Le même jour, année après année',
          badgeCanvas: 'Journal canevas',
          badgeSocial: 'Partage',
        },
        mockup: { month: 'Mai 2026', today: 'Aujourd’hui', noteOne: 'Humeur du jour', noteTwo: 'photo + texte' },
        features: {
          eyebrow: 'Expérience clé',
          title: 'Écrire simplement, relire longtemps',
          daily: { title: 'Un court journal chaque jour', body: 'Notez votre humeur et quelques mots sans pression, puis ajoutez une photo quand elle aide à garder le souvenir.' },
          coverflow: { title: 'Cover flow mensuel', body: 'Parcourez les notes du mois comme des cartes et retrouvez d’un coup d’œil l’atmosphère des jours passés.' },
          onThisDay: { title: 'Ce jour-là', body: 'Voyez dans une même liste les notes du même jour à travers les années, par exemple le 1er mai 1999, 2000 ou 2026.' },
          canvas: { title: 'Journal libre sur canevas', body: 'Placez images et textes où vous voulez, ajustez leur taille, faites-les pivoter et composez une page personnelle.' },
          social: { title: 'Partage social', body: 'Gardez vos pages pour vous, ou partagez celles que vous souhaitez montrer pour créer une forme de présence discrète.' },
          ai: { title: 'L’IA quand elle est utile', body: 'Les fonctions IA payantes incluent les commentaires IA, la recherche sémantique et la traduction automatique des journaux partagés. Les fonctions de base restent gratuites.' },
        },
        visual: { eyebrow: 'Pensé pour la mémoire', title: 'Écrire en gardant la chaleur du souvenir.', body: 'CenturyDiary utilise des tons doux de violet et de rose, des fonds pastel proches du papier et une interface légère pour rendre l’écriture facile et la relecture agréable.' },
        footer: { copyright: '© {year} Dosusu. Tous droits réservés.', home: 'Accueil Dosusu', privacy: 'Confidentialité', terms: 'Conditions' },
      },
      de: {
        meta: {
          title: 'CenturyDiary - Heute festhalten und wiederfinden',
          description: 'CenturyDiary - ein ruhiges Tagebuch für heutige Einträge und Erinnerungen am selben Datum über die Jahre',
          ogDescription: 'Tägliches Tagebuch, Dieser Tag, Canvas-Tagebuch, Teilen und optionale KI-Funktionen.',
        },
        nav: { home: 'Home', features: 'Funktionen', contact: 'Kontakt' },
        hero: {
          eyebrow: 'Emotionales Tagebuch',
          lead: 'Damit eine Zeile von heute in einigen Jahren wieder zu einer Erinnerung wird. CenturyDiary verbindet kurze Einträge, monatlichen Coverflow, denselben Tag über viele Jahre, freie Canvas-Seiten und Teilen.',
          badgeDaily: 'Tägliches Tagebuch',
          badgeTimeline: '100-Jahre-Zeitleiste',
          badgeCanvas: 'Canvas-Tagebuch',
          badgeSocial: 'Teilen',
        },
        mockup: { month: 'Mai 2026', today: 'Heute', noteOne: 'Stimmung heute', noteTwo: 'Foto + Text' },
        features: {
          eyebrow: 'Kernfunktionen',
          title: 'Leicht schreiben, lange zurückblicken',
          daily: { title: 'Kurze tägliche Einträge', body: 'Halte deine Stimmung und ein oder zwei Sätze ohne Druck fest und füge bei Bedarf ein Foto hinzu.' },
          coverflow: { title: 'Monatlicher Coverflow', body: 'Blättere durch die Einträge eines Monats wie durch Karten und spüre die Stimmung vergangener Tage auf einen Blick.' },
          onThisDay: { title: 'Dieser Tag', body: 'Sieh Einträge vom selben Datum über die Jahre hinweg, etwa 1. Mai 1999, 2000 und 2026, in einer gemeinsamen Liste.' },
          canvas: { title: 'Freies Canvas-Tagebuch', body: 'Platziere Bilder und Texte frei, ändere Größe und Winkel und gestalte eine Seite, die sich nach dir anfühlt.' },
          social: { title: 'Soziales Teilen', body: 'Bewahre Einträge privat auf oder teile ausgewählte Seiten, um leise Verbindung über Alltagsmomente zu schaffen.' },
          ai: { title: 'KI, wenn du sie brauchst', body: 'Kostenpflichtige KI-Funktionen umfassen KI-Kommentare, semantische Suche und automatische Übersetzung geteilter Tagebücher. Die Grundfunktionen bleiben kostenlos.' },
        },
        visual: { eyebrow: 'Für Erinnerungen gestaltet', title: 'Schreibe so, dass das Gefühl bleibt.', body: 'CenturyDiary nutzt weiche Lila- und Rosatöne, pastellfarbene Papierflächen und eine leichte Kartenoberfläche, damit Schreiben einfach bleibt und Wiederlesen Freude macht.' },
        footer: { copyright: '© {year} Dosusu. Alle Rechte vorbehalten.', home: 'Dosusu Home', privacy: 'Datenschutz', terms: 'Bedingungen' },
      },
      es: {
        meta: {
          title: 'CenturyDiary - Guarda hoy y vuelve a encontrarlo',
          description: 'CenturyDiary - un diario emocional para recordar el mismo día a través de los años',
          ogDescription: 'Diario diario, Un día como hoy, diario en lienzo, compartir y funciones de IA.',
        },
        nav: { home: 'Inicio', features: 'Funciones', contact: 'Contacto' },
        hero: {
          eyebrow: 'Diario emocional',
          lead: 'Que una línea escrita hoy se convierta en un recuerdo para volver a abrir dentro de unos años. CenturyDiary reúne entradas breves, cover flow mensual, el mismo día a través de los años, diarios libres en lienzo y funciones para compartir.',
          badgeDaily: 'Diario diario',
          badgeTimeline: 'Línea de 100 años',
          badgeCanvas: 'Diario en lienzo',
          badgeSocial: 'Compartir',
        },
        mockup: { month: 'Mayo 2026', today: 'Hoy', noteOne: 'Ánimo de hoy', noteTwo: 'foto + texto' },
        features: {
          eyebrow: 'Experiencia principal',
          title: 'Escribe ligero, vuelve durante años',
          daily: { title: 'Diario breve de cada día', body: 'Anota tu ánimo y una o dos frases sin presión, y añade una foto cuando ayude a conservar el recuerdo.' },
          coverflow: { title: 'Cover flow mensual', body: 'Pasa los registros del mes como tarjetas y siente de un vistazo la atmósfera de los días pasados.' },
          onThisDay: { title: 'Un día como hoy', body: 'Consulta en una sola lista entradas del mismo día en distintos años, como el 1 de mayo de 1999, 2000 y 2026.' },
          canvas: { title: 'Diario libre en lienzo', body: 'Coloca imágenes y textos donde quieras, cambia su tamaño, gíralos y crea una página propia.' },
          social: { title: 'Compartir en social', body: 'Guarda tus entradas en privado o comparte las que quieras mostrar para conectar de forma tranquila con otros momentos.' },
          ai: { title: 'IA cuando la necesites', body: 'Las funciones de IA de pago incluyen comentarios de IA, búsqueda semántica y traducción automática de diarios compartidos. Las funciones básicas son gratuitas.' },
        },
        visual: { eyebrow: 'Diseñado para la memoria', title: 'Escribe para que permanezca la emoción.', body: 'CenturyDiary usa tonos suaves de morado y rosa, fondos pastel como papel y una interfaz ligera de tarjetas para escribir con calma y volver a leer con gusto.' },
        footer: { copyright: '© {year} Dosusu. Todos los derechos reservados.', home: 'Inicio Dosusu', privacy: 'Privacidad', terms: 'Términos' },
      },
      pt: {
        meta: {
          title: 'CenturyDiary - Guarde hoje e reencontre depois',
          description: 'CenturyDiary - um diário sensível para rever lembranças do mesmo dia ao longo dos anos',
          ogDescription: 'Diário diário, Neste Dia, diário em tela livre, compartilhamento e recursos de IA.',
        },
        nav: { home: 'Início', features: 'Recursos', contact: 'Contato' },
        hero: {
          eyebrow: 'Diário emocional',
          lead: 'Para que uma linha escrita hoje se torne uma memória que você possa abrir de novo daqui a alguns anos. CenturyDiary reúne entradas curtas, cover flow mensal, o mesmo dia ao longo dos anos, diário livre em tela e compartilhamento.',
          badgeDaily: 'Diário diário',
          badgeTimeline: 'Linha de 100 anos',
          badgeCanvas: 'Diário em tela',
          badgeSocial: 'Compartilhamento',
        },
        mockup: { month: 'Maio de 2026', today: 'Hoje', noteOne: 'Humor de hoje', noteTwo: 'foto + texto' },
        features: {
          eyebrow: 'Experiência central',
          title: 'Escreva com leveza, revisite por anos',
          daily: { title: 'Diário curto do dia', body: 'Registre o humor de hoje e uma ou duas frases sem pressão, adicionando uma foto quando ela ajudar a guardar a lembrança.' },
          coverflow: { title: 'Cover flow mensal', body: 'Passe pelos registros do mês como cartões e sinta rapidamente a atmosfera dos dias que ficaram para trás.' },
          onThisDay: { title: 'Neste Dia', body: 'Veja em uma lista registros da mesma data em anos diferentes, como 1º de maio de 1999, 2000 e 2026.' },
          canvas: { title: 'Diário livre em tela', body: 'Posicione imagens e textos onde quiser, ajuste tamanho e rotação e crie uma página com a sua cara.' },
          social: { title: 'Compartilhamento social', body: 'Guarde tudo em privado ou compartilhe os registros que quiser mostrar, criando conexões tranquilas por meio do cotidiano.' },
          ai: { title: 'IA quando fizer sentido', body: 'Recursos pagos de IA incluem comentários de IA, busca semântica e tradução automática de diários compartilhados. Os recursos básicos continuam gratuitos.' },
        },
        visual: { eyebrow: 'Feito para memórias', title: 'Escreva para que a sensação permaneça.', body: 'CenturyDiary usa tons suaves de roxo e rosa, fundos pastel como papel e uma interface leve em cartões para tornar a escrita simples e a releitura prazerosa.' },
        footer: { copyright: '© {year} Dosusu. Todos os direitos reservados.', home: 'Início Dosusu', privacy: 'Privacidade', terms: 'Termos' },
      },
      'zh-TW': {
        meta: {
          title: 'CenturyDiary - 留下今天，日後再相遇',
          description: 'CenturyDiary - 記錄今天，並在每年同一天重新遇見回憶的感性日記',
          ogDescription: '每日短日記、百年的今天、自由畫布日記、分享與 AI 功能。',
        },
        nav: { home: '首頁', features: '功能', contact: '聯絡' },
        hero: {
          eyebrow: '感性日記 App',
          lead: '讓今天寫下的一行字，在多年後成為可以再次打開的回憶。CenturyDiary 結合短日記、每月封面流、跨年份的同一天回顧、自由畫布日記與分享功能。',
          badgeDaily: '每日短日記',
          badgeTimeline: '百年的今天',
          badgeCanvas: '畫布日記',
          badgeSocial: '社群分享',
        },
        mockup: { month: '2026 年 5 月', today: '今天', noteOne: '今天的心情', noteTwo: '照片 + 文字' },
        features: {
          eyebrow: '核心體驗',
          title: '輕鬆記下，長久回望',
          daily: { title: '每天一則短日記', body: '輕鬆寫下今天的心情與一兩句話，需要時也可以加上一張照片，把一天留下來。' },
          coverflow: { title: '每月封面流', body: '像翻卡片一樣瀏覽一整個月的記錄，一眼感受過去那些日子的氛圍。' },
          onThisDay: { title: '百年的今天', body: '把不同年份同一天的日記放在同一個列表中，例如 1999 年 5 月 1 日、2000 年 5 月 1 日與 2026 年 5 月 1 日。' },
          canvas: { title: '自由的感性日記', body: '把圖片和文字放在想要的位置，調整大小與角度，做出屬於自己的頁面。' },
          social: { title: '社群分享', body: '可以自己珍藏，也可以分享想讓別人看見的記錄，安靜地與他人的日常產生共鳴。' },
          ai: { title: '需要時再加上的 AI 功能', body: '付費 AI 功能包含 AI 留言、語意搜尋，以及分享日記的自動翻譯。基本記錄功能可免費使用。' },
        },
        visual: { eyebrow: '為記憶而設計', title: '讓記憶保留當時的溫度。', body: 'CenturyDiary 以柔和的紫色與粉色、像紙張一樣的粉彩背景，以及輕盈的卡片介面，降低書寫負擔，也保留重新翻看的愉悅感。' },
        footer: { copyright: '© {year} Dosusu. All rights reserved.', home: 'Dosusu 首頁', privacy: '隱私權政策', terms: '條款' },
      },
    },
  };

  function getValue(dictionary, key) {
    return key.split('.').reduce((value, part) => (
      value && Object.prototype.hasOwnProperty.call(value, part) ? value[part] : undefined
    ), dictionary);
  }

  function detectLanguage(supported, fallback) {
    const candidates = [
      navigator.language,
      ...(navigator.languages || []),
    ].filter(Boolean);

    for (const candidate of candidates) {
      if (supported.includes(candidate)) {
        return candidate;
      }

      const base = candidate.split('-')[0];
      const match = supported.find((lang) => lang.split('-')[0] === base);
      if (match) {
        return match;
      }
    }

    return fallback;
  }

  function updateMeta(translations) {
    const meta = translations.meta || {};
    if (meta.title) {
      document.title = meta.title;
    }

    const description = document.querySelector('meta[name="description"]');
    if (description && meta.description) {
      description.setAttribute('content', meta.description);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && meta.ogDescription) {
      ogDescription.setAttribute('content', meta.ogDescription);
    }
  }

  function applyLanguage(page, lang) {
    const config = PAGE_CONFIG[page];
    const dictionary = TRANSLATIONS[page][lang] || TRANSLATIONS[page][config.defaultLanguage];
    const year = String(new Date().getFullYear());

    document.documentElement.lang = lang;
    updateMeta(dictionary);

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = getValue(dictionary, element.getAttribute('data-i18n'));
      if (typeof value === 'string') {
        element.textContent = value.replace(/\{year\}/g, year);
      }
    });

    const selector = document.getElementById('site-language-selector');
    if (selector) {
      selector.value = lang;
    }
  }

  function init() {
    const page = document.body?.dataset?.i18nPage;
    const config = PAGE_CONFIG[page];

    if (!config) {
      return;
    }

    const selector = document.getElementById('site-language-selector');
    if (selector) {
      selector.innerHTML = config.supportedLanguages
        .map((lang) => `<option value="${lang}">${LANGUAGE_LABELS[lang]}</option>`)
        .join('');
    }

    const savedLanguage = localStorage.getItem(config.storageKey);
    const initialLanguage = config.supportedLanguages.includes(savedLanguage)
      ? savedLanguage
      : detectLanguage(config.supportedLanguages, config.defaultLanguage);

    applyLanguage(page, initialLanguage);

    if (selector) {
      selector.addEventListener('change', (event) => {
        const nextLanguage = event.target.value;
        localStorage.setItem(config.storageKey, nextLanguage);
        applyLanguage(page, nextLanguage);
      });
    }
  }

  init();
})();
