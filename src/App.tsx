import { FormEvent, useState, useRef, useEffect, type ReactNode } from "react";

type Role = "user" | "manager" | "admin";
type View = "map" | "routes" | "create" | "profile" | "stats" | "reports" | "users";
type Mood = "calm" | "explore" | "food";

type IconName =
  | "arrow" | "bookmark" | "chart" | "check" | "chevron" | "clock"
  | "coffee" | "compass" | "eye" | "flag" | "heart" | "landmark"
  | "locate" | "logout" | "mail" | "menu" | "park" | "phone"
  | "plus" | "route" | "search" | "settings" | "sparkle" | "user"
  | "users" | "walk";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    bookmark: <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.8L6 21Z" />,
    chart: <><path d="M4 20V10m6 10V4m6 16v-7m4 7H2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    coffee: <><path d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" /><path d="M16 10h1a3 3 0 0 1 0 6h-1M8 4v2m4-2v2" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.8 8.2-2.1 5.5-5.5 2.1 2.1-5.5Z" /></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    flag: <><path d="M5 22V4m0 1h11l-2 4 2 4H5" /></>,
    heart: <path d="M20.8 5.9a5.4 5.4 0 0 0-7.7 0L12 7l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7L12 22l8.8-8.4a5.4 5.4 0 0 0 0-7.7Z" />,
    landmark: <><path d="m3 10 9-6 9 6M5 20h14M7 10v7m5-7v7m5-7v7" /></>,
    locate: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3" /></>,
    logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4m4-4H9" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    park: <><path d="m12 3-5 7h3l-4 6h12l-4-6h3Z" /><path d="M12 16v5" /></>,
    phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 3c-4-1.5-7.5-5-9-9l3-2Z" />,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 3-3v-6a3 3 0 0 1 3-3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.8 2.8-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.6v.2H10V21a1.8 1.8 0 0 0-1.1-1.6 1.8 1.8 0 0 0-2 .4l-.1.1L4 17.1l.1-.1a1.8 1.8 0 0 0 .4-2A1.8 1.8 0 0 0 3 13.9h-.2V10H3a1.8 1.8 0 0 0 1.6-1.1 1.8 1.8 0 0 0-.4-2l-.1-.1L6.9 4l.1.1a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 10 3v-.2h4V3a1.8 1.8 0 0 0 1.1 1.6 1.8 1.8 0 0 0 2-.4l.1-.1L20 6.9l-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1.1h.2v4h-.2a1.8 1.8 0 0 0-1.7.9Z" /></>,
    sparkle: <><path d="m12 3 1.2 4.2L17 9l-3.8 1.8L12 15l-1.2-4.2L7 9l3.8-1.8Z" /><path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7Z" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    users: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0m1-17a4 4 0 0 1 0 8m0 3a6 6 0 0 1 5 6" /></>,
    walk: <><circle cx="13" cy="4" r="2" /><path d="m9 21 2-6-3-3 3-5 4 4h4M11 15l4 2 2 4" /></>,
  };
  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      {paths[name]}
    </svg>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className={`brand ${light ? "brand--light" : ""}`}>
      <span className="brand__mark"><Icon name="route" size={22} /></span>
      <span>Иду</span>
    </div>
  );
}

