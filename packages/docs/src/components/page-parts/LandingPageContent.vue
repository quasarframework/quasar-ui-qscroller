<template>
  <section class="landing-page markdown-brand">
    <header class="hero">
      <div class="hero__mesh hero__mesh--left" />
      <div class="hero__mesh hero__mesh--right" />

      <div class="hero__grid">
        <div class="hero__copy">
          <div class="hero__eyebrow">Vue 3 + Quasar 2</div>
          <img src="/app-logo.svg" alt="QScroller Logo" class="hero-logo" />
          <h1 class="hero-title">QScroller</h1>

          <p class="hero-subtitle">
            {{ siteConfig.description }}
          </p>

          <p class="hero-lede">
            Build wheel-style inputs for string choices, times, dates, date-time values, and ranges
            without dragging in a full scheduling surface.
          </p>

          <div class="hero-buttons">
            <q-btn
              to="/getting-started/introduction"
              no-caps rounded unelevated class="hero-button hero-button--solid"
            >
              <div class="hero-button__content q-anchor--skip">
                <span class="hero-button__slot hero-button__slot--empty" aria-hidden="true" />
                <span class="hero-button__label">Get Started</span>
                <span class="hero-button__slot">
                  <q-icon :name="biArrowRightCircle" />
                </span>
              </div>
            </q-btn>

            <q-btn
              to="/other/upgrade-guide"
              no-caps rounded unelevated class="hero-button hero-button--ghost"
            >
              <div class="hero-button__content q-anchor--skip">
                <span class="hero-button__slot hero-button__slot--empty" aria-hidden="true" />
                <span class="hero-button__label">Upgrade Guide</span>
                <span class="hero-button__slot">
                  <q-icon name="upgrade" />
                </span>
              </div>
            </q-btn>

            <q-btn
              href="https://github.com/quasarframework/quasar-ui-qscroller/tree/v3-beta"
              target="_blank"
              rel="noopener noreferrer"
              no-caps rounded unelevated class="hero-button hero-button--ghost"
            >
              <div class="hero-button__content q-anchor--skip">
                <span class="hero-button__slot">
                  <q-icon :name="fabGithub" />
                </span>
                <span class="hero-button__label">GitHub Repo</span>
                <span class="hero-button__slot hero-button__slot--empty" aria-hidden="true" />
              </div>
            </q-btn>
          </div>

          <div class="hero-pills">
            <span
              v-for="pill in heroPills"
              :key="pill"
              class="hero-pill"
            >
              {{ pill }}
            </span>
          </div>
        </div>

        <div class="hero__visual">
          <div class="preview-panel">
            <div class="preview-panel__header">
              <span class="preview-panel__kicker">Focused Inputs</span>
              <span class="preview-panel__note">Docs and app-ready</span>
            </div>

            <div class="preview-panel__body">
              <div class="preview-panel__copy">
                <h2>One design language for every scroller type</h2>
                <p>
                  Mix and match string, date, time, date-time, and range pickers while keeping the
                  same shell, bar, color, and slot model across the whole set.
                </p>
              </div>

              <div class="preview-stack">
                <div class="preview-card preview-card--primary">
                  <q-img
                    src="/q-scroller.png"
                    alt="QScroller string picker preview"
                    fit="contain"
                  />
                </div>

                <div class="preview-card preview-card--secondary">
                  <q-img
                    src="/q-date-time-scroller-ampm.png"
                    alt="QScroller date and time picker preview"
                    fit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="feature-section">
      <div class="section-heading">
        <div class="section-heading__eyebrow">Included</div>
        <h2 class="section-heading__title">A small family of pickers with consistent behavior</h2>
        <p class="section-heading__text">
          QScroller stays intentionally focused: fast wheel-style inputs, shared customization
          points, and enough range/date-time coverage for real forms.
        </p>
      </div>

      <div class="feature-grid">
        <article
          v-for="feature in featureCards"
          :key="feature.title"
          class="feature-card"
        >
          <div class="feature-card__icon">
            <q-icon :name="feature.icon" />
          </div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__body">{{ feature.body }}</p>
        </article>
      </div>
    </section>

    <section class="resource-section">
      <article class="resource-card resource-card--primary">
        <div class="resource-card__eyebrow">Ecosystem</div>
        <h2 class="resource-card__title">Built in the same docs workflow as the other md-plugins sites</h2>
        <p class="resource-card__body">
          This site runs on Q-Press and the shared md-plugins tooling, so the docs, examples, and
          navigation fit into the same family as the sibling Quasar UI projects.
        </p>

        <div class="resource-card__actions">
          <a
            href="https://github.com/quasarframework/quasar-ui-qscroller"
            target="_blank"
            rel="noopener noreferrer"
            class="resource-link"
          >
            <q-icon :name="fabGithub" />
            <span>QScroller Repo</span>
          </a>

          <a
            href="https://github.com/hawkeye64/md-plugins"
            target="_blank"
            rel="noopener noreferrer"
            class="resource-link"
          >
            <q-icon name="hub" />
            <span>md-plugins</span>
          </a>

          <a
            href="https://www.npmjs.com/package/@md-plugins/quasar-app-extension-q-press"
            target="_blank"
            rel="noopener noreferrer"
            class="resource-link"
          >
            <q-icon name="description" />
            <span>Q-Press</span>
          </a>
        </div>
      </article>

      <article class="resource-card resource-card--secondary">
        <div class="resource-card__eyebrow">Need Help?</div>
        <h2 class="resource-card__title">Start with the intro, then use the examples as live reference</h2>
        <p class="resource-card__body">
          The docs are structured to move quickly from install and upgrade steps into working
          examples. If something feels off, GitHub Discussions and the repo issue tracker are the
          best places to surface it.
        </p>

        <div class="resource-list">
          <div
            v-for="item in supportItems"
            :key="item.title"
            class="resource-list__item"
          >
            <div class="resource-list__title">{{ item.title }}</div>
            <div class="resource-list__body">{{ item.body }}</div>
          </div>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import { fabGithub } from "@quasar/extras/fontawesome-v7";
