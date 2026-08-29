# Portfolio Redesign — Brief для Claude Code

> Головний файл-хендовер для редизайну портфоліо Marianna Delihioz.
> Описує **що змінити** і **в якому порядку**. Порядок робіт по сесіях — у сусідньому файлі `redesign-plan.md`.
>
> Стек: **Astro + GSAP**. Сайт уже існує і задеплоєний — це **редизайн наявного коду**, не білд з нуля.
> Змінюється переважно **головна сторінка** + **спільні компоненти** (хедер, футер, токени, UI kit). Кейси майже не чіпаються (спільна обгортка, головні зображення, теги, мобільний TOC).

---

## 0. Джерела правди

Figma-файл: `Portfolio`, fileKey `Md80hD9zZmtUsYs9ZLg8hM`.
Формат посилання: `https://www.figma.com/design/Md80hD9zZmtUsYs9ZLg8hM/Portfolio?node-id=<node>` (у node дефіс замість двокрапки).

| Що | node-id |
|----|---------|
| Нова головна (десктоп) `Home page_NEW` | `1120-46061` |
| UI Kit (усі компоненти) | `311-9266` |
| Кольори (мітки New/Changed/Deleted) | `1113-40233` |
| Радіуси | `311-9600` |
| Кейс Lucida — новий вигляд | `1126-51651` |

**Як читати дизайн:** кольори й радіуси наведені в цьому файлі — брати звідси. Розкладку/розміри секцій **не вгадувати** — для кожної секції нижче є node-id; відкривати саме той вузол через Figma MCP (`get_design_context` / `get_variable_defs`) і зчитувати макет напряму. Немає надійного джерела для значення — **спитати, не підставляти «на око»**.

Весь опис змін структуровано нижче в цьому файлі — окремих Figma-нотаток читати не треба.

---

## 1. Залізні правила

1. **Асети — з локальної папки, НЕ з Figma.** Якщо чогось бракує — **попросити додати або виписати список**, не тягнути з Figma CDN.
2. **Усі зображення — у високій якості.**
3. **Типографіку і відступи НЕ чіпати.** Не змінювались.
4. **Кожне число має джерело** — стиль/змінна Figma (нижче) або node-id секції.
5. **Не ламати те, що працює.** Тіло кейсів майже не змінюється.
6. **Мобілка/таблет — за файлом `mobile-adaptation` з репозиторію** (Claude Code знає, де він). У дизайні мобільні значення можуть бути неточні — пріоритет у `mobile-adaptation`.
7. **БЕЗ `prefers-reduced-motion`.** Свідоме рішення: анімації невеликі й повільні, окрему reduced-motion-логіку **не додавати** (і не «допомагати» нею автоматично).
8. Решта доступності (WCAG 2.2 AA — семантика, клавіатура, alt, контраст, focus) — за `accessibility.md`, **окрім** розділу reduced-motion, який не застосовуємо.
9. Старі spec-файли (`design-tokens.md`, `animations.md`, `interactions.md`, `accessibility.md`) — база, що досі чинна, крім місць, які цей бриф переписує.

---

## 2. Токени: КОЛЬОРИ (дельта)

Джерело: Color Styles, вузол `1113-40233`. Мітки проставлені автором. Одношарова семантична система.

### 🟢 ДОДАТИ (New)
| Токен | HEX |
|---|---|
| `background/dark elevated` | `#1D1D1D` |
| `background/deep black` | `#0F0F0F` |
| `background/under accent` | `#18242A` |
| `stroke/grey on dark` | `#737373` |
| `stroke/black on dark` | `#333333` |
| `text/light on dark` | `#E9E9E9` |
| `text/light grey on dark` | `#BBBBBB` |
| `text/grey muted on dark` | `#848484` |
| `overlay/40% black` | `#0F0F0F` (з opacity стилю) |
| `overlay/60% white` | `#FFFFFF` (з opacity) |
| `accent bold/accent blue` | `#93C9E2` |
| `accent bold/dark accent` | `#397D9C` |

