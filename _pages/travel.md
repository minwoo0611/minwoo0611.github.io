---
layout: page
title: travel
permalink: /travel/
description: Places I have explored, enjoyed, and keep close as memories.
nav: true
nav_order: 4
map: true
---

<style>
  .travel-map {
    margin-bottom: 1.75rem;
  }

  .travel-map pre {
    display: none;
  }

  .travel-map .map {
    width: 100%;
    height: min(68vh, 640px);
    min-height: 420px;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    overflow: hidden;
    background: #cfe0ee;
  }

  .travel-groups {
    display: grid;
    gap: 1.1rem;
    margin-top: 1.25rem;
  }

  .travel-group {
    border-top: 1px solid var(--global-divider-color);
    padding-top: 0.9rem;
  }

  .travel-group h2 {
    margin: 0 0 0.55rem;
    font-size: 1rem;
    line-height: 1.3;
  }

  .travel-place-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .travel-place {
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    padding: 0.22rem 0.65rem;
    font-size: 0.85rem;
    line-height: 1.35;
    color: var(--global-text-color);
    background: var(--global-bg-color);
  }

  .travel-place-note {
    border-color: var(--global-theme-color);
    color: var(--global-bg-color);
    background: var(--global-theme-color);
  }

  @media (max-width: 576px) {
    .travel-map .map {
      min-height: 360px;
      height: 62vh;
    }
  }
</style>

<div class="travel-map" markdown="1">

```geojson
{
  "type": "FeatureCollection",
  "features": [
    {% for place in site.data.travel.locations %}
      {
        "type": "Feature",
        "properties": {
          "name": {{ place.name | jsonify }},
          "country": {{ place.country | jsonify }},
          "region": {{ place.region | jsonify }},
          "home": {{ place.home | default: false | jsonify }}
        },
        "geometry": {
          "type": "Point",
          "coordinates": [{{ place.lng }}, {{ place.lat }}]
        }
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
```

</div>

{% assign travel_groups = site.data.travel.locations | group_by: "country" | sort: "name" %}
{% assign south_korea_group = travel_groups | where: "name", "South Korea" | first %}
<div class="travel-groups">
  {% if south_korea_group %}
    <section class="travel-group">
      <h2>South Korea</h2>
      <div class="travel-place-list">
        <span class="travel-place travel-place-note">Almost Everywhere</span>
      </div>
    </section>
  {% endif %}

  {% for group in travel_groups %}
    {% if group.name == "South Korea" %}
      {% continue %}
    {% endif %}
    <section class="travel-group">
      <h2>{{ group.name }}</h2>
      <div class="travel-place-list">
        {% assign sorted_places = group.items | sort: "name" %}
        {% for place in sorted_places %}
          <span class="travel-place">{{ place.name }}</span>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</div>
