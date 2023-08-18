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
from datetime import datetime, timezone, timedelta

from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

logging.basicConfig(level=logging.INFO)

# TODO: receive form data as input
"""
Example
-------
Rafael
Rodrigues Ghossi
rafael.ghossi@gmail.com

Natália
Turrioni Tavares
natalia.turrioni@gmail.com
"""


class BCParksReservation:
    def watch(self, date):
        while not self.check(date):
            time.sleep(2)
        os.system('say "Passes are available!"')
        self.reserve(date)

    def check(self, date):
        date = dateparser.parse(date).strftime("%Y-%m-%d")
        base_url = "jd7n1axqh0.execute-api.ca-central-1.amazonaws.com/api"
        park_params = "reservation?facility=Joffre%20Lakes&park=0363"
        response = requests.get(f"https://{base_url}/{park_params}")
        response = json.loads(response.text)
        logging.debug(response)

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
