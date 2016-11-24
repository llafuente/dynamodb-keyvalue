# dynamodb-keyvalue

Use AWS dynamodb as a key/value storage.

Create table
```bash
aws dynamodb create-table --table-name lambda \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH
```

## API

```js

var KV = require('dynamodb-keyvalue');

KV.TableName = 'lambda'; // lambda is the default

get('no-birthday-date', function() {
  console.log(arguments);

  // Data will be stringified, and returned as string!
  // to store/retrieve use JSON.stringify/parse
  set('no-birthday-date', new Date(), function(err, data) {
    if (err) {
      // there is an error
    }
    if (data === undefined) {
      // there is a possible error in JSON.stringify, your value
    }
    console.log(data); // {id: xx, value: yy}
  });
});
```


# LICENSE

MIT