### 🟡 ЗМІНИТИ (Changed)
| Токен | Нове HEX |
|---|---|
| `background/light grey` | `#F2F2F2` |
| `system/error` | `#D0311C` |
| `system/success` | `#238067` |
| `accent bold/green` | `#3EDA96` |

### 🔴 ВИДАЛИТИ (Deleted)
`label/blue #0778D5`, `accent bold/yellow #E8D849`, `accent bold/orange #E88949`, `accent bold/red #E85949`, `accent bold/blue #539FDD`, `accent light/yellow #FAF7DB`, `accent light/orange #FAE7DB`, `accent light/blue #DDECF8`.
> Спершу переконатись, що токен більше ніде не використовується. Якщо використовується — замінити, потім видаляти.

### ⚪ Без змін
`background/white #FFFFFF`, `grey muted #E5E5E5`, `black #252525`, `stroke/light #E9E9E9`, `stroke/medium grey #BBBBBB`, `stroke/dark grey #4A4A4A`, `text/white #FFFFFF`, `text/disabled #BBBBBB`, `text/grey muted #737373`, `text/dark grey #4A4A4A`, `text/black #252525`, `label/white #FFFFFF`, `label/dark grey #4A4A4A`, `overlay/20% black #000000`, `accent light/red #FFEFED`, `accent light/green #E6F5F0`.

**Суть:** палітра йде в темний бік (темні фони + «on dark» варіанти), різнокольорові bold-акценти прибрано, лишили зелений і додали синю пару.

---

## 3. Токени: РАДІУСИ (дельта)

Джерело `311-9600`. Додано **2 нових**, решта без змін.

| Токен | px | Статус |
|---|---|---|
| `radius-s` | 4 | без змін |
| `radius-m` | 8 | без змін |
| `radius-l` | 12 | без змін |
| `radius-xl` | 16 | без змін |
| `radius-2xl` | 20 | без змін |
| **`radius-3xl`** | **24** | 🟢 New |
| **`radius-4xl`** | **40** | 🟢 New |
| `radius-pill` | 999 | без змін |

CSS: додати `--radius-3xl: 24px;` і `--radius-4xl: 40px;`.

---

## 4. Компоненти UI Kit (нове / змінене)

| Компонент | node-id | Що робити |
|---|---|---|
| **Header/dark** | `1116-42413` | Темний хедер замінює світлий на всіх сторінках. Contact-кнопка інвертована (біла). **Не змінюється при скролі** (див. §6.7). |
| **dropdown menu** | `1116-44055` | Темний дропдаун Contact з copy-email (§8.4). |
| **Footer section** | `1126-52939` | Новий темний футер: Dribbble, copy-email, київський час, статична лінія+пташка (§6.6). |
| **Tag/on page** | `1120-47903` | Теги в кейсах (PROJECT OVERVIEW, Research, Problems, Solutions). |
| **Tag/banner** | `1125-48501` | Тег для Experience-банера. |
| **Tag/card** | `314-13428` | Теги на картках Works — **скруглення без змін** (стара пігулка). |
| **animated visual** | `1125-48916` | Візуал чату (Hero/Banner) — референс анімацій §8. |
| **TOC/mobile** | `1116-44339` | Мобільний TOC (фрейм `Mobile_TOC` `768-18976`). |
| **Logo** | `1116-43072` | Логотип (темний варіант `Logo_Dark.svg`). |
| **Image/case/dark** | `1128-53724` | Темні зображення кейсів. |
| **dot pattern_on black / on white** | `1117-44596` / `1117-44597` | Крапковий патерн — **референс**; у коді через CSS (§9.1). |
| **Button/Medium/Secondary** | `1116-43945` | Оновлений варіант вторинної кнопки. |
| **Card** | `505-7536`, `505-7599` | Перевірити фон/скруглення під новий стиль. |

Компоненти, які більше ніде не використовуються в коді, — можна видалити (у Figma-кіті лишаються для історії).

---

## 5. Асети

Зовнішня папка: `D:\Portfolio Development\Assets` (Icons / Images / Video по секціях).
**Правило:** нові асети редизайну мають суфікс **`_Dark` / `Dark`** (напр. `Main image_Lucida_Dark.png`, `Logo_Dark.svg`). Старі світлі версії автор лишила навмисно — у зовнішній папці не видаляти. Claude переносить **лише потрібні** файли в папку асетів проєкту.

