"use strict";
var mongoose = require("mongoose");
var PageSchema = new mongoose.Schema({
	from : {type: String},
	to : {type: String},
},{timestamps: true});
mongoose.model("Time",PageSchema);
