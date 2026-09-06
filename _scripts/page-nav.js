/*
  builds a floating panel that links to each section (h2) on the page,
  and highlights whichever section you are currently reading.

  runs automatically on any page with 2 or more h1/h2 headings.
  add data-no-page-nav to any element on the page to opt that page out.
*/

{
  const MIN_HEADINGS = 2;
  const SELECTOR = "h1, h2";

  // distance from the top of the viewport to treat as "current"
  const offset = () => (document.querySelector("header")?.clientHeight || 0) + 24;

  const onLoad = () => {
    const main = document.querySelector("main");
    if (!main) return;
    if (document.querySelector("[data-no-page-nav]")) return;

    const headings = [...main.querySelectorAll(SELECTOR)];
    if (headings.length < MIN_HEADINGS) return;

    // collect targets, generating ids where the template did not
    const targets = headings.map((heading, index) => {
      const section = heading.closest("section");
      let id = heading.id || (section && section.id) || "";
      if (!id) {
        id = "section-" + (index + 1);
        heading.id = id;
      }
      // label: use the first half of "English / Indonesian" titles
      const full = heading.textContent.trim();
      const label = full.split(" / ")[0].trim() || full;
      return { id, heading, label, full };
    });

    // build the panel
    const nav = document.createElement("nav");
    nav.className = "page-nav";
    nav.setAttribute("aria-label", "section navigation");

    const list = document.createElement("ul");

    const links = targets.map((target) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#" + target.id;
      link.title = target.full;

      const dot = document.createElement("span");
      dot.className = "page-nav-dot";

      const text = document.createElement("span");
      text.className = "page-nav-label";
      text.textContent = target.label;

      link.append(dot, text);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        scrollTo(target);
      });

      item.append(link);
      list.append(item);
      return link;
    });

    nav.append(list);

    // back to top
    const top = document.createElement("button");
    top.className = "page-nav-top";
    top.type = "button";
    top.title = "Back to top / Ke atas";
    top.setAttribute("aria-label", "back to top");
    top.textContent = "↑";
    top.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
    nav.append(top);

    document.body.append(nav);

    const scrollTo = (target) => {
      const y =
        target.heading.getBoundingClientRect().top + window.scrollY - offset();
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", "#" + target.id);
    };

    // highlight the section currently in view
    const update = () => {
      const line = window.scrollY + offset() + 10;
      let active = 0;
      targets.forEach((target, index) => {
        if (target.heading.getBoundingClientRect().top + window.scrollY <= line)
          active = index;
      });
      links.forEach((link, index) =>
        link.classList.toggle("is-active", index === active)
      );
      nav.classList.toggle("is-scrolled", window.scrollY > 200);
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        update();
        queued = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  };

  window.addEventListener("load", onLoad);
}
