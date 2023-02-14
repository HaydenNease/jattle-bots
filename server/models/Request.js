const { Schema, model } = require('mongoose');

const requestSchema = newSchema({
  requestor: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  recepient: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  status: {
    type: Int,
    default: 0,
    required: true
  }

});

const Request = model('request', requestSchema);


model.exports = Request;