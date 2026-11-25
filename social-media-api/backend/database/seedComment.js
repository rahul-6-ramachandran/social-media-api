const db = require("./connection");

const sql = `
    INSERT INTO comment (post_id, user_id, content)
    VALUES
        (1, 2, 'Great post!'),
        (1, 3, 'Beautiful experience'),
        (1, 4, 'Looks amazing'),
        (2, 1, 'Enjoy your weekend!'),
        (2, 3, 'Nice picture'),
        (3, 2, 'Keep learning!'),
        (3, 4, 'Good work'),
        (4, 1, 'Wonderful place');
`;

db.exec(sql, (err) => {
    if (err) {
        console.error("Comment seeding failed:", err.message);
    } else {
        console.log("Comments inserted successfully!");

        db.all("SELECT * FROM comment", [], (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.table(rows);
            }

            db.close();
        });
    }
});