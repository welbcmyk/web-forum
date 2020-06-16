const { Db } = require("mongodb");
db.createUser(
    {
        user    : "root",
        pwd     : "root",
        roles   : [
            {
                role    : "readWrite",
                db      : "forum-web-app"
            }
        ]
    }
)