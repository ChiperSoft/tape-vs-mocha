
exports.getData = function (db, query) {
  return db.openConnection()
    .then(function () {
      return db.query(query);
    })
    .then(function (data) {
      db.closeConnection;
      return data;
    });
};
