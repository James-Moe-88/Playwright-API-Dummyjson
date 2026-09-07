import { test, expect } from '@playwright/test'

test.only("Get Token", async ({ request }) => {
    const userInfo = {
        username: "emilys",
        password: "emilyspass"
    }

    const response = await request.post("https://dummyjson.com/auth/login", {
        data: userInfo,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    expect(response.status()).toBe(200);
    const jsonData = await response.json();

    console.log(jsonData.accessToken);

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3ODg3NzYzMDYsImV4cCI6MTc4ODc3OTkwNn0.axDo5cOcnhCzJSKGrRAoO89UkXl6zBAe4_oxEwyHzd4
});