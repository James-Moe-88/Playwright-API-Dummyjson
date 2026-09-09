import { test, expect } from '@playwright/test'

test("Add to Cart", async ({ request }) => {
    // Retrieve the id of first product from Product List
    const response = await request.get("/products");
    const jsonData = await response.json();
    const product_id = jsonData.products[0].id;

    // Check the status be be 200
    expect(response.status()).toBe(200);

    // Add to Cart -> above product id with quantity 4
    const cartResponse = await request.post("/carts/add", {
        data: {
            "userId": 1,
            "products": [
                {
                    "id": `${product_id}`,
                    "quantity": 4
                }
            ]
        },
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    const cartData = await cartResponse.json();

    // Check the status to be 201
    expect(cartResponse.status()).toBe(201);
    // Check the card id and product detail
    expect(cartData.id).toBe(209);
    expect(cartData.products[0].id).toBe(1);
    expect(cartData.products[0].title).toBe("Essence Mascara Lash Princess");
    expect(cartData.products[0].quantity).toBe(4);
});

test("Get Cart Details", async ({ request }) => {
    const response = await request.get("/carts/30");
    const cartDetails = await response.json();

    // Check the status to be 200
    expect(response.status()).toBe(200);
    // Check the cart details
    expect(cartDetails.id).toBe(30);
    // Check the cart contain 6 products or not
    expect(cartDetails.products.length).toBe(6);
    // Check the details of products in the cart
    expect(cartDetails.products[0].title).toBe("Cricket Bat");
    expect(cartDetails.products[0].quantity).toBe(1);
    expect(cartDetails.products[1].title).toBe("Vivo V9");
    expect(cartDetails.products[1].quantity).toBe(2);
    expect(cartDetails.products[2].title).toBe("Oppo F19 Pro Plus");
    expect(cartDetails.products[2].quantity).toBe(1);
    expect(cartDetails.products[3].title).toBe("Yellow Peeler");
    expect(cartDetails.products[3].quantity).toBe(1);
    expect(cartDetails.products[4].title).toBe("Powder Canister");
    expect(cartDetails.products[4].quantity).toBe(5);
    expect(cartDetails.products[5].title).toBe("Durango SXT RWD");
    expect(cartDetails.products[5].quantity).toBe(5);
    expect(cartDetails.totalQuantity).toBe(15);
});