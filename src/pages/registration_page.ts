import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/register";
  readonly emailInput: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userNameInput = page.locator('input[data-testid="username-input"]');
    this.emailInput = page.locator('input[data-testid="email-input"]');
    this.passwordInput = page.locator('input[data-testid="password-input"]');
    this.registerButton = page.locator('[data-testid="submit-button"]');
    this.successMessage = page.locator(
      '[data-testid="sdata-testid="success-message""]'
    );
  }
  async open() {
    await this.page.goto(this.url);
    return this;
  }

  async fill_username(username: string) {
    await this.userNameInput.fill(username);
    return this;
  }

  async fill_email(email: string) {
    await this.emailInput.fill(email);
    return this;
  }

  async fill_password(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  async submit() {
    await this.registerButton.click();
    return this;
  }
}
