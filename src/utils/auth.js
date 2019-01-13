import Cookies from 'js-cookie'

const TokenKey = 'pdr_token'

export function getToken() {
        return Cookies.get(TokenKey)
}

export function setToken(token, options) {
        return Cookies.set(TokenKey, token, options)
}

export function removeToken() {
        return Cookies.remove(TokenKey)
}
