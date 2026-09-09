import { request, expect } from '@playwright/test'

module.exports = async (config) => {
    const baseURL = config.projects[0]?.use?.baseURL || "https://dummyjson.com";
    const requestContext = await request.newContext({ baseURL });

    // Retrieve the user info detail with username and password
    const response = await requestContext.post("/auth/login", {
        data: {
            username: "emilys",
            password: "emilyspass"
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    // Check the user information contain access token or not
    const jsonData = await response.json();
    expect(jsonData).toHaveProperty("accessToken");

    // Store the access token in the environment variable 'ACCESS_TOKEN'
    process.env.ACCESS_TOKEN = jsonData.accessToken;

    await requestContext.dispose();
};