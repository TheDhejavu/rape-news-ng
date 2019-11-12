from model.connect import connect

class data:
    def __init__(self):
        self.connect = connect()
        self.collection = self.connect.db["data"]

    def insert(self, data):
        self.collection.insert_many( data )