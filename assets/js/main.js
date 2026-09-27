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

document.body.classList.remove("no-js");

for (const item of document.querySelectorAll(".featurelist__item__example")) {
  item.addEventListener("click", () => {
    toggleProposal(item.parentNode);
  });
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleProposal(item.parentNode);
    }
  });
}

const menus = document.querySelectorAll(".menu-dropdown");

const positionMenu = (menu) => {
  const panel = menu.querySelector(".submenu");
  const bounds = menu.closest(".page-menu").getBoundingClientRect();
  panel.style.setProperty("--submenu-available-width", `${bounds.width}px`);
  panel.style.setProperty("--submenu-offset-x", "0px");
  const rect = panel.getBoundingClientRect();
  const offset = Math.max(
    bounds.left - rect.left,
    Math.min(0, bounds.right - rect.right)
  );
  panel.style.setProperty("--submenu-offset-x", `${offset}px`);
};

const positionOpenMenus = () => {
  for (const menu of menus) {
    if (menu.open) {
      positionMenu(menu);
    }
  }
};

for (const menu of menus) {
  menu.addEventListener("toggle", () => {
    if (menu.open) {
      positionMenu(menu);
    }
  });
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      event.preventDefault();
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  menu.addEventListener("focusout", (event) => {
    if (event.relatedTarget && !menu.contains(event.relatedTarget)) {
      menu.open = false;
    }
  });
}

window.addEventListener("resize", positionOpenMenus);
document.fonts.addEventListener("loadingdone", positionOpenMenus);

document.addEventListener("click", (event) => {
  for (const menu of menus) {
    if (!menu.contains(event.target)) {
      menu.open = false;
    }
  }
});
