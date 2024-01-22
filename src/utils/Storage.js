export const getItem = key => {
  const data = JSON.parse(localStorage.getItem(key))
  return data
}

export const setItem = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data))
}

export const removeItem = key => {
  return localStorage.removeItem(key)
}

export const clearStorage = () => {
  return localStorage.clear()
};