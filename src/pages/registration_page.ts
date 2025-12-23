import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class RegistrationPage {
	readonly page: Page;
	readonly url: string;

	readonly emailInput: Locator;
	readonly userNameInput: Locator;
	readonly passwordInput: Locator;
	readonly registerButton: Locator;
	readonly successMessage: Locator;

	constructor(page: Page) {
		if (!process.env.BASE_URL) {
			throw new Error("Missing BASE_URL in .env");
		}
		this.page = page;
		this.url = `${process.env.BASE_URL}/register`;

		this.userNameInput = page.getByTestId("username-input");
		this.emailInput = page.getByTestId("email-input");
		this.passwordInput = page.getByTestId("password-input");
		this.registerButton = page.getByTestId("submit-button");
		this.successMessage = page.getByTestId("success-message");
	}
	async open() {
		await this.page.goto(this.url);
		return this;
	}

	async fillUsername(username: string) {
		await this.userNameInput.fill(username);
		return this;
	}

	async fillEmail(email: string) {
		await this.emailInput.fill(email);
		return this;
	}

	async fillPassword(password: string) {
		await this.passwordInput.fill(password);
		return this;
	}

	async submit() {
		await this.registerButton.click();
		return this;
	}
}
