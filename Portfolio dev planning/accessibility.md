# Accessibility Specification — Marianna Portfolio

Цей файл описує **правила доступності**: семантика HTML, клавіатурна навігація, focus-стани, ARIA-атрибути, скрін-рідери, контраст, reduced motion, alt-тексти. Поведінкова логіка — у `interactions.md`. Анімаційні параметри — у `animations.md`. Цей файл доповнює обидва.

Цільовий стандарт: **WCAG 2.2 рівня AA**. Це сучасний baseline для portfolio-сайтів.

---

## 0. Загальні принципи

### 0.1. Семантика — спершу, ARIA — потім

Базове правило WAI-ARIA: **No ARIA is better than bad ARIA.** Спочатку обирати правильний семантичний HTML-елемент, і тільки якщо такого немає — додавати ARIA. Наприклад:
- Не `<div onclick>`, а `<button>` для дій.
- Не `<div role="navigation">`, а `<nav>`.
- Не `<span class="heading">`, а `<h1>–<h6>` правильної ієрархії.

ARIA додається там, де семантика не покриває потрібну поведінку (наприклад, `aria-expanded` для дропдауну, `aria-current` для активного пункту TOC).

### 0.2. Клавіатура = миша

Усі дії, які можна зробити мишею, мають бути доступні з клавіатури. Якщо щось працює тільки на hover або тільки на click без `tabindex` — це баг доступності.

### 0.3. Reduced motion поважається завжди

Будь-яка анімація, описана у `animations.md`, має fallback для `prefers-reduced-motion: reduce`. Деталі — у розділі 6.

### 0.4. Тестування — частина процесу

Не "перевірю в кінці", а перевіряємо після кожної завершеної секції: клавіатурою, скрін-рідером, Lighthouse-аудитом. Чек-лист — у розділі 11.

---

## 1. Семантика і landmarks

### 1.1. Скелет сторінки

Кожна сторінка має такий скелет:
```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <header><!-- лого, навігація, Contact-кнопка --></header>
  <main id="main"><!-- основний контент --></main>
  <footer><!-- CTA, посилання --></footer>
</body>
```

- `<header>` → ARIA-роль `banner` (нативна, без атрибута).
- `<main>` → ARIA-роль `main` (нативна). На сторінці лише один.
- `<footer>` → ARIA-роль `contentinfo` (нативна).
- Skip-link — перший фокусований елемент на сторінці, прихований візуально до моменту фокусу.

### 1.2. Навігація

Меню в header:
```html
<nav aria-label="Main">
  <ul>
    <li><a href="#works">Works</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#about">About</a></li>
  </ul>
</nav>
```

`aria-label="Main"` — щоб скрін-рідер міг розрізнити кілька `<nav>` на сторінці.

Якщо у footer теж є навігація — `aria-label="Footer"`.

### 1.3. Секції

Кожна секція — це `<section>` із `<h2>` всередині. Якщо секція не має видимого заголовка — додати прихований через `.sr-only`:
```html
<section>
  <h2 class="sr-only">Selected Works</h2>
  <!-- картки -->
</section>
```

### 1.4. Ієрархія заголовків

Один `<h1>` на сторінці. На головній — це назва-слоган у Hero ("Designer Who Creates Digital Experiences for Humans"). На кейсовій — заголовок кейсу.

Далі `<h2>` для назв секцій (Selected Works, Experience, Behind the Screen, Problem, Solution тощо).

Глибше — `<h3>` для підрозділів (Problem 1, Solution 1, кожна компанія в Experience, кожна картка в Behind the Screen).

**Не пропускати рівні.** Не йти від `<h2>` одразу до `<h4>`.

### 1.5. Утиліти

