const db = require("../models");
const router = require("express").Router();

//code to get workouts
router.get("/api/workouts", (req,res) => {
    db.Workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                //duration is defined in stats.js found in the public folder.
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});