import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page";
import { DashboardPage } from "../../src/pages/dashboard_page";

test.describe("Dashboard Atomic Tests", () => {
	let dashboard: DashboardPage;

	test.beforeEach(async ({ page }) => {
		const username = process.env.DASHBOARD_USERNAME;
		const password = process.env.DASHBOARD_PASSWORD;

		if (!username || !password) {
			throw new Error(
				"Missing DASHBOARD_USERNAME or DASHBOARD_PASSWORD in .env"
			);
		}

		const loginPage = new LoginPage(page);
		await loginPage.open();
		await loginPage.fillUsername(username);
		await loginPage.fillPassword(password);
		await loginPage.submitLogin();

		dashboard = new DashboardPage(page);
		await dashboard.expectOnDashboard();
	});

	test("Header - Visibility and static text validation", async () => {
		await expect(dashboard.appLogo).toBeVisible();
		await expect(dashboard.appTitle).toBeVisible();
		await expect(dashboard.appTitle).toHaveText("TEG#B Dashboard");

		await expect(dashboard.logoutButton).toBeVisible();
		await expect(dashboard.logoutButton).toHaveText("Odhlásit se");
	});

	test("Left menu - Visibility and static text validation", async () => {
		await expect(dashboard.menuHome).toBeVisible();
		await expect(dashboard.menuHome).toHaveText("Domů");

		await expect(dashboard.menuAccounts).toBeVisible();
		await expect(dashboard.menuAccounts).toHaveText("Účty");

		await expect(dashboard.menuTransactions).toBeVisible();
		await expect(dashboard.menuTransactions).toHaveText("Transakce");

		await expect(dashboard.menuSupport).toBeVisible();
		await expect(dashboard.menuSupport).toHaveText("Podpora");
	});

	test("Profile section - Visibility and structure", async () => {
		await expect(dashboard.profileDetailsTitle).toBeVisible();
		await expect(dashboard.profileDetailsTitle).toHaveText(
			"Detaily Profilu"
		);

		await expect(dashboard.profilName).toContainText("Jméno:");
		await expect(dashboard.profilSurname).toContainText("Příjmení:");
		await expect(dashboard.profilEmail).toContainText("Email:");

		await expect(dashboard.editProfileButton).toBeVisible();
		await expect(dashboard.editProfileButton).toHaveText("Upravit profil");
	});

	test("Accounts section - Table headers and buttons", async () => {
		await expect(dashboard.accountsTitle).toBeVisible();
		await expect(dashboard.accountsTitle).toHaveText("Účty");

		await expect(dashboard.addAccountButton).toBeVisible();
		await expect(dashboard.addAccountButton).toHaveText("Přidat účet");

		await expect(dashboard.accountNumber).toHaveText("Číslo účtu");
		await expect(dashboard.accountBalance).toHaveText("Zůstatek");
		await expect(dashboard.accountType).toHaveText("Typ účtu");
	});

	test("Logout - Basic functionality check", async ({ page }) => {
		await dashboard.logout();
		await expect(page).toHaveURL(/\/$/);
	});
});
