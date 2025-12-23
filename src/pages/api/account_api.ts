import { APIRequestContext, expect } from "@playwright/test";

export class AccountApi {
	private request: APIRequestContext;
	private token!: string;
	private apiUrl: string;

	constructor(request: APIRequestContext) {
		this.request = request;

		if (!process.env.API_BASE_URL) {
			throw new Error("Missing API_BASE_URL in .env");
		}

		this.apiUrl = process.env.API_BASE_URL;
	}

	withToken(token: string): this {
		this.token = token;
		return this;
	}

	async createAccount(startBalance: number, type = "Test") {
		const response = await this.request.post(
			`${this.apiUrl}/tegb/accounts/create`,
			{
				headers: {
					Authorization: `Bearer ${this.token}`,
					"Content-Type": "application/json",
				},
				data: { startBalance, type },
			}
		);

		expect(response.status()).toBe(201);

		const body = await response.json();
		return {
			accountNumber: body.accountNumber,
			balance: body.balance,
		};
	}
}
