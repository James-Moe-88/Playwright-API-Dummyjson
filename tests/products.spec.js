import { test, expect } from '@playwright/test'
import { title } from 'node:process';

test("Get First Product ID & Retrieve the Product Details", async ({ request }) => {
    // Retrieve the id of first product from Product List
    const response = await request.get("/products");
    const jsonData = await response.json();
    const product_id = jsonData.products[0].id;

    // Check the status to be 200
    expect(response.status()).toBe(200);

    // Retrieve the product detail with above product id
    const productResponse = await request.get(`/products/${product_id}`);
    const productData = await productResponse.json();

    // Check the status to be 200
    expect(productResponse.status()).toBe(200);
    // Check the product details
    expect(productData.id).toBe(1);
    expect(productData.title).toBe("Essence Mascara Lash Princess");
    expect(productData.brand).toBe("Essence");
    expect(productData.category).toBe("beauty");
    expect(productData.stock).toBe(99);
});

test("Filter the product", async ({ request }) => {
    // Retrieve the product (title, price) with parameter (limit, skip and 'In Stock')
    const response = await request.get("/products", {
        params: {
            limit: "10",
            skip: "10",
            availabilityStatus: "In Stock",
            select: "title,price"
        }
    });

    // Check the status to be 200
    expect(response.status()).toBe(200);

    // Check the product count is retrun 10 or not
    const productData = await response.json();
    expect(productData.products.length).toBe(10);
});

test("Sort the products by title in ascending order", async ({ request }) => {
    const response = await request.get("/products", {
        params: {
            sortBy: "title",
            order: "asc"
        }
    });

    // Check the status to be 200
    expect(response.status()).toBe(200);
    // Check the product data
    const productDetails = await response.json();
    expect(productDetails.products[0].title).toBe("300 Touring");
    expect(productDetails.products[1].title).toBe("Amazon Echo Plus");
    expect(productDetails.products[2].title).toBe("American Football");
    expect(productDetails.products[3].title).toBe("Annibale Colombo Bed");
    expect(productDetails.products[4].title).toBe("Annibale Colombo Sofa");
    expect(productDetails.products[5].title).toBe("Apple");
    expect(productDetails.products[6].title).toBe("Apple AirPods Max Silver");
    expect(productDetails.products[7].title).toBe("Apple Airpods");
    expect(productDetails.products[8].title).toBe("Apple Airpower Wireless Charger");
    expect(productDetails.products[9].title).toBe("Apple HomePod Mini Cosmic Grey");
});

test("Update the title of product id = 1", async ({ request }) => {
    const productResponse = await request.get("/products/1");
    const productData = await productResponse.json();

    // Check the status to be 200
    expect(productResponse.status()).toBe(200);
    // Check the tile and description before update
    expect(productData.title).toBe("Essence Mascara Lash Princess");
    expect(productData.description).toBe("The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.");

    const updateResponse = await request.patch("/products/1", {
        data: {
            title: "WANDERLASH Mascara - BELLA",
            description: "WANDERLASH (BELLA) mascara delivers excellent volume and length. The formula is smooth, easy to apply, and long-lasting without smudging. Highly recommended for daily wear."
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    // Check the status to be 200
    expect(updateResponse.status()).toBe(200);

    // Check the tile and description after update
    const updateData = await updateResponse.json();
    expect(updateData.title).toBe("WANDERLASH Mascara - BELLA");
    expect(updateData.description).toBe("WANDERLASH (BELLA) mascara delivers excellent volume and length. The formula is smooth, easy to apply, and long-lasting without smudging. Highly recommended for daily wear.");
});