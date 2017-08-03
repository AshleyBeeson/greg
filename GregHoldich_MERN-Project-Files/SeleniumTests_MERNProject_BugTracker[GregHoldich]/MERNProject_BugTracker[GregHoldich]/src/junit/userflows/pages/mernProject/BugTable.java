package junit.userflows.pages.mernProject;

import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindAll;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class BugTable {
	private WebDriver driver;
	
	@FindBy(css = "table.mdl-data-table.mdl-shadow--2dp")
	private	WebElement bugTable;
	
	@FindAll({@FindBy(css = "table.mdl-data-table thead tr th.mdl-data-table__cell--non-numeric")})
	private List <WebElement> colHeadings;
	
	@FindAll({@FindBy(css = "table.mdl-data-table tbody tr")})
	private List <WebElement> tableRows;
	
	@FindAll({@FindBy(css = "table.mdl-data-table tbody tr td:first-child")})
	private List <WebElement> tableRowsFirstChild;

	public WebDriver getDriver() {
		return driver;
	}

	public BugTable(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}

	public WebElement getBugTable() {
		return bugTable;
	}
	
	public List<WebElement> getColHeadings() {
		return colHeadings;
	}
	
	public List<WebElement> getTableRows() {
		return tableRows;
	}
	
	public List<WebElement> getRowFirstChild() {
		return tableRowsFirstChild;
	}


}