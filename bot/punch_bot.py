from bs4 import BeautifulSoup
import requests 
import csv
from model.data import data

class  PunchNgBot:
    def __init__(self, start_url):
        self.start_url = start_url
        self.page_count = 0
        self.data = data()
        self.file_preview = csv.writer(open('/data/preview.csv', 'w'))
        self.file_db = csv.writer(open('/data/db.csv', 'w'))
        self.file_preview.writerow(['title', 'date', 'content', 'image_url', "page_url"])
        self.file_db.writerow(['title', 'date', 'content', 'image_url', "page_url"])

    def start_page_extraction(self):
        self.page_count +=1
        self.page = requests.get( self.start_url)
        # Create a BeautifulSoup object
        self.soup = BeautifulSoup(self.page.text, 'html.parser')
        self.site_main = self.soup.find(class_="site-main")
        self.items =  self.site_main.find_all(class_="items")
        # print(self.items)
        for item in self.items:
            print( item )
         
bot = PunchNgBot("https://punchng.com/search/rape")
bot.start_page_extraction()
