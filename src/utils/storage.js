export function getStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

export function setStorage(key, data) {
    return localStorage.setItem(key, JSON.stringify(data))
}

export function removeStorage(key) {
    return localStorage.removeItem(key)
}
