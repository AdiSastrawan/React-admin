export function timeFormatter(time) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }
  return new Date(time).toLocaleString(undefined, options)
}
