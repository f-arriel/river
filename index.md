---
---

<div class="home-hero">
  <img src="{{ '/images/logo-stacked.png' | relative_url }}" alt="RIVER" class="home-hero-logo">
  <p class="home-hero-subtitle">Teknik Pengairan Universitas Brawijaya</p>
</div>

{% include section.html %}

## Welcome / Selamat Datang

One or two sentences introducing the group, in English.
<br>
Satu atau dua kalimat yang memperkenalkan kelompok riset, dalam Bahasa Indonesia.
<br><br>
Replace this paragraph with a longer description of what the group works on,
who it is for, and why someone might want to join. Keep the English text first
and the Indonesian text after it, separated by a `<br>`, to match the rest of
the site.
<br><br>
Ganti paragraf ini dengan penjelasan yang lebih panjang mengenai bidang
penelitian kelompok, untuk siapa, dan mengapa seseorang mungkin ingin bergabung.
Tulis teks Bahasa Inggris terlebih dahulu, lalu Bahasa Indonesia.

<br>
<img src="{{ '/images/placeholder.jpg' | relative_url }}" alt="RIVER" class="home-photo">

{% include section.html %}

<div class="home-blocks">

  <!-- ============ latest news ============ -->
  <section class="home-block">
    <div class="home-block-head">
      <h3>
        {% include icon.html icon="fa-solid fa-satellite-dish" %}
        News / Berita
      </h3>
    </div>

    <div class="home-block-body home-news-scroll">
      {% assign recent_posts = site.posts | limit: 10 %}
      {% if recent_posts.size > 0 %}
        <ul class="home-news">
          {% for post in recent_posts %}
            <li class="home-news-item">
              <span class="home-news-date">
                <span class="home-news-year">{{ post.date | date: "%Y" }}</span>
                <span class="home-news-day">{{ post.date | date: "%m/%d" }}</span>
              </span>
              <a class="home-news-title" href="{{ post.url | relative_url }}">
                {{ post.title }}
              </a>
            </li>
          {% endfor %}
        </ul>
      {% else %}
        <p class="home-empty">
          There are no announcements yet.<br>
          <em>Belum ada pengumuman.</em>
        </p>
      {% endif %}
    </div>

    <div class="home-block-foot">
      <a href="{{ '/blog/' | relative_url }}">
        See all posts / Lihat semua
        {% include icon.html icon="fa-solid fa-angles-right" %}
      </a>
    </div>
  </section>

  <!-- ============ featured publications ============ -->
  {% assign dated_pubs = site.data.citations | where_exp: "c", "c.date" | sort: "date" | reverse %}
  {% if dated_pubs.size > 0 %}
    <section class="home-block">
      <div class="home-block-head">
        <h3>
          {% include icon.html icon="fa-solid fa-file-signature" %}
          Recent Publications / Publikasi Terbaru
        </h3>
      </div>

      <div class="home-block-body">
        <ul class="home-pubs">
          {% for pub in dated_pubs limit: 4 %}
            <li class="home-pub-item">
              <span class="home-pub-date">{{ pub.date | date: "%Y" }}</span>
              <span class="home-pub-main">
                <a class="home-pub-title" href="{{ pub.link }}">{{ pub.title }}</a>
                <span class="home-pub-meta">
                  {{ pub.authors | array_carve: 2 | join: ", " }}
                  {% if pub.publisher %}&middot;&nbsp;<em>{{ pub.publisher }}</em>{% endif %}
                </span>
              </span>
            </li>
          {% endfor %}
        </ul>
      </div>

      <div class="home-block-foot">
        <a href="{{ '/projects/' | relative_url }}">
          See all publications / Lihat semua publikasi
          {% include icon.html icon="fa-solid fa-angles-right" %}
        </a>
      </div>
    </section>
  {% endif %}

</div>
