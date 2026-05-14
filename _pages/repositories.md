---
layout: page
permalink: /repositories/
title: repositories
description: GitHub activity and selected open-source repositories.
nav: true
nav_order: 5
---

<style>
  .repository-profile {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 1rem;
    align-items: center;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.6rem;
    background: var(--global-bg-color);
  }

  .repository-profile-avatar {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--global-divider-color);
  }

  .repository-profile h2 {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .repository-profile-name {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    align-items: center;
  }

  .repository-username {
    color: var(--global-text-color-light);
    font-size: 0.92rem;
  }

  .repository-profile p {
    margin: 0.35rem 0 0;
    color: var(--global-text-color);
  }

  .repository-profile-meta,
  .repository-card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 0.7rem;
    color: var(--global-text-color-light);
    font-size: 0.86rem;
  }

  .repository-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 0.7rem;
  }

  .repository-card {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    padding: 1rem;
    background: var(--global-bg-color);
    transition:
      border-color 160ms ease,
      transform 160ms ease,
      box-shadow 160ms ease;
  }

  .repository-card:hover {
    border-color: var(--global-theme-color);
    transform: translateY(-2px);
    box-shadow: 0 0.35rem 1rem rgba(0, 0, 0, 0.08);
  }

  .repository-card-header {
    display: flex;
    gap: 0.75rem;
    justify-content: space-between;
    align-items: flex-start;
  }

  .repository-card-title {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.3;
  }

  .repository-card-title a {
    color: var(--global-theme-color);
  }

  .repository-visibility {
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    padding: 0.1rem 0.48rem;
    color: var(--global-text-color-light);
    font-size: 0.72rem;
    line-height: 1.45;
  }

  .repository-card-description {
    margin: 0.7rem 0 0;
    color: var(--global-text-color);
    font-size: 0.92rem;
    line-height: 1.45;
  }

  .repository-topic-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.8rem;
  }

  .repository-topic {
    border-radius: 999px;
    padding: 0.15rem 0.55rem;
    color: var(--global-theme-color);
    background: rgba(0, 123, 255, 0.08);
    font-size: 0.78rem;
    line-height: 1.45;
  }

  .repository-card-footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 1rem;
  }

  .repository-language {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .repository-language-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    display: inline-block;
  }

  .repository-open-link {
    font-size: 0.86rem;
    font-weight: 500;
  }

  @media (max-width: 576px) {
    .repository-profile {
      grid-template-columns: 1fr;
    }
  }
</style>

{% if site.data.repositories.github_users %}

## GitHub user

{% for user in site.data.repositories.github_users %}
  <section class="repository-profile">
    <img class="repository-profile-avatar" src="{{ user.avatar }}" alt="{{ user.name }}">
    <div>
      <div class="repository-profile-name">
        <h2>{{ user.name }}</h2>
        <span class="repository-username">@{{ user.username }}</span>
      </div>
      <p>{{ user.bio }}</p>
      <div class="repository-profile-meta">
        <span>{{ user.public_repos }} public repositories</span>
        <span>{{ user.followers }} followers</span>
        <span>{{ user.following }} following</span>
        <a href="{{ user.url }}" rel="external nofollow noopener" target="_blank">View GitHub profile</a>
      </div>
    </div>
  </section>
{% endfor %}

---

{% if site.repo_trophies.enabled %}
  {% for user in site.data.repositories.github_users %}
    {% if site.data.repositories.github_users.size > 1 %}

#### {{ user }}

    {% endif %}

    {% include repository/repo_trophies.liquid username=user.username %}

---

  {% endfor %}
{% endif %}
{% endif %}

{% if site.data.repositories.github_repos %}

## GitHub repositories

<div class="repository-grid">
  {% for repo in site.data.repositories.github_repos %}
    <article class="repository-card">
      <div class="repository-card-header">
        <h2 class="repository-card-title">
          <a href="{{ repo.url }}" rel="external nofollow noopener" target="_blank">{{ repo.name }}</a>
        </h2>
        <span class="repository-visibility">Public</span>
      </div>
      <p class="repository-card-description">{{ repo.description }}</p>
      <div class="repository-topic-list">
        {% for topic in repo.topics %}
          <span class="repository-topic">{{ topic }}</span>
        {% endfor %}
      </div>
      <div class="repository-card-footer">
        <div>
          <div class="repository-card-meta">
            <span class="repository-language">
              <span class="repository-language-dot" style="background-color: {{ repo.language_color }}"></span>
              {{ repo.language }}
            </span>
            <span>{{ repo.stars }} stars</span>
            <span>{{ repo.forks }} forks</span>
          </div>
          <div class="repository-card-meta">
            <span>Updated {{ repo.updated | date: "%b %-d, %Y" }}</span>
          </div>
        </div>
        <a class="repository-open-link" href="{{ repo.url }}" rel="external nofollow noopener" target="_blank">Open repository</a>
      </div>
    </article>
  {% endfor %}
</div>

{% endif %}