import { biArrowRightCircle } from "@quasar/extras/bootstrap-icons";
import siteConfig from "../../siteConfig";

const heroPills = ["QStringScroller", "QTimeScroller", "QDateScroller", "Date-Time", "Ranges"];

const featureCards = [
  {
    icon: "format_list_numbered",
    title: "String Pickers",
    body: "Use wheel-style selection for compact choice lists without building a custom dropdown.",
  },
  {
    icon: "schedule",
    title: "Time + AM/PM",
    body: "Switch between 24-hour and 12-hour flows, intervals, disabled values, and range validation.",
  },
  {
    icon: "event",
    title: "Date + Date-Time",
    body: "Compose years, months, days, and time columns with shared formatting and locale support.",
  },
  {
    icon: "palette",
    title: "Theming",
    body: "Tune shell, bar, text, and inner scroller colors with palette names, CSS values, or CSS vars.",
  },
  {
    icon: "widgets",
    title: "Consistent API",
    body: "Keep the same header/footer, slots, border, density, and disabled patterns across every picker.",
  },
  {
    icon: "view_carousel",
    title: "Inline or Popup",
    body: "Render scrollers directly in forms or use them inside QInput-style popup workflows when needed.",
  },
];

const supportItems = [
  {
    title: "Introduction First",
    body: "Use the getting-started docs to choose between direct UI-package usage and the app extension path.",
  },
  {
    title: "Upgrade Notes",
    body: "The v3 beta line is Vue 3 and Quasar 2 focused, so the upgrade guide should be your first stop when migrating.",
  },
  {
    title: "Discussions + Issues",
    body: "Questions, bugs, and API sharp edges are easiest to track in the QScroller repo and GitHub Discussions.",
  },
];
</script>

<style lang="scss" scoped>
.landing-page {
  --landing-border: rgba(245, 245, 220, 0.14);
  --landing-border-strong: rgba(245, 245, 220, 0.22);
  --landing-surface: rgba(62, 39, 35, 0.68);
  --landing-surface-strong: rgba(92, 64, 51, 0.86);
  --landing-text-soft: rgba(245, 245, 220, 0.8);
  --landing-shadow: 0 28px 60px rgba(35, 20, 14, 0.28);
  color: $brand-dark-text;
}

