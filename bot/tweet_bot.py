import tweepy
import os
import datetime as dt
import jsonpickle
import pandas as pd
import csv
# from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

class TweetCrawler:
    def __init__(self):
        self.start_date = dt.datetime(2016, 6, 1, 0, 0, 0)
        self.end_date =   dt.datetime(2019, 1, 1, 0, 0, 0)
        self.connect_to_twitter()
    def connect_to_twitter(self):
        consumer_key = os.getenv("TWITTER_API_CONSUMER_KEY")
        consumer_secret = os.getenv("TWITTER_API_CONSUMER_SECRET")
        access_token = os.getenv("TWITTER_API_ACCESS_TOKEN")
        access_token_secret = os.getenv("TWITTER_API_ACCESS_TOKEN_SECRET")

        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        self.api = tweepy.API(auth)

    def save_tweets(self, filepath, limit, query, lang):
        tweet_count = 0
        with open(filepath, 'w') as file:
            for tweet in tweepy.Cursor(self.api.search, q=query,lang=lang).items(limit):
                file.write(jsonpickle.encode(tweet._json, unpicklable=False) + '\n')
                tweet_count += 1

            #Display how many tweets we have collected
            print("Downloaded {0} tweets".format(tweet_count))

    def get_tweets(self, filepath):
        tweets = list(open(filepath, 'r'))
        text = []
        _id = []
        date = []
        url = []
        reply = []
        user = []
        screen_name = []

        for t in tweets:
            
            t = jsonpickle.decode(t)

            # print(t["id"])

            _id.append(t["id"])

            text.append(t['text'])
            
            # Decompose date
            date.append(t['created_at'])

            #tweet url
            url.append("https://twitter.com/{0}/status/{1}".format(t['user']['screen_name'], t["id"]))
            
            # Is reply?
            if t['in_reply_to_status_id'] == None:
                reply.append(0)
            else:
                reply.append(1)       
            
            # Add user
            user.append(t['user']['name'])

            # Add screen name
            screen_name.append(t['user']['screen_name'])
            
        d = {
            "id": _id,
            'text': text,
            'date': date,
            'url': url,
            'is_reply': reply,
            'user': user,
            'screen_name' : screen_name
        }
      
        df = pd.DataFrame(data = d)
        df.to_csv(os.path.abspath("rapeInNigeria/bot/data/tweets.csv"), index = None, header=True)
       

if __name__ == "__main__":
    # print(os.path.abspath("rapeInNigeria/bot/data/tweets.json"))
    twitter_crawler = TweetCrawler()
    twitter_crawler.save_tweets(
        filepath = os.path.abspath("rapeInNigeria/bot/data/tweets.json"),
        limit=50000, 
        query="rape AND nigeria", 
        lang="en"
    )
    print(twitter_crawler.get_tweets(os.path.abspath("rapeInNigeria/bot/data/tweets.json")))