db.restaurant.find();
db.restaurant.find({}, {restaurant_id: 1,name: 1,borough: 1,cuisine: 1});
db.restaurant.find({}, {restaurant_id: 1,name: 1,borough: 1,cuisine: 1, _id: 0});
db.restaurant.find({}, {restaurant_id: 1,name: 1,borough: 1, "address.zipcode": 1, _id: 0});
db.restaurant.find({borough: "Bronx"});
db.restaurant.find({borough: "Bronx"}).limit(5);
db.restaurant.find({borough: "Bronx"}).skip(5).limit(5);
db.restaurant.find({"grades.score": {$gt: 90} });
//
db.restaurant.find({"address.coord.0": {$lt:-95.754168}});
db.restaurant.find({cuisine: {$not: /American/i}, "grades.score": {$gt: 70}, "address.coord.0": {$lt: -65.754168}});
db.restaurant.find({cuisine: {$not: /American/i}, "grades.score": {$gt: 70}, "address.coord.0": {$lt: -65.754168}});
db.restaurant.find({cuisine: {$not: /American/i}, "grades.grade": "A", borough: {$ne: "Brooklyn"}}).sort({cuisine: -1});
db.restaurant.find({name: /^Wil/i},{restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});
db.restaurant.find({name: /ces$/i},{restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});
db.restaurant.find({name: /Reg/i },{restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});
db.restaurant.find({$and: [{borough: /Bronx/},{$or: [{cuisine: /American/},{cuisine: /Chinese/}]}]});
db.restaurant.find({$or: [{borough: /Staten Island/},{borough: /Queens/},{borough: /Bronx/},{borough: /Brooklyn/}]},{restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});
db.restaurant.find({$and: [{borough: {$not: /Staten Island/}},{borough: {$not: /Queens/}},{borough: {$not: /Bronx/}},{borough: {$not: /Brooklyn/}}]},{restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});
db.restaurant.find({"grades.score": {$lt: 10}},{restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});
//no té sentit