import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Login API returns token", async ({ request }) => {
  const user = {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: "123498484Mrkev",
  };

  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register",
    { data: user }
  );

  const response = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
    {
      data: {
        username: user.username,
        password: user.password,
      },
    }
  );

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.access_token).toBeTruthy();
});
