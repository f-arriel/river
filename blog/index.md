---
title: News / Berita
nav:
  order: 5
  tooltip: Updates from the group
---

# {% include icon.html icon="fa-solid fa-bullhorn" %} News / Berita

{% include section.html %}

Updates and everyday life from the group. Search by keyword or tag.
<br>
*Kabar terbaru dan keseharian kelompok riset. Cari berdasarkan kata kunci atau tag.*
<br><br>

{% include search-box.html %}

{% include tags.html tags=site.tags %}

{% include search-info.html %}

{% include list.html data="posts" component="post-excerpt" %}
