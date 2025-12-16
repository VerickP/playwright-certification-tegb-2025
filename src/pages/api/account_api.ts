import { APIRequestContext, expect } from "@playwright/test";

export class AccountApi {
  private request: APIRequestContext;
  private token!: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  withToken(token: string): this {
    this.token = token;
    return this;
  }

  async createAccount(startBalance: number, type: string) {
    const response = await this.request.post(
      "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create",
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
