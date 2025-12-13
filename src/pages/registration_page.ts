import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/register";
  readonly emailInput: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userNameInput = page.locator('[test_id="username_input"]');
    this.emailInput = page.locator('[test_id="email-input"]');
    this.passwordInput = page.locator('[test_id="password-input"]');
    this.registerButton = page.locator('[test_id="register-button"]');
  }
  async open() {
    await this.page.goto(this.url);
    return this;
  }

  async fill_username(username: string) {
    await this.userNameInput.fill(username);
  }

  async fill_email(email: string) {
    await this.emailInput.fill(email);
  }

  async fill_password(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.registerButton.click();
  }
}
