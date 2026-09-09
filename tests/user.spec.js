import { test, expect } from '@playwright/test'

test.skip("Get User Profile with Bearer Token", async ({ request }) => {
    // Retrieve the user info with Bearer Token
    // That token is store in global-setup.js
    // If the script fail, please check 'globalSetup' in the playwright.config.js
    const response = await request.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    });

    // Check the status to be 200
    expect(response.status()).toBe(200);

    // Check the user info details
    const jsonData = await response.json();
    expect(jsonData.firstName).toBe("Emily");
    expect(jsonData.lastName).toBe("Johnson");
    expect(jsonData.username).toBe("emilys");
    expect(jsonData.email).toBe("emily.johnson@x.dummyjson.com");
});