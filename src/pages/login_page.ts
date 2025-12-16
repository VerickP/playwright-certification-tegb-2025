import { Locator, Page } from "@playwright/test";
import { RegistrationPage } from "./registration_page.ts";

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

    this.usernameInput = page.locator('input[data-testid="username-input"]');
    this.passwordInput = page.locator('input[data-testid="password-input"]');
    this.submitButton = page.locator('button[data-testid="submit-button"]');
    this.registerLink = page.locator(".bold-link");
    this.forgotPasswordLink = page.locator(
      'link[data-testid="registration-link"]'
    );
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
    return new RegistrationPage(this.page);
  }
}