- **Hero:** `Images/Hero section/` — `Avatar_Marianna.png`, `Logo_Dark.svg`, `Line connector for card.svg`, `Line curved_*.svg`, `Paper.svg`, `Sky background.png`, `Favicon.png`; `Icons/Icons 64 px/` (claude, figma, notion, slack, google calendar, gemini, clever, eye, flash, flower); `Icons/Icons 20 px/Ai sign.svg`.
- **Works:** `Images/Selected Works/` — `Lucida/Vaia, Default/Hover, Large, Dark.png`.
- **Experience:** `Images/Experince/` — `Baza icon.svg`, `Craft icon.svg`.
- **Banner:** `Images/Banner/` — `Gradient blue_bg.png`, `file illustratioon.svg`.
- **Behind the Screen:** `Images/Behind the Screen/` — `Player image.png`, `folder.svg`, `Fontan.png`, `Building.png`, `River.png`.
- **Footer:** `Images/Footer/` — `Logo in footer.svg`, `Line & Bird.svg`.
- **Кейси:** `Images/Case Lucida/`, `Images/Case Vaia/` — `Main image_*_Dark.png`, next-case `*, Small, Dark.png`, `Before/After`, `Problem`, `User's feedback`; `Video/Case *`.
- **UI-іконки:** `Icons/Icons 20 px/` — `Сopy.svg`, `Check.svg`, arrows/chevrons.

---

## 6. Зміни по секціях — ГОЛОВНА (`Home page_NEW` `1120-46061`)

### 6.1. Hero — `1116-39390` (перебудувати повністю)
Темний AI-workspace екран. Розкладка (звірити з вузлом):
- Тег `OPEN TO WORK`; слоган **«Designer Who Creates Digital Interfaces with UX in mind»** — «UX in mind» акцентним курсивом на плашці `accent blue`.
- **Ліва картка «AI Chat»** (іконка `Ai sign.svg`): текст-«промпт», внизу пігулка `Web Search` і кругла кнопка-стрілка (send).
- **Центральна картка-профіль:** аватар + «Marianna Delihioz / UX/UI Designer» (зелена крапка «онлайн»); нижче пункти із зеленими галочками — Experience / Domains / Strengths / Tools.
- **Права верхня картка «Source»** → кнопка **Download CV**.
- **Права нижня картка «Data accuracy»** → зелене кільце 100%.
- Пунктирні конектори між картками — SVG (`Line connector`, `Line curved_*`).
- Хедер тут темний (`Header/dark`). Крапковий фон — §9.1.
- **Кнопка Download CV** відкриває резюме в **новій вкладці**; URL — той самий, що вже працює на поточному сайті (§9.3).
- Анімація — §8.1. Мобілка/таблет — фрейм `Mobile hero+menu_New` `647-23550` + `mobile-adaptation`.

### 6.2. Works — `1120-45882`
Змінюється **тільки**:
- **Колір фону секції** (звірити з дизайном).
- **Зображення кейсів** → темні версії (`Selected Works/*Dark.png`); hover cross-fade лишається за старим правилом (`animations.md` 5.1).

**Без змін** (лишити як на старому сайті): скруглення пігулок-тегів у картках; **скруглення зображень кейсів = 12px** (`radius-l`).

### 6.3. Experience — `1120-47026`
- Змінено **тег зверху** і **текст досвіду першого місця роботи** (звірити з дизайном).
- **Прибрати** нижній блок «Skills acquired over time».
- Замість нього — новий **Banner** (§6.4).

### 6.4. Baner section — `1125-49033` (нове)
- Ліворуч: темна картка «Let's get one step closer to a long-term collaboration», пігулки-скіли, кнопка **Chat on Telegram**.
- Праворуч: синьо-градієнтна чат-картка — вхідне «Hello 👋 We have an open position on our design team.» + вкладення `UX-UI-Designer.pdf 4 MB` + відповідь-бульбашка «Great, I'm interested!» + інпут «Type something».
- Асети: `Banner/Gradient blue_bg.png`, `file illustratioon.svg`; тег `Tag/banner`.
- **Кнопка Chat on Telegram** → відкриває чат у Telegram у **новій вкладці**: `https://t.me/MariannaDeli` (`target="_blank" rel="noopener noreferrer"`).
- Анімація чату — §8.2. Мобілка — `Mobile_Banner CTA` `1136-22154`.