function AuthScreen({ onEnter }: { onEnter: (role: Role) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (mode === "register") { onEnter("user"); return; }
    if (email.toLowerCase() === "admin@idu.ru" && password === "AdminWay25") { onEnter("admin"); return; }
    if (email.toLowerCase() === "support@idu.ru" && password === "RouteHelp25") { onEnter("manager"); return; }
    if (email.toLowerCase() === "walker@idu.ru" && password === "Walk2025") { onEnter("user"); return; }
    setAuthError("Неверная почта или пароль. Проверьте данные и попробуйте снова.");
  }

  return (
    <main className="auth-shell">
      <section className="auth-story">
        <div className="auth-story__top">
          <Brand light />
          <span className="city-pill"><span /> Санкт-Петербург</span>
        </div>
        <div className="story-route" aria-hidden="true">
          <svg viewBox="0 0 680 640">
            <path className="route-shadow" d="M92 515C201 480 136 358 248 325c93-27 71-124 168-144 62-13 112 14 158-63" />
            <path className="route-line" d="M92 515C201 480 136 358 248 325c93-27 71-124 168-144 62-13 112 14 158-63" />
          </svg>
          <span className="story-pin story-pin--one"><Icon name="coffee" /></span>
          <span className="story-pin story-pin--two"><Icon name="landmark" /></span>
          <span className="story-pin story-pin--three"><Icon name="park" /></span>
          <span className="story-person"><Icon name="walk" size={28} /></span>
        </div>
        <div className="auth-story__copy">
          <span className="eyebrow">№ 01 / Путевые очерки</span>
          <p className="story-title">Прогулка, которая<br />подходит <em>именно тебе</em></p>
          <p className="story-text">Выбери время и настроение — мы построим удобный маршрут по интересным местам рядом.</p>
          <div className="story-stats">
            <div><strong>1240+</strong><span>интересных мест</span></div>
            <div><strong>36</strong><span>готовых прогулок</span></div>
            <div><strong>4.9</strong><span>оценка маршрутов</span></div>
          </div>
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-panel__mobile-brand"><Brand /></div>
        <div className="auth-card">
          <div className="auth-heading">
            <span className="auth-kicker">{mode === "login" ? "С возвращением" : "Приятно познакомиться"}</span>
            <p className="auth-title">{mode === "login" ? "Продолжим гулять?" : "Начнём с первого маршрута"}</p>
            <p className="auth-subtitle">{mode === "login" ? "Войди, чтобы сохранить историю маршрутов" : "Создай профиль — это займёт меньше минуты"}</p>
          </div>
          <div className="auth-tabs" role="tablist">
            <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")} role="tab">Вход</button>
            <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")} role="tab">Регистрация</button>
          </div>
          <form className="auth-form" onSubmit={submit}>
            {mode === "register" && (
              <label><span>Имя</span><div className="input-wrap"><Icon name="user" /><input placeholder="Как к тебе обращаться?" required /></div></label>
            )}
            <label>
              <span>Электронная почта</span>
              <div className="input-wrap">
                <span className="input-at">@</span>
                <input onChange={(e) => { setEmail(e.target.value); setAuthError(""); }} type="email" placeholder="name@example.ru" required value={email} />
              </div>
            </label>
            <label>
              <span>Пароль</span>
              <div className="input-wrap">
                <span className="password-dot">●</span>
                <input minLength={6} onChange={(e) => { setPassword(e.target.value); setAuthError(""); }} placeholder="Не меньше 6 символов" required type={showPassword ? "text" : "password"} value={password} />
                <button aria-label="Показать пароль" className="eye-button" onClick={() => setShowPassword(!showPassword)} type="button"><Icon name="eye" /></button>
              </div>
            </label>
            {mode === "login" && <button className="forgot" type="button">Не помню пароль</button>}
            {authError && <p className="auth-error">{authError}</p>}
            <button className="primary-button" type="submit">
              {mode === "login" ? "Войти" : "Создать аккаунт"} <Icon name="arrow" />
            </button>
          </form>
          <p className="legal">Продолжая, вы соглашаетесь с условиями использования и политикой конфиденциальности</p>
        </div>
      </section>
    </main>
  );
}

const placesData: { id: string; icon: IconName; label: string; className: string; minRadius: number }[] = [
  { id: "museum", icon: "landmark", label: "01 · Музей-квартира", className: "place place--museum", minRadius: 1 },
  { id: "coffee", icon: "coffee", label: "02 · Кофейня «Смена»", className: "place place--coffee", minRadius: 1 },
  { id: "park", icon: "park", label: "03 · Таврический сад", className: "place place--park", minRadius: 3 },
  { id: "garden", icon: "landmark", label: "04 · Оранжерея", className: "place place--garden", minRadius: 4 },
];

const routePaths: Record<Mood, Record<number, string>> = {
  calm: {
    1: "M660 470c-30-30-20-75 25-90 40-15 80 10 80 45 0 35-35 55-75 45 -25-8-25-8-30 0Z",
    2: "M640 480c-50-35-75-95-30-140 45-45 140-15 155-95 12-65 110-85 130-20 15 50-40 85-28 145 12 65-55 110-120 95-40-12-60-12-107-25 -30 20 -30 20 0 40Z",
    3: "M700 475c-66-44-97-111-42-165 52-51 164-19 181-112 18-99 145-107 175-18 23 69-53 116-39 195 15 86-74 147-154 123-45-14-74-18-121-23 -35 25 -35 25 0 0Z",
    4: "M760 500c-90-55-145-145-70-215 70-65 195-25 215-135 20-115 175-125 200-15 25 95-60 140-45 235 18 105-90 190-185 165-55-18-85-15-115-35 -45 30 -45 30 0 0Z",
    5: "M820 520c-120-75-195-195-90-285 85-80 250-35 275-165 22-135 225-145 255-15 27 110-75 165-55 275 18 130-115 230-235 195-65-22-95-15-150-5 -55 35 -55 35 0 0Z",
  },
  explore: {
    1: "M645 465c-15-30 0-65 30-75 30-10 55 15 55 45 0 30-30 45-55 40",
    2: "M620 485c-60-40-85-110-30-165 55-55 170-15 175-105 5-85 145-95 165-10 18 75-55 120-40 190 14 70-70 130-140 115-55-14-80-12-130-25Z",
    3: "M690 480c-75-48-108-120-48-175 56-52 175-25 195-120 22-105 155-115 185-20 25 75-55 125-40 210 15 92-80 155-165 130-50-15-80-15-127-25Z",
    4: "M750 505c-95-60-150-155-70-225 75-68 210-25 230-140 22-120 185-130 210-15 25 100-65 150-50 245 18 112-95 200-195 172-55-18-85-12-125-37Z",
    5: "M810 525c-130-85-205-210-95-300 90-85 270-35 290-175 22-145 245-155 270-15 28 118-80 170-60 285 20 138-125 245-250 210-68-22-100-15-155-5Z",
  },
  food: {
    1: "M670 475c-25-20-25-60 5-75 30-15 65 5 65 35 0 25-25 40-50 40",
    2: "M650 490c-55-35-80-100-35-150 45-50 150-20 165-105 12-75 125-90 145-15 20 65-45 105-32 170 12 75-65 120-135 105-45-12-65-10-108-5Z",
    3: "M710 470c-70-40-100-105-50-160 50-55 170-25 185-118 15-95 150-105 175-18 22 68-50 115-38 195 15 90-75 145-155 122-48-12-74-16-117-21Z",
    4: "M770 495c-100-50-160-140-85-215 75-70 215-30 235-140 22-110 190-120 215-10 25 95-65 145-50 235 18 110-95 190-190 165-55-15-85-15-125-35Z",
    5: "M830 515c-125-70-195-185-90-275 90-80 260-35 285-160 22-125 230-135 260-10 28 105-75 160-58 265 20 125-115 220-235 190-65-20-95-15-162-10Z",
  },
};