.hero {
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  padding: clamp(28px, 5vw, 52px);
  border: 1px solid var(--landing-border);
  border-radius: 34px;
  background:
    radial-gradient(circle at top left, rgba(210, 105, 30, 0.32), transparent 34%),
    radial-gradient(circle at 82% 20%, rgba(245, 245, 220, 0.08), transparent 20%),
    linear-gradient(145deg, rgba(92, 64, 51, 0.96), rgba(62, 39, 35, 0.96));
  box-shadow: var(--landing-shadow);
}

.hero__mesh {
  position: absolute;
  inset: auto;
  width: 240px;
  height: 240px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(245, 245, 220, 0.12), transparent 68%);
  filter: blur(10px);
  pointer-events: none;
}

.hero__mesh--left {
  top: -90px;
  left: -70px;
}

.hero__mesh--right {
  right: -40px;
  bottom: -90px;
}

.hero__grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 30px;
  align-items: center;
  grid-template-columns: minmax(0, 1.06fr) minmax(320px, 0.94fr);
}

.hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.hero__eyebrow,
.section-heading__eyebrow,
.resource-card__eyebrow,
.preview-panel__kicker {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 14px;
  border: 1px solid var(--landing-border-strong);
  border-radius: 999px;
  background: rgba(245, 245, 220, 0.08);
  color: #ffe5b6;
  font-family: "Montserrat", "Poppins", "Segoe UI", sans-serif;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-logo {
  width: clamp(84px, 11vw, 120px);
  border-radius: 28px;
  box-shadow: 0 24px 48px rgba(21, 12, 8, 0.28);
}

.hero-title {
  margin: 0;
  font-family: "Montserrat", "Poppins", "Segoe UI", sans-serif;
  font-size: clamp(3.2rem, 8vw, 6rem);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: $brand-light;
}

.hero-subtitle {
  max-width: 620px;
  margin: 0;
  font-family: "Montserrat", "Poppins", "Segoe UI", sans-serif;
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  line-height: 1.45;
  font-weight: 700;
  color: #fff4dc;
}

.hero-lede {
  max-width: 580px;
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--landing-text-soft);
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 8px;
  margin-bottom: 10px;
}

.hero-button {
  min-height: 48px;
  padding: 0 20px;
  border: 1px solid transparent;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    background-color 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease,
    box-shadow 0.22s ease;
}

.hero-button:hover {
  transform: translateY(-1px);
}

.hero-button :deep(.q-btn__content) {
  width: 100%;
  min-width: 0;
}

.hero-button--solid {
  background: $brand-light;
  color: $brand-dark-bg;
  box-shadow: 0 18px 30px rgba(22, 12, 7, 0.18);
}

.hero-button--ghost {
  background: rgba(245, 245, 220, 0.08);
  border-color: var(--landing-border-strong);
  color: $brand-light;
}

.hero-button__content {
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr) 1.25rem;
  align-items: center;
  column-gap: 10px;
  min-width: 0;
  width: 100%;
  font-family: "Montserrat", "Poppins", "Segoe UI", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
}

.hero-button__slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
}

.hero-button__slot--empty {
  visibility: hidden;
}

.hero-button__label {
  white-space: nowrap;
  text-align: center;
}

.hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 6px;
}

.hero-pill {
  padding: 8px 12px;
  border: 1px solid rgba(245, 245, 220, 0.12);
  border-radius: 999px;
  background: rgba(245, 245, 220, 0.05);
  color: #f3d9b1;
  font-size: 0.84rem;
  font-weight: 600;
}

.hero__visual {
  display: flex;
  justify-content: stretch;
}

.preview-panel {
  width: 100%;
  padding: 22px;
  border: 1px solid var(--landing-border);
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(245, 245, 220, 0.08), rgba(245, 245, 220, 0.02)),
    rgba(37, 22, 18, 0.46);
  backdrop-filter: blur(8px);
}

.preview-panel__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.preview-panel__note {
  color: rgba(245, 245, 220, 0.62);
  font-size: 0.84rem;
  font-weight: 600;
}

.preview-panel__body {
  display: grid;
  gap: 20px;
}

.preview-panel__copy h2 {
  margin: 0 0 10px;
  font-family: "Montserrat", "Poppins", "Segoe UI", sans-serif;
  font-size: clamp(1.35rem, 2vw, 1.7rem);
  line-height: 1.2;
  color: $brand-light;
}

.preview-panel__copy p {
  margin: 0;
  color: var(--landing-text-soft);
  line-height: 1.65;
}

