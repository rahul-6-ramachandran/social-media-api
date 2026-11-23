const db = require("./connection");
const fs = require("fs");
const path = require("path");

const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
);

db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON");

    db.exec(schema, (err) => {
        if (err) {
            console.error("Schema creation failed:", err.message);
        } else {
            console.log("All tables created successfully!");
        }

        db.close();
    });
});