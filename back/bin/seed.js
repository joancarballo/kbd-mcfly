const { withDbConnection, dropIfExists } = require("../lib/withDbConnection");
const User = require("../models/User");
const Note = require("../models/Note");

withDbConnection(async () => {
  // USERS
  await dropIfExists(User);
  await User.deleteMany();
  await User.create([
    {
      username: "hola",
      password: "1234",
      notesFavorites: [],
      notesCreated: [],
    },
    {
      username: "DrEmmet",
      password: "1234",
      notesFavorites: [],
      notesCreated: [],
    },
    {
      username: "Marty",
      password: "1234",
      notesFavorites: [],
      notesCreated: [],
    },
  ]);
  console.log(">>> Users Created");
  // NOTES
  await dropIfExists(Note);
  await Note.deleteMany();
  await Note.create([
    {
      text: "What's wrong McFly? Chicken?",
    },
    {
      text: "There's no chicken here. It worked fine.",
    },
    {
      text: "¡Ey, tú!, ¡quitale tus sucias manos de encima!.",
    },
    {
      text: "¿Carreteras? A donde vamos no necesitamos carreteras.",
    },
  ]);
  console.log(">>> Notes Created");
});
