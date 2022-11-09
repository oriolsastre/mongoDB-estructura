db.restaurant.find();
db.restaurant.find({}, {restaurant_id: 1,name: 1,borough: 1,cuisine: 1});
db.restaurant.find({}, {restaurant_id: 1,name: 1,borough: 1,cuisine: 1, _id: 0});
db.restaurant.find({}, {restaurant_id: 1,name: 1,borough: 1, "address.zipcode": 1, _id: 0});
db.restaurant.find({borough: "Bronx"});
db.restaurant.find({borough: "Bronx"}).limit(5);
db.restaurant.find({borough: "Bronx"}).skip(5).limit(5);
db.restaurant.find({"grades.score": {$gt: 90} });