### 6.5. Behind the Screen — `1125-49034` (перебудувати)
Три картки:
1. **Ліворуч — біо** (моноширинний текст). Текст змінено **тільки в кінці** (звірити).
2. **Центр — Travelling:** заголовок «Traveling 2025» (тег «Romania»), фото розкриваються **віялом** і перемикаються кліком (стара механіка `animations.md` 7.1); нове фото `Fontan.png`. Нижче — **музичний плеєр** (`Player image.png`): «Yellow / Coldplay», прогрес-бар, контроли ⏮ ⏸ ⏭.
3. **Праворуч — левітуючі фолдери** (`folder.svg`): Final_111 / Final_222 / Final_123. **Декоративні** — лише левітують, не клікабельні, нікуди не ведуть.

**Прибрано повністю:** картка «Books / The latest books I've read» і картка Playground («That's it»). Не відтворювати.
Анімації — §8.3.

### 6.6. Footer section — `1126-52940` (перебудувати повністю)
- Темний футер. Посилання: LinkedIn, Telegram, **Dribbble → `https://dribbble.com/Delihioz`** (нове), Download CV (той самий URL, що Hero — §9.3).
- **Email копіюється при кліку** → «Copied» (`accent bold/green #3EDA96`) → через **3с** повертається (§8.4). Та сама механіка в дропдауні Contact.
- **Поточний час по Києву** (§9.2).
- Лінія з крапками + пташка — **статична картинка** (`Line & Bird.svg`), **без анімації**. Логотип — новий `Logo in footer.svg`.

---

## 7. Зміни в КЕЙСАХ (Lucida + Vaia)

Приклад — `Case study/Lucida_NEW` `1126-51651`; для Vaia дзеркально. Тіло кейсів (текст, структура) **не змінюється**. Змінюється лише:
1. **Головні зображення** → темні (`Main image_*_Dark.png`).
2. **Хедер і футер** → нові спільні компоненти (вже готові з сесії спільних компонентів).
3. **Картка «наступний кейс»** → темні зображення (`*, Small, Dark.png`).
4. **Теги** PROJECT OVERVIEW / Research / Problems / Solutions → `Tag/on page` `1120-47903`.
5. **Мобільний TOC** → новий (`Mobile_TOC` `768-18976`, `TOC/mobile` `1116-44339`).

Кнопки «Interact with prototype» та їхні URL — **без змін** (`interactions.md` 4.3).

---

## 8. Анімації

Базові easing/тривалості — з `animations.md`. **`prefers-reduced-motion` не реалізуємо** (§1.7). Нижче — покроково.

### 8.1. Hero — поява карток. Грає ОДИН раз: при першому заході і при hard-refresh. При поверненні з кейсу (внутрішня навігація Astro) **не повторюється**.
Порядок:
1. Стартовий стан: у картці **AI Chat** видно лише перше речення; **профіль**, **Source (Download CV)** і **Data accuracy** — у стані **skeleton loading**. Реф скелетона: 21st.dev `v-skeleton-8`.
2. У картці AI Chat **дописується друге речення** (typewriter, ~2–3с). Реф: 21st.dev `typewriter-text`.
3. Після завершення друку **кнопка-стрілка (send) в AI Chat натискається сама** → активний стан: біла кнопка, стрілка кольору `label/dark grey`.
4. На трьох картках skeleton змінюється **плавною появою контенту**. Картка **Data accuracy**: кільце «домальовується» + лічильник біжить **до 100%**.
5. Кнопка-стрілка стає **неактивною**.
- **Мобілка:** простіше — просто skeleton loading ~3с + Картка **Data accuracy**: кільце «домальовується» + лічильник біжить **до 100%**, без typewriter.

