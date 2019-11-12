import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["mydatabase"]

class connect:
    def __init__(self):
        self.db = mydb
        self.dblist = myclient.list_database_names()
        if "mydatabase" in self.dblist:
            print("The database exists.")