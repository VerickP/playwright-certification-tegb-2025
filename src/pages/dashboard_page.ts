import { Page, Locator, expect } from "@playwright/test";

interface UserProfile {
	name: string;
	surname: string;
	email: string;
	phone: string;
	age: number;
}

export class DashboardPage {
	readonly page: Page;

	readonly appTitle: Locator;
	readonly logoutButton: Locator;
	readonly appLogo: Locator;

	readonly menuHome: Locator;
	readonly menuAccounts: Locator;
	readonly menuTransactions: Locator;
	readonly menuSupport: Locator;

	readonly editProfileButton: Locator;
	readonly profileDetailsTitle: Locator;

	readonly profilName: Locator;
	readonly profilSurname: Locator;
	readonly profilEmail: Locator;
	readonly profilPhone: Locator;
	readonly profilAge: Locator;

	readonly accountsTitle: Locator;
	readonly accountNumber: Locator;
	readonly accountBalance: Locator;
	readonly accountType: Locator;
	readonly addAccountButton: Locator;

	// detail profilu edit

	readonly editNameInput: Locator;
	readonly editSurnameInput: Locator;
	readonly editEmailInput: Locator;
	readonly editPhoneInput: Locator;
	readonly editAgeInput: Locator;

	readonly accountRows: Locator;
	readonly saveProfileButton: Locator;
	readonly profileSummary: Locator;

	constructor(page: Page) {
		this.page = page;

		this.appTitle = page.getByTestId("app-title");
		this.appLogo = page.getByTestId("logo-img");
		this.logoutButton = page.getByTestId("logout-button");

		this.menuHome = page.locator("//li[contains(text(),'Domů')]");
		this.menuAccounts = page.locator("//li[contains(text(),'Účty')]");
		this.menuTransactions = page.locator(
			"//li[contains(text(),'Transakce')]"
		);
		this.menuSupport = page.locator("//li[contains(text(),'Podpora')]");

		this.profileSummary = page.getByTestId("account-summary");
		this.profileDetailsTitle = page.getByTestId("profile-details-title");
		this.editProfileButton = page.getByTestId("toggle-edit-profile-button");

		this.profilName = page.getByTestId("name");
		this.profilSurname = page.getByTestId("surname");
		this.profilEmail = page.getByTestId("email");
		this.profilPhone = page.getByTestId("phone");
		this.profilAge = page.getByTestId("age");

		this.accountsTitle = page.getByTestId("accounts-title");
		this.accountNumber = page.getByTestId("account-number-heading");
		this.accountBalance = page.getByTestId("account-balance-heading");
		this.accountType = page.getByTestId("account-type-heading");
		this.addAccountButton = page.getByTestId("add-account-button");

		this.editNameInput = page.getByTestId("chage-name-input");
		this.editSurnameInput = page.getByTestId("chage-surname-input");
		this.editEmailInput = page.getByTestId("chage-email-input");
		this.editPhoneInput = page.getByTestId("chage-phone-input");
		this.editAgeInput = page.getByTestId("chage-age-input");
		this.saveProfileButton = page.getByTestId("save-changes-button");
		this.accountRows = page.locator("table tbody tr");
	}

	async expectOnDashboard() {
		await expect(this.page).toHaveURL(/\/dashboard$/);
		await expect(this.appTitle).toBeVisible();
		return this;
	}

	async openEditProfile() {
		await this.editProfileButton.click();
		await expect(this.profileDetailsTitle).toBeVisible();
		await expect(this.editNameInput).toBeVisible({ timeout: 10000 });
		return this;
	}
	async fillProfile(profile: UserProfile) {
		await this.editNameInput.waitFor({ state: "visible" });
		await this.editNameInput.fill(profile.name);
		await this.editSurnameInput.fill(profile.surname);
		await this.editEmailInput.fill(profile.email);
		await this.editPhoneInput.fill(profile.phone);
		await this.editAgeInput.fill(profile.age.toString());
		await this.saveProfileButton.click();

		await expect(this.saveProfileButton).toBeHidden();
		return this;
	}

	async expectProfileData(profile: UserProfile) {
		await expect(this.page.getByTestId("name")).toContainText(profile.name);
		await expect(this.page.getByTestId("surname")).toContainText(
			profile.surname
		);
		await expect(this.page.getByTestId("email")).toContainText(
			profile.email
		);
		await expect(this.page.getByTestId("phone")).toContainText(
			profile.phone
		);

		await expect(this.page.getByTestId("age")).toContainText(
			profile.age.toString()
		);
		return this;
	}
	async expectAccountVisible(accountNumber: string, balance: number) {
		const row = this.page.locator("table tbody tr", {
			hasText: accountNumber,
		});

		await expect(row).toBeVisible();
		await expect(row).toContainText(balance.toString());
		return this;
	}

	async logout() {
		await this.logoutButton.click();
		return this;
	}
}
