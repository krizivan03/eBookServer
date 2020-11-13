const db = require('./db_connect');
// delete from AddedBy where user_id=60000 AND book_id=3508;
// Select book_id,title,image_url,name FROM writtenby NATURAL JOIN book NATURAL JOIN author order by RANDOM() limit 25
// INSERT INTO AddedBy Values ('4000','60000'); book_id user_id
// INSERT INTO Users Values ((Select max(user_id)+1 from users), 'password' );
// Select max(user_id) from users
// Select * from users where user_id=53427;
// Select title from book where title LIKE '%Harry Potter%';

module.exports.getBooks = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    const sql = 'Select book_id,title,image_url,name FROM writtenby NATURAL JOIN book NATURAL JOIN author order by RANDOM() limit 25';
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
  module.exports.getSearch = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // const { searchval } = event.pathParameter;
    const sql = 'Select * from book where title LIKE \'%Harry Potter%\'' ;
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