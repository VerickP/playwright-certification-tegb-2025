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
  readonly editProfileButton: Locator;
  readonly profileDetailsTitle: Locator;

  readonly editNameInput: Locator;
  readonly editSurnameInput: Locator;
  readonly editEmailInput: Locator;
  readonly editPhoneInput: Locator;
  readonly editAgeInput: Locator;

  readonly accountRows: Locator;
  readonly saveProfileButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.appTitle = page.getByTestId("app-title");
    this.logoutButton = page.getByTestId("logout-button");

    this.profileDetailsTitle = page.getByTestId("profile-details-title");
    this.editProfileButton = page.getByTestId("toggle-edit-profile-button");
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
    await expect(this.page.getByText(profile.name)).toBeVisible();
    await expect(this.page.getByText(profile.surname)).toBeVisible();
    await expect(this.page.getByText(profile.email)).toBeVisible();
    await expect(this.page.getByText(profile.phone)).toBeVisible();

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
