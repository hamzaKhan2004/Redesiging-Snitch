import app from "./app/app.js";
import config from "./config/config.js";
import { connectToDB } from "./config/db.js";

const PORT = config.PORT || 8080;

await connectToDB();

app.listen(PORT, () => {
    console.log(`Server is live on port : ${PORT}`);
})