Клас `.sr-only` (screen-reader only) — стандартна реалізація:
```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

Використовується для прихованих заголовків секцій, лейблів іконкових кнопок.

---

## 2. Клавіатурна навігація

### 2.1. Tab-порядок

Tab проходить по інтерактивних елементах **у візуальному порядку зверху вниз, зліва направо**. Якщо CSS переставляє візуально (наприклад, через `flex-direction: row-reverse`) — Tab-порядок все одно має слідувати HTML-порядку. Це означає: уникати CSS-перетасовки, яка ламає логічний потік.

### 2.2. Усі інтерактивні елементи фокусуються

- `<a>`, `<button>`, `<input>` — фокусуються нативно.
- Кастомні (`<div>` із поведінкою кнопки) — заборонені. Використовувати справжні `<button>`.
- Travelling-картка (клік перемикає стек) — це `<button>` із прозорим фоном, не `<div>`. ARIA-label: "Show next photo" (або українською — узгодити мову інтерфейсу).

### 2.3. Skip-link

Перший елемент після `<body>`, що дає змогу пропустити навігацію і перейти прямо до контенту. Видимий лише при фокусі (Tab з самого початку):
```html
<a href="#main" class="skip-link">Skip to main content</a>
```
```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 8px;
}
.skip-link:focus {
  left: 8px;
  z-index: 9999;
}
```

### 2.4. Esc-поведінка

`Esc` закриває:
- Дропдаун Contact в header.
- (Майбутні модалки, якщо з'являться.)

### 2.5. Клавіатура в Contact-дропдауні

Описано в `interactions.md` 2.3. ARIA-частина:
- Кнопка-тригер: `aria-haspopup="menu"`, `aria-expanded="true|false"` (динамічно).
- Меню всередині: `role="menu"`.
- Пункти: `role="menuitem"`.
- При відкритті — фокус автоматично на перший пункт.
- Стрілки вверх/вниз — навігація між пунктами (JS-логіка).
- Enter / Space — активує пункт.
- Esc — закриває і повертає фокус на кнопку-тригер.

### 2.6. Travelling stack

- Це `<button>` із `aria-label="Show next travelling photo"`.
- Enter / Space — перемикає на наступну картку (як клік).
- Сама поточна картка — статичне зображення з `alt`.

### 2.7. Smooth scroll з клавіатури

Коли користувач Tab'ом доходить до пункту меню і тисне Enter — скрол має спрацювати так само, як при кліку (через ScrollSmoother). Це нативна поведінка `<a href="#works">` + наш JS-обробник.

---

## 3. Focus management

### 3.1. Тільки `:focus-visible`, не `:focus`

Focus-стилі застосовуються через **`:focus-visible`**, не `:focus`. Це показує обводку лише при клавіатурній навігації, а не при кліку мишею (де вона зайва).

```css
button:focus { outline: none; }
button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### 3.2. Стилі focus — з Figma

Як вказано в `animations.md` (9.1, 10.4):
- Стани focus вже описані в Figma для кнопок і посилань.
- Беремо звідти точні значення (товщина, колір, offset).
- Без декоративних анімацій — статичний стан.

### 3.3. Ніколи не прибирати focus

**Не використовувати** `outline: none;` без заміни. Якщо дефолтна обводка не подобається — замінити на власну, але не залишати елемент без жодного focus-індикатора.

### 3.4. Контраст focus-обводки

Focus-обводка повинна мати контраст щонайменше **3:1** із сусідніми елементами (фоном і власне елементом). Перевірити на дизайн-етапі.

### 3.5. Focus у дропдауні

При відкритті Contact-дропдауну:
- Фокус автоматично переходить на перший пункт меню.
- При закритті (через Esc або клік на пункт) — фокус повертається на кнопку-тригер.
- Focus-trap всередині дропдауну поки відкритий: Tab не виходить за межі дропдауну, поки він відкритий.

### 3.6. Focus при переходах між сторінками

Після переходу на нову сторінку через клік (наприклад, з картки кейсу на сторінку кейсу) — фокус переноситься на `<main>` нової сторінки. Astro з View Transitions це робить автоматично, але перевірити.

---

## 4. Скрін-рідери та ARIA

### 4.1. Меню навігації

```html
<nav aria-label="Main">
  <ul>
    <li><a href="#works">Works</a></li>
    ...
  </ul>
</nav>
```

