const db = require('./db_connect');

// Select book_id,title,image_url,name FROM writtenby NATURAL JOIN book NATURAL JOIN author order by RANDOM() limit 25 // select all books
// INSERT INTO AddedBy Values ('4000','60000'); // book_id user_id     // adds books to addedby table (users booklist)
// delete from AddedBy where user_id=60000 AND book_id=3508; // deletes from addedby table (users booklist)
// INSERT INTO Users Values ((Select max(user_id)+1 from users), 'password' ); // insert a user with available userid
// Select * from users where user_id=53427; // find a user
// Select title from book where title LIKE '%Harry Potter%'; // search book

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
  module.exports.getaSearch = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    let val = event.pathParameters.searchval;
    const sql = 'Select book_id,title,image_url,name from writtenby NATURAL JOIN book NATURAL JOIN author where title LIKE \'%'+val+'%\'';

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

  module.exports.findUser = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    let val = event.pathParameters.searchval;
    const sql = 'Select * from users where user_id='+val;

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
  module.exports.getUserFavs = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    let val = event.pathParameters.searchval;
    const sql = 'Select book_id,title,image_url,name from addedby NATURAL JOIN book NATURAL JOIN writtenby NATURAL JOIN author where user_id ='+val;

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
  module.exports.removeBook = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    let user_id = event.pathParameters.searchval;
    let book_id = event.pathParameters.searchval2;
    const sql = 'DELETE from AddedBy where user_id='+user_id+'AND book_id='+book_id;

    db.query(sql)
      .then(res => {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,GET,DELETE"
        },
          body: JSON.stringify(res)
        })
      })
      .catch(e => {
        console.log(e);
        callback(null, {
          statusCode: e.statusCode || 500,
          body: 'Error: No Book in that table: ' + e
        })
      })
  };
  module.exports.addBook = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    let user_id = event.pathParameters.searchval;
    let book_id = event.pathParameters.searchval2;
    const sql = 'INSERT INTO AddedBy Values ('+book_id+','+user_id+')';

    db.query(sql)
      .then(res => {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,GET,DELETE"
        },
          body: JSON.stringify(res)
        })
      })
      .catch(e => {
        console.log(e);
        callback(null, {
          statusCode: e.statusCode || 500,
          body: 'Error: No Book in that table: ' + e
        })
      })
  };
  module.exports.getReccomend = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    const sql = 'select b.book_id, b.title, a.name, b.image_url From author a join writtenby w on a.author_id=w.author_id join book b on w.book_id=b.book_id join ratedby r on b.book_id=r.book_id where r.rating_point >= 4 Order By random() limit 1';
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
  module.exports.addUser = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    const sql = 'INSERT INTO Users Values ((Select max(user_id)+1 from users), \'password\' )';

    db.query(sql)
      .then(res => {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,GET,DELETE"
        },
          body: JSON.stringify(res)
        })
      })
      .catch(e => {
        console.log(e);
        callback(null, {
          statusCode: e.statusCode || 500,
          body: 'Error: No Book in that table: ' + e
        })
      })
  };
  module.exports.getLastID = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    const sql = 'Select max(user_id) from users';

    db.query(sql)
      .then(res => {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,GET,DELETE"
        },
          body: JSON.stringify(res)
        })
      })
      .catch(e => {
        console.log(e);
        callback(null, {
          statusCode: e.statusCode || 500,
          body: 'Error: No Book in that table: ' + e
        })
      })
  };