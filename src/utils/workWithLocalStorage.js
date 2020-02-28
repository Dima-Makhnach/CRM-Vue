function setItem (name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function getItem (name) {
  return JSON.parse(localStorage.getItem(name))
}

function removeItem (name) {
  localStorage.removeItem(name)
}

function clearAllData () {
  localStorage.clear()
}

export {
  setItem,
  getItem,
  removeItem,
  clearAllData
}
