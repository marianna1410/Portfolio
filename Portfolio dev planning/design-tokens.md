# Design Tokens Specification — Marianna Portfolio

Цей файл описує **систему дизайн-токенів** проєкту: звідки беруться значення, як вони мапляться в CSS, які токени додаємо вручну (бо їх немає в Figma). Інші spec-файли посилаються сюди (`--color-bg-primary`, `--space-md`, `--duration-fast` тощо).

**Кінцева ціль:** файл `src/styles/tokens.css` із CSS custom properties, які підключаються в `:root` і використовуються всюди в проєкті.

---

## 0. Джерела токенів і стратегія

У Figma-файлі проєкту різні типи токенів зберігаються в різних місцях. Не все, що повертає MCP — це справжні токени проєкту: частина Variables прийшла з імпортованих template-бібліотек. Чітко розділяємо, **що брати, а що ігнорувати**.

### Звідки беремо токени

**З Figma Styles (це справжні токени проєкту):**

| Тип            | Джерело              | Як забираємо                                         |
|----------------|----------------------|------------------------------------------------------|
| Кольори        | **Color Styles**     | MCP `get_variable_defs` або інспекція компонентів    |
| Типографіка    | **Text Styles**      | Інспекція через `get_design_context` (унікальні комбінації font-параметрів) |
| Тіні           | **Effect Styles**    | Інспекція реальних елементів (картки, дропдаун, header у Scrolling-стані) |

**З Figma Variables (це справжні токени проєкту):**

| Тип            | Колекція в Figma             | Кількість | Як забираємо                                                            |
|----------------|------------------------------|-----------|-------------------------------------------------------------------------|
| Простір        | **semantic.dimension**       | 33        | MCP `get_variable_defs` → розкладаються на `inset/stack/inline` групи  |
| Радіуси        | **primitives.radius**        | 6         | MCP `get_variable_defs`                                                 |

**Що ігноруємо у Variables:**

- **primitives.dimension** (13 змінних) — це сира shelf-палета, на яку посилається `semantic.dimension`. У CSS ми її не виносимо — токенами вважаємо тільки семантичну надбудову.
- Інші Variables-колекції, які не перелічені вище (sizes, etc., якщо є) — це залишки template-бібліотек. Ігнорувати.

**Non-Figma токени** (брейкпоінти, animation tokens, z-index, container) → описуються тут (розділ 3).

### Як Claude поводиться при генерації

1. Спочатку **витягує всі Color Styles, Text Styles, Effect Styles, semantic.dimension, primitives.radius** через MCP.
2. Переводить їх імена у kebab-case CSS-змінні (розділ 1).
3. **Показує тобі шкалу** перед записом у `tokens.css` — особливо для типографіки і тіней, бо їх будує з інспекції (не з готового переліку).
4. Записує `src/styles/tokens.css` тільки після твого підтвердження.

---

## 1. Naming convention для CSS-змінних

### 1.1. Загальні правила

- **kebab-case** (тільки нижній регістр, дефіси між словами).
- **Префікс `--`** (CSS custom property syntax).
- **Структура:** `--{category}-{subcategory}-{variant}`.

### 1.2. Категорії

| Категорія      | Префікс            | Приклади                              |
|----------------|--------------------|----------------------------------------|
| Кольори        | `--color-`         | `--color-bg-primary`, `--color-text-secondary` |
| Простір        | `--space-`         | `--space-md`, `--space-2xl`            |
| Радіуси        | `--radius-`        | `--radius-md`, `--radius-pill`         |
| Шрифти         | `--font-`          | `--font-body`, `--font-mono`           |
| Розміри тексту | `--font-size-`     | `--font-size-h1`, `--font-size-body`   |
| Висота рядка   | `--line-height-`   | `--line-height-tight`, `--line-height-base` |
| Вага шрифта    | `--font-weight-`   | `--font-weight-medium`, `--font-weight-semibold` |
| Тіні           | `--shadow-`        | `--shadow-sm`, `--shadow-md`           |
| Брейкпоінти    | `--breakpoint-`    | `--breakpoint-mobile`                  |
| Тривалості     | `--duration-`      | `--duration-fast`                      |
| Easing         | `--ease-`          | `--ease-out`                           |
| Z-index        | `--z-`             | `--z-header`, `--z-dropdown`           |
| Container      | `--container-`     | `--container-max-width`                |

