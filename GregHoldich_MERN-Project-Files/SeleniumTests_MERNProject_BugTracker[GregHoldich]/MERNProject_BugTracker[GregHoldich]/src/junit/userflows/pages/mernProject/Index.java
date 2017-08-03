package junit.userflows.pages.mernProject;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class Index {
	private WebDriver driver;
	
	public WebDriver getDriver() {
		return driver;
	}

	public Index(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}

	public String getURL() {
		return Constants.getBaseUrl();
	}
}
