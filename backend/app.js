import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import authRouter from './routes/authRouter.js'
import dotenv from "dotenv";
dotenv.config();

const app = express();
// ---- __dirname FIX ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- MIDDLEWARES ----
app.use(
    cors({
        origin: "http://localhost:5173", // frontend URL ONLY
        credentials: true,
    })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- STATIC FILES ----
app.use(express.static(path.join(__dirname, "public")));

// ---- ROUTES ----
app.use("/auth", authRouter);


// ---- signup ----
app.post('/', async (req, res) => {
    let { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(300).send('User Already registered ');

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash
            });
            let token = jwt.sign({ email: email, userid: user._id }, 'topsecret');
            res.cookie('token', token);
            res.send('Register');
        });
    });

});

app.get('/login', (req, res) => {
    // console.log("working");
    res.render('login');
});


app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(300).send('Something Went Wrong');

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email, userid: user._id }, 'topsecret');
            res.cookie('token', token);
            res.status(200).redirect('/profile');
        }
        else {
            res.redirect('/login');
        }
    });

});

app.get('/logout', (req, res) => {
    res.cookie('token', '');
    res.redirect('login');

});

// ---- SERVER ----
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
