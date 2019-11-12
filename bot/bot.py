from bs4 import BeautifulSoup
import requests 
import csv
from model.data import data

class Bot:
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
        self.site_content = self.soup.find(class_="rtp-site-content")
        self.site_main = self.soup.find(class_="site-main")

        self.site_articles = self.site_main.find_all(class_="rtp-listing-post")

        # Use .contents to pull out the <a> tag’s children
        for article in self.site_articles:
            # print(article.prettify())
            header = article.find("header",class_= "entry-header")
            title = header.find("h2", class_="entry-title").find("a")
            page_url = title["href"]
            title = title.get_text()
            
            content = article.find(class_="rtp-post-content")
            content = content.find(class_="entry-content").find("p").contents[0]
            
            date = header.find(class_="posted-on").find("time").get_text()
            # content = article.find(class_="entry-content").find("p").contents[0]
            
            thumbnail = article.find(class_="rtp-post-thumbnail")
            
            if thumbnail:
                image_url = thumbnail.find("img")["src"]
            else:
                image_url = "null"
            
            # print([title, date, content, image_url, page_url])
            # Add each data to a row
            self.file_preview.writerow([title, date, content, image_url, page_url])
            # self.file_db.writerow([title, date, content, image_url, page_url])

            collection_data = self.data.collection.find_one({"page_url": page_url})
           
            if collection_data == None:
                content = self.extract_content_from_link( page_url)
                self.data.collection.insert_one({
                    "title": title,
                    "date": date,
                    "content": content,
                    "image_url": image_url,
                    "page_url": page_url,
                    "company": "Vanguardngr",
                    "type":"website"
                })
            
        print(self.page_count)
        self.next_page()

    def extract_content_from_link(self, link):
        page = requests.get( link)
        
        # Create a BeautifulSoup object
        soup = BeautifulSoup(page.text, 'html.parser')

        site_content = soup.find(class_="rtp-site-content")

        content = site_content.find(class_="entry-content").get_text()
        # print(content)
        return content.encode("utf-8")
            
    def next_page(self):
        self.pagination = self.site_content.find("nav", class_="rtp-pagination")
        self.next_link = self.pagination.find("a", class_="next")

        if self.next_link:
            self.next_link = self.next_link["href"] 
            self.start_url = self.next_link
            self.start_page_extraction()
        else:
            self.update_file()
            print("___EXTRACTION DONE____")

    def update_file(self):
        collection_data = self.data.collection.find({})
        for row in collection_data:
            title = row["title"]
            date = row["date"]
            content = row["content"]
            image_url = row["image_url"]
            page_url = row["page_url"]
            self.file_db.writerow([title, date, content, image_url, page_url])

bot = Bot("https://www.vanguardngr.com/tag/rape/")
bot.start_page_extraction()