function MapArtwork({ routeReady, radius, mood }: { routeReady: boolean; radius: number; mood: Mood }) {
  const size = Math.min(radius * 14, 60);
  const routePath = routePaths[mood][radius];

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  const handleDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const nextX = Math.max(-250, Math.min(250, dragStart.current.ox + dx));
      const nextY = Math.max(-200, Math.min(200, dragStart.current.oy + dy));
      setOffset({ x: nextX, y: nextY });
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging]);

  return (
    <div
      className={`map-artwork ${dragging ? "is-dragging" : ""}`}
      onMouseDown={handleDown}
    >
      <svg className="map-stains" viewBox="0 0 1400 900" preserveAspectRatio="none" aria-hidden="true">
        {/* Пятно 1 — хвойное, верхний правый угол */}
        <path
          fill="#3B4A3F"
          fillOpacity="0.08"
          d="M920 60c80-20 220-10 310 60 90 70 130 190 110 320-20 130-120 240-250 270-140 30-290-10-370-100-80-90-110-230-70-350 40-120 190-180 270-200Z"
        />
        {/* Пятно 2 — терракотовое, ЛЕВЫЙ НИЖНИЙ угол */}
        <path
          fill="#C8543A"
          fillOpacity="0.05"
          d="M280 620c70-30 180-10 240 60 60 70 50 180-10 240-60 60-160 80-240 50-80-30-110-140-90-220 20-80 40-100 100-130Z"
        />
        {/* Пятно 3 — золотое, центр, самое светлое */}
        <path
          fill="#B8924A"
          fillOpacity="0.04"
          d="M540 280c120-60 320-50 440 60 120 110 130 320 20 440-110 120-340 150-480 60-140-90-170-300-70-420 40-50 60-80 90-140Z"
        />
      </svg>

      <svg
        className="map-base"
        preserveAspectRatio="none"
        viewBox="0 0 1400 900"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${1 + radius * 0.02})`, transformOrigin: "center center" }}
      >
        <rect className="map-ground" height="900" width="1400" />
        <path className="water" d="M-20 784C170 721 266 776 393 730c157-57 258-187 430-151 189 39 254 188 596 85v256H-20Z" />
        <path className="park-shape" d="M817 80c133-55 275 5 264 110-12 111-91 147-79 243-121 40-204-28-211-121-7-97-81-174 26-232Z" />
        <path className="park-detail" d="M866 91c24 73-31 116 17 170m102-166c-37 71 23 120-29 197m93-70c-75 2-129 58-226 24" />
        <g className="blocks">
          <path d="M79 74h198v117H79zM322 72h178v77H322zM558 66h174v132H558zM1119 71h214v107h-214z" />
          <path d="M66 245h130v142H66zM241 239h222v94H241zM522 245h143v142H522zM1097 228h241v102h-241z" />
          <path d="M74 441h177v117H74zM300 391h191v154H300zM543 445h155v96H543zM1078 390h244v151h-244z" />
          <path d="M67 612h221v105H67zM340 601h194v94H340zM1039 590h277v91h-277z" />
        </g>
        <g className="minor-roads">
          <path d="M0 217h1400M0 415h1400M0 574h1400M293 0v900M516 0v900M748 0v900M1050 0v900" />
          <path d="M0 355c243-18 433 24 616-10 253-48 450 23 784-29M191 900c89-171 241-217 335-362 89-138 197-269 355-405" />
        </g>
        <g className="major-roads">
          <path d="M-10 596c182-34 371-22 543-107 171-84 250-164 358-304 87-112 233-151 519-142" />
          <path d="M448-20c15 197 87 326 238 433 156 110 310 184 386 507" />
        </g>
        <g className="road-labels">
          <text x="112" y="204">Кирочная</text>
          <text x="1112" y="403">Фурштатская</text>
          <text transform="rotate(-33 640 450)" x="640" y="450">Литейный</text>
          <text x="105" y="587">Некрасова</text>
          <text x="1068" y="708">Фонтанка</text>
        </g>
        {routeReady && <path className="built-route" d={routePath} key={`${mood}-${radius}`} />}
      </svg>

      <div className="radius-circle" style={{ width: `${size}vw`, height: `${size}vw` }}>
        <div className="user-location"><span className="user-pulse" /><Icon name="walk" size={18} /></div>
      </div>

      {placesData.map((place) => (
        <div
          className={`${place.className} ${radius < place.minRadius ? "place--hidden" : ""}`}
          key={place.id}
          style={{ transform: `translate(${offset.x * 0.4}px, ${offset.y * 0.4}px)` }}
        >
          <span className="place__icon"><Icon name={place.icon} size={15} /></span>
          <span className="place__label">{place.label}</span>
        </div>
      ))}
    </div>
  );
}

const roleLabels: Record<Role, string> = { user: "Пользователь", manager: "Менеджер", admin: "Администратор" };

const navigation: Record<Role, { view: View; label: string; icon: IconName }[]> = {
  user: [
    { view: "map", label: "Карта", icon: "compass" },
    { view: "routes", label: "Маршруты", icon: "route" },
    { view: "create", label: "Создать", icon: "plus" },
    { view: "profile", label: "Профиль", icon: "user" },
  ],
  manager: [
    { view: "stats", label: "Статистика", icon: "chart" },
    { view: "reports", label: "Жалобы", icon: "flag" },
  ],
  admin: [
    { view: "stats", label: "Статистика", icon: "chart" },
    { view: "users", label: "Пользователи", icon: "users" },
    { view: "reports", label: "Жалобы", icon: "flag" },
  ],
};

const routeMetrics: Record<string, Record<Mood, { km: string; places: number }>> = {
  "30 мин":    { calm: { km: "1,8", places: 2 }, explore: { km: "2,1", places: 2 }, food: { km: "1,5", places: 2 } },
  "60 мин":    { calm: { km: "3,2", places: 3 }, explore: { km: "3,8", places: 4 }, food: { km: "2,9", places: 3 } },
  "1,5 часа":  { calm: { km: "4,2", places: 5 }, explore: { km: "5,4", places: 6 }, food: { km: "4,0", places: 4 } },
  "2+ часа":   { calm: { km: "6,1", places: 7 }, explore: { km: "7,3", places: 8 }, food: { km: "5,6", places: 6 } },
};

const routeCards = [
  { title: "От Фонтанки до Таврического", city: "Санкт-Петербург", description: "Тихие дворы, доходные дома и зелёный финал в саду.", tags: ["прогулка", "история"], distance: "3,8 км", time: "55 мин", likes: 824, color: "green" },
  { title: "Кофе и модерн на Петроградке", city: "Санкт-Петербург", description: "Архитектура начала XX века и три проверенные кофейни.", tags: ["еда", "история"], distance: "4,6 км", time: "1 ч 20 мин", likes: 631, color: "blue" },
  { title: "Неочевидный Васильевский", city: "Санкт-Петербург", description: "Линии, арт-пространства и лучший вид на вечерний город.", tags: ["развлечения", "прогулка"], distance: "5,2 км", time: "1 ч 40 мин", likes: 492, color: "sand" },
  { title: "Парк Галицкого на закате", city: "Краснодар", description: "Современный парк, зеркальный лабиринт и лучшие вечерние виды.", tags: ["прогулка", "развлечения"], distance: "4,1 км", time: "1 ч 10 мин", likes: 1206, color: "green" },
  { title: "Красная улица без спешки", city: "Краснодар", description: "Главная улица города, старые особняки, скверы и локальные кафе.", tags: ["история", "еда"], distance: "3,5 км", time: "50 мин", likes: 718, color: "sand" },
];

function RouteThumbnail({ color = "green" }: { color?: string }) {
  return (
    <div className={`route-thumb route-thumb--${color}`}>
      <svg viewBox="0 0 320 150">
        <path className="thumb-road" d="M-10 96C53 76 75 123 129 87s84-79 202-54" />
        <path className="thumb-road thin" d="M57-5c17 64 41 76 99 85 67 11 83 31 108 76" />
        <path className="thumb-route" d="M38 98c49-5 56-52 105-36 43 14 50 64 103 42" />
        <circle cx="38" cy="98" r="5" />
        <circle cx="246" cy="104" r="5" />
      </svg>
    </div>
  );
}

function RoutesView({ onReport }: { onReport: (message: string) => void }) {
  const [activeTags, setActiveTags] = useState(["прогулка"]);
  const toggleTag = (tag: string) => setActiveTags((cur) => cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]);
  return (
    <section className="workspace">
      <div className="workspace-title">
        <div>
          <span className="section-kicker">№ 02 / Каталог</span>
          <h1>Маршруты для прогулки</h1>
          <p>Подобрали варианты, которые полностью или частично попадают в вашу область.</p>
        </div>
        <div className="result-count"><strong>24</strong><span>найдено</span></div>
      </div>
      <div className="filter-panel">
        <div className="filter-field"><span>До начала</span><button><Icon name="locate" size={16} /> до 2 км <Icon name="chevron" size={14} /></button></div>
        <div className="filter-field"><span>Время</span><button><Icon name="clock" size={16} /> до 1,5 ч <Icon name="chevron" size={14} /></button></div>
        <div className="filter-tags">
          <span>Что интересно</span>
          <div>{["еда", "развлечения", "прогулка", "исторический"].map((tag) => (
            <button className={activeTags.includes(tag) ? "active" : ""} key={tag} onClick={() => toggleTag(tag)}>{tag}</button>
          ))}</div>
        </div>
      </div>
      <div className="routes-grid">
        {routeCards.map((route, index) => (
          <article className="route-card" key={route.title}>
            <RouteThumbnail color={route.color} />
            <div className="route-card__body">
              <div className="route-card__tags">{route.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <span className="route-city"><Icon name="locate" size={11} />{route.city}</span>
              <h2>{route.title}</h2>
              <p>{route.description}</p>
              <div className="route-meta"><span><Icon name="walk" size={14} />{route.distance}</span><span><Icon name="clock" size={14} />{route.time}</span></div>
              <div className="route-card__footer">
                <button className="like-button"><Icon name="heart" size={15} /> {route.likes}</button>
                <button className="report-button" onClick={() => onReport(`Жалоба #RP-${1048 + index} создана`)}><Icon name="flag" size={13} /> Пожаловаться</button>
                <button className="card-arrow"><Icon name="arrow" size={16} /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfileView() {
  return (
    <section className="workspace workspace--narrow">
      <div className="workspace-title">
        <div>
          <span className="section-kicker">№ 03 / Личный кабинет</span>
          <h1>Ваш профиль</h1>
          <p>Контактные данные и информация, которую увидят другие участники.</p>
        </div>
        <button className="secondary-action">Редактировать</button>
      </div>
      <div className="profile-layout">
        <aside className="profile-summary">
          <div className="profile-photo">А<span>Сменить фото</span></div>
          <h2>Анна Морозова</h2>
          <p>@anna.walks</p>
          <div className="profile-numbers">
            <div><strong>12</strong><span>маршрутов</span></div>
            <div><strong>438</strong><span>лайков</span></div>
          </div>
        </aside>
        <div className="profile-details">
          <div className="detail-section">
            <span className="detail-caption">О себе</span>
            <p>Люблю долгие прогулки без спешки, архитектуру северного модерна и маленькие кофейни в старых дворах.</p>
          </div>
          <div className="detail-grid">
            <div><span><Icon name="phone" size={14} /> Телефон</span><strong>+7 921 456-82-10</strong></div>
            <div><span><Icon name="mail" size={14} /> Почта</span><strong>anna.morozova@mail.ru</strong></div>
          </div>
          <div className="detail-section">
            <span className="detail-caption">Любимые темы</span>
            <div className="profile-tags"><span>Архитектура</span><span>Кофе</span><span>Парки</span><span>Фотография</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreateView() {
  const [points, setPoints] = useState(["59.9445, 30.3604", "59.9472, 30.3711"]);
  return (
    <section className="workspace">
      <div className="workspace-title">
        <div>
          <span className="section-kicker">№ 04 / Новый маршрут</span>
          <h1>Соберите свою прогулку</h1>
          <p>Добавьте точки по координатам и расскажите, почему этот путь стоит пройти.</p>
        </div>
        <button className="primary-small">Опубликовать</button>
      </div>
      <div className="create-layout">
        <form className="route-form">
          <label><span>Название</span><input defaultValue="Дворы и сады Литейной части" /></label>
          <label><span>Описание</span><textarea defaultValue="Неспешная прогулка по старому Петербургу: парадные, проходные дворы и тихий сад в финале." /></label>
          <fieldset>
            <legend>Теги</legend>
            <div className="select-tags">{["еда", "развлечения", "прогулка", "исторический"].map((tag, i) => <button className={i > 1 ? "active" : ""} key={tag} type="button">{tag}</button>)}</div>
          </fieldset>
          <div className="points-heading"><span>Точки маршрута</span><small>широта, долгота</small></div>
          <div className="route-points">
            {points.map((point, index) => (
              <div key={`${point}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <input defaultValue={point} />
                <button aria-label="Удалить точку" onClick={() => setPoints(points.filter((_, i) => i !== index))} type="button">×</button>
              </div>
            ))}
          </div>
          <button className="add-point" onClick={() => setPoints([...points, "59.0000, 30.0000"])} type="button"><Icon name="plus" size={16} /> Добавить точку</button>
        </form>
        <div className="create-map">
          <RouteThumbnail color="green" />
          <div className="create-map__note">
            <Icon name="locate" size={18} />
            <span><strong>{points.length} точки</strong>Добавляйте места в порядке посещения</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsView({ role }: { role: Role }) {
  return (
    <section className="workspace">
      <div className="workspace-title">
        <div>
          <span className="section-kicker">№ 05 / {role === "admin" ? "Обзор платформы" : "Рабочая панель"}</span>
          <h1>Статистика</h1>
          <p>Данные за период с 1 по 30 июня 2025 года.</p>
        </div>
        <button className="period-button"><Icon name="clock" size={16} /> 30 дней <Icon name="chevron" size={14} /></button>
      </div>
      <div className="stat-cards">
        <article><span>Новые пользователи</span><strong>1284</strong><small className="positive">↑ 18,4%</small></article>
        <article><span>Просмотры маршрутов</span><strong>48920</strong><small className="positive">↑ 12,1%</small></article>
        <article><span>Активные маршруты</span><strong>2406</strong><small>+82 за период</small></article>
        <article><span>Открытые жалобы</span><strong>17</strong><small className="negative">5 требуют внимания</small></article>
      </div>
      <div className="analytics-grid">
        <article className="chart-card">
          <div className="chart-heading">
            <div><h2>Просмотры маршрутов</h2><p>Динамика по дням</p></div>
            <span><i /> Просмотры</span>
          </div>
          <div className="chart-area">
            <div className="chart-y"><span>2400</span><span>1800</span><span>1200</span><span>600</span><span>0</span></div>
            <svg preserveAspectRatio="none" viewBox="0 0 700 220">
              <defs>
                <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#C8543A" stopOpacity=".22" />
                  <stop offset="1" stopColor="#C8543A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="chart-fill" d="M0 180C60 160 76 115 130 133s88-72 150-45 78 47 130 3 95-58 145-10 91 5 145-49V220H0Z" />
              <path className="chart-line" d="M0 180C60 160 76 115 130 133s88-72 150-45 78 47 130 3 95-58 145-10 91 5 145-49" />
            </svg>
            <div className="chart-x"><span>1 июн</span><span>7 июн</span><span>14 июн</span><span>21 июн</span><span>30 июн</span></div>
          </div>
        </article>
        <article className="popular-card">
          <div className="chart-heading">
            <div><h2>Популярные теги</h2><p>По просмотрам</p></div>
          </div>
          {[["Прогулка", "38%"], ["Исторический", "27%"], ["Еда", "21%"], ["Развлечения", "14%"]].map(([label, value]) => (
            <div className="tag-row" key={label}>
              <span>{label}</span>
              <div><i style={{ width: value }} /></div>
              <strong>{value}</strong>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

function ReportsView() {
  const [statuses, setStatuses] = useState(["Новая", "На проверке", "Решена", "Новая"]);
  const reports = [
    ["RP-1048", "RT-2031", "Некорректно указана точка маршрута"],
    ["RP-1047", "RT-1844", "Маршрут проходит через закрытую территорию"],
    ["RP-1046", "RT-0962", "Описание содержит рекламную ссылку"],
    ["RP-1045", "RT-2210", "Маршрут недоступен для прохождения"],
  ];
  return (
    <section className="workspace">
      <div className="workspace-title">
        <div>
          <span className="section-kicker">№ 06 / Модерация</span>
          <h1>Жалобы на маршруты</h1>
          <p>Проверяйте обращения и фиксируйте результат обработки.</p>
        </div>
        <div className="result-count"><strong>17</strong><span>ожидают</span></div>
      </div>
      <div className="data-card">
        <div className="table-tools">
          <div className="small-search"><Icon name="search" size={15} /><input placeholder="Найти по идентификатору" /></div>
          <button>Все статусы <Icon name="chevron" size={13} /></button>
        </div>
        <div className="data-table reports-table">
          <div className="table-row table-head"><span>Жалоба</span><span>Маршрут</span><span>Описание</span><span>Статус</span></div>
          {reports.map((report, index) => (
            <div className="table-row" key={report[0]}>
              <strong>{report[0]}</strong>
              <span>{report[1]}</span>
              <p>{report[2]}</p>
              <select
                className={`status status--${index}`}
                onChange={(e) => setStatuses(statuses.map((s, i) => i === index ? e.target.value : s))}
                value={statuses[index]}
              >
                <option>Новая</option>
                <option>На проверке</option>
                <option>Решена</option>
                <option>Отклонена</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UsersView() {
  const users = [
    ["ЕМ", "Елена Миронова", "elena@mail.ru", "Пользователь", "Активен"],
    ["МК", "Михаил Котов", "m.kotov@mail.ru", "Менеджер", "Активен"],
    ["АС", "Алексей Смирнов", "smirnov@mail.ru", "Пользователь", "Заблокирован"],
    ["ОВ", "Ольга Ветрова", "olga.v@mail.ru", "Пользователь", "Активен"],
    ["ИС", "Ирина Соколова", "sokolova@mail.ru", "Администратор", "Активен"],
  ];
  return (
    <section className="workspace">
      <div className="workspace-title">
        <div>
          <span className="section-kicker">№ 07 / Администрирование</span>
          <h1>Пользователи</h1>
          <p>Управление ролями, доступом и блокировками аккаунтов.</p>
        </div>
        <button className="primary-small"><Icon name="plus" size={16} /> Добавить</button>
      </div>
      <div className="data-card">
        <div className="table-tools">
          <div className="small-search"><Icon name="search" size={15} /><input placeholder="Имя, почта или ID" /></div>
          <button>Все роли <Icon name="chevron" size={13} /></button>
        </div>
        <div className="data-table users-table">
          <div className="table-row table-head"><span>Пользователь</span><span>Контакты</span><span>Роль</span><span>Статус</span><span /></div>
          {users.map((user, index) => (
            <div className="table-row" key={user[2]}>
              <div className="user-cell">
                <i>{user[0]}</i>
                <span><strong>{user[1]}</strong><small>ID {1820 + index}</small></span>
              </div>
              <span>{user[2]}</span>
              <select defaultValue={user[3]}>
                <option>Пользователь</option>
                <option>Менеджер</option>
                <option>Администратор</option>
              </select>
              <span className={user[4] === "Активен" ? "user-active" : "user-blocked"}>{user[4]}</span>
              <button className="more-button">•••</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapScreen({ initialRole, onLogout }: { initialRole: Role; onLogout: () => void }) {
  const [radius, setRadius] = useState(2);
  const [duration, setDuration] = useState("60 мин");
  const [mood, setMood] = useState<Mood>("calm");
  const [routeReady, setRouteReady] = useState(false);
  const role = initialRole;
  const [view, setView] = useState<View>(role === "user" ? "map" : "stats");
  const [notice, setNotice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<(typeof routeCards)[number] | null>(null);

  const moods: { id: Mood; label: string; icon: IconName }[] = [
    { id: "calm", label: "Спокойно", icon: "park" },
    { id: "explore", label: "Познавательно", icon: "landmark" },
    { id: "food", label: "Вкусно", icon: "coffee" },
  ];

  const metrics = routeMetrics[duration][mood];

  const searchResults = searchQuery.trim().length > 1
    ? routeCards.filter((route) => `${route.title} ${route.city}`.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const openSearchedRoute = (route: (typeof routeCards)[number]) => {
    setSelectedRoute(route);
    setSearchQuery(route.title);
    setRouteReady(true);
  };

  const buildRoute = () => {
    setRouteReady(false);
    window.setTimeout(() => setRouteReady(true), 40);
  };

  const chapters = [
    { num: "01", view: "map" as View },
    { num: "02", view: "routes" as View },
    { num: "03", view: "create" as View },
    { num: "04", view: "profile" as View },
  ];

  return (
    <main className={`map-screen ${view !== "map" ? "map-screen--workspace" : ""}`}>
      {view === "map" && (
        <>
          <header className="journal-top">
            <div className="journal-top__brand">Иду</div>
            <div className="journal-top__meta">№ 01 · Путевые очерки</div>
            <nav className="product-nav">
              {navigation[role].map((item) => (
                <button className={view === item.view ? "active" : ""} key={item.view} onClick={() => setView(item.view)}>
                  <Icon name={item.icon} size={14} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="journal-top__actions">
              <div className="signed-role-mini"><span>{role === "user" ? "A" : role === "manager" ? "M" : "AD"}</span><strong>{roleLabels[role]}</strong></div>
              <button aria-label="Выйти" onClick={onLogout}><Icon name="logout" size={16} /></button>
            </div>
          </header>

          <div className="journal-body">
            <aside className="journal-chapters">
              {chapters.map((c) => (
                <button className={`chapter ${view === c.view ? "active" : ""}`} key={c.num} onClick={() => setView(c.view)}>
                  <span className="chapter__num">{c.num}</span>
                  <span className="chapter__line" />
                </button>
              ))}
            </aside>

            <section className="journal-map">
              <div className="journal-map__top">
                <span>Схема · Литейная часть</span>
                <span>{radius} км радиус</span>
              </div>
              <div className="map-frame">
                <MapArtwork routeReady={routeReady} radius={radius} mood={mood} />

                <div className="map-search-float">
                  <div className="map-search-float__input">
                    <Icon name="search" size={15} />
                    <input
                      aria-label="Поиск маршрута или города"
                      onChange={(e) => { setSearchQuery(e.target.value); setSelectedRoute(null); }}
                      placeholder="Найти маршрут или город"
                      value={searchQuery}
                    />
                    {searchQuery && <button aria-label="Очистить поиск" onClick={() => { setSearchQuery(""); setSelectedRoute(null); }}>×</button>}
                  </div>
                  {searchQuery.trim().length > 1 && !selectedRoute && (
                    <div className="route-search__results">
                      <div className="search-results__heading"><span>Результаты</span><strong>{searchResults.length}</strong></div>
                      {searchResults.length > 0 ? searchResults.map((route) => (
                        <button key={route.title} onClick={() => openSearchedRoute(route)}>
                          <span className="search-result__map"><Icon name="route" size={15} /></span>
                          <span>
                            <strong>{route.title}</strong>
                            <small><Icon name="locate" size={11} />{route.city} · {route.time}</small>
                          </span>
                          <Icon name="arrow" size={15} />
                        </button>
                      )) : (
                        <div className="search-empty">
                          <Icon name="search" size={16} />
                          <span><strong>Не найдено</strong><small>Попробуйте другое название</small></span>
                        </div>
                      )}
                    </div>
                  )}
                  {selectedRoute && (
                    <div className="selected-route">
                      <div>
                        <span>{selectedRoute.city}</span>
                        <strong>{selectedRoute.title}</strong>
                        <small>{selectedRoute.distance} · {selectedRoute.time}</small>
                      </div>
                      <button onClick={() => setView("routes")}>Подробнее <Icon name="arrow" size={13} /></button>
                    </div>
                  )}
                </div>
              </div>
              <div className="journal-map__foot">
                <span>стр. 04 / карта</span>
                <span>Санкт-Петербург · 2025</span>
              </div>
            </section>

            <aside className="journal-notes">
              <div>
                <div className="journal-notes__kicker">№ 01 / Новая прогулка</div>
                <h2 className="journal-notes__title">Куда идём <em>сегодня</em>?</h2>
                <p className="journal-notes__lede">Настрой маршрут — найдём интересное рядом и соберём всё в удобном порядке.</p>
              </div>

              <div className="journal-notes__rule" />

              <div className="notes-block">
                <span className="notes-block__label">Настроение</span>
                <div className="notes-list">
                  {moods.map((m) => (
                    <button className={mood === m.id ? "active" : ""} key={m.id} onClick={() => { setMood(m.id); setRouteReady(false); }} type="button">
                      <Icon name={m.icon} size={16} />{m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="notes-block">
                <span className="notes-block__label">Сколько времени</span>
                <div className="notes-list">
                  {["30 мин", "60 мин", "1,5 часа", "2+ часа"].map((time) => (
                    <button className={duration === time ? "active" : ""} key={time} onClick={() => { setDuration(time); setRouteReady(false); }} type="button">
                      <Icon name="clock" size={14} />{time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="notes-block">
                <span className="notes-block__label">Радиус поиска</span>
                <div className="radius-readout">
                  <strong>{radius} км</strong>
                  <span>от вас</span>
                </div>
                <input className="radius-slider" max="5" min="1" step="1" type="range" value={radius} onChange={(e) => { setRadius(Number(e.target.value)); setRouteReady(false); }} />
                <div className="range-labels"><span>1 км</span><span>5 км</span></div>
              </div>

              <div className="notes-summary">
                <div><Icon name="walk" size={14} /><strong>{metrics.km}</strong>км</div>
                <div><Icon name="landmark" size={14} /><strong>{metrics.places}</strong>мест</div>
              </div>

              <button className={`build-cta ${routeReady ? "is-done" : ""}`} onClick={buildRoute} type="button">
                <span className="build-cta__dot" />
                {routeReady ? "Маршрут готов" : "Построить маршрут"}
                <Icon name={routeReady ? "check" : "arrow"} size={16} />
              </button>
              {routeReady && <p className="notes-success">Построена · {metrics.places} мест · {metrics.km} км</p>}
            </aside>
          </div>
        </>
      )}

      {view !== "map" && (
        <>
          <header className="journal-top">
            <div className="journal-top__brand">Иду</div>
            <div className="journal-top__meta">№ 02 · {roleLabels[role]}</div>
            <nav className="product-nav">
              {navigation[role].map((item) => (
                <button className={view === item.view ? "active" : ""} key={item.view} onClick={() => setView(item.view)}>
                  <Icon name={item.icon} size={14} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="journal-top__actions">
              <button aria-label="Выйти" onClick={onLogout}><Icon name="logout" size={16} /></button>
            </div>
          </header>

          {view === "routes" && <RoutesView onReport={(message) => { setNotice(message); window.setTimeout(() => setNotice(""), 3500); }} />}
          {view === "profile" && <ProfileView />}
          {view === "create" && <CreateView />}
          {view === "stats" && <StatsView role={role} />}
          {view === "reports" && <ReportsView />}
          {view === "users" && <UsersView />}
          {notice && <div className="toast"><Icon name="check" size={16} />{notice}</div>}
        </>
      )}
    </main>
  );
}

export default function App() {
  const [authorizedRole, setAuthorizedRole] = useState<Role | null>(null);
  return authorizedRole
    ? <MapScreen initialRole={authorizedRole} onLogout={() => setAuthorizedRole(null)} />
    : <AuthScreen onEnter={setAuthorizedRole} />;
}