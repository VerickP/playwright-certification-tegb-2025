import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.submitButton = page.locator('[data-testid="submit-button"]');
    this.registerLink = page.locator('[data-testid="register-button"]');
    this.forgotPasswordLink = page.locator('[data-testid="registration-link"]');
  }

  async open() {
    await this.page.goto(this.url);
    return this;
  }

  async fill_username(username: string) {
    await this.usernameInput.fill(username);
    return this;
  }

  async fill_password(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  async submit_login() {
    await this.submitButton.click();
  }

  async go_to_registration() {
    await this.registerLink.click();
  }
}
