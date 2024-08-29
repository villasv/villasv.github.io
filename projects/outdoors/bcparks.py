#!/usr/bin/env python3
"""
Requires Selenium + Firefox + geckodriver
brew install geckodriver
"""

import dateparser
import fire
import json
import logging
import os
import requests
import time

from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

default_headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15",
    "X-App-Version": "3ebc5f89d9acbddc41f8e8bca8bea1ded750d32e",
}


class BCParksReservation:
    def watch(self, date):
        while True:
            while not self.check(date):
                time.sleep(10)
            os.system('say "Passes are available!"')
            # self.reserve(date)

    def check(self, date):
        date = dateparser.parse(date).strftime("%Y-%m-%d")
        base_url = "jd7n1axqh0.execute-api.ca-central-1.amazonaws.com/api"
        park_params = "reservation?facility=Joffre%20Lakes&park=0363"
        response = requests.get(
            f"https://{base_url}/{park_params}", headers=default_headers
        )
        response = json.loads(response.text)
        print(response)

        capacity = response[date]["DAY"]["capacity"]
        if capacity == "Full":
            logging.info(f"No capacity left for {date}")
            return False
        else:
            logging.info(f"Passes found for {date}: {capacity}")
            return True

    def reserve(self, date):
        driver = Firefox()
        driver.maximize_window()
        driver.get("https://reserve.bcparks.ca/dayuse/registration")
        aria_label = "Book a pass for Joffre Lakes Provincial Park"
        book_a_pass_button = WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, f"[aria-label='{aria_label}']")
            )
        )
        book_a_pass_button.location_once_scrolled_into_view
        time.sleep(1)
        book_a_pass_button.click()


if __name__ == "__main__":
    fire.Fire(BCParksReservation)
