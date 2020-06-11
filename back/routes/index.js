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
    console.log(">> Notes");
    console.log(req.user);
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

/* POST Create note */
router.post("/notes/create", async (req, res, next) => {
  // Como ahora mismo no tengo front lo paso en el Header HTML
  const { text } = req.body;
  console.log(text);
  const userId = req.user.id;
  console.log(userId);
  try {
    const newNote = await Note.create({ text });
    const noteCreated = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { notesCreated: newNote._id } },
      {
        new: true,
      }
    );
    return res.status(200).json({ status: "Note created:", newNote });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Error creating note" });
  }
});

/* PUT Delete Fav */
router.put("/fav/del/:id", async (req, res, next) => {
  const userId = req.user.id;
  const noteId = req.params.id;
  const delNote = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { notesFavorites: noteId } },
    {
      new: true,
    }
  );
  return res.status(200).json({ status: "Fav Deleted" });
});

/* GET One Favorites */
router.get("/fav/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const nota = await Note.findById(id);
    return res.json(nota);
  } catch (error) {
    return res.status(404).json({ status: "Note ID Not Found" });
  }
});

/* PUT Add Fav */
router.put("/fav/:id", async (req, res, next) => {
  try {
    const noteId = req.params.id;
    console.log(noteId);
    const userId = req.user.id;
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

/* GET All Favorites */
router.get("/fav", async (req, res, next) => {
  try {
    console.log(">> FAVS");
    console.log(req.user);
    const userId = req.user.id;
    const userFav = await User.findById(userId).populate("notesFavorites");
    return res.json(userFav.notesFavorites);
  } catch (error) {
    return res.status(404).json({ status: "Notes Not Found" });
  }
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
      console.log(">> Login In");
      console.log(req.user);
      return res.json({ status: "Logged in ", user });
    });
  })(req, res, next);
});

/* POST Logout */
router.get("/logout", (req, res, next) => {
  if (req.user) {
    console.log(">> Logout");
    req.logout();
    return res.status(200).redirect("/");
  } else {
    return res
      .status(401)
      .json({ status: "You have to be logged in to logout" });
  }
});

module.exports = router;
