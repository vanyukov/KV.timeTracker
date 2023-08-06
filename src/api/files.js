export function saveData(data, fileName) {
  var a = document.createElement("a")
  document.body.appendChild(a)
  a.style = "display: none"
  var blob = new Blob([data], { type: "octet/stream" }),
    url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = fileName
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}