### 1.3. Переклад Figma → CSS — патерн

Figma часто використовує слеш `/` як роздільник (`Background/white`, `space/inset/md`). У CSS — заміняємо на дефіс:

| Figma                       | CSS-змінна                |
|-----------------------------|---------------------------|
| `Background/white`          | `--color-bg-white`        |
| `Text/black`                | `--color-text-black`      |
| `space/inset/md`            | `--space-inset-md`        |
| `Radius/radius-l`           | `--radius-l`              |
| `H1` (Text Style)           | (декомпозиція — див. 2.2) |

### 1.4. Кейс і спецсимволи

- Усе в нижній регістр (`Background` → `background`).
- Пробіли замінюємо на дефіси (`grey muted` → `grey-muted`).
- Виправляти типові помилки (`Background/balck` → `--color-bg-black`, `Accent colos` → `--color-accent`).

---

## 2. Категорії токенів — детально

### 2.1. Кольори

**Джерело:** Figma **Color Styles** (єдине офіційне джерело правди). Не використовувати Variables, які прийшли з імпортованих бібліотек.

**Підкатегорії, які я бачу в твоєму файлі:**

- **Background** (фони): white, light grey, grey muted, black, primary, primary inverse, surface, branding, accent bold, positive bold, etc.
- **Text** (текст): white, black, dark grey, grey muted, secondary, tertiary, primary inverse, positive
- **Label** (написи на елементах): dark grey, blue
- **Stroke** (обводки): medium grey, dark grey, light
- **Neutral** (нейтральна шкала): grey-100, grey-200
- **Accent** (акцентні): blue-500, branding blue, bold/red, yellow-500
- **System colors**: error, success
- **Glyphs** (іконки): Primary - Idle

**Семантична організація — це фіча, не баг.**

