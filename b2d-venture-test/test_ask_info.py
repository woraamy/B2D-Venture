from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up ChromeDriver (replace with the path to your ChromeDriver)
driver_path = "/usr/local/bin/chromedriver"
driver = webdriver.Chrome(executable_path=driver_path)

try:
    # Step 1: Navigate to the main page where the business page can be accessed
    driver.get("http://localhost:3000/business")  # Replace with your actual URL
    
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

    # Step 4: Click the "Ask for more information" button
    ask_info_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "ask-info"))  # Replace with the actual selector for the "Ask for more information" button
    )
    ask_info_button.click()

    # Step 5: Enter details into the form fields
    # Example: Entering name, email, and message (replace with actual field selectors)
    name_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.NAME, "name"))  # Replace "name" with the actual name attribute or selector of the input field
    )
    name_field.send_keys("John Doe")

    email_field = driver.find_element(By.NAME, "email")  # Replace "email" with the actual name or selector of the email field
    email_field.send_keys("johndoe@example.com")

    message_field = driver.find_element(By.NAME, "message")  # Replace "message" with the actual name or selector of the message field
    message_field.send_keys("I would like to know more about your business services.")

    # Step 6: Click the "Submit" button
    submit_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[text()='Submit']"))  # Replace with the actual selector for the submit button
    )
    submit_button.click()

    # Step 7: Verify submission (could be a success message or URL change)
    success_message = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "success-message"))  # Replace with an actual success message or confirmation element
    )

    assert "Thank you" in success_message.text, "Test Failed: Submission was not successful"

    print("Test Passed: Form was submitted successfully")

except Exception as e:
    print(f"Test Failed: {e}")

finally:
    # Step 8: Close the browser
    driver.quit()
