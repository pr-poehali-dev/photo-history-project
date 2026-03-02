import { useEffect, useRef } from "react";

const TIMELINE_DATA = [
  {
    year: 1826,
    era: "Рождение",
    title: "Первая фотография в истории",
    photographer: "Жозеф Нисефор Ньепс",
    nationality: "Франция",
    description:
      "Ньепс получил первое сохранившееся изображение с натуры — вид из окна его рабочего кабинета в Бургундии. Выдержка составила около 8 часов. Техника называлась гелиографией.",
    quote: "Природа сама рисует себя светом.",
    image: "https://cdn.poehali.dev/projects/7c3e8a2d-9a1e-4962-b27a-20102d9e796f/bucket/0a12d1d9-62f1-41f1-b951-ec8027723f44.png",
    imageCaption: "Вид из окна в Ле-Гра, 1826",
    imageNote: "Выдержка длилась около 8 часов — поэтому солнце освещает обе стороны зданий",
    type: "milestone",
    featured: true,
  },
  {
    year: 1839,
    era: "Рождение",
    title: "Дагерротип — фотография для масс",
    photographer: "Луи Дагер",
    nationality: "Франция",
    description:
      "7 января 1839 года Французская академия наук объявила об изобретении дагерротипа. Впервые в истории обычный человек мог получить точный портрет менее чем за 30 минут.",
    quote: "Отныне солнечный свет сам рисует портреты.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Boulevard_du_Temple_by_Daguerre.jpg/800px-Boulevard_du_Temple_by_Daguerre.jpg",
    imageCaption: "Бульвар дю Тампль, Париж. Первая фотография человека, 1838",
    imageNote: "На этом снимке впервые запечатлён живой человек — чистильщик сапог",
    type: "milestone",
    featured: true,
    featuredImage: "https://cdn.poehali.dev/projects/7c3e8a2d-9a1e-4962-b27a-20102d9e796f/files/13e0d2de-91cf-4759-abb2-f9fd4df3acb2.jpg",
  },
  {
    year: 1841,
    era: "Пионеры",
    title: "Калотип — эпоха тиражирования",
    photographer: "Уильям Генри Фокс Тальбот",
    nationality: "Великобритания",
    description:
      "Тальбот запатентовал негативно-позитивный процесс: один негатив позволял делать множество отпечатков. Именно этот принцип стал основой фотографии на следующие 150 лет.",
    quote: "Карандаш природы — так я назвал свою книгу, первую иллюстрированную фотографиями.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Talbot_-_Open_Door_1844.jpg/600px-Talbot_-_Open_Door_1844.jpg",
    imageCaption: "Открытая дверь, 1844 — один из снимков книги «Карандаш природы»",
    type: "invention",
  },
  {
    year: 1855,
    era: "Документ",
    title: "Фотография идёт на войну",
    photographer: "Роджер Фентон",
    nationality: "Великобритания",
    description:
      "Фентон стал первым официальным военным фотографом — он снимал Крымскую войну. Его 360 снимков изменили отношение общества к войне: люди впервые увидели её настоящее лицо.",
    quote: "Камера не лжёт — но фотограф решает, что показать.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Felice_Beato_and_James_Robertson%2C_Balaclava_Harbour%2C_Crimea_1855.jpg/800px-Felice_Beato_and_James_Robertson%2C_Balaclava_Harbour%2C_Crimea_1855.jpg",
    imageCaption: "Крымская война, 1855",
    type: "documentary",
  },
  {
    year: 1861,
    era: "Цвет",
    title: "Первая цветная фотография",
    photographer: "Джеймс Клерк Максвелл",
    nationality: "Шотландия",
    description:
      "Физик Максвелл продемонстрировал первую стойкую цветную фотографию, используя три отдельных снимка через красный, зелёный и синий светофильтры — принцип RGB, которым мы пользуемся до сих пор.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/TartanRibbon.jpg/600px-TartanRibbon.jpg",
    imageCaption: "Тартановая лента — первая цветная фотография, 1861",
    type: "invention",
  },
  {
    year: 1888,
    era: "Массовость",
    title: "Kodak — «Вы нажимаете кнопку, мы делаем остальное»",
    photographer: "Джордж Истман",
    nationality: "США",
    description:
      "Истман выпустил камеру Kodak No. 1 со слоганом «Вы нажимаете кнопку, мы делаем остальное». За $25 любой человек мог фотографировать. Фотография перестала быть уделом профессионалов.",
    quote: "Вы нажимаете кнопку — мы делаем остальное.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Kodak_no1.jpg/600px-Kodak_no1.jpg",
    imageCaption: "Kodak No. 1, 1888 — камера, изменившая мир",
    type: "milestone",
  },
  {
    year: 1900,
    era: "Мастера",
    title: "Эжен Атже — хроникёр старого Парижа",
    photographer: "Эжен Атже",
    nationality: "Франция",
    description:
      "На рубеже веков Атже начал методично снимать исчезающий Париж — дворы, улицы, витрины, ремесленников. За 30 лет он создал более 10 000 снимков. Сюрреалисты боготворили его.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Atget_-_Versailles_-_Bassin_de_Neptune.jpg/800px-Atget_-_Versailles_-_Bassin_de_Neptune.jpg",
    imageCaption: "Версаль, бассейн Нептуна. Эжен Атже, ~1905",
    type: "master",
  },
  {
    year: 1913,
    era: "Авангард",
    title: "Стиглиц и «прямая фотография»",
    photographer: "Альфред Стиглиц",
    nationality: "США",
    description:
      "Стиглиц основал журнал Camera Work и доказал, что фотография — самостоятельное искусство. Его снимок «Конечная станция» перевернул представления о документальности. Он открыл галерею 291 в Нью-Йорке.",
    quote: "Я фотографирую облака, чтобы понять, как фотографировать.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/The-terminal-1893.jpg/800px-The-terminal-1893.jpg",
    imageCaption: "Конечная станция, Нью-Йорк, 1893",
    type: "master",
  },
  {
    year: 1925,
    era: "Репортаж",
    title: "Leica — революция малого формата",
    photographer: "Оскар Барнак",
    nationality: "Германия",
    description:
      "Барнак создал Leica — компактную 35-мм камеру. Она стала оружием репортажной фотографии: можно было снимать незаметно, быстро, всюду. Именно с ней работали Картье-Брессон и Капа.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Leica_I.jpg/600px-Leica_I.jpg",
    imageCaption: "Leica I, 1925",
    type: "invention",
  },
  {
    year: 1932,
    era: "Репортаж",
    title: "Решающий момент",
    photographer: "Анри Картье-Брессон",
    nationality: "Франция",
    description:
      "Картье-Брессон разработал концепцию «решающего момента» — мгновения, когда форма и содержание сливаются в совершенный снимок. С Leica в руках он стал свидетелем истории XX века.",
    quote: "Фотография — одновременное признание смысла события и точной организации форм.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Henri_Cartier-Bresson_-_Hyeres%2C_France_-_1932.jpg/600px-Henri_Cartier-Bresson_-_Hyeres%2C_France_-_1932.jpg",
    imageCaption: "Йер, Франция, 1932",
    type: "master",
    featured: true,
  },
  {
    year: 1936,
    era: "Документ",
    title: "Великая депрессия — лицо в лицо",
    photographer: "Доротея Ланге",
    nationality: "США",
    description:
      "«Мать-мигрантка» Доротеи Ланге стала символом Великой депрессии. Эта фотография изменила государственную политику — после публикации правительство срочно выделило 20 тонн продовольствия для лагеря.",
    quote: "Камера — инструмент, который учит людей видеть без камеры.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Lange-MigrantMother02.jpg/600px-Lange-MigrantMother02.jpg",
    imageCaption: "Мать-мигрантка, Калифорния, 1936",
    imageNote: "Одна из самых воспроизводимых фотографий в истории",
    type: "documentary",
    featured: true,
  },
  {
    year: 1947,
    era: "Магнум",
    title: "Основание агентства Magnum Photos",
    photographer: "Роберт Капа, Картье-Брессон, Сеймур, Роджер Роджер",
    nationality: "Международное",
    description:
      "Четыре великих фотографа основали первое фотоагентство, принадлежащее самим фотографам. Magnum стал синонимом честной документальной фотографии и воспитал несколько поколений мастеров.",
    quote: "Если твои снимки недостаточно хороши — ты недостаточно близко. (Роберт Капа)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Death_of_a_Loyalist_Militiaman.jpg/800px-Death_of_a_Loyalist_Militiaman.jpg",
    imageCaption: "Смерть республиканца. Роберт Капа, Испания, 1936",
    type: "milestone",
  },
  {
    year: 1955,
    era: "Гуманизм",
    title: "Семья человека",
    photographer: "Эдвард Стейхен",
    nationality: "США",
    description:
      "Куратор MoMA собрал 503 фотографии 273 фотографов из 68 стран. Выставка «Семья человека» стала самой посещаемой в истории музея — 9 миллионов зрителей по всему миру увидели универсальность человеческого опыта.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Edward_Steichen.jpg/600px-Edward_Steichen.jpg",
    imageCaption: "Эдвард Стейхен, куратор выставки",
    type: "milestone",
  },
  {
    year: 1960,
    era: "Мастера",
    title: "Зональная система Анселя Адамса",
    photographer: "Ансель Адамс",
    nationality: "США",
    description:
      "Адамс создал «Зональную систему» — научный метод контроля тональности в чёрно-белой фотографии. Его пейзажи Йосемити стали символом величия американской природы и определили стандарты пейзажной фотографии.",
    quote: "Визуализируй конечный результат до нажатия затвора.",
    image: "https://cdn.poehali.dev/projects/7c3e8a2d-9a1e-4962-b27a-20102d9e796f/files/0388d4b9-dc5b-4cdb-8e54-a52745e2999d.jpg",
    imageCaption: "Восход луны над Эрнандесом. Ансель Адамс, 1941",
    type: "master",
    featured: true,
  },
  {
    year: 1976,
    era: "Концепт",
    title: "Уильям Эгглстон — цвет как язык",
    photographer: "Уильям Эгглстон",
    nationality: "США",
    description:
      "MoMA впервые устроил персональную выставку цветной фотографии. Эгглстон первым превратил цвет в высокое искусство. До него цвет считался коммерческим — он изменил отношение арт-мира к фотографии навсегда.",
    quote: "Я снимаю всё с одинаковым вниманием.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Atlanta_interior%2C_Eggleston.jpg/600px-Atlanta_interior%2C_Eggleston.jpg",
    imageCaption: "Атланта, интерьер, ~1965",
    type: "master",
  },
  {
    year: 1969,
    era: "История",
    title: "Человек на Луне",
    photographer: "Нил Армстронг / НАСА",
    nationality: "США",
    description:
      "Снимок Базза Олдрина на Луне — одна из самых известных фотографий в истории. Иронично, что Армстронг держал камеру большую часть экспедиции, а сам почти не попал в кадр.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/600px-Aldrin_Apollo_11_original.jpg",
    imageCaption: "Базз Олдрин на Луне, 20 июля 1969",
    imageNote: "В отражении шлема можно различить Нила Армстронга с камерой",
    type: "milestone",
    featured: true,
  },
  {
    year: 1984,
    era: "Иконы",
    title: "Афганская девочка",
    photographer: "Стив МакКарри",
    nationality: "США",
    description:
      "Портрет Шарбат Гулы в лагере беженцев для National Geographic стал самой узнаваемой обложкой журнала. Зелёные глаза девочки с пронзительным взглядом объездили весь мир. Её личность установили только в 2002 году.",
    quote: "Этот взгляд говорил всё — боль, недоверие, достоинство.",
    image: "https://cdn.poehali.dev/projects/7c3e8a2d-9a1e-4962-b27a-20102d9e796f/files/d68786be-caa0-4c22-893a-1d55a5148738.jpg",
    imageCaption: "Афганская девочка. Стив МакКарри, 1984",
    imageNote: "Самая узнаваемая обложка National Geographic в истории",
    type: "documentary",
    featured: true,
  },
  {
    year: 1990,
    era: "Цифровая эра",
    title: "Photoshop меняет всё",
    photographer: "Томас Нолл и Джон Нолл",
    nationality: "США",
    description:
      "Adobe Photoshop 1.0 вышел в феврале 1990 года. Впервые изображение можно было редактировать после съёмки неограниченно. Это породило новый вопрос: где граница между фотографией и иллюстрацией?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/600px-Adobe_Photoshop_CC_icon.svg.png",
    imageCaption: "Photoshop 1.0, 1990 — начало новой эры",
    type: "invention",
  },
  {
    year: 1999,
    era: "Цифровая эра",
    title: "Nikon D1 — профессиональная цифра",
    photographer: "Nikon Corporation",
    nationality: "Япония",
    description:
      "Nikon D1 стала первой цифровой зеркальной камерой для профессионалов по доступной цене. За несколько лет плёнка почти исчезла из редакций по всему миру.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Nikon_D1.jpg/600px-Nikon_D1.jpg",
    imageCaption: "Nikon D1, 1999",
    type: "invention",
  },
  {
    year: 2007,
    era: "Мобильная эра",
    title: "iPhone и фотография в кармане",
    photographer: "Apple Inc.",
    nationality: "США",
    description:
      "Первый iPhone запустил эру мобильной фотографии. Через несколько лет смартфоны стали самыми используемыми камерами в мире. Сегодня ежегодно делается более 1,7 триллиона фотографий.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/400px-IPhone_1st_Gen.svg.png",
    imageCaption: "iPhone 1, 2007 — камера в кармане у каждого",
    type: "milestone",
  },
  {
    year: 2010,
    era: "Мобильная эра",
    title: "Instagram — визуальный язык поколения",
    photographer: "Кевин Систром и Майк Кригер",
    nationality: "США",
    description:
      "Instagram создал новый визуальный язык: квадратный кадр, фильтры, мгновенная публикация. Он превратил каждого пользователя смартфона в фотографа и переопределил понятие «хорошего снимка».",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/600px-Instagram_logo_2016.svg.png",
    imageCaption: "Instagram, 2010",
    type: "milestone",
  },
  {
    year: 2023,
    era: "ИИ-эра",
    title: "Генеративный ИИ: новый вопрос авторства",
    photographer: "Генеративный ИИ",
    nationality: "Глобально",
    description:
      "Midjourney, DALL-E и Stable Diffusion создают фотореалистичные изображения из текстовых описаний. Мир спорит: является ли сгенерированное изображение фотографией? Кто его автор — человек или алгоритм?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/AI_art_example.jpg/600px-AI_art_example.jpg",
    imageCaption: "2023 — грань между фотографией и генерацией стёрта",
    type: "milestone",
  },
];