Кольори типу `Text/dark grey`, `Stroke/dark grey`, `Label/dark grey` мають однаковий hex (#4A4A4A), але це **не дублікати**. Це **семантичні алиаси**, кожен прив'язаний до власного контексту використання (текст / обводка / лейбли). Якщо завтра треба зробити текст темнішим, а обводки лишити сірими — змінюєш тільки `Text/dark grey`. Це правильна організація — лишаємо як є.

Те саме стосується інших схожих груп: `Stroke/medium grey` (#BBBBBB) і `Neutral/grey-100` (#BBBBBB) — обидва існують, бо мають різні семантичні ролі (обводки vs нейтральна шкала). Лишаємо обидва.

**Що варто перевірити в Figma (можливі справжні дублікати):**

| Можливі справжні дублікати                                       | Hex      | Дія                                                              |
|------------------------------------------------------------------|----------|-------------------------------------------------------------------|
| `Background/white` + `background/primary` (різні регістри!)      | #FFFFFF  | Перевірити в Variables panel: якщо `background/primary` справді існує і несе той самий сенс, що `Background/white` — об'єднати в один. |
| `Yellow/yellow-500` + `background/accent bold`                   | #E39B23  | Якщо це палітний жовтий + семантичний акцент — це двошарова система (палета + alias), лишай. Якщо просто збіг — об'єднай. |

**Підхід до системи токенів — одношарова семантична.**

Для портфоліо (3 сторінки, без темної теми) використовуємо **одношарову семантичну** систему — кожен токен напряму містить hex без проміжного "raw palette" шару. Простіше, читабельніше для цього масштабу. Якщо в майбутньому з'явиться темна тема — додамо палітний шар тоді.

```css
:root {
  --color-text-primary: #252525;
  --color-text-secondary: #4A4A4A;
  --color-bg-primary: #FFFFFF;
  --color-accent: #E39B23;
}

/* у коді */
.heading { color: var(--color-text-primary); }
```

### 2.2. Типографіка

**Джерела:**
- Шрифтові файли (`assets/fonts/`) — `Inter Tight` (основний), `Fira Code` (моно). Підтвердити, що це справді шрифти твого дизайну, інспектуючи текстові елементи в Figma.
- **Реальні текстові елементи в дизайні** (а не Text Styles із Variables — їх ігноруємо). Claude через `get_design_context` дивиться на конкретні `<text>` ноди (заголовок Hero, підзаголовки секцій, body-тексти у кейсах) і зчитує `fontFamily`, `fontWeight`, `fontSize`, `lineHeight`, `letterSpacing`.

**Робочий процес:**

Claude складає список **унікальних комбінацій** font-параметрів, які бачить у дизайні. Наприклад:
- Inter Tight Medium 48px → це Hero h1
- Inter Tight Medium 40px → секційний заголовок (h2)
- Inter Tight Medium 32px → підзаголовок (h3)
- Inter Tight Regular 18px → body large
- Inter Tight Regular 16px → body medium
- Inter Tight Regular 14px → caption / меню

Із цього списку Claude пропонує токени і **показує тобі для підтвердження** перед записом у `tokens.css`.

**Декомпозиція кожної унікальної комбінації → CSS-токени:**

Наприклад, Hero h1 (Inter Tight Medium 48 / line-height 1.1 / letter-spacing 0) розкладається на:
```css
--font-family-body: 'Inter Tight', sans-serif;
--font-family-mono: 'Fira Code', monospace;

--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;

--font-size-h1: 48px;       /* мобілка матиме інше — див. fluid typography нижче */
--font-size-h2: 40px;
--font-size-h3: 32px;
--font-size-h4: 24px;
--font-size-headline: 20px;
--font-size-body-large: 18px;
--font-size-body-medium: 16px;
--font-size-label: 16px;
--font-size-caption: 14px;

--line-height-tight: 1.1;   /* для заголовків */
--line-height-base: 1.48;   /* для body */
--line-height-loose: 1.4;   /* для mono caption і semibold body */
--line-height-snug: 1.2;    /* для caption regular */

--letter-spacing-tight: 0;
--letter-spacing-normal: 1px;
--letter-spacing-wide: 2px;
```

**Fluid typography з `clamp()`:**

На мобілці (375px) заголовки мають бути меншими, ніж на десктопі (1440px). Використовуємо `clamp(min, fluid, max)`, де `fluid` залежить від `vw`.

Приклад для H1:
- Mobile (375px design): ~36px
- Desktop (1440px design): 48px (як у Figma)
- Formula: `clamp(2.25rem, 2rem + 1.5vw, 3rem)`

Робочий патерн на всі заголовки — згенерувати під час імплементації, спираючись на конкретні значення з Figma для мобільної версії (якщо їх немає, екстраполювати: ~ -30% від десктопного розміру).

**Утилітарні класи (опційно):**

Можна винести в `tokens.css` готові utility-класи:
```css
.text-h1 {
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-h1);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
```
Тоді в коді — `<h1 class="text-h1">` замість 5 окремих CSS-правил у кожному компоненті.

### 2.3. Простір (spacing)

**Джерело:** Figma Variables, колекція **semantic.dimension** (33 змінних). Витягуємо через MCP `get_variable_defs`.

Семантична система розбита на три ролі:

- **inset** — внутрішні padding'и (всередині елемента: кнопки, картки, секції).
- **stack** — вертикальні відступи між елементами (gap у колонці, margin-top між блоками).
- **inline** — горизонтальні відступи між елементами (gap у рядку, margin-right між іконкою і текстом).

**Чому це краще за єдину шкалу:**
Той самий розмір (наприклад, 16px) має різну семантику залежно від ролі. Якщо завтра треба буде ущільнити вертикальні ритми, але залишити padding'и в кнопках — змінюємо `--space-stack-md`, не чіпаючи `--space-inset-md`. Це твоя готова система — лишаємо.

**Mapping Figma → CSS:**

```css
/* Inset — внутрішні padding'и */
--space-inset-xs: ...;
--space-inset-sm: ...;
--space-inset-md: ...;
--space-inset-lg: ...;
--space-inset-xl: ...;
/* (і далі — стільки рівнів, скільки реально є в semantic.dimension) */

/* Stack — вертикальні відступи */
--space-stack-xs: ...;
--space-stack-sm: ...;
--space-stack-md: ...;
--space-stack-lg: ...;
--space-stack-xl: ...;
--space-stack-2xl: ...;
--space-stack-3xl: ...;
--space-stack-4xl: ...;
--space-stack-5xl: ...;

/* Inline — горизонтальні відступи */
--space-inline-xs: ...;
--space-inline-sm: ...;
--space-inline-md: ...;
--space-inline-lg: ...;
--space-inline-xl: ...;
--space-inline-2xl: ...;
--space-inline-3xl: ...;
--space-inline-4xl: ...;
--space-inline-5xl: ...;
--space-inline-6xl: ...;
```

Точну кількість рівнів і значення Claude визначає при витягуванні `semantic.dimension` через MCP. Імена в CSS — kebab-case-калька з Figma (`semantic/dimension/inset/md` → `--space-inset-md`).

**Як використовувати в CSS:**

```css
.button {
  padding: var(--space-inset-md);    /* внутрішній padding */
}

.section {
  margin-top: var(--space-stack-3xl); /* вертикальний відступ між секціями */
}

.icon-text {
  display: flex;
  gap: var(--space-inline-sm);        /* горизонтальний gap */
}
```

### 2.4. Радіуси

**Джерело:** Figma Variables, колекція **primitives.radius** (6 змінних). Витягуємо через MCP `get_variable_defs`.

**Mapping Figma → CSS:**

```css
--radius-m: 8px;
--radius-l: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-pill: 999px;
/* + ще один рівень, який лежить у primitives.radius */
```

Точні значення Claude витягує з Figma — список вище є орієнтиром, заснованим на типових розмірах. Імена в CSS — kebab-case-калька з Figma (`primitives/radius/radius-l` → `--radius-l`).

**Як використовувати:**

```css
.card {
  border-radius: var(--radius-l);
}

.button {
  border-radius: var(--radius-pill);
}
```

### 2.5. Тіні

**Джерело:** Figma **Effect Styles**, які реально застосовані до елементів у дизайні (якщо вони не з template-бібліотеки). Claude інспектує конкретні елементи (картки, дропдаун, header у Scrolling-стані) і витягує `effects`-масив.

Якщо в дизайні використовуються 1–2 типи тіней — Claude винесе їх як токени:
```css
--shadow-card: /* реальне значення з картки кейсу */;
--shadow-dropdown: /* реальне значення з відкритого дропдауну */;
--shadow-header: /* реальне значення з header у Scrolling-стані */;
```

Якщо всі ці тіні насправді однакові (`var(--shadow-default)` для всього) — об'єднати.

Claude **показує тобі список тіней і їх використання** перед записом — щоб ти підтвердила, де яка тінь.

### 2.6. Розміри (size)

Окремої шкали "size" у твоєму проєкті немає. Розміри іконок та UI-елементів беремо з тієї ж spacing-шкали (наприклад, іконка 24×24 — `width: var(--space-inline-lg)` якщо цей токен = 24px). Окремих `--size-*` токенів **не вводимо**.

Якщо при імплементації виявиться, що іконки/UI-елементи мають свої унікальні розміри, які не вкладаються в spacing-шкалу — обговорити перед введенням нових токенів.

---

## 3. Non-Figma токени (визначаємо тут)

### 3.1. Брейкпоінти

Дизайнерські фрейми у Figma: **1440 (desktop reference), 768 (tablet), 375 (mobile)**.

CSS-стратегія — **mobile-first**:

```css
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1280px;

/* Default styles (без @media) — мобільні (target 375px) */

@media (min-width: 768px) {
  /* Tablet+ (target 768px design) */
}

@media (min-width: 1280px) {
  /* Desktop (target 1440px design) */
}
```

**Чому desktop-брейкпоінт 1280, а не 1440:**
Дизайн у Figma зроблений на фреймі 1440px, але користувачі зі стандартними ноутами 1280–1366px мають побачити саме desktop-версію. Якщо поставити брейкпоінт 1440 — вони побачать tablet-стилі (контент стиснутий, виглядатиме незавершено). 1280 покриває все, починаючи від популярних ноутів.

**Поведінка на екранах ≥ 1280px (включно з 1440, 1920, 2560, 4K):**

Контент **не розтягується** разом з viewport. Він зупиняється на `--container-max-width` (1280px), а на ширших екранах збільшуються поля по бокам.

```
[1920px екран]
┌──────────────────────────────────────────────────────┐
│  margin   │   content 1280px        │   margin       │
│   ~320px  │                         │   ~320px       │
└──────────────────────────────────────────────────────┘
```

```
[1280px екран]
┌────────────────────────────────────────────┐
│  pad │   content 1280px - padding   │ pad │
│ 64px │                              │ 64px│
└────────────────────────────────────────────┘
```

Реалізація через `.container` з `max-width` і `margin-inline: auto` (див. 3.4).

Якщо в майбутньому захочеться, щоб на ультрашироких екранах (≥ 1920px) контент теж розширювався — додати окремий брейкпоінт `--breakpoint-ultrawide: 1920px` і збільшити max-width. Для портфоліо це поки не потрібно.

**JS-константи** для GSAP ScrollSmoother detection і подібного:
```js
const BREAKPOINTS = { tablet: 768, desktop: 1280 };
```

### 3.2. Animation tokens

Джерело правди — `animations.md` (0.3, 0.4). Тут — їх CSS-форма для імпорту в `tokens.css`:

```css
/* Easing curves */
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0.0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-linear: linear;

/* Durations */
--duration-instant: 100ms;
--duration-fast: 150ms;
--duration-medium: 250ms;
--duration-slow: 400ms;
--duration-stack-swap: 500ms;
--duration-fan-out: 800ms;
--duration-orbit: 18s;  /* підкрутити в процесі: 15-20s */
```

### 3.3. Z-index scale

Без чіткої системи z-index'и стають кошмаром. Використовуємо шкалу:

```css
--z-base: 1;
--z-elevated: 10;       /* картки на hover, легке "піднесення" */
--z-sticky: 50;         /* sticky-елементи (TOC) */
--z-header: 100;        /* fixed header */
--z-dropdown: 200;      /* Contact-дропдаун */
--z-overlay: 500;       /* можливі модалки/lightbox */
--z-skip-link: 9999;    /* skip-link при focus */
```

**Правило:** ніколи не використовувати magic numbers типу `z-index: 99` або `z-index: 1000` — завжди через токен.

### 3.4. Container

Максимальна ширина контентної області:
```css
--container-max-width: 1280px;
--container-padding-mobile: 20px;
--container-padding-tablet: 32px;
--container-padding-desktop: 64px;
```

`--container-max-width: 1280px` (а не 1440) — щоб на широких екранах був "повітря" по краях. Якщо в дизайні Figma фрейм 1440px з контентом до самого краю — підправити це значення в код під реальний дизайн.

### 3.5. Глобальні правила (не токени, але корисно мати поряд)

```css
/* Layout */
--max-content-width: 65ch;  /* для текстових абзаців — оптимальна ширина читання */
```

---

## 4. Як Claude генерує `tokens.css`

**Промпт для Claude Code:**

> Створи файл `src/styles/tokens.css` за такою стратегією:
>
> **Кольори (Color Styles):**
> 1. Витягни Figma **Color Styles** через MCP (`get_variable_defs` або інспекція компонентів).
> 2. Переклади імена за naming convention з розділу 1 (`Background/white` → `--color-bg-white`).
>
> **Простір (semantic.dimension Variables):**
> 3. Витягни через MCP всю колекцію `semantic.dimension` (33 змінних, групи `inset/stack/inline`).
> 4. Перенеси у CSS зі збереженням ролі і рівня (`semantic/dimension/inset/md` → `--space-inset-md`, `semantic/dimension/stack/3xl` → `--space-stack-3xl` і т.д.).
> 5. **Ігноруй колекцію `primitives.dimension`** — це сира shelf-палета, її в CSS не виносимо.
>
> **Радіуси (primitives.radius Variables):**
> 6. Витягни через MCP всю колекцію `primitives.radius` (6 змінних).
> 7. Перенеси у CSS зі збереженням імен (`primitives/radius/radius-l` → `--radius-l`).
>
> **Типографіка (Text Styles + інспекція):**
> 8. Витягни Figma **Text Styles** через MCP.
> 9. Якщо Text Styles не повертають усі рівні — додатково інспектуй реальні `<text>` ноди на головній і обох кейсах через `get_design_context`, збери унікальні комбінації font-параметрів.
> 10. Запропонуй шкалу (`--font-size-*`, `--line-height-*`, `--font-weight-*`, `--letter-spacing-*`) — **покажи мені для підтвердження** перед записом.
>
> **Тіні (Effect Styles):**
> 11. Витягни Figma **Effect Styles** через MCP. Інспектуй реальні елементи (картки, дропдаун, header у Scrolling-стані), щоб зрозуміти, де яка тінь застосована.
> 12. Запропонуй токени (`--shadow-card`, `--shadow-dropdown`, etc.) — **покажи мені для підтвердження** перед записом.
>
> **Non-Figma токени:**
> 13. Додай токени з розділу 3 цього файлу (брейкпоінти 768/1280, animation tokens із `animations.md`, z-index scale, container widths).
>
> **Структура файлу:**
> 14. Усі токени всередині `:root { }`.
> 15. Структуруй по секціях у такому порядку: Colors → Typography → Spacing → Radii → Shadows → Breakpoints → Animation → Z-index → Container.
> 16. Коментарі-розділювачі між секціями.
> 17. У кінці файлу — короткий guide-коментар: "Always use tokens. No magic numbers. No inline hex values."

---

## 5. Правила використання токенів у CSS

### 5.1. Завжди використовувати токени, ніколи magic numbers

- ❌ `padding: 16px;`
- ✅ `padding: var(--space-inset-lg);`

- ❌ `color: #4A4A4A;`
- ✅ `color: var(--color-text-secondary);`

### 5.2. Не модифікувати кольори через alpha / opacity

- ❌ `color: rgba(0, 0, 0, 0.6);` (псує контраст, верифікований дизайнером)
- ✅ Якщо потрібен напівпрозорий — створити окремий токен `--color-text-muted` із потрібним значенням.

### 5.3. Семантичні токени мають пріоритет над палітними

- ❌ `background: var(--color-grey-100);`
- ✅ `background: var(--color-bg-surface);`

Виняток: коли справді потрібна сира палета (наприклад, у графіках чи декоративних SVG).

### 5.4. Якщо потрібного токена немає

**Не вигадувати на льоту.** Спершу:
1. Перевірити Figma — можливо, токен є, але названий інакше.
2. Перевірити `design-tokens.md` — можливо, в категорії non-Figma токенів.
3. Якщо справді немає — обговорити, додавати чи ні.

Не вводити `--color-some-special-blue: #4D8FFE;` на льоту посеред компонента — це фрагментує систему.

---

## 6. TODO / на уточнення

- [ ] **Перевірити в Figma:** чи справді є `background/primary` (з малої) поряд із `Background/white`. Якщо так — об'єднати або підтвердити, що це різні семантичні токени.
- [ ] **Перевірити в Figma:** чи `Yellow/yellow-500` і `background/accent bold` — це два різних семантичних токени (палета + alias) чи випадковий збіг. Якщо випадковий збіг — об'єднати.
- [ ] **Fluid typography** (розділ 2.2) — конкретні значення `clamp()` для кожного рівня заголовка, коли будемо ставити мобільну версію (потрібні дані з Figma мобільних фреймів, або екстраполяція ~30% від десктопу).
- [ ] **Тіні Paper elevated vs Small elements** — узгодити при імплементації, які елементи яку тінь використовують (припускаю: Paper elevated для карток, Small elements для дропдауну/header у Scrolling-стані).
