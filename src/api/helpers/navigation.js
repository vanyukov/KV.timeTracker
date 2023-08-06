export function isYearInUrl() {
  return /\/\d{4}\//.test(window.location.pathname)
}
