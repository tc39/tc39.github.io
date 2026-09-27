const openMenu = (menu) => {
  menu.style.maxHeight = `${menu.scrollHeight}px`;
  setTimeout(() => {
    menu.style.maxHeight = "none";
  }, 600);
};

const closeMenu = (menu) => {
  menu.style.maxHeight = `${menu.scrollHeight}px`;
  setTimeout(() => {
    menu.style.maxHeight = "";
  }, 0);
};

const toggleMenu = (menu = document.querySelector("#menu")) => {
  const { maxHeight } = menu.style;
  if (maxHeight) {
    closeMenu(menu);
  } else {
    openMenu(menu);
  }
  menu.classList.toggle("open");
};

const toggleProposal = (item) => {
  const content = item.querySelector(".featurelist__item__info");
  const { maxHeight } = content.style;
  content.style.maxHeight = maxHeight ? "" : `${content.scrollHeight}px`;
  content.setAttribute("aria-hidden", !!maxHeight);
  if (maxHeight) {
    content.setAttribute("tabindex", "-1");
  } else {
    content.removeAttribute("tabindex");
  }
  item.classList.toggle("open");
};

/**
 * Represents the start of this application
 */
const start = function start() {
  const items = document.querySelectorAll(
    ".featurelist__item .featurelist__item__example"
  );

  document.body.classList.remove("no-js");

  for (const item of items) {
    item.addEventListener("click", () => {
      toggleProposal(this.parentNode);
    });
    item.addEventListener("keypress", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        toggleProposal(this.parentNode);
      }
    });
  }

  document.querySelector(".menu-toggle").addEventListener("click", (ev) => {
    ev.preventDefault();
    toggleMenu();
  });

  for (const link of document.querySelectorAll(".menu-link")) {
    const submenu = link.parentNode.querySelector(".submenu");
    if (submenu) {
      link.addEventListener("click", (ev) => {
        const t = link.parentNode.querySelector(".submenu-toggle");
        ev.preventDefault();
        toggleMenu(submenu);
        t.classList.toggle("open");
      });
    }
  }

  for (const toggle of document.querySelectorAll(".submenu-toggle")) {
    toggle.addEventListener("click", (ev) => {
      const t = ev.target;
      const submenu = t.parentNode.querySelector(".submenu");
      toggleMenu(submenu);
      t.classList.toggle("open");
    });
  }
};

start();
