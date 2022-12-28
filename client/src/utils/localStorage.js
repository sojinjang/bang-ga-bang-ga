function getSavedItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveItem(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

export { getSavedItem, saveItem };
