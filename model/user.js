var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  zone: String,
  trashday: String,
  notifEmail: Boolean,
  notifCalendar: Boolean,
  notifText: Boolean,
  created: Date
});
mongoose.model('user', userSchema);