/* ============================================================
   AstraBuilds — görüntüleme mantığı
   Bu dosyaya normalde dokunmana gerek yok. Yeni build eklemek
   için js/data.js dosyasını düzenle.
   ============================================================ */

(function () {
  "use strict";

  const grid = document.getElementById("buildGrid");
  const filtersEl = document.getElementById("filters");
  const emptyState = document.getElementById("emptyState");

  let activeFilter = "Tümü";

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = String(str == null ? "" : str);
    return div.innerHTML;
  }

  function buildTierList(builds) {
    const seen = [];
    builds.forEach((b) => {
      if (b.tier && seen.indexOf(b.tier) === -1) seen.push(b.tier);
    });
    return ["Tümü", ...seen];
  }

  function renderFilters(builds) {
    const tiers = buildTierList(builds);
    filtersEl.innerHTML = "";
    tiers.forEach((tier) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-chip";
      btn.textContent = tier;
      btn.setAttribute("aria-pressed", tier === activeFilter ? "true" : "false");
      btn.addEventListener("click", () => {
        activeFilter = tier;
        renderFilters(builds);
        renderGrid(builds);
      });
      filtersEl.appendChild(btn);
    });
  }

  function partsListMarkup(parts) {
    if (!Array.isArray(parts) || parts.length === 0) return "";
    return parts
      .map(
        (p) =>
          `<div class="part-row"><dt>${escapeHtml(p.label)}</dt><dd>${escapeHtml(p.value)}</dd></div>`
      )
      .join("");
  }

  function cardMarkup(build) {
    const specsPreview = Array.isArray(build.parts)
      ? build.parts
          .slice(0, 2)
          .map((p) => p.value)
          .filter(Boolean)
          .join(", ")
      : "";

    const priceMarkup = build.estimatedPrice
      ? `<span class="price">${escapeHtml(build.estimatedPrice)}</span>`
      : "";

    return `
      <div class="card-top">
        <span class="tier-tag">${escapeHtml(build.tier)}</span>
        ${priceMarkup}
      </div>
      <h2 class="card-name">${escapeHtml(build.name)}</h2>
      <p class="card-tagline">${escapeHtml(build.tagline || "")}</p>
      <p class="card-specs">${escapeHtml(specsPreview)}</p>
      <button type="button" class="card-toggle">Detayları Gör</button>
      <div class="card-detail">
        <div class="card-detail-inner">
          <div class="parts-block">
            <h3 class="block-heading">Parçalar</h3>
            <dl class="parts-list">${partsListMarkup(build.parts)}</dl>
          </div>
          <div class="desc-block">
            <h3 class="block-heading">Açıklama</h3>
            <p>${escapeHtml(build.description || "")}</p>
          </div>
          <div class="link-block">
            ${
              build.pcPartPickerUrl
                ? `<a class="ppp-link" href="${escapeHtml(build.pcPartPickerUrl)}" target="_blank" rel="noopener noreferrer">PCPartPicker Listesini Gör</a>`
                : ""
            }
          </div>
        </div>
      </div>
    `;
  }

  function renderGrid(builds) {
    const visible =
      activeFilter === "Tümü" ? builds : builds.filter((b) => b.tier === activeFilter);

    grid.innerHTML = "";
    emptyState.hidden = visible.length !== 0;

    visible.forEach((build) => {
      const card = document.createElement("article");
      card.className = "card";
      card.dataset.tier = build.tier || "";
      card.innerHTML = cardMarkup(build);

      const toggle = card.querySelector(".card-toggle");
      toggle.addEventListener("click", () => {
        const isExpanded = card.classList.toggle("is-expanded");
        toggle.textContent = isExpanded ? "Detayları Gizle" : "Detayları Gör";
      });

      grid.appendChild(card);
    });
  }

  function init() {
    const builds = Array.isArray(window.BUILDS) ? window.BUILDS : [];
    renderFilters(builds);
    renderGrid(builds);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
