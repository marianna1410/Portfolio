# Mobile Adaptation Rules

> **Джерело правди для Claude Code.**  
> Цей файл описує всі правила адаптації дизайн-токенів з desktop → mobile.  
> Усі desktop-значення витягнуті з Figma (Portfolio, node `472:16021`).  
> Стек: Astro + Vanilla CSS + CSS custom properties (`var(--token)`).

---

## Breakpoints

| Назва     | Умова              | Де використовується               |
|-----------|--------------------|-----------------------------------|
| `desktop` | `min-width: 1024px` | Базові значення токенів у `:root` |
| `mobile`  | `max-width: 767px`  | Override у `@media` блоці        |

> **Підхід:** Desktop-first. Базові значення у `:root`, мобільні — у `@media (max-width: 767px)`.

---

## Типографія

Шрифти проекту:
- **Inter Tight** — заголовки, body, label, caption
- **Fira Code** — mono-стилі

### Правила адаптації

| Токен                     | Сімейство    | Desktop size | Mobile size | Вага  | Line-height | Letter-spacing |
|---------------------------|--------------|:------------:|:-----------:|:-----:|:-----------:|:--------------:|
| `--font-h1`               | Inter Tight  | `48px`       | `32px`      | 500   | 1.1         | 0              |
| `--font-h2`               | Inter Tight  | `40px`       | `28px`      | 500   | 1.1         | 0.01em         |
| `--font-h3`               | Inter Tight  | `32px`       | `24px`      | 500   | 1.1         | 0.01em         |
| `--font-h4-medium`        | Inter Tight  | `24px`       | `20px`      | 500   | 1.1         | 0.02em         |
| `--font-h4-semibold`      | Inter Tight  | `24px`       | `20px`      | 600   | 1.1         | 0.01em         |
| `--font-headline-medium`  | Inter Tight  | `20px`       | `18px`      | 500   | 1.1         | 0.02em         |
| `--font-headline-semibold`| Inter Tight  | `20px`       | `18px`      | 600   | 1.1         | 0.02em         |
| `--font-body-lg-regular`  | Inter Tight  | `18px`       | `16px`      | 400   | 1.48        | 0.02em         |
| `--font-body-lg-semibold` | Inter Tight  | `18px`       | `16px`      | 600   | 1.4         | 0.02em         |
| `--font-body-md-regular`  | Inter Tight  | `16px`       | `15px`      | 400   | 1.48        | 0.02em         |
| `--font-label`            | Inter Tight  | `16px`       | `14px`      | 500   | 1.1         | 0.01em         |
| `--font-caption-regular`  | Inter Tight  | `14px`       | `14px`      | 400   | 1.2         | 0.02em         |
| `--font-caption-mono`     | Fira Code    | `14px`       | `14px`      | 400   | 1.4         | 0.01em         |
| `--font-body-mono-lg`     | Fira Code    | `20px`       | `16px`      | 400   | 1.4         | 0.01em         |

> **Правило:** Line-height та letter-spacing є відносними і **не змінюються** між desktop і mobile. Змінюється лише `font-size`.

### Приклад у CSS

```css
/* src/styles/tokens.css */

:root {
  --font-size-h1: 48px;
  --font-size-h2: 40px;
  --font-size-h3: 32px;
  --font-size-h4: 24px;
  --font-size-headline: 20px;
  --font-size-body-lg: 18px;
  --font-size-body-md: 16px;
  --font-size-label: 16px;
  --font-size-caption: 14px;
  --font-size-caption-mono: 14px;
  --font-size-body-mono-lg: 20px;
}

@media (max-width: 767px) {
  :root {
    --font-size-h1: 32px;
    --font-size-h2: 28px;
    --font-size-h3: 24px;
    --font-size-h4: 20px;
    --font-size-headline: 18px;
    --font-size-body-lg: 16px;
    --font-size-body-md: 15px;
    --font-size-label: 14px;
    --font-size-body-mono-lg: 16px;
    /* --font-size-caption та --font-size-caption-mono не змінюються (14px = 14px) */
  }
}
```

---

## Відступи — Stack (вертикальні, між елементами)

Stack — це вертикальна відстань між блоками/елементами в потоці (`margin-bottom`, `gap` у flex/grid по осі Y).

| Токен                  | Desktop | Mobile |
|------------------------|:-------:|:------:|
| `--space-stack-xs`     | `4px`   | `4px`  |
| `--space-stack-sm`     | `8px`   | `8px`  |
| `--space-stack-md`     | `12px`  | `8px`  |
| `--space-stack-lg`     | `16px`  | `12px` |
| `--space-stack-xl`     | `20px`  | `16px` |
| `--space-stack-2xl`    | `24px`  | `20px` |
| `--space-stack-3xl`    | `32px`  | `24px` |
| `--space-stack-5xl`    | `48px`  | `32px` |

### Приклад у CSS

