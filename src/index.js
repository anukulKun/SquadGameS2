import { app } from "./app.js";
import { connectToDB } from "./db/db.js";

const port = process.env.PORT || 3000;

connectToDB();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
