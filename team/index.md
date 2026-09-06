---
title: Team / Tim
nav:
  order: 2
  tooltip: Members and alumni
---

# {% include icon.html icon="fa-solid fa-people-group" %} Team / Tim

{% include section.html %}

## Principal Investigator / Ketua Peneliti

{% include list.html data="members" component="portrait" filter="role =~ /principal-investigator/i" %}

## PhD Students / Mahasiswa Doktoral

{% include list.html data="members" component="portrait" filter="role =~ /phd/i" %}

## Master's Students / Mahasiswa Magister

{% include list.html data="members" component="portrait" filter="role =~ /master/i" %}

## Undergraduate Students / Mahasiswa Sarjana

{% include list.html data="members" component="portrait" filter="role =~ /undergrad/i" %}

## Research Staff / Staf Peneliti

{% include list.html data="members" component="portrait" filter="role =~ /research.staff/i" %}

{% include section.html %}

## Alumni / Alumni

Click a name to see their research theme and thesis title.
<br>
*Klik sebuah nama untuk melihat tema penelitian dan judul skripsi/tesis.*
<br><br>

{% include alumni-list.html %}

{% include section.html %}

## Where Graduates Go / Karier Alumni

{% assign jobs = site.employment | sort: "year" | reverse %}
{% for job in jobs %}
{{ job.degree }}　{{ job.organization }}{% if job.sector %} ({{ job.sector }}){% endif %}
<br>
{% endfor %}

{% include section.html %}

# {% include icon.html icon="fa-solid fa-images" %} Photo Gallery / Galeri Foto

<br>
Moments from the group.
<br>
*Momen-momen kegiatan kelompok.*
<br><br>

{% capture content %}
{% assign photos = site.gallery | sort: "date" | reverse %}
{% for photo in photos %}
{% include figure.html image=photo.image caption=photo.caption width="100%" %}
{% endfor %}
{% endcapture %}

{% include grid.html content=content %}
