package junit.userflows.tests.mernProject;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.relevantcodes.extentreports.ExtentReports;
import com.relevantcodes.extentreports.ExtentTest;
import com.relevantcodes.extentreports.LogStatus;

import junit.userflows.pages.mernProject.Constants;
import junit.userflows.pages.mernProject.Index;
import junit.userflows.pages.mernProject.Header;
import junit.userflows.pages.mernProject.BugTable;

public class BugTrackerTests {
	static WebDriver driver;
	ExtentReports report;
	ExtentTest logger;
	Index index;
	Header header;
	BugTable bugTable;

	@Parameters("browser")
	@BeforeClass
	public static void setUpBeforeClass(String browser) {
		if(browser.equalsIgnoreCase("firefox")) {
			System.setProperty("webdriver.gecko.driver", "libs\\Selenium\\geckodriver.exe");
		    FirefoxProfile profile = new FirefoxProfile();
		    profile.setPreference("browser.tabs.remote.autostart", false);
		    profile.setPreference("browser.tabs.remote.autostart.1", false);
		    profile.setPreference("browser.tabs.remote.autostart.2", false);                                                         
		    profile.setPreference("browser.tabs.remote.force-enable", "false");
			driver = new FirefoxDriver(profile);
			driver.manage().window().maximize();
		} else if (browser.equalsIgnoreCase("chrome")) {
			System.setProperty("webdriver.chrome.driver", "libs\\Selenium\\chromedriver.exe");
			ChromeOptions options = new ChromeOptions();
			options.addArguments("--start-maximized");
			driver = new ChromeDriver(options);
		}
		
	}
	
	@Parameters("browser")
	@BeforeTest
	public void setUp(String browser) {
		if(browser.equalsIgnoreCase("firefox"))
		report = new ExtentReports("test-reports\\extentReport_MERN-Project_firefox.html");
		else if (browser.equalsIgnoreCase("chrome"))
		report = new ExtentReports("test-reports\\extentReport_MERN-Project_chrome.html");
	}
	
	@Test(priority = 1, enabled = true)
	public void testMERNProjectUserFlow_loadingWebsite_navigateToHomepage() {
		logger = report.startTest("MERN Project User Flow");
		logger.log(LogStatus.INFO, "Browser started.");
		logger.log(LogStatus.INFO, "Navigating to Bug tracker...");
		driver.get(Constants.getBaseUrl());
		index = new Index(driver);
		
		logger.log(LogStatus.INFO, "Verifying Bug tracker has loaded...");
		assertTrue(isPageLoaded(5));
		logger.log(LogStatus.PASS, "Verified Bug tracker has loaded.");
		assertEquals(index.getURL(), driver.getCurrentUrl());
		logger.log(LogStatus.PASS, "Verified Bug tracker URL.");
	}
	
	@Test(priority = 2, enabled = true)	
	public void testMERNProjectUserFlow_verifyingElementsExist_Header() {
		header = new Header(driver);
		
		logger.log(LogStatus.INFO, "Starting Tests on Header.");
		assertEquals(header.getNavTitleText(), "Bug Tracker");
		logger.log(LogStatus.PASS, "Verified that the navbar title 'Bug Tracker' is displayed.");
		assertEquals(header.getNavSubmitBugText(), "Submit Bug");
		logger.log(LogStatus.PASS, "Verified that the submit bug text 'Submit Bug' is displayed.");
		assertTrue(header.getNavSubmitBugButton().isDisplayed());
		logger.log(LogStatus.PASS, "Verified that the submit bug button is displayed.");
	}
	
	@Test(priority = 3, enabled = true)	
	public void testMERNProjectUserFlow_verifyingElementsExist_BugTrackerContent() {
		bugTable = new BugTable(driver);
		
		logger.log(LogStatus.INFO, "Starting Tests on Content body.");
		assertTrue(bugTable.getBugTable().isDisplayed());
		logger.log(LogStatus.PASS, "Verified that the table is displayed, which is used to contain bugs.");
		assertTrue(bugTable.getColHeadings().size() == 10);
		logger.log(LogStatus.PASS, "Verified that the table has 10 columns.");
		assertTrue(bugTable.getColHeadings().get(0).getText().startsWith("ID"));
		logger.log(LogStatus.PASS, "Verified that column 0 contains the text 'ID'.");
		assertTrue(bugTable.getColHeadings().get(1).getText().startsWith("Issue ID"));
		logger.log(LogStatus.PASS, "Verified that column 1 contains the text 'Issue ID'.");
		assertTrue(bugTable.getColHeadings().get(2).getText().startsWith("Summary"));
		logger.log(LogStatus.PASS, "Verified that column 2 contains the text 'Summary'.");
		assertTrue(bugTable.getColHeadings().get(3).getText().startsWith("High Priority"));
		logger.log(LogStatus.PASS, "Verified that column 3 contains the text 'High Priority'.");
		assertTrue(bugTable.getColHeadings().get(4).getText().startsWith("Severity"));
		logger.log(LogStatus.PASS, "Verified that column 4 contains the text 'Severity'.");
		assertTrue(bugTable.getColHeadings().get(5).getText().startsWith("Reporter"));
		logger.log(LogStatus.PASS, "Verified that column 5 contains the text 'Reporter'.");
		assertTrue(bugTable.getColHeadings().get(6).getText().startsWith("AssignedUser"));
		logger.log(LogStatus.PASS, "Verified that column 6 contains the text 'AssignedUser'.");
		assertTrue(bugTable.getColHeadings().get(7).getText().startsWith("Status"));
		logger.log(LogStatus.PASS, "Verified that column 7 contains the text 'Status'.");
		assertTrue(bugTable.getColHeadings().get(8).getText().startsWith("Date Created"));
		logger.log(LogStatus.PASS, "Verified that column 8 contains the text 'Date Created'.");
		assertTrue(bugTable.getColHeadings().get(9).getText().startsWith("Manage"));
		logger.log(LogStatus.PASS, "Verified that column 9 contains the text 'Manage'.");
		
		assertTrue(bugTable.getTableRows().size() == 6);
		logger.log(LogStatus.PASS, "Verified that the table has 6 Bugs(Rows) displaying.");

	}
	
	public boolean isPageLoaded(int timeout) {
		WebDriverWait wait = new WebDriverWait(driver, timeout);
		return wait.until((ExpectedCondition<Boolean>) w ->
        ((JavascriptExecutor) w).executeScript("return document.readyState").equals("complete"));
	}
	
	public void waitForElementVisible(WebElement element, int timeout) {
		WebDriverWait wait = new WebDriverWait(driver, timeout);
		wait.until(ExpectedConditions.visibilityOf(element));
	}
	
	public void delay() {
		try {
			Thread.sleep(1500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	@AfterTest
	public void tearDown() {
		report.endTest(logger);
		report.flush();
	}
	
	@AfterClass
	public static void tearDownAfterClass() {
		driver.quit();
	}

}