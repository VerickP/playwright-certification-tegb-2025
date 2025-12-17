import { APIRequestContext, expect } from "@playwright/test";

export class AuthApi {
  private request: APIRequestContext;
  private token!: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(username: string, password: string): Promise<this> {
    const response = await this.request.post(
      "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
      { data: { username, password } }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();
    this.token = body.access_token;

    expect(this.token).toBeTruthy();
    return this;
  }

  getToken(): string {
    return this.token;
  }
  async register(username: string, email: string, password: string) {
    const response = await this.request.post(
      "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register",
      {
        data: { username, email, password },
      }
    );

    expect(response.status()).toBe(201);
  }
}
