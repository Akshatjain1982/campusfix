import jwtDecode from 'jwt-decode';


export function saveToken(token) {
localStorage.setItem('token', token);
}
export function getToken() {
return localStorage.getItem('token');
}
export function removeToken() {
localStorage.removeItem('token');
}
export function getUserFromToken() {
const token = getToken();
if (!token) return null;
try { return jwtDecode(token); } catch (e) { return null; }
}