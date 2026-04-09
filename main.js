/**
 * Portfolio entries — add or edit objects here to update the grid.
 * tagType: "owned" | "software" | "affiliated"
 * status: optional string, e.g. "Coming soon"
 * href: use "#" for placeholders; external URLs open in a new tab when not placeholder
 */
const PORTFOLIO = [
  {
    name: "Crowned K9s",
    tagType: "owned",
    tagLabel: "Owned by HNDSHK",
    description:
      "Professional dog training built around calm behavior, leadership, and real-world obedience.",
    href: "https://crownedk9s.com",
    layout: "wide",
  },
  {
    name: "Kraave",
    tagType: "software",
    tagLabel: "HNDSHK Software",
    description: "A software product within the HNDSHK portfolio.",
    href: "https://kraave.io",
    status: null,
    layout: "narrow",
  },
  {
    name: "VetYourVets",
    tagType: "software",
    tagLabel: "HNDSHK Software",
    description: "A future software platform being developed under HNDSHK.",
    href: null,
    status: "Coming soon",
    layout: "narrow",
  },
  {
    name: "MyFantasyFund",
    tagType: "software",
    tagLabel: "HNDSHK Software",
    description: "A software application in the HNDSHK portfolio.",
    href: "https://myfantasyfund.com",
    status: null,
    layout: "narrow",
  },
  {
    name: "Lands Automotive Group",
    tagType: "affiliated",
    tagLabel: "Affiliated · Operated by HNDSHK",
    description:
      "A dealership website operated and maintained through HNDSHK.",
    href: "https://lands-automotive.com",
    layout: "narrow",
  },
];

const THEME_KEY = "hndshk-theme";

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  applyTheme(getPreferredTheme());
  const toggle = document.getElementById("theme-toggle");
  toggle?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

function tagClass(tagType) {
  const map = {
    owned: "portfolio-card__tag--owned",
    software: "portfolio-card__tag--software",
    affiliated: "portfolio-card__tag--affiliated",
  };
  return map[tagType] || "portfolio-card__tag--software";
}

function isExternalHref(href) {
  return /^https?:\/\//i.test(href);
}

function cardClasses(item) {
  const classes = ["portfolio-card"];
  if (item.layout === "wide") classes.push("portfolio-card--wide");
  if (item.layout === "narrow") classes.push("portfolio-card--narrow");
  return classes.join(" ");
}

function renderPortfolio() {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  const frag = document.createDocumentFragment();

  PORTFOLIO.forEach((item) => {
    const li = document.createElement("li");
    const href = item.href;
    const external = href && isExternalHref(href);

    const statusHtml = item.status
      ? `<span class="portfolio-card__status">${escapeHtml(item.status)}</span>`
      : '<span class="portfolio-card__status portfolio-card__status--spacer" aria-hidden="true"></span>';

    const footLabel = external
      ? "Visit site"
      : item.status === "Coming soon"
        ? "Launch planned"
        : item.status === "In progress"
          ? "In build"
          : "In portfolio";

    const inner = `
      <div class="portfolio-card__top">
        <h3 class="portfolio-card__name">${escapeHtml(item.name)}</h3>
        <span class="portfolio-card__tag ${tagClass(item.tagType)}">${escapeHtml(item.tagLabel)}</span>
      </div>
      <div class="portfolio-card__body">
        <p class="portfolio-card__desc">${escapeHtml(item.description)}</p>
      </div>
      <div class="portfolio-card__foot">
        <span class="portfolio-card__link-label">
          ${escapeHtml(footLabel)}
          ${external ? '<span class="portfolio-card__arrow" aria-hidden="true">→</span>' : ""}
        </span>
        ${statusHtml}
      </div>
    `;

    if (external) {
      const a = document.createElement("a");
      a.className = cardClasses(item);
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = inner;
      li.appendChild(a);
    } else {
      const article = document.createElement("article");
      article.className = `${cardClasses(item)} portfolio-card--static`;
      article.setAttribute("aria-label", item.name);
      article.innerHTML = inner;
      li.appendChild(article);
    }

    frag.appendChild(li);
  });

  grid.appendChild(frag);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function initReveal() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
}

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const panel = document.getElementById("mobile-nav");
  if (!toggle || !panel) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;
  };

  const open = () => {
    toggle.setAttribute("aria-expanded", "true");
    panel.hidden = false;
  };

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) close();
    else open();
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => close());
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 880) close();
  });
}

initTheme();
renderPortfolio();
initReveal();
initMobileNav();
