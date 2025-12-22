import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/cs_CZ";

test("Login API returns token", async ({ request }) => {
	const apiUrl = process.env.API_BASE_URL;

	if (!apiUrl) {
		throw new Error("Missing API_BASE_URL in .env file!");
	}
	const user = {
		username: faker.internet.username(),
		email: faker.internet.email(),
		password: "123498484Mrkev",
	};

	await request.post(`${apiUrl}/api/tegb/register`, { data: user });

	const response = await request.post(`${apiUrl}/api/tegb/login`, {
		data: {
			username: user.username,
			password: user.password,
		},
	});

	expect(response.status()).toBe(201);

	const body = await response.json();
	expect(body.access_token).toBeTruthy();
});
