const db = require('./db_connect');

module.exports.getBooks = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    const sql = 'Select "name",image_url,title FROM writtenby NATURAL JOIN book NATURAL JOIN author limit 10';
// callback(null, {
//     //       statusCode: 200,
//     //       body: JSON.stringify(res)
//     //     })

    db.query(sql)
      .then(res => {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
          body: JSON.stringify(res)
        })
      })
      .catch(e => {
        console.log(e);
        callback(null, {
          statusCode: e.statusCode || 500,
          body: 'Error: Could not find Todos: ' + e
        })
      })
  };