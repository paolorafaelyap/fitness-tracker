//dependencies
const express = require("express");
const mongoose = require("mongoose");
//request logger middleware
const logger = require("morgan");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static("public"));

//mongoose.connect command will try environment variable first, then do local if environment variable is not found.
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

//the routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}..`);
})