const ERA_COLORS: Record<string, string> = {
  "Рождение": "#c4a882",
  "Пионеры": "#b8956a",
  "Документ": "#9e7d56",
  "Цвет": "#d4b896",
  "Массовость": "#c4a882",
  "Мастера": "#b8956a",
  "Репортаж": "#c4a882",
  "Магнум": "#9e7d56",
  "Портрет": "#b8956a",
  "Гуманизм": "#c4a882",
  "История": "#d4b896",
  "Концепт": "#9e7d56",
  "Иконы": "#c4a882",
  "Авангард": "#b8956a",
  "Цифровая эра": "#8a9db5",
  "Мобильная эра": "#7a9bb8",
  "ИИ-эра": "#6b8fa8",
};

const TYPE_LABELS: Record<string, string> = {
  milestone: "Веха",
  invention: "Изобретение",
  documentary: "Документ",
  master: "Мастер",
};

export default function Index() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("entry-hidden");
            entry.target.classList.add("entry-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".entry-hidden");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="grain min-h-screen" style={{ backgroundColor: "#0f0d0b", color: "#e8dcc8" }}>

      {/* Hero */}
      <header
        className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(90,70,50,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(196,168,130,0.06) 60px, rgba(196,168,130,0.06) 61px)",
          }}
        />

        <p
          className="font-mono-custom text-xs tracking-[0.4em] uppercase mb-8 animate-fade-in"
          style={{ color: "#8b6f47", animationDelay: "0.2s", opacity: 0 }}
        >
          1826 — настоящее время
        </p>

        <h1
          className="font-cormorant hero-text-shadow animate-fade-in"
          style={{
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#e8dcc8",
            animationDelay: "0.4s",
            opacity: 0,
          }}
        >
          История
          <br />
          <em style={{ color: "#c4a882" }}>фотографии</em>
        </h1>

        <div
          className="animate-fade-in"
          style={{
            width: "60px",
            height: "1px",
            background: "#5a4632",
            margin: "2.5rem auto 0",
            animationDelay: "0.6s",
            opacity: 0,
          }}
        />

        <p
          className="font-cormorant mt-6 animate-fade-in"
          style={{
            fontSize: "clamp(1.1rem, 2.8vw, 1.4rem)",
            color: "#8b7055",
            fontStyle: "italic",
            maxWidth: "480px",
            lineHeight: 1.7,
            animationDelay: "0.8s",
            opacity: 0,
          }}
        >
          От первого снимка на оловянной пластине до эпохи искусственного интеллекта
        </p>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "1.4s", opacity: 0 }}
        >
          <span
            className="font-mono-custom text-xs tracking-widest uppercase"
            style={{ color: "#5a4632" }}
          >
            скролл
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, #5a4632, transparent)",
            }}
          />
        </div>
      </header>

      {/* Stats bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-center gap-8 px-6 py-3"
        style={{
          background: "rgba(15,13,11,0.94)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(90,70,50,0.2)",
        }}
      >
        {[
          { val: "197 лет", label: "истории" },
          { val: `${TIMELINE_DATA.length}`, label: "событий" },
          { val: "1826", label: "первый снимок" },
          { val: "1,7 трлн", label: "фото в год сейчас" },
        ].map((s) => (
          <div key={s.label} className="text-center hidden sm:block">
            <div
              className="font-mono-custom"
              style={{ fontSize: "0.7rem", color: "#c4a882", letterSpacing: "0.1em" }}
            >
              {s.val}
            </div>
            <div
              className="font-mono-custom"
              style={{ fontSize: "0.55rem", color: "#5a4632", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              {s.label}
            </div>
          </div>
        ))}
        <div className="sm:hidden font-cormorant italic" style={{ color: "#8b7055", fontSize: "0.9rem" }}>
          История фотографии
        </div>
      </div>

      {/* Timeline */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-8 py-20">
        {/* Center line desktop */}
        <div
          className="absolute hidden md:block timeline-line"
          style={{ left: "50%", transform: "translateX(-50%)", width: "1px", top: 0, bottom: 0 }}
        />
        {/* Left line mobile */}
        <div
          className="absolute md:hidden timeline-line"
          style={{ left: "20px", width: "1px", top: 0, bottom: 0 }}
        />

        {TIMELINE_DATA.map((item, index) => {
          const isLeft = index % 2 === 0;
          const eraColor = ERA_COLORS[item.era] || "#c4a882";

          return (
            <div
              key={`${item.year}-${index}`}
              className="entry-hidden relative mb-16 sm:mb-24"
            >
              {/* Year dot desktop */}
              <div
                className="year-dot absolute hidden md:block"
                style={{
                  left: "50%",
                  top: "28px",
                  transform: "translate(-50%, -50%)",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: eraColor,
                  zIndex: 10,
                }}
              />
              {/* Year dot mobile */}
              <div
                className="year-dot absolute md:hidden"
                style={{
                  left: "20px",
                  top: "28px",
                  transform: "translate(-50%, -50%)",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: eraColor,
                  zIndex: 10,
                }}
              />

              {/* Card */}
              <div
                className={[
                  "md:w-[46%]",
                  isLeft ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0",
                  "ml-10 mr-0",
                ].join(" ")}
              >
                {/* Era + Type */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono-custom text-xs tracking-widest uppercase"
                    style={{ color: eraColor }}
                  >
                    {item.era}
                  </span>
                  <span className="font-mono-custom text-xs" style={{ color: "#3d2e1e" }}>/</span>
                  <span
                    className="font-mono-custom text-xs"
                    style={{ color: "#5a4632", letterSpacing: "0.05em" }}
                  >
                    {TYPE_LABELS[item.type] || item.type}
                  </span>
                </div>

                {/* Year */}
                <div
                  className="font-cormorant mb-2"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                    fontWeight: 300,
                    color: eraColor,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.year}
                </div>

                {/* Title */}
                <h2
                  className="font-cormorant mb-1"
                  style={{
                    fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                    fontWeight: 600,
                    color: "#e8dcc8",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h2>

                {/* Photographer */}
                <p
                  className="font-cormorant italic mb-4"
                  style={{ fontSize: "1.1rem", color: "#8b7055" }}
                >
                  {item.photographer}
                  {item.nationality && (
                    <span style={{ color: "#5a4632" }}> · {item.nationality}</span>
                  )}
                </p>

                {/* Image */}
                {(item.featuredImage || item.image) && (
                  <div className="mb-5 overflow-hidden" style={{ borderRadius: "2px" }}>
                    <img
                      src={item.featuredImage || item.image}
                      alt={item.imageCaption || item.title}
                      className="photo-hover w-full object-cover photo-frame"
                      style={{
                        maxHeight: item.featured ? "380px" : "260px",
                        filter: "sepia(20%) contrast(1.05) brightness(0.9)",
                        display: "block",
                      }}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {item.imageCaption && (
                      <p
                        className="font-mono-custom mt-2"
                        style={{
                          fontSize: "0.68rem",
                          color: "#5a4632",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.imageCaption}
                      </p>
                    )}
                    {item.imageNote && (
                      <p
                        className="font-cormorant italic mt-1"
                        style={{ fontSize: "0.95rem", color: "#7a5c3a" }}
                      >
                        {item.imageNote}
                      </p>
                    )}
                  </div>
                )}

                {/* Description */}
                <p
                  className="font-cormorant mb-4"
                  style={{
                    fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                    color: "#a89070",
                    lineHeight: 1.85,
                  }}
                >
                  {item.description}
                </p>

                {/* Quote */}
                {item.quote && (
                  <blockquote
                    style={{
                      borderLeft: `2px solid ${eraColor}`,
                      paddingLeft: "1rem",
                    }}
                  >
                    <p
                      className="font-cormorant italic"
                      style={{
                        fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                        color: "#7a6050",
                        lineHeight: 1.7,
                      }}
                    >
                      «{item.quote}»
                    </p>
                  </blockquote>
                )}
              </div>
            </div>
          );
        })}

        {/* End marker */}
        <div className="flex flex-col items-center pt-10 pb-20">
          <div
            style={{
              width: "1px",
              height: "60px",
              background: "linear-gradient(to bottom, #5a4632, transparent)",
              marginBottom: "1.5rem",
            }}
          />
          <p
            className="font-cormorant italic"
            style={{ color: "#5a4632", fontSize: "1.1rem" }}
          >
            История продолжается...
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-10 px-6"
        style={{ borderTop: "1px solid rgba(90,70,50,0.15)" }}
      >
        <p
          className="font-cormorant italic"
          style={{ color: "#3d2e1e", fontSize: "0.9rem" }}
        >
          С момента первого снимка Ньепса в 1826 году человечество сделало более 12 триллионов фотографий
        </p>
      </footer>
    </div>
  );
}