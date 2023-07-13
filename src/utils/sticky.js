export function setStickytoBodyAndHTML() {
  document.body.classList.add("sticky-hold");
  document.documentElement.classList.add("sticky-hold");
}

export function removeStickytoBodyAndHTML() {
  document.body.classList.remove("sticky-hold");
  document.documentElement.classList.remove("sticky-hold");
}
