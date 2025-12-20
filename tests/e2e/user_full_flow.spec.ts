import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page";
import { RegistrationPage } from "../../src/pages/registration_page";
import { faker } from "@faker-js/faker";
import { AuthApi } from "../../src/pages/api/auth_api";
import { AccountApi } from "../../src/pages/api/account_api";
import { DashboardPage } from "../../src/pages/dashboard_page.ts";

test.describe("User full flow", () => {
	test("User can complete full banking flow", async ({ page, request }) => {
		const user = {
			username: faker.internet.username(),
			email: faker.internet.email(),
			password: "Password123zelenina!",
		};

		const loginPage = new LoginPage(page);
		const registrationPage = new RegistrationPage(page);

		let accountNumber: string;
		let accountBalance: number;

		await test.step("Open application (login page)", async () => {
			await loginPage.open();
			await expect(loginPage.usernameInput).toBeVisible();
		});

		await test.step("Register new user via frontend", async () => {
			await loginPage.go_to_registration();
			await expect(registrationPage.userNameInput).toBeVisible();

			await registrationPage.fillUsername(user.username);
			await registrationPage.fillPassword(user.password);
			await registrationPage.fillEmail(user.email);
			await registrationPage.submit();

			await expect(registrationPage.successMessage).toBeVisible();
		});

		const authApi = new AuthApi(request);
		const accountApi = new AccountApi(request);

		await test.step("Login via API", async () => {
			await authApi.login(user.username, user.password);
		});

		await test.step("Create bank account via API", async () => {
			const account = await accountApi
				.withToken(authApi.getToken())
				.createAccount(10000, "Test");

			accountNumber = account.accountNumber;
			accountBalance = account.balance;

			expect(accountNumber).toBeTruthy();
			expect(accountBalance).toBe(10000);
		});

		await test.step("Login via frontend with newly created user", async () => {
			await loginPage.open();
			await loginPage.fill_username(user.username);
			await loginPage.fill_password(user.password);
			await loginPage.submit_login();

			await expect(page).toHaveURL(/\/dashboard$/);
		});

		const dashboardPage = new DashboardPage(page);
		const profileData = {
			name: faker.person.firstName(),
			surname: faker.person.lastName(),
			email: user.email,
			phone: faker.phone.number(),
			age: faker.number.int({ min: 30, max: 70 }),
		};

		await test.step("Fill and verify profile", async () => {
			await dashboardPage.expectOnDashboard();
			await dashboardPage.openEditProfile();
			await dashboardPage.fillProfile(profileData);
			await dashboardPage.expectProfileData(profileData);
		});

		await test.step("Verify bank account is visible with correct balance", async () => {
			await dashboardPage.expectAccountVisible(
				accountNumber,
				accountBalance
			);
		});

		await test.step("Logout", async () => {
			await dashboardPage.logout();
		});
	});
});
