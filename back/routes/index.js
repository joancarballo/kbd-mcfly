const express = require("express");
const router = express.Router();
const passport = require("passport");
const Note = require("../models/Note");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET All Notes */
router.get("/notes", async (req, res, next) => {
  try {
    const notas = await Note.find();
    return res.json(notas);
  } catch (error) {
    return res.status(404).json({ status: "Notes Not Found" });
  }
});

/* GET One note */
router.get("/notes/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const nota = await Note.findById(id);
    return res.json(nota);
  } catch (error) {
    return res.status(404).json({ status: "Note ID Not Found" });
  }
});

/* GET Create note */
router.get("/notes/create", (req, res, next) => {
  res.render("index");
});

/* POST Create note */
router.post("/notes/create", (req, res, next) => {
  res.render("index");
});

/* GET All Favorites */
router.get("/fav", (req, res, next) => {
  res.render("index");
});

/* GET One Favorites */
router.get("/fav/:id", (req, res, next) => {
  res.render("index");
});

/* PUT Add Fav */
router.put("/fav/:id", async (req, res, next) => {
  try {
    const noteId = req.params.id;
    console.log(noteId);
    const userId = req.headers.user;
    console.log(userId);
    const userFav = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { notesFavorites: noteId } },
      {
        new: true,
      }
    ).populate("notesFavorites");
    return res
      .status(200)
      .json({ status: "Added Note to User's Favorites", userFav });
  } catch (error) {
    return res.status(404).json({ status: "Note ID Not Found" });
  }
});

/* PUT Delete Fav */
router.put("/fav/del/:id", (req, res, next) => {
  res.render("index");
});

/* GET Login */
router.get("/login", (req, res, next) => {
  res.render("index");
});

/* POST Login */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      return res.json({ status: 500, message: "Autentication Error" });
    }
    if (!user) {
      return res.json({ status: 401, message: failureDetails.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Session Error" });
      }
      return res.redirect("/notes");
    });
  })(req, res, next);
});

/* POST Logout */
router.post("/logout", (req, res, next) => {
  res.render("index");
});

module.exports = router;
