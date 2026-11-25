const db = require("./connection");
const fs = require("fs");
const path = require("path");

const seed = fs.readFileSync(
    path.join(__dirname, "seed.sql"),
    "utf8"
);

db.exec(seed, (err) => {
    if (err) {
        console.error("Seeding failed:", err.message);
    } else {
        console.log("Users inserted successfully!");

        db.all("SELECT * FROM user", [], (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.table(rows);
            }

            db.close();
        });
    }
});