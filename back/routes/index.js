const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET All Notes */
/* Según diseño. No necesaria si muestro todas las notas en la home*/
router.get("/notes", (req, res, next) => {
  res.render("index");
});

/* GET Create note */
/* Según diseño. No necesaria si pongo el formulario de create en la home */
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
router.put("/fav/:id", (req, res, next) => {
  res.render("index");
});

/* PUT Delete Fav */
router.put("/fav/del/:id", (req, res, next) => {
  res.render("index");
});

/* GET Login */
/* Según diseño. No necesaria si muestro el login en la home*/
router.get("/login", (req, res, next) => {
  res.render("index");
});

/* POST Login */
router.post("/login", (req, res, next) => {
  res.render("index");
});

/* POST Logout */
router.post("/logout", (req, res, next) => {
  res.render("index");
});

module.exports = router;
