import time

from selenium import webdriver
from selenium.webdriver.common.by import By

# Set up ChromeDriver (replace with the path to your ChromeDriver)
driver_path = "/usr/local/bin/chromedriver"
option = webdriver.ChromeOptions()
option.add_experimental_option("detach", True)
driver = webdriver.Chrome(options=option)
driver.get("http://localhost:3000")

try:
    # click at business button
    time.sleep(2)
    businessPath = driver.find_element(By.XPATH,"/html/body/div/header/div/a[3]").click()
    # click at business card
    time.sleep(2)
    businessInfo = driver.find_element(By.XPATH,"/html/body/div/main/div/div[2]/a[1]/div/div/div[1]/div/img").click()
    # click ask information button
    time.sleep(2)
    askInfo = driver.find_element(By.XPATH,"/html/body/div/main/div/div[2]/button[2]").click()
    #click allow
    time.sleep(2)
    allow = driver.find_element(By.XPATH,"/html/body/div/main/dialog/div[2]/div[2]/div/button").click()
    #check is toast message is popup
    time.sleep(1)
    success = driver.find_element(By.XPATH,"/html/body/div/main/dialog/div[1]/div/div/div[2]")
    time.sleep(2)
    url = driver.current_url
    if url == "http://localhost:3000/business/1":
        print("Test Passed: The page will display a success message. ")
    else:
        print("Test Failed: Modal is not closed")
except Exception as e:
    print(f"Test Failed: {e}")
finally:
    driver.quit()
