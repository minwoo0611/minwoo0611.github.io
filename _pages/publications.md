---
layout: page
permalink: /publications/
title: publications
description:
nav: true
nav_order: 1

conferences:
  - key: CoRL
    label: CoRL
    query: "@*[corl=true]*"
  - key: ICRA
    label: ICRA
    query: "@*[icra=true]*"
  - key: IROS
    label: IROS
    query: "@*[iros=true]*"
  - key: RAL
    label: RAL
    query: "@*[ral=true]*"
  - key: IJRR
    label: IJRR
    query: "@*[ijrr=true]*"
  - key: ISR
    label: ISR
    query: "@*[isr=true]*"
  - key: ICCAS
    label: ICCAS
    query: "@*[iccas=true]*"
  - key: Workshop
    label: Workshops
    query: "@*[workshop=true]*"

topics:
  - key: LiDAR
    label: LiDAR
    query: "@*[lidar=true]*"
  - key: Radar
    label: Radar
    query: "@*[radar=true]*"
  - key: Learning
    label: Learning
    query: "@*[learning=true]*"
  - key: SLAM
    label: SLAM
    query: "@*[slam=true]*"
  - key: Dataset
    label: Datasets
    query: "@*[dataset=true]*"
---

<style>
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-bottom: 1em;
  justify-content: center;
}
.filter-btn {
  background: #e0e0e0;
  color: #222;
  border: none;
  border-radius: 18px;
  padding: 0.2em 0.7em;
  font-size: 0.8em;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(50,115,220,0.08);
}
.filter-btn:hover, .filter-btn.active {
  background: #54bde7;
  color: #fff;
  box-shadow: 0 2px 8px rgba(84, 189, 231,0.15);
}
</style>
<div id="conference-list" class="filter-buttons">
  {% for conf in page.conferences %}
    <button class="filter-btn" onclick="showConference('{{ conf.key }}')">{{ conf.label }}</button>
  {% endfor %}
  <button class="filter-btn" onclick="showConference('all')">Show All</button>
</div>
<div id="topic-list" class="filter-buttons">
  {% for topic in page.topics %}
    <button class="filter-btn" onclick="showConference('{{ topic.key }}')">{{ topic.label }}</button>
  {% endfor %}
</div>

<div id="publications-container">
  {% for conf in page.conferences %}
    <div id="{{ conf.key }}-publications" style="display:none;">
      <h3>{{ conf.label }} Publications</h3>
      <div class="publications">
        {% bibliography --group_by none --query {{ conf.query }} %}
      </div>
    </div>
  {% endfor %}
  {% for topic in page.topics %}
    <div id="{{ topic.key }}-publications" style="display:none;">
      <h3>{{ topic.label }} Publications</h3>
      <div class="publications">
        {% bibliography --group_by none --query {{ topic.query }} %}
      </div>
    </div>
  {% endfor %}
  <div id="all-publications">
    <h3>All Publications</h3>
    <div class="publications">
      {% bibliography --group_by none %}
    </div>
  </div>
</div>

<script>
function showConference(conf) {
  // Hide all publication sections
  var keys = [
    {% for conf in page.conferences %}"{{ conf.key }}",{% endfor %}
    {% for topic in page.topics %}"{{ topic.key }}",{% endfor %}
    "all"
  ];
  keys.forEach(function(key) {
    var el = document.getElementById(key + '-publications');
    if (el) el.style.display = 'none';
  });

  // Show the selected section
  if (conf === 'all') {
    document.getElementById('all-publications').style.display = 'block';
  } else {
    document.getElementById('all-publications').style.display = 'none';
    var el = document.getElementById(conf + '-publications');
    if (el) el.style.display = 'block';
  }

  // Update button active state
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  let btns = document.querySelectorAll('button[onclick="showConference(\''+conf+'\')"]');
  btns.forEach(btn => btn.classList.add('active'));
}

// Show all by default
showConference('all');
</script>
