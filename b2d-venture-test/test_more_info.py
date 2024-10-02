from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up ChromeDriver (replace with the path to your ChromeDriver)
driver_path = "/usr/local/bin/chromedriver"
driver = webdriver.Chrome(executable_path=driver_path)

try:
    # Step 1: Navigate to the main page where the business page can be accessed
    driver.get("http://localhost:3000")  # Replace with your actual URL
    
    # Step 2: Click on the business page link/button
    business_page_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Business"))  # Replace "Business" with the actual link text or use another selector
    )
    business_page_button.click()

    # Step 3: Wait for the business page to load and click on a business card
    business_card = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "business-card"))  # Replace with the actual class or selector for the business card
    )
    business_card.click()

    # Step 4: Verify the business information page is loaded by checking for a unique element
    business_info_header = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "h1"))  # Assuming the business information page has an h1 element
    )
    
    # Optional: Verify the URL of the business information page
    current_url = driver.current_url
    assert "business-info" in current_url, "Test Failed: Not on the business information page"

    # Verify the business information header
    assert business_info_header.text == "Business Information", "Test Failed: Incorrect page header"

    print("Test Passed: Successfully navigated to the business information page")

except Exception as e:
    print(f"Test Failed: {e}")

finally:
    # Step 5: Close the browser
    driver.quit()
