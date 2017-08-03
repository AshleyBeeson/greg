package junit.userflows.pages.mernProject;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class Header {
	private WebDriver driver;
	
	@FindBy(css = "#app div.mdl-layout__container span.mdl-layout-title h6")
	private	WebElement navTitleText;
	
	@FindBy(css = "#app div.mdl-layout__container a.mdl-navigation__link > span")
	private	WebElement navSubmitBugText;
	
	@FindBy(css = "#app div.mdl-layout__container a.mdl-navigation__link > button")
	private	WebElement navSubmitBugButton;
	
	public WebDriver getDriver() {
		return driver;
	}

	public Header(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}

	public String getNavTitleText() {
		return navTitleText.getText();
	}
	public String getNavSubmitBugText() {
		return navSubmitBugText.getText();
	}
	public WebElement getNavSubmitBugButton() {
		return navSubmitBugButton;
	}

}