```css
:root {
  --space-stack-xs: 4px;
  --space-stack-sm: 8px;
  --space-stack-md: 12px;
  --space-stack-lg: 16px;
  --space-stack-xl: 20px;
  --space-stack-2xl: 24px;
  --space-stack-3xl: 32px;
  --space-stack-5xl: 48px;
}

@media (max-width: 767px) {
  :root {
    --space-stack-xs: 4px;
    --space-stack-sm: 8px;
    --space-stack-md: 8px;
    --space-stack-lg: 12px;
    --space-stack-xl: 16px;
    --space-stack-2xl: 20px;
    --space-stack-3xl: 24px;
    --space-stack-5xl: 32px;
  }
}
```

---

## Відступи — Inline (горизонтальні, між елементами)

Inline — це горизонтальна відстань між елементами в рядку (`gap` у flex по осі X, `margin-right`/`margin-left`).

| Токен                   | Desktop | Mobile |
|-------------------------|:-------:|:------:|
| `--space-inline-sm`     | `8px`   | `8px`  |
| `--space-inline-md`     | `12px`  | `8px`  |
| `--space-inline-lg`     | `16px`  | `12px` |
| `--space-inline-xl`     | `20px`  | `16px` |
| `--space-inline-2xl`    | `24px`  | `20px` |
| `--space-inline-3xl`    | `32px`  | `24px` |
| `--space-inline-4xl`    | `40px`  | `32px` |
| `--space-inline-5xl`    | `48px`  | `40px` |
| `--space-inline-6xl`    | `64px`  | `48px` |

### Приклад у CSS

```css
:root {
  --space-inline-sm: 8px;
  --space-inline-md: 12px;
  --space-inline-lg: 16px;
  --space-inline-xl: 20px;
  --space-inline-2xl: 24px;
  --space-inline-3xl: 32px;
  --space-inline-4xl: 40px;
  --space-inline-5xl: 48px;
  --space-inline-6xl: 64px;
}

@media (max-width: 767px) {
  :root {
    --space-inline-sm: 8px;
    --space-inline-md: 8px;
    --space-inline-lg: 12px;
    --space-inline-xl: 16px;
    --space-inline-2xl: 20px;
    --space-inline-3xl: 24px;
    --space-inline-4xl: 32px;
    --space-inline-5xl: 40px;
    --space-inline-6xl: 48px;
  }
}
```

---

## Відступи — Inset (внутрішні відступи, padding)

Inset — це внутрішній відступ елемента з усіх боків (або по осях). Використовується для `padding` кнопок, карток, контейнерів.

| Токен                  | Desktop | Mobile |
|------------------------|:-------:|:------:|
| `--space-inset-xs`     | `4px`   | `4px`  |
| `--space-inset-sm`     | `8px`   | `8px`  |
| `--space-inset-md`     | `12px`  | `8px`  |
| `--space-inset-lg`     | `16px`  | `12px` |
| `--space-inset-xl`     | `20px`  | `16px` |
| `--space-inset-2xl`    | `24px`  | `20px` |

### Приклад у CSS

```css
:root {
  --space-inset-xs: 4px;
  --space-inset-sm: 8px;
  --space-inset-md: 12px;
  --space-inset-lg: 16px;
  --space-inset-xl: 20px;
  --space-inset-2xl: 24px;
}

@media (max-width: 767px) {
  :root {
    --space-inset-xs: 4px;
    --space-inset-sm: 8px;
    --space-inset-md: 8px;
    --space-inset-lg: 12px;
    --space-inset-xl: 16px;
    --space-inset-2xl: 20px;
  }
}
```

---

## Радіуси

| Токен               | Desktop  | Mobile   | Де застосовується                          |
|---------------------|:--------:|:--------:|-------------------------------------------|
| `--radius-m`        | `8px`    | `8px`    | Дрібні елементи: чіпи, input, badge       |
| `--radius-l`        | `12px`   | `8px`    | Картки, тултіпи, дропдауни                |
| `--radius-xl`       | `16px`   | `12px`   | Модальні вікна, великі картки             |
| `--radius-2xl`      | `20px`   | `16px`   | Hero-блоки, featured-секції               |
| `--radius-pill`     | `999px`  | `999px`  | Кнопки pill, теги — **не змінюється**     |

### Приклад у CSS

```css
:root {
  --radius-m: 8px;
  --radius-l: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-pill: 999px;
}

@media (max-width: 767px) {
  :root {
    --radius-m: 8px;
    --radius-l: 8px;
    --radius-xl: 12px;
    --radius-2xl: 16px;
    --radius-pill: 999px;
  }
}
```

---

## Макет сторінки — Page Margin

`--page-margin` — горизонтальний відступ від країв екрана до контентної зони. Застосовується до layout-обгортки або безпосередньо `padding-inline` контейнера.

| Токен             | Desktop             | Mobile  |
|-------------------|:-------------------:|:-------:|
| `--page-margin`   | визначається layout | `20px`  |

> **Правило:** На мобілці **завжди** `padding-inline: var(--page-margin)` на головному контейнері сторінки. Ніколи не використовуй `padding-left`/`padding-right` окремо — тільки `padding-inline`.

### Приклад у CSS

