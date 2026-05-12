---
layout: page
permalink: /publications/
title: publications
description:
nav: true
nav_order: 1

scope_filters:
  - key: all
    label: All
  - key: international
    label: International
  - key: domestic
    label: Domestic
  - key: corl
    label: CoRL
  - key: icra
    label: ICRA
  - key: iros
    label: IROS
  - key: ral
    label: RA-L
  - key: ijrr
    label: IJRR
  - key: isr
    label: ISR
  - key: iccas
    label: ICCAS
  - key: workshop
    label: Workshop
  - key: jkros
    label: JKROS
  - key: etri
    label: ETRI
  - key: preprint
    label: arXiv

topic_filters:
  - key: all-topic
    label: All Topics
  - key: lidar
    label: LiDAR
  - key: radar
    label: Radar
  - key: localization
    label: Localization
  - key: place-recognition
    label: Place Recognition
  - key: odometry
    label: Odometry
  - key: mapping
    label: Mapping
  - key: dataset
    label: Dataset
  - key: deep-learning
    label: Deep Learning
  - key: calibration
    label: Calibration
  - key: object-detection
    label: Object Detection
---

<style>
  .publication-filter-panel {
    display: grid;
    gap: 0.65rem;
    margin-bottom: 1.25rem;
  }

  .publication-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .publication-filters + .publication-filters {
    padding-top: 0.65rem;
    border-top: 1px solid var(--global-divider-color);
  }

  .publication-filter-btn {
    border: 1px solid var(--global-divider-color);
    background: var(--global-bg-color);
    color: var(--global-text-color);
    border-radius: 18px;
    padding: 0.25rem 0.75rem;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .publication-filter-btn.active,
  .publication-filter-btn:hover {
    color: var(--global-bg-color);
    background: var(--global-theme-color);
    border-color: var(--global-theme-color);
  }

  .publication-empty {
    margin: 1rem 0;
    color: var(--global-text-color-light);
    font-size: 0.95rem;
  }
</style>

<div class="publication-filter-panel" aria-label="Publication filters">
  <div class="publication-filters" data-publication-filter-group="scope" aria-label="Publication scope and venue filters">
    {% for filter in page.scope_filters %}
      <button
        class="publication-filter-btn{% if forloop.first %} active{% endif %}"
        data-publication-filter-group="scope"
        data-publication-filter="{{ filter.key }}"
      >
        {{ filter.label }}
      </button>
    {% endfor %}
  </div>

  <div class="publication-filters" data-publication-filter-group="topic" aria-label="Publication topic filters">
    {% for filter in page.topic_filters %}
      <button
        class="publication-filter-btn{% if forloop.first %} active{% endif %}"
        data-publication-filter-group="topic"
        data-publication-filter="{{ filter.key }}"
      >
        {{ filter.label }}
      </button>
    {% endfor %}
  </div>
</div>

<h2 id="publication-filter-heading">All Publications</h2>
<div id="publication-empty-state" class="publication-empty" hidden>No publications match the selected filters.</div>

<div id="publications-container">
  <section class="publication-section">
    <div class="publications">
      {% bibliography --group_by year %}
    </div>
  </section>
</div>

<script>
  const publicationFilterState = {
    scope: "all",
    topic: "all-topic",
  };

  const publicationFilterLabels = {};
  document.querySelectorAll("[data-publication-filter]").forEach((button) => {
    publicationFilterLabels[button.dataset.publicationFilter] = button.textContent.trim();

    button.addEventListener("click", () => {
      const group = button.dataset.publicationFilterGroup;
      publicationFilterState[group] = button.dataset.publicationFilter;
      document.querySelectorAll(`[data-publication-filter-group="${group}"][data-publication-filter]`).forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      updatePublicationFilters();
    });
  });

  function publicationEntryMatches(tags, filter) {
    return filter === "all" || filter === "all-topic" || tags.includes(filter);
  }

  function updatePublicationFilters() {
    let visibleCount = 0;
    document.querySelectorAll(".publication-entry").forEach((entry) => {
      const tags = (entry.dataset.publicationTags || "").split(/\s+/);
      const visible = publicationEntryMatches(tags, publicationFilterState.scope) && publicationEntryMatches(tags, publicationFilterState.topic);
      const listItem = entry.closest("li") || entry;
      listItem.style.display = visible ? "" : "none";
      if (visible) visibleCount += 1;
    });

    document.querySelectorAll("#publications-container ol.bibliography").forEach((list) => {
      const hasVisibleItems = Array.from(list.children).some((item) => item.style.display !== "none");
      list.style.display = hasVisibleItems ? "" : "none";
      const heading = list.previousElementSibling;
      if (heading && heading.classList.contains("bibliography")) {
        heading.style.display = hasVisibleItems ? "" : "none";
      }
    });

    const headingParts = [];
    if (publicationFilterState.scope !== "all") headingParts.push(publicationFilterLabels[publicationFilterState.scope]);
    if (publicationFilterState.topic !== "all-topic") headingParts.push(publicationFilterLabels[publicationFilterState.topic]);
    document.getElementById("publication-filter-heading").textContent = `${headingParts.length ? headingParts.join(" · ") : "All"} Publications`;
    document.getElementById("publication-empty-state").hidden = visibleCount !== 0;
  }
</script>
