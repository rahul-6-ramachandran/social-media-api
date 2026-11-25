const db = require("./connection");

const sql = `
    INSERT INTO post (title, user_id, image, description)
    VALUES
        ('My First Post', 1, 'post1.jpg', 'Exploring the backwaters'),
        ('Weekend Vibes', 2, 'post2.jpg', 'Enjoying the weekend'),
        ('Learning Backend', 1, 'post3.jpg', 'Practising SQL and Node.js'),
        ('Travel Diaries', 3, 'post4.jpg', 'A beautiful travel experience'),
        ('Coding Life', 4, 'post5.jpg', 'Building something new');
`;

db.exec(sql, (err) => {
    if (err) {
        console.error("Post seeding failed:", err.message);
    } else {
        console.log("Posts inserted successfully!");

        db.all("SELECT * FROM post", [], (err, rows) => {
            if (err) console.error(err.message);
            else console.table(rows);

            db.close();
        });
    }
});