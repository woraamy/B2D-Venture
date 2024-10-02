from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up ChromeDriver (replace with the path to your ChromeDriver)
driver_path = "/usr/local/bin/chromedriver"
driver = webdriver.Chrome(executable_path=driver_path)

try:
    # Step 1: Navigate to the main page where the Signup button can be accessed
    driver.get("http://localhost:3000")  # Replace with your actual URL
    
    # Step 2: Click on the Signup button
    signup_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Signup"))  # Replace "Signup" with the actual link text or use another selector
    )
    signup_button.click()

    # Step 3: Wait for the signup form to load and enter details into the form fields
    # Example: Entering name, email, password (replace with actual field selectors)
    name_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.NAME, "name"))  # Replace "name" with the actual name attribute or selector of the input field
    )
    name_field.send_keys("John Doe")

    email_field = driver.find_element(By.NAME, "email")  # Replace "email" with the actual name or selector of the email field
    email_field.send_keys("johndoe@example.com")

    password_field = driver.find_element(By.NAME, "password")  # Replace "password" with the actual name or selector of the password field
    password_field.send_keys("SecurePassword123")

    confirm_password_field = driver.find_element(By.NAME, "confirm_password")  # Replace with actual name for password confirmation
    confirm_password_field.send_keys("SecurePassword123")

    # Step 4: Click the "Submit" button
    submit_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[text()='Submit']"))  # Replace with the actual selector for the submit button
    )
    submit_button.click()

    # Step 5: Verify successful signup (e.g., check for a success message or redirection)
    success_message = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "success-message"))  # Replace with an actual success message or confirmation element
    )

    assert "Signup successful" in success_message.text, "Test Failed: Signup was not successful"

    print("Test Passed: Signup was successful")

except Exception as e:
    print(f"Test Failed: {e}")

finally:
    # Step 6: Close the browser
    driver.quit()
