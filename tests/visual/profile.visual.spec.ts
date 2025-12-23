import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/login_page";
import { DashboardPage } from "../../src/pages/dashboard_page";

test("Profile summary visual test @github-actions", async ({ page }) => {
	const username = process.env.DASHBOARD_USERNAME;
	const password = process.env.DASHBOARD_PASSWORD;

	if (!username || !password) {
		throw new Error("Missing credentials in .env");
	}

	await new LoginPage(page).login(username, password);

	const dashboard = new DashboardPage(page);
	await dashboard.expectOnDashboard();

	await expect(dashboard.profileSummary).toContainText("Email:");

	await expect(dashboard.profileSummary).toHaveScreenshot(
		"profile-summary.png",
		{ maxDiffPixelRatio: 0.1, threshold: 0.2 }
	);
});