.preview-stack {
  position: relative;
  min-height: 350px;
}

.preview-card {
  position: absolute;
  overflow: hidden;
  border: 1px solid rgba(245, 245, 220, 0.12);
  border-radius: 22px;
  background: rgba(245, 245, 220, 0.08);
  box-shadow: 0 22px 38px rgba(18, 10, 7, 0.2);

  :deep(.q-img) {
    display: block;
    width: 100%;
  }
}

.preview-card--primary {
  top: 0;
  left: 0;
  width: min(100%, 360px);
  transform: rotate(-2deg);
}

.preview-card--secondary {
  right: 0;
  bottom: 0;
  width: min(78%, 290px);
  transform: rotate(4deg);
}

.feature-section,
.resource-section {
  margin-top: 36px;
}

.section-heading {
  max-width: 760px;
  margin: 0 auto 24px;
  text-align: center;
}

.section-heading__title {
  margin: 14px 0 10px;
  font-family: "Montserrat", "Poppins", "Segoe UI", sans-serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1.12;
  color: $brand-light;
}

.section-heading__text {
  margin: 0;
  color: rgba(245, 245, 220, 0.78);
  font-size: 1.04rem;
  line-height: 1.72;
}

.feature-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-card,
.resource-card {
  position: relative;
  overflow: hidden;
  padding: 22px;
  border: 1px solid var(--landing-border);
  border-radius: 24px;
  background: var(--landing-surface);
  box-shadow: 0 16px 34px rgba(27, 15, 10, 0.14);
}

.feature-card::before {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(210, 105, 30, 0.55), transparent 65%);
}

.feature-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  margin-bottom: 14px;
  border-radius: 14px;
  background: rgba(210, 105, 30, 0.16);
  color: #ffd6a3;
  font-size: 1.35rem;
}

.feature-card__title,
.resource-card__title {
  margin: 0 0 10px;
  font-family: "Montserrat", "Poppins", "Segoe UI", sans-serif;
  font-size: 1.16rem;
  line-height: 1.3;
  color: $brand-light;
}

.feature-card__body,
.resource-card__body {
  margin: 0;
  color: rgba(245, 245, 220, 0.76);
  line-height: 1.68;
}

.resource-section {
  display: grid;
  gap: 18px;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
}

.resource-card--primary {
  background:
    radial-gradient(circle at top right, rgba(210, 105, 30, 0.18), transparent 30%),
    var(--landing-surface-strong);
}

.resource-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid var(--landing-border-strong);
  border-radius: 999px;
  background: rgba(245, 245, 220, 0.05);
  color: #ffe6bf;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    background-color 0.22s ease;
}

.resource-link:hover {
  transform: translateY(-1px);
  border-color: rgba(245, 245, 220, 0.28);
  background: rgba(245, 245, 220, 0.08);
}

.resource-list {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.resource-list__item {
  padding: 16px 18px;
  border: 1px solid rgba(245, 245, 220, 0.08);
  border-radius: 18px;
  background: rgba(245, 245, 220, 0.04);
}

.resource-list__title {
  margin-bottom: 6px;
  font-family: "Montserrat", "Poppins", "Segoe UI", sans-serif;
  font-size: 0.96rem;
  font-weight: 700;
  color: #ffe3b7;
}

.resource-list__body {
  color: rgba(245, 245, 220, 0.72);
  line-height: 1.62;
}

@media (max-width: 1100px) {
  .hero__grid,
  .resource-section,
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .preview-stack {
    min-height: 320px;
  }
}

@media (max-width: 700px) {
  .hero {
    padding: 24px 18px;
    border-radius: 24px;
  }

  .hero__copy {
    align-items: stretch;
  }

  .hero-buttons,
  .resource-card__actions {
    flex-direction: column;
  }

  .hero-button,
  .resource-link {
    justify-content: center;
  }

  .preview-stack {
    min-height: 260px;
  }

  .preview-card--primary {
    position: relative;
    width: 100%;
    transform: none;
  }

  .preview-card--secondary {
    right: auto;
    bottom: auto;
    left: 18px;
    width: calc(100% - 36px);
    transform: translateY(-24px);
  }

  .feature-card,
  .resource-card {
    padding: 18px;
    border-radius: 20px;
  }
}
</style>
