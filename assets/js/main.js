const supportsAnchoredPopovers =
  "popover" in HTMLElement.prototype &&
  CSS.supports("inset-inline-start", "anchor(start)") &&
  CSS.supports("width", "anchor-size(--navigation inline)") &&
  CSS.supports("max-block-size", "stretch") &&
  CSS.supports("position-try-fallbacks", "flip-block");

for (const menu of document.querySelectorAll(".menu-dropdown")) {
  const summary = menu.querySelector("summary");
  const panel = menu.querySelector(".submenu");

  if (supportsAnchoredPopovers) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = summary.className;
    button.textContent = summary.textContent;
    button.setAttribute("popovertarget", panel.id);
    panel.popover = "auto";
    menu.replaceWith(button, panel);

    button.parentElement.addEventListener("focusout", (event) => {
      if (
        event.relatedTarget &&
        !event.currentTarget.contains(event.relatedTarget)
      ) {
        panel.hidePopover();
      }
    });
  } else {
    menu.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.open) {
        event.preventDefault();
        menu.open = false;
        summary.focus();
      }
    });
    menu.addEventListener("focusout", (event) => {
      if (event.relatedTarget && !menu.contains(event.relatedTarget)) {
        menu.open = false;
      }
    });
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) {
        menu.open = false;
      }
    });
  }
}
