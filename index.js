var AWS = require('aws-sdk/');
AWS.config.region = 'eu-central-1';

var docClient = new AWS.DynamoDB.DocumentClient()

// TODO retry logic

module.exports = {
  TableName: 'lambda',
  retries: 3,
  delay: 2000,
  get: get,
  set: set,
};

function get (key, callback, retry) {
  retry = retry === undefined ? module.exports.retries : retry;

  docClient.get({
    TableName: module.exports.TableName,
    Key:{
      "id": key
    }
  }, function(err, data) {
      if (err) {
          return callback(err);
      }

      if (!data.Item || data.Item.data_value === undefined) {
        return callback(null, undefined);
      }

      return callback(null, {
        id: key,
        value: JSON.parse(data.Item.data_value)
      });
  });
}

function set(key, value, callback, retry) {
  retry = retry === undefined ? module.exports.retries : retry;

  docClient.update({
    TableName: module.exports.TableName,
    Key:{
      "id": key
    },
    UpdateExpression: "set data_value = :v",
    ExpressionAttributeValues:{
        ":v": JSON.stringify(value)
    },
    ReturnValues:"UPDATED_NEW"
  }, function(err, data) {
      if (err) {
          return callback(err);
      }

      if (!data.Attributes || data.Attributes.data_value === undefined) {
        return callback(null, undefined);
      }

      return callback(null, {
        id: key,
        value: JSON.parse(data.Attributes.data_value)
      });
  });

}
/* test
get('monitor-rauldelacruz.com', function() {
  console.log(arguments);
  set('monitor-rauldelacruz.com', new Date(), function() {
    console.log(arguments);
  });
});
*/
