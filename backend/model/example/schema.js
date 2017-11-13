const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const exampleSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String }
});

var example 

try {
	example = mongoose.model('Example')
}catch (error)
{
	example = mongoose.model('Example', exampleSchema);
} 



module.exports = example;
