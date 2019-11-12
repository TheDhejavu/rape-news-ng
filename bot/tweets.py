import GetOldTweets3 as got

tweetCriteria = got.manager.TweetCriteria().setQuerySearch('rape')\
                                           .setSince("2016-01-01")\
                                           .setUntil("2019-05-30")\
                                            .setWithin ("-33.8670522,151.1957362")\
                                           .setMaxTweets(30000000)

tweets = got.manager.TweetManager.getTweets(tweetCriteria)
print(len(tweets))
for i in range(len(tweets)):
    print( tweets[i].date )