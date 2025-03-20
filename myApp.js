require('dotenv').config();
const mongoose = require('mongoose')
const uri = process.env.MONGO_URI
const Schema = mongoose.Schema;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const personSchema = new Schema({
  name : { type: String, requiered: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

3
const createAndSavePerson = (done) => {
  var diegoAraya = new Person({name: "Diego Araya", age: 23, favoriteFoods: ["Limonpie"]})

  diegoAraya.save(function(err, data) {
    if (err) return console.error(err)
      done(null , data);
  });
};

var arrayOfPeople = [
  {name: 'Raul', age: 53, favoriteFoods: ['Pizza']},
  {name: 'Maria', age: 43, favoriteFoods: ['Empanadas']}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null , people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, docs) {
    if (err) return console.log(err);
      done(null , docs);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, comia) {
    if (err) return console.log(err);
    done(null, comia);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, id) {
    if(err) return console.log(err);
    done(null, id)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, id) => {
    if(err) return console.log(err);

    id.favoriteFoods.push(foodToAdd);

    id.save((err, updatePerson) => {
      if(err) return console.log(err);
      done(null, updatePerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (err,updateDoc) => {
    if(err) return console.log(err);
    done(null, updateDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if(err) return console.log(err);
    done(null, person);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  Person.remove({name: nameToRemove}, (err, remo) => {
    if(err) return console.log(err);
    done(null, remo)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select("-age")
  .exec(function(error, peaple) {
    if(error) return console.log(error);
    done(null, peaple);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
