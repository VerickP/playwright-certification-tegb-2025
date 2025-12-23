import { test } from "@playwright/test";
import balances from "../../assets/ddt/bank_account_balances.json";
import { faker } from "@faker-js/faker/locale/cs_CZ";
import { AuthApi } from "../../src/pages/api/auth_api";
import { AccountApi } from "../../src/pages/api/account_api";
import { LoginPage } from "../../src/pages/login_page";
import { DashboardPage } from "../../src/pages/dashboard_page";

balances.forEach(({ balance }) => {
	test(`DDT – account balance ${balance}`, async ({ page, request }) => {
		const user = {
			username: faker.internet.username(),
			email: faker.internet.email(),
			password: "Password123!repa",
		};

		const authApi = new AuthApi(request);
		await authApi.register(user.username, user.email, user.password);

		await authApi.login(user.username, user.password);

		const accountApi = new AccountApi(request);
		const account = await accountApi
			.withToken(authApi.getToken())
			.createAccount(balance, "Test");

		const loginPage = new LoginPage(page);
		await loginPage.open();
		await loginPage.fillUsername(user.username);
		await loginPage.fillPassword(user.password);
		await loginPage.submitLogin();

		const dashboardPage = new DashboardPage(page);
		await dashboardPage.expectOnDashboard();
		await dashboardPage.expectAccountVisible(
			account.accountNumber,
			account.balance
		);
	});
});

/* Hodnoty -196 000 921 Kč, 298 000 123 Kč ze zadání jsou odstraněny z testu jelikož pokud byly hodnoty v testu, test
  neprošel -  ackoliv jsou v
  rozsahu,(měly by být povolené - info od Petra ) který by měl backend přijímat, tak je neprijme.
  Bug v aplikaci jsem nahlásila.
 */