Активний пункт не реалізуємо (за рішенням в `interactions.md`), тому `aria-current` не використовується для меню.

### 4.2. Contact dropdown

```html
<button
  aria-haspopup="menu"
  aria-expanded="false"
  aria-controls="contact-menu"
>
  Contact
</button>
<ul id="contact-menu" role="menu" hidden>
  <li role="none"><a role="menuitem" href="...">LinkedIn</a></li>
  <li role="none"><a role="menuitem" href="...">Telegram</a></li>
  <li role="none"><a role="menuitem" href="mailto:...">Email</a></li>
</ul>
```

При відкритті — `aria-expanded="true"` і `hidden` знімається.

### 4.3. Table of Contents

Active-стан реалізуємо (за рішенням в `interactions.md` 4.2):

```html
<nav aria-label="On this page">
  <ul>
    <li><a href="#project-overview">Project Overview</a></li>
    <li><a href="#research">Research</a></li>
    <li><a href="#problem-1" aria-current="location">Problem</a></li>
    <li><a href="#solution-1">Solution</a></li>
    <li><a href="#summary">Summary</a></li>
  </ul>
</nav>
```

`aria-current="location"` додається до активного пункту через JS, коли відповідна секція у viewport.

### 4.4. Зовнішні посилання (нова вкладка)

Скрін-рідер має озвучити, що посилання відкриється в новій вкладці. **Підхід через `<span class="sr-only">` — обов'язковий для всіх зовнішніх посилань на сайті:**

```html
<a href="https://linkedin.com/..." target="_blank" rel="noopener noreferrer">
  LinkedIn
  <svg aria-hidden="true" focusable="false"><!-- ↗ icon --></svg>
  <span class="sr-only">(opens in new tab)</span>
</a>
```

Іконка ↗ візуально показує "нова вкладка" зрячим, `<span class="sr-only">` робить те саме для скрін-рідерів. Тримати цей патерн послідовно по всьому сайту — header dropdown, footer, prototype buttons, де б не з'являлися зовнішні посилання.

### 4.5. Mailto-посилання

```html
<a href="mailto:mariannadelihioz@gmail.com" aria-label="Email Marianna (opens mail client)">
  Email
</a>
```

### 4.6. Іконкові кнопки

Якщо є кнопка тільки з іконкою (наприклад, "Х" для закриття) — обов'язково `aria-label`:
```html
<button aria-label="Close dropdown">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>
```

### 4.7. Контентні іконки vs декоративні

- **Декоративна іконка** (Hero icons, dotted arrow у footer-лінії, dot-pattern усередині стрілок кнопок): `aria-hidden="true"` + `focusable="false"`. Скрін-рідер ігнорує.
- **Контентна іконка** (несе сенс, наприклад статус): має текстовий еквівалент через `aria-label` або `<span class="sr-only">`.

### 4.8. Декоративні елементи

- Hero icons (Notion, Claude, Figma тощо) → **декоративні**. У `<svg>` — `aria-hidden="true"`. Скрін-рідер їх не озвучує.
- Footer dotted line + bird → **декоративні**. Уся SVG-група має `aria-hidden="true"`. Скрін-рідер прочитає тільки тексти "Ready to start building?" і "Let's get in touch", без згадки про стрілку.
- Decorative checkboxes у Books → `aria-hidden="true"` на чекбоксі, alt-тексти на текстах книг лишаються.

### 4.9. Карточки кейсів і Next case

Карточка — це `<a>`, у якій ім'я доступне нативно через текст:
```html
<a href="/cases/lucida" class="card">
  <img src="..." alt="Lucida AI case study cover">
  <h3>Bringing structure and confidence to speaking practice...</h3>
  <p>UX Audit · Competitive analysis · ...</p>
</a>
```

Не потрібен додатковий `aria-label` — назва кейсу вже в `<h3>` всередині `<a>`. Уся картка стає одним посиланням з зрозумілим іменем.

---

## 5. Контраст і кольори

