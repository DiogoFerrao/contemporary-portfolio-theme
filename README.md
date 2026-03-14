# Contemporary Portfolio — A Minimal Portfolio Theme for Hugo

Contemporary Portfolio is a clean, white, minimalistic Hugo theme built for artists who want to showcase their work without distractions. Artists only need to edit a couple of simple files — the site handles layout, tiling, and responsiveness automatically.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
  - [Site Settings](#site-settings)
  - [Navigation Menu](#navigation-menu)
  - [Contact Information](#contact-information)
  - [Font Configuration](#font-configuration)
- [Adding Your Works](#adding-your-works)
  - [Creating a Work Page](#creating-a-work-page)
  - [Front Matter Reference](#front-matter-reference)
  - [Writing the Page Content](#writing-the-page-content)
  - [Adding Images](#adding-images)
- [Pages](#pages)
  - [Home Page (Works Grid)](#home-page-works-grid)
  - [Single Work Page](#single-work-page)
  - [Contacts Page](#contacts-page)
- [Customization](#customization)
  - [Changing Fonts](#changing-fonts)
  - [Adjusting the Grid](#adjusting-the-grid)
  - [Colors](#colors)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- **Minimalistic white design** — your art is the focus, not the website chrome.
- **Full-width masonry tiling** — the homepage grid stretches edge to edge with no side margins, giving maximum visual impact to your work.
- **Automatic masonry layout** — images are arranged dynamically based on their natural dimensions into up to 3 columns. No manual sizing needed.
- **Dedicated work pages** — each tile on the homepage links to its own page where you can write about the piece in Markdown, include process images, exhibition history, and anything else.
- **Responsive** — adapts from 3 columns on desktop down to 1 column on mobile.
- **Simple content-driven workflow** — each work is a Markdown file in `content/works/`. Add a file, drop in an image, and the homepage updates automatically.
- **Contacts page** — define your email, social links, location, and bio in the config file.
- **Configurable fonts** — set any font (including Google Fonts) directly from `hugo.toml` without touching CSS.
- **Zero JavaScript frameworks** — lightweight vanilla JS for the masonry layout only.
- **Hugo Pipes** — CSS and JS are minified and fingerprinted automatically.

---

## Prerequisites

- [Hugo Extended](https://gohugo.io/getting-started/installing/) v0.112.0 or later (the `extended` edition is recommended for asset processing)
- Git (optional, for version control)

Verify your installation:

```sh
hugo version
```

---

## Quick Start

1. **Clone or download this repository:**

   ```sh
   git clone https://github.com/DiogoFerrao/contemporary-portfolio-theme.git
   cd contemporary-portfolio-theme
   ```

2. **Add your images** to `static/images/works/`.

3. **Create work pages** in `content/works/` (see [Adding Your Works](#adding-your-works)).

4. **Edit `hugo.toml`** to set your name, tagline, and contact details.

5. **Run the development server:**

   ```sh
   hugo server -D
   ```

6. Open [http://localhost:1313](http://localhost:1313) in your browser.

---

## Project Structure

```
contemporary-portfolio-theme/
├── assets/
│   ├── css/
│   │   └── main.css              # All styles (edit to customize)
│   └── js/
│       └── masonry.js            # Automatic masonry layout engine
├── content/
│   ├── _index.md                 # Homepage content file
│   ├── contacts.md               # Contacts page (front matter only)
│   └── works/                    # ★ YOUR WORK PAGES — one .md per piece
│       ├── _index.md             # Section index
│       ├── untitled-1.md         # Example work
│       ├── untitled-2.md
│       └── ...
├── layouts/
│   ├── _default/
│   │   ├── baseof.html           # Base HTML shell
│   │   ├── contacts.html         # Contacts page template
│   │   ├── index.html            # Home page (masonry grid)
│   │   ├── single.html           # Default single page template
│   │   └── taxonomy.html         # Empty taxonomy template
│   ├── works/
│   │   ├── list.html             # Works section list (masonry grid)
│   │   └── single.html           # Single work page template
│   └── partials/
│       ├── header.html           # Site header & navigation
│       └── footer.html           # Site footer
├── static/
│   └── images/
│       └── works/                # ★ YOUR IMAGES — drop files here
├── hugo.toml                     # ★ SITE CONFIG — edit this file
└── README.md
```

Files marked with ★ are the ones you'll edit most often.

---

## Configuration

All site-wide settings live in `hugo.toml`.

### Site Settings

```toml
baseURL = "https://example.com/"
languageCode = "en-us"
title = "Artist Portfolio"

[params]
  artistName = "Your Name"
  tagline = "Visual Artist & Designer"
  description = "Portfolio of works by Your Name"
```

| Key                   | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `baseURL`             | Your live site URL (important for deployment)            |
| `title`               | Site title, used in the `<title>` tag                    |
| `params.artistName`   | Displayed in the header and footer                       |
| `params.tagline`      | A short subtitle (available for custom templates)        |
| `params.description`  | Default meta description for SEO                         |

### Navigation Menu

The main navigation is defined at the bottom of `hugo.toml`:

```toml
[[menus.main]]
  name = "Works"
  url = "/"
  weight = 1

[[menus.main]]
  name = "Contacts"
  url = "/contacts/"
  weight = 2
```

You can add more pages by creating new content files and adding menu entries. The `weight` field controls the display order (lower numbers appear first).

### Contact Information

```toml
[params.contacts]
  email = "hello@example.com"
  instagram = "https://instagram.com/yourhandle"
  behance = ""
  twitter = ""
  linkedin = ""
  website = ""
  location = "Lisbon, Portugal"
  bio = "A short biography about yourself and your artistic practice."
```

- **Leave a field empty (`""`)** to hide it from the contacts page. Only fields with values are displayed.
- All URL fields (instagram, behance, twitter, linkedin, website) should be full URLs including `https://`.

### Font Configuration

The theme ships with **Syne** (a font designed for the contemporary art world) as the default, loaded from Google Fonts. You can change the font entirely from `hugo.toml` — no CSS or HTML editing needed:

```toml
[params]
  fontFamily = '"Syne", "Helvetica Neue", Helvetica, Arial, sans-serif'
  fontURL = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap"
```

| Key              | Description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `fontFamily`     | CSS `font-family` value. Wrap font names with spaces in inner quotes.                       |
| `fontURL`        | URL to an external font stylesheet (e.g. Google Fonts). Leave empty (`""`) to skip loading. |

**Example — using a system font only:**

```toml
fontFamily = '"Georgia", "Times New Roman", serif'
fontURL = ""
```

**Example — using a different Google Font:**

```toml
fontFamily = '"Inter", sans-serif'
fontURL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap"
```

---

## Adding Your Works

Each work is a Markdown file in `content/works/`. This is the core workflow — one file per piece.

### Creating a Work Page

Create a new `.md` file in `content/works/`. For example, `content/works/sunset-series.md`:

```markdown
---
title: "Sunset Series No. 1"
image: "/images/works/sunset-01.jpg"
cover: "/images/works/sunset-01.jpg"
year: "2024"
medium: "Oil on canvas"
weight: 1
---

This piece captures the fleeting warmth of a late summer sunset over the Tagus.

## Process

The work began as a plein air sketch, later developed in the studio over several
sessions. Each layer of oil was allowed to dry fully before the next was applied.

## Dimensions

180 × 75 cm

![Detail of brushwork](/images/works/sunset-01-detail.jpg)

## Exhibition History

- *Solo Show*, Galeria da Rua, Lisbon, 2024
```

That's it. The homepage tile and the dedicated work page are both generated from this single file.

### Front Matter Reference

The front matter block (between the `---` lines) controls how the work appears:

| Field    | Required | Description                                                                                                                          |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `title`  | Yes      | Name of the work. Shown on the homepage tile overlay and as the page heading.                                                        |
| `image`  | Yes      | Path to the tile image, relative to `static/`. This is the homepage thumbnail.                                                       |
| `cover`  | No       | Path to a cover image shown at the top of the work page. Often the same as `image`, but can be a different crop or higher resolution. |
| `year`   | No       | Year the work was created. Shown as metadata on the work page.                                                                       |
| `medium` | No       | Medium or technique. Shown as metadata on the work page.                                                                             |
| `weight` | No       | Controls the order of tiles on the homepage. Lower numbers appear first.                                                             |

### Writing the Page Content

The body of the Markdown file (everything below the second `---`) is rendered as the work's page content. You can use the full range of Markdown:

- **Headings** (`## Section Title`) to organize your description
- **Paragraphs** of text describing the concept, process, or story behind the work
- **Images** (`![Alt text](/images/works/detail.jpg)`) to show details, process shots, or installation views
- **Lists** for materials, exhibition history, or technical notes
- **Blockquotes** (`> quoted text`) for artist statements or press quotes
- **Links** to external references, press coverage, or related projects
- **Horizontal rules** (`---`) to separate sections visually

All Markdown content is styled automatically by the theme.

### Adding Images

Drop your image files into `static/images/works/`:

```
static/
└── images/
    └── works/
        ├── sunset-01.jpg          ← tile + cover image
        ├── sunset-01-detail.jpg   ← extra image used in the page body
        ├── portrait-blue.jpg
        └── ...
```

**Image tips:**

- **Any aspect ratio works.** The masonry grid automatically adapts — tall, wide, square, panoramic images all tile correctly.
- **Recommended width:** 800–1200px for tile thumbnails. This balances quality with load speed.
- **Supported formats:** JPG, PNG, WebP, AVIF — anything the browser can render.
- **File size:** Aim for under 500KB per image. Use a tool like [Squoosh](https://squoosh.app/) to compress.
- **Process/detail images** referenced in the Markdown body can be any size. They will be displayed at full width within the constrained content column.

---

## Pages

### Home Page (Works Grid)

The home page (`/`) automatically reads all Markdown files from `content/works/` and renders a full-width masonry grid. Each tile links to that work's dedicated page.

**How the masonry works:**

1. Images are placed into columns (up to 3 on desktop, 2 on tablets, 1 on phones).
2. Each new image is placed in the shortest column, creating a balanced layout regardless of image dimensions.
3. The grid stretches edge to edge with generous spacing between tiles, giving the layout a gallery-wall feel.
4. On hover, tiles slightly zoom and (if a title is set) show an overlay with the work's title.
5. Clicking a tile navigates to the full work page.

**Ordering:** tiles are ordered by the `weight` front matter field (lowest first). If no weight is set, Hugo uses its default ordering (by date, then alphabetical).

### Single Work Page

Each work page (`/works/your-work-slug/`) shows:

1. A **"← Back to works"** link to return to the homepage
2. The work **title** as a large heading
3. **Metadata** (year and medium) if provided
4. A **cover image** if the `cover` front matter field is set
5. The full **Markdown content** — rendered with styled headings, paragraphs, images, lists, blockquotes, and more

The work page uses a constrained-width layout (max 900px) for comfortable reading, while images within the content span the full content width.

### Contacts Page

The contacts page (`/contacts/`) is driven entirely by `hugo.toml` — no content editing needed. The file at `content/contacts.md` exists only to tell Hugo to render the route with the correct layout.

---

## Customization

### Changing Fonts

The theme defaults to **Syne**, loaded via Google Fonts. To change it, just update two values in `hugo.toml`:

```toml
[params]
  fontFamily = '"Your Font Name", fallback-family, sans-serif'
  fontURL = "https://fonts.googleapis.com/css2?family=Your+Font+Name:wght@400;500;600&display=swap"
```

Set `fontURL = ""` if you're using a system/web-safe font that doesn't need an external stylesheet.

See [Font Configuration](#font-configuration) above for full details and examples.

### Adjusting the Grid

**Tile spacing** is controlled from `hugo.toml`:

```toml
[params]
  gridGap = 24
```

This sets the gap in pixels between tiles on the homepage masonry grid. Higher values give a more spacious, gallery-wall feel; lower values make the grid denser. The default is `24`.

**Column counts** are controlled in `assets/js/masonry.js` via the `getColumnCount` function:

```js
function getColumnCount(containerWidth) {
  if (containerWidth >= 900) return 3;
  if (containerWidth >= 480) return 2;
  return 1;
}
```

Adjust these pixel breakpoints or column counts to taste.

### Colors

The theme is intentionally white and minimal. Key color values in `assets/css/main.css`:

| Element           | CSS Property       | Default Value                    | Notes                              |
| ----------------- | ------------------ | -------------------------------- | ---------------------------------- |
| Background        | `background-color` | `#fff`                           | Pure white                         |
| Body text         | `color`            | `#222`                           | Near-black                         |
| Secondary text    | `color`            | `#444`                           | Contact details, descriptions      |
| Muted text        | `color`            | `#999`                           | Labels, metadata                   |
| Footer text       | `color`            | `#bbb`                           | Very light                         |
| Hover overlay     | `background`       | `rgba(0, 0, 0, 0.45)`           | Semi-transparent dark              |
| Nav underline     | `background-color` | `#222`                           | Appears on hover / active          |
| Content links     | `border-bottom`    | `1px solid #ccc`                 | Subtle underline, darkens on hover |

---

## Development

Run the Hugo development server with live reload:

```sh
hugo server -D --navigateToChanged
```

This will:
- Serve the site at `http://localhost:1313`
- Automatically rebuild when you change any file
- Navigate your browser to the changed page

### Adding a New Work

1. Create `content/works/my-new-piece.md`
2. Add the front matter (`title`, `image`, and optionally `cover`, `year`, `medium`, `weight`)
3. Write your Markdown content below the front matter
4. Drop the image(s) into `static/images/works/`
5. The homepage and work page appear automatically

### Adding New Page Types

1. Create a new content file in `content/` (e.g., `content/about.md`).
2. Set the `layout` in the front matter to point to a template.
3. Create the corresponding layout in `layouts/_default/`.
4. Add a menu entry in `hugo.toml`.

---

## Deployment

Build the production site:

```sh
hugo --minify
```

The generated site will be in the `public/` directory. Upload this folder to any static hosting provider:

- **Netlify** — connect your Git repo and set the build command to `hugo --minify`
- **Vercel** — same as Netlify
- **GitHub Pages** — use a GitHub Action to build and deploy
- **Any web server** — just upload the `public/` folder

---

## License

This theme is released under the [MIT License](LICENSE). Use it freely for personal and commercial projects.