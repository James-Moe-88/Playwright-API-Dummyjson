import { request, expect } from '@playwright/test'

module.exports = async (config) => {
    const baseURL = config.projects[0]?.use?.baseURL || "https://dummyjson.com";
    const requestContext = await request.newContext({ baseURL });
    const response = await requestContext.post("/auth/login", {
        data: {
            username: "emilys",
            password: "emilyspass"
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const jsonData = await response.json();
    expect(jsonData).toHaveProperty("accessToken");

    process.env.ACCESS_TOKEN = jsonData.accessToken;

    await requestContext.dispose();
};