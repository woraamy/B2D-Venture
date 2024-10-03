import time

from selenium import webdriver
from selenium.webdriver.common.by import By

# Set up ChromeDriver (replace with the path to your ChromeDriver)
driver_path = "/usr/local/bin/chromedriver"
option = webdriver.ChromeOptions()
option.add_experimental_option("detach", True)
driver = webdriver.Chrome(options=option)
driver.get("http://localhost:3000")
businessname = ""

try:
    # click at business button
    time.sleep(2)
    businessPath = driver.find_element(By.XPATH,"/html/body/div/header/div/a[3]").click()
    # find business name on the card
    time.sleep(2)
    businessname = driver.find_element(By.XPATH,"/html/body/div/main/div/div[2]/a[1]/div/div/div[2]/div/div[2]/div[1]/h2").text
    time.sleep(2)
    # click at business card
    businessInfo = driver.find_element(By.XPATH,"/html/body/div/main/div/div[2]/a[1]/div/div/div[1]/div/img").click()
    time.sleep(2)
    # find business name on the card
    businessInfoName = driver.find_element(By.XPATH,"html/body/div/main/div/div[1]/div[1]/div[2]/h1").text
    # Check if correct business
    if businessname == businessInfoName:
        print("Test Passed: Form was submitted successfully and Show the correct business information ")
    else:
        print( print("Test Failed: The business name does not match."))
except Exception as e:
    print(f"Test Failed: {e}")
finally:
    driver.quit()