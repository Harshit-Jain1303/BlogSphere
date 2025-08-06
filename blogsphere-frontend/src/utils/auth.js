// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // convert to seconds
        return decoded.exp < currentTime;
    } catch (err) {
        return true; // if token is invalid or can't be decoded
    }
};
