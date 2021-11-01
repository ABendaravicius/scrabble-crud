import axios from "axios";

const http = axios.create({
    baseURL: process.env.APP_URL as string,
    timeout: 100000,
    headers: {
        Authorization: "Bearer secret",
        common: {
            Accept: "application/json;charset=utf-8",
            "Content-Type": "text/plain",
            "Strict-Transport-Security": "max-age=7776000; includeSubDomains",
            "X-XSS-Protection": "1; mode=block",
            "X-Content-Type-Options": "nosniff"
        }
    }
});

export default http;
