import { test, expect } from '@playwright/test'

test("Get User Profile", async ({ request }) => {
    const response = await request.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    });

    expect(response.status()).toBe(200);

    const jsonData = await response.json();
    expect(jsonData.firstName).toBe("Emily");
    expect(jsonData.lastName).toBe("Johnson");
    expect(jsonData.username).toBe("emilys");
    expect(jsonData.email).toBe("emily.johnson@x.dummyjson.com");
});

test.only("Get First Product ID & Retrieve the Product Details", async ({ request }) => {
    const response = await request.get("/products");
    const jsonData = await response.json();
    const product_id = jsonData.products[0].id;

    expect(response.status()).toBe(200);

    const productResponse = await request.get(`/products/${product_id}`);
    const productData = await productResponse.json();

    expect(productResponse.status()).toBe(200);
    expect(productData.id).toBe(1);
    expect(productData.title).toBe("Essence Mascara Lash Princess");
    expect(productData.brand).toBe("Essence");
    expect(productData.category).toBe("beauty");
    expect(productData.stock).toBe(99);
});