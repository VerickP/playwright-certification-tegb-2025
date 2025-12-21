import { Locator, Page } from "@playwright/test";
import { RegistrationPage } from "./registration_page.ts";

export class LoginPage {
	readonly page: Page;
	readonly url: string;

	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly submitButton: Locator;
	readonly registerLink: Locator;
	readonly forgotPasswordLink: Locator;

	constructor(page: Page) {
		if (!process.env.BASE_URL) {
			throw new Error("Missing BASE_URL in .env");
		}
		this.page = page;
		this.url = process.env.BASE_URL;

		this.usernameInput = page.getByTestId("username-input");
		this.passwordInput = page.getByTestId("password-input");
		this.submitButton = page.getByTestId("submit-button");
		this.registerLink = page.getByTestId("register-button");
		this.forgotPasswordLink = page.getByTestId("registration-link");
	}

	async open() {
		await this.page.goto(this.url);
		return this;
	}

	async fillUsername(username: string) {
		await this.usernameInput.fill(username);
		return this;
	}

	async fillPassword(password: string) {
		await this.passwordInput.fill(password);
		return this;
	}

	async submitLogin() {
		await this.submitButton.click();
		return this;
	}

	async goToRegistration() {
		await this.registerLink.click();
		return new RegistrationPage(this.page);
	}
}
