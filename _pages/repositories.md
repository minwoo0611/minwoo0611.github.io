---
layout: page
permalink: /repositories/
title: repositories
description: GitHub activity and selected open-source repositories.
nav: true
nav_order: 5
---

{% if site.data.repositories.github_users %}

## GitHub user

{% for user in site.data.repositories.github_users %}
  {% include repository/repo_user.liquid username=user %}
{% endfor %}

---

{% if site.repo_trophies.enabled %}
  {% for user in site.data.repositories.github_users %}
    {% if site.data.repositories.github_users.size > 1 %}

#### {{ user }}

    {% endif %}

    {% include repository/repo_trophies.liquid username=user %}

---

  {% endfor %}
{% endif %}
{% endif %}

{% if site.data.repositories.github_repos %}

## GitHub repositories

{% for repo in site.data.repositories.github_repos %}
  {% include repository/repo.liquid repository=repo %}
{% endfor %}

{% endif %}