Контрастність усіх пар колір-фон **перевірена на етапі дизайну** і дотримується WCAG AA. Завдання Claude під час розробки — точно дотримуватись токенів кольорів з `design-tokens.md` без власних модифікацій (затемнення / прозорість через alpha-канал тощо). Якщо потрібна нова пара кольорів, якої немає в токенах — спершу узгодити, не вводити "на око".

Disabled-стани з Figma можуть бути нижчого контрасту (WCAG це дозволяє) — лишати як у дизайні, не "виправляти".

---

## 6. Reduced motion — детально

Користувач має `prefers-reduced-motion: reduce`. Поведінка для кожної анімації:

### 6.1. ScrollSmoother (1.1)
**Off.** Не ініціалізується взагалі. Стандартний браузерний скрол. Smooth scroll з меню/TOC — миттєвий стрибок до якоря.

### 6.2. Page transitions (1.2)
**Off.** Без fade — миттєвий перехід (Astro View Transitions має нативну підтримку reduced motion, але перевірити).

### 6.3. Header Default↔Scrolling (2.1)
**Skipped.** Стан змінюється миттєво без transition.

### 6.4. Dropdown opening/closing (3.1, 3.2)
**Skipped.** Дропдаун з'являється/зникає миттєво. Іконка стрілки повертається миттєво.

### 6.5. Orbital motion (4.1)
**Off.** Іконки лишаються статичними у своїх стартових позиціях. Hover-scale (4.2) — теж миттєвий.

### 6.6. Card hover (5.1)
**Skipped (image swap миттєвий, без cross-fade).** Зображення міняється одразу при hover.

### 6.7. Travelling fan-out (7.1)
**Off.** Картки відразу у своїх фінальних позиціях, без розкладання.

### 6.8. Travelling click-swap (7.1)
**Дозволено в спрощеному вигляді.** Сам перехід картки в кінець стеку — миттєвий (без 500ms animation). Це не декор, а інформативна зміна — користувач має побачити, що дія спрацювала. Без анімації — просто оновлюємо z-index і позицію миттєво.

### 6.9. TOC active-state transition (8.2)
**Skipped.** Стан змінюється миттєво.

### 6.10. Buttons arrow dots (9.2)
**Off.** Крапки залишаються в default opacity 0.6 без анімації. Зміна кольору фону / обводки — теж миттєва (без 150ms transition).

### 6.11. Footer пташка (11.1)
**Off.** Уся група (лінія + пташка) статична. Жодного стрепенення.

### 6.12. Загальне CSS-правило

У `tokens.css` додати глобальний override:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Це baseline. Конкретні анімації, які треба повністю відмикати (ScrollSmoother, orbital, пташка) — відмикаються через JS-перевірку `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.

---

## 7. Зображення і медіа

### 7.1. Alt-тексти — правила

- **Декоративне зображення** (без сенсу для контексту): `alt=""` (порожній alt, не відсутній!).
- **Зображення з сенсом**: коротке точне описання — "що на картинці і чому це важливо в цьому контексті".
- **Зображення у заголовку посилання**: alt має описувати **куди веде посилання**, не "що на картинці".

### 7.2. Alt для карток кейсів (Works, Next case)

Картка веде на сторінку кейсу. Alt описує **кейс**, не зображення:
```html
<a href="/cases/lucida">
  <img src="..." alt="Lucida AI case study cover">
  ...
</a>
```

Краще: alt описує саме зображення + контекст:
```html
<img src="..." alt="Mockup of Lucida AI mobile app showing vocabulary training screen">
```

Уникати "Image of...", "Picture of..." — це шум для скрін-рідерів.

### 7.3. Hero іконки (Notion, Claude, Figma, тощо)

Декоративні → `alt=""` (для `<img>`) або `aria-hidden="true"` (для `<svg>`).

### 7.4. Resume card на Hero

Якщо це візуальний прев'ю CV з ім'ям/посадою:
```html
<img src="..." alt="Marianna Delihioz, designer — profile preview">
```

Або, якщо це декоративний елемент із текстом усередині (текст рендериться як HTML, не як частина зображення):
```html
<img src="..." alt="" aria-hidden="true">
<!-- текст -->
```

### 7.5. Travelling-картки

Кожне фото має описовий alt:
```html
<img src="..." alt="Glass reflection self-portrait at an airport departure gate">
<img src="..." alt="On the slopes in the Swiss Alps">
```

Це не декор — це історія блоку. Скрін-рідер має пройти всі alt-тексти при tab'і на стек.

### 7.6. Books чекбокси

Книжкові обкладинки відсутні — тільки текст. Чекбокси — декор:
```html
<div class="book-item">
  <span aria-hidden="true" class="checkmark"></span>
  <span>Predictably Irrational</span>
