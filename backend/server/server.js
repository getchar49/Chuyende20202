var MongoClient = require('mongodb').MongoClient;

var demoPerson = {name: "John", lastName: "Smith"};
var key = {name: "John"};
MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;
    console.log("Connected!");
    var collection = client.db('demo').collection('People');
    collection.insertOne(demoPerson, function(err, result) {
        console.log('Inserted: ',result.ops[0]);
        console.log('ID: ',result.insertedId.getTimestamp());
        collection.find(key).toArray(function(err,results) {
            console.log('Results found: ',results);
            collection.deleteOne(key, function(err, results) {
                console.log('Deleted person');
                client.close();
            });
        });
    });
});