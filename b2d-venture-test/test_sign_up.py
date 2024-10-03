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
    # click at signup button
    time.sleep(2)
    singupPath = driver.find_element(By.XPATH,"/html/body/div/header/div/div/a[2]").click()
    # select at Investor sign up
    time.sleep(2)
    investor = driver.find_element(By.XPATH,'//*[@id="radix-:r0:-trigger-investor"]').click()
    # fill information
    firstname = driver.find_element(By.XPATH,'//*[@id="first-name"]').send_keys("John")
    lastname = driver.find_element(By.XPATH,'//*[@id="last-name"]').send_keys("Smith")
    email = driver.find_element(By.XPATH,'//*[@id="email"]').send_keys("Jonh.smith@gmail.com")
    phone = driver.find_element(By.XPATH,'//*[@id="phone"]').send_keys("660123456789")
    date = driver.find_element(By.XPATH,'//*[@id="birthday"]').send_keys("2004-10-02")
    nid = driver.find_element(By.XPATH,'//*[@id="national-id"]').send_keys("0123456789012")
    national = driver.find_element(By.XPATH,'//*[@id="nationality"]').send_keys("Thai")
    networth = driver.find_element(By.XPATH,'//*[@id="net-worth"]').send_keys("10000000")

    #submit
    time.sleep(2)
    submit = driver.find_element(By.XPATH, '/html/body/div/div[3]/form/div[2]/button').click()
    time.sleep(2)
    success = driver.find_element(By.XPATH, '/html/body/div/div[2]/p[1]')
    print("Test Passed: Can sign up successful")
except Exception as e:
    print(f"Test Failed: {e}")
finally:
    driver.quit()