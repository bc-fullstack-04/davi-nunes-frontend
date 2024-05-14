import axios from "axios";

export const userApi = axios.create({
    baseURL: "http://localhost:8081/api",
});

export const albumApi = axios.create({
	baseURL: "http://localhost:8082/api",
});