```css
/* src/styles/tokens.css */
:root {
  --page-margin: 40px; /* desktop — уточнити з layout у Figma */
}

@media (max-width: 767px) {
  :root {
    --page-margin: 20px;
  }
}

/* src/layouts/Layout.astro або головний контейнер */
.page-wrapper {
  padding-inline: var(--page-margin);
}
```

---

## Загальні правила адаптації для Claude Code

1. **Не дублюй значення, якщо desktop = mobile.** Якщо токен не змінюється (наприклад `--space-stack-xs: 4px`), не включай його в `@media` блок — це зменшує шум у коді.

2. **Desktop-first підхід.** Базові значення у `:root`, мобільні override — виключно у `@media (max-width: 767px)`.

3. **Шрифти: змінюється тільки `font-size`.** `font-family`, `font-weight`, `line-height`, `letter-spacing` залишаються незмінними між desktop і mobile.

4. **Spacing: малі значення не зменшуємо.** `xs` (4px) і `sm` (8px) — стабільні, не адаптуються. Адаптація починається з `md`.

5. **Radii: `--radius-m` та `--radius-pill` стабільні.** Зменшення починається з `--radius-l` і вище.

6. **Завжди використовуй `var(--token-name)`, ніколи hardcode-значення.** Навіть якщо значення збігається — використовуй токен.

7. **Глобальні токени — у `src/styles/tokens.css`.** Scoped-стилі всередині `.astro` компонентів не можуть містити визначення токенів, лише їх використання через `var(--token)`.

---

## Повний блок `tokens.css` (ready-to-use)

```css
/* src/styles/tokens.css */
/* Auto-adapted from Figma Portfolio tokens (node 472:16021) */

:root {
  /* ─── Typography ─── */
  --font-size-h1: 48px;
  --font-size-h2: 40px;
  --font-size-h3: 32px;
  --font-size-h4: 24px;
  --font-size-headline: 20px;
  --font-size-body-lg: 18px;
  --font-size-body-md: 16px;
  --font-size-label: 16px;
  --font-size-caption: 14px;
  --font-size-caption-mono: 14px;
  --font-size-body-mono-lg: 20px;

  /* ─── Stack (vertical spacing) ─── */
  --space-stack-xs: 4px;
  --space-stack-sm: 8px;
  --space-stack-md: 12px;
  --space-stack-lg: 16px;
  --space-stack-xl: 20px;
  --space-stack-2xl: 24px;
  --space-stack-3xl: 32px;
  --space-stack-5xl: 48px;

  /* ─── Inline (horizontal spacing) ─── */
  --space-inline-sm: 8px;
  --space-inline-md: 12px;
  --space-inline-lg: 16px;
  --space-inline-xl: 20px;
  --space-inline-2xl: 24px;
  --space-inline-3xl: 32px;
  --space-inline-4xl: 40px;
  --space-inline-5xl: 48px;
  --space-inline-6xl: 64px;

  /* ─── Inset (padding) ─── */
  --space-inset-xs: 4px;
  --space-inset-sm: 8px;
  --space-inset-md: 12px;
  --space-inset-lg: 16px;
  --space-inset-xl: 20px;
  --space-inset-2xl: 24px;

  /* ─── Radius ─── */
  --radius-m: 8px;
  --radius-l: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-pill: 999px;

  /* ─── Layout ─── */
  --page-margin: 40px; /* desktop — уточнити з layout у Figma */
}

@media (max-width: 767px) {
  :root {
    /* ─── Typography (mobile overrides) ─── */
    /* caption (14px) не змінюється — не включаємо в @media */
    --font-size-h1: 32px;
    --font-size-h2: 28px;
    --font-size-h3: 24px;
    --font-size-h4: 20px;
    --font-size-headline: 18px;
    --font-size-body-lg: 16px;
    --font-size-body-md: 15px;
    --font-size-label: 14px;
    --font-size-body-mono-lg: 16px;

    /* ─── Stack (mobile overrides) ─── */
    --space-stack-md: 8px;
    --space-stack-lg: 12px;
    --space-stack-xl: 16px;
    --space-stack-2xl: 20px;
    --space-stack-3xl: 24px;
    --space-stack-5xl: 32px;

    /* ─── Inline (mobile overrides) ─── */
    --space-inline-md: 8px;
    --space-inline-lg: 12px;
    --space-inline-xl: 16px;
    --space-inline-2xl: 20px;
    --space-inline-3xl: 24px;
    --space-inline-4xl: 32px;
    --space-inline-5xl: 40px;
    --space-inline-6xl: 48px;

    /* ─── Inset (mobile overrides) ─── */
    --space-inset-md: 8px;
    --space-inset-lg: 12px;
    --space-inset-xl: 16px;
    --space-inset-2xl: 20px;

    /* ─── Radius (mobile overrides) ─── */
    --radius-l: 8px;
    --radius-xl: 12px;
    --radius-2xl: 16px;

    /* ─── Layout (mobile overrides) ─── */
    --page-margin: 20px;
  }
}
```
