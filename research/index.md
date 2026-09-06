---
title: Research / Riset
nav:
  order: 1
  tooltip: What we work on
---

# {% include icon.html icon="fa-solid fa-microscope" %} Research / Riset

{% include section.html %}

## Current Research / Riset Saat Ini

{% assign current = site.themes | where: "status", "current" | sort: "order" %}
{% if current.size > 0 %}
  {% for theme in current %}
{% include feature.html image=theme.image title=theme.title text=theme.content %}
  {% endfor %}
{% else %}
No research themes have been added yet.
<br>
*Belum ada tema penelitian yang ditambahkan.*
{% endif %}

{% include section.html %}

## Past Research / Riset Sebelumnya

{% assign past = site.themes | where: "status", "past" | sort: "order" %}
{% for theme in past %}
{% include feature.html image=theme.image title=theme.title text=theme.content %}
{% endfor %}