### 8.2. Banner — циклічна анімація чату (loop, пауза поза viewport)
Вхідне повідомлення «Hello 👋…» і `UX-UI-Designer.pdf` — **статичні** (контекст). Циклиться лише відповідь:
1. В інпуті друкується «Great, I'm interested!».
2. Натискається кнопка send (легке затемнення — ефект натиснення).
3. Текст з'являється **бульбашкою** відповіді.
4. Пауза 2–3с → повтор.
Реф: 21st.dev `chat-messages-2`.

### 8.3. Behind the Screen
- **Фото в плеєрі повільно крутиться** (loop).
- **Фолдери левітують** — м'яке плавання (як раніше анімовані іконки Hero на мобілці; якщо той підхід є в поточному коді — перевикористати відчуття).
- Тревел-фото **розкривається віялом** + перемикається кліком (`animations.md` 7.1).

### 8.4. Copy-email (футер + дропдаун)
Клік по Email → `navigator.clipboard.writeText(email)` → лейбл → **«Copied»** кольором `accent bold/green #3EDA96` → через **3с** повертається і знову доступний. Іконка — `Icons 20 px/Сopy.svg`. Додати `aria-live="polite"` для озвучення «Copied».

### 8.5. Переноситься зі старого без змін
Відкриття/закриття дропдауну Contact, active-стан TOC у кейсах, cross-fade зображень на hover карток — за `animations.md`. **НЕ переноситься:** стан хедера при скролі (хедер статичний, §6.7) і анімація пташки у футері (пташка статична, §6.6).

---

## 6.7. Хедер — поведінка при скролі
Хедер **не змінюється візуально при скролі**: лишається темним, **без появи обводки/тіні**, як на старому сайті. Стан «Scrolling» зі старого дизайну **не застосовуємо**. Sticky-позиція і z-index — за `interactions.md` 2.1.

---

## 9. Технічні рішення

1. **Крапковий фон Hero.** Малювати в коді через CSS `radial-gradient` + `background-size` (або крихітний inline-SVG `pattern`). Не експортувати PNG. Колір/крок звірити з референсом `1117-44596`.
2. **Київський час у футері.** Без бекенду: `Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Kyiv', hour: 'numeric', minute: '2-digit', hour12: true })` (у дизайні формат 12-годинний, напр. «4:38 PM»), оновлювати щохвилини `setInterval`.
3. **CV / Resume URL.** Використати **той самий URL, що вже працює на поточному сайті** (це і є актуальне CV) — не плейсхолдер, не змінювати. Один URL на два місця: кнопка Download CV в Hero і Download CV у футері (винести в спільну змінну конфіга).
4. **Dribbble** — окреме соц-посилання `https://dribbble.com/Delihioz` (не CV).

---

## 10. Definition of Done (перед merge у прод)

- [ ] Токени оновлено (кольори New/Changed/Deleted; радіуси +2). Видалені токени ніде не вживаються.
- [ ] Типографіку/відступи не змінено.
- [ ] Спільні компоненти (Header/dark, dropdown, Footer, Logo, теги) оновлені й застосовані на всіх сторінках.
- [ ] Головна: усі секції відповідають `Home page_NEW`, асети — темні версії з папки.
- [ ] Works: змінено лише фон + темні зображення; скруглення тегів і 12px на зображеннях **не чіпали**.
- [ ] Behind the Screen: bio + Travelling(плеєр) + фолдери; Books і Playground прибрані.
- [ ] Кейси: головні зображення, next-case, теги, мобільний TOC оновлені; тіло не зачеплене.
- [ ] Анімації 8.1–8.4 працюють; хедер статичний; пташка статична; **reduced-motion не додавали**.
- [ ] Chat on Telegram → `t.me/MariannaDeli`; copy-email повертається через 3с; київський час коректний.
- [ ] CV URL — робочий (той самий, що на старому сайті); Dribbble додано.
- [ ] Мобілка/таблет — за `mobile-adaptation`; тач-цілі ≥44px; pinch-zoom не заблоковано.
- [ ] Доступність (крім reduced-motion) за `accessibility.md`: Lighthouse a11y, axe, клавіатура/скрін-рідер.
- [ ] Крос-браузер (Chrome, Safari, Firefox; десктоп + iOS).