</div>
```

### 7.7. Кейсові зображення (всередині кейсу)

Скріншоти мокапів, схеми, графіки — кожен зі своїм alt, що описує, **що показано і чому**:
```html
<img src="..." alt="Wireframe showing the redesigned vocabulary review screen with progressive recall tasks">
```

### 7.8. Iconography (стрілки ↗ на лінках)

Декор — `aria-hidden="true"` на SVG. Сенс ("нова вкладка") передається через `<span class="sr-only">(opens in new tab)</span>` (див. 4.4).

### 7.9. Footer dotted line + bird

Декор: уся SVG-група має `aria-hidden="true"`. Скрін-рідер прочитає текстову частину ("Ready to start building? Let's get in touch") і знайде окремі посилання — їх достатньо.

---

## 8. Тач- і мобільна доступність

### 8.1. Розмір тач-цілей

Усі клікабельні елементи мають **мінімум 44×44 px** для тачу (WCAG 2.2 Success Criterion 2.5.5 Target Size — рівень AA з 2023).

Це стосується:
- Пунктів меню в header (на мобілці меню прихована, але кнопка Contact лишається)
- Пунктів дропдауну
- Кнопок (Open Resume, Interact with prototype)
- Іконкових кнопок (якщо з'являться)
- Travelling top card (тач-зона = вся видима частина картки)
- Footer-посилань

Якщо візуально елемент менший — додати невидимий padding, який збільшує тач-зону до 44px без зміни видимих стилів.

### 8.2. Hover-залежні дії — заборонено

Те, що працює тільки на hover мишею, **має альтернативу для тачу**. У нас:
- Card hover image swap (5.1) → на тачі немає, фінальне зображення = default. Не блокуючий момент.
- Hero icons hover-scale → на тачі немає; це декор, не блокує.

Але **інтеракції** (Travelling stack swap) — клік/тап, не hover. Це правильно.

### 8.3. Pinch-zoom не блокувати

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
**Без** `maximum-scale=1` чи `user-scalable=no`. Користувач має можливість зумити.

---

## 9. Зум і resize

### 9.1. Підтримка зуму 200%

Сторінка має лишатись використовною при браузерному зумі 200%. Текст не обрізається, контент не накладається, горизонтальної прокрутки не з'являється (окрім випадків, де вона свідома).

Тестування: відкрити сайт у Chrome, Ctrl + кілька разів, перевірити що:
- меню працює (на десктопі при зумі)
- кнопки доступні
- картки кейсів читаються
- footer не ламається

### 9.2. Текст не у фіксованих px-розмірах

Використовувати `rem` для text-size (через `clamp()` як описано в плані). Це робить так, що користувач може збільшити шрифт у налаштуваннях браузера.

```css
font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
```

---

## 10. Astro і a11y

### 10.1. Astro перевіряє a11y у dev-режимі

Astro у dev-режимі підсвічує деякі a11y-помилки (відсутній alt, неправильна структура заголовків тощо). Не ігнорувати ці warnings.

### 10.2. View Transitions і скрін-рідери

`<ViewTransitions />` повинен:
- після переходу — переносити фокус на `<main>` нової сторінки
- оновлювати `<title>` сторінки (Astro робить це автоматично, але перевірити)

### 10.3. Lang атрибут

Сайт англійською:
```html
<html lang="en">
```

Усі `aria-label`, `<span class="sr-only">` і інші скрін-рідер-тексти теж англійською ("opens in new tab", "Email Marianna (opens mail client)", "Show next photo" тощо) — щоб був консистентний голос для скрін-рідера.

---

## 11. Чек-лист тестування

Проходити після кожної завершеної секції:

### 11.1. Клавіатура
- [ ] Tab проходить усі інтерактивні елементи у логічному порядку
- [ ] Усі focus-стилі видимі (з Figma) і контрастні
- [ ] Skip-link з'являється на першому Tab
- [ ] Esc закриває Contact-дропдаун
- [ ] Дропдаун відкривається/закривається Enter і Space
- [ ] Стрілки вверх/вниз навігують у дропдауні
- [ ] Travelling stack перемикається з Enter / Space
- [ ] Прототип-кнопки відкриваються Enter (нову вкладку)

### 11.2. Скрін-рідер (тестувати в NVDA на Windows або VoiceOver на macOS)
- [ ] Заголовки сторінки читаються в логічному порядку
- [ ] Меню анонсується як "Main navigation"
- [ ] Кожен пункт меню має ім'я
- [ ] Contact-дропдаун анонсує "expanded/collapsed"
- [ ] Зовнішні посилання згадують "opens in new tab"
- [ ] Mailto згадує "opens mail client"
- [ ] Декоративні елементи (Hero icons, bird) НЕ озвучуються
- [ ] Картки кейсів читаються як одне посилання з зрозумілим іменем
- [ ] TOC active-стан анонсується як "current page" або "current location"

### 11.3. Reduced motion
- [ ] Увімкнути у системних налаштуваннях (macOS: System Settings → Accessibility → Display → Reduce motion; Windows: Settings → Ease of Access → Display → Show animations)
- [ ] Перевірити: ScrollSmoother off, orbital static, dropdown миттєвий, картки fan-out не розкладаються, пташка статична, кнопки без crawl на крапках

### 11.4. Зум і контраст
- [ ] Зум 200% — контент читається, нічого не обрізано
- [ ] WebAIM Contrast Checker — усі text/background пари ≥ 4.5:1 (≥ 3:1 для великого тексту і UI)
- [ ] Focus-обводка має контраст ≥ 3:1

### 11.5. Тач і мобілка
- [ ] Усі тач-цілі ≥ 44×44 px
- [ ] Pinch-zoom працює (не заблокований у meta viewport)
- [ ] Travelling stack перемикається тапом
- [ ] Contact-дропдаун відкривається/закривається тапом

### 11.6. Автоматичне тестування
- [ ] **Lighthouse Accessibility audit** (Chrome DevTools): ≥ 95 балів
- [ ] **axe DevTools** (плагін Chrome): 0 серйозних помилок
- [ ] **WAVE** (https://wave.webaim.org/): пройти кожну сторінку

Автоматичні інструменти ловлять ~30% проблем — решта тільки ручним тестуванням.

### 11.7. Браузери
- [ ] Chrome (десктоп + мобілка)
- [ ] Safari (десктоп + iOS)
- [ ] Firefox (опційно, але бажано)

---

## 12. Що НЕ в скоупі (свідомі рішення)

- **Форми** — на сайті немає (контакт через прямі посилання). Якщо з'являться — додати окремий розділ про labels, error messages, fieldset/legend.
- **Auth / login** — немає, не стосується.
- **Auto-playing audio або video** — немає. Якщо колись додаси відео — обов'язково з контролями, без autoplay зі звуком.
- **Live regions** (`aria-live`) — поки не потрібні (немає динамічних повідомлень типу "form submitted").
- **Захист від CAPTCHA-доступності** — немає капчі.
- **i18n-перемикач мови** — поки одна мова.

---

## 13. TODO / на уточнення

- [ ] **Alt-тексти для конкретних зображень**: написати при імплементації, спираючись на контекст кейсу (кожен скріншот / макет / фото має свій унікальний alt).
- [ ] **Lighthouse + axe** запустити на тестовому деплої — підкрутити, якщо щось знайдеться.
