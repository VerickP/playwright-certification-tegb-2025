import { APIRequestContext, expect } from "@playwright/test";

export class AuthApi {
	private request: APIRequestContext;
	private token!: string;
	private apiUrl: string;

	constructor(request: APIRequestContext) {
		this.request = request;
		if (!process.env.API_BASE_URL) {
			throw new Error("Missing API_BASE_URL in .env file!");
		}
		this.apiUrl = process.env.API_BASE_URL;
	}

	async login(username: string, password: string): Promise<this> {
		const response = await this.request.post(
			`${this.apiUrl}api/tegb/login`,
			{
				data: { username, password },
			}
		);

		expect(response.status()).toBe(201);

		const body = await response.json();
		this.token = body.access_token;

		expect(this.token).toBeTruthy();
		return this;
	}

	async register(username: string, email: string, password: string) {
		const response = await this.request.post(
			`${this.apiUrl}api/tegb/register`,
			{ data: { username, email, password } }
		);

		expect(response.status()).toBe(201);
	}

	getToken(): string {
		return this.token;
	}
}
