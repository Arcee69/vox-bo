/* eslint-disable import/no-anonymous-default-export */
class TokenService {
    getToken() {
        return localStorage.getItem("token")
    }
    setToken(token) {
        return localStorage.setItem("token", token)
    }
    removeUser() {
        localStorage.removeItem("token")
    }
}
export default new TokenService();
