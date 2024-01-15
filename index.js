import  express  from "express";

import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import multer from "multer";

const app = express();
const port = 5000;

// middleware we use

// first 
app.use((req, res , next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

// second
app.use(cookieParser());

// third
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../social-media/public/upload')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  app.post('/api/upload', upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename)
  })

// routes   
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

app.listen(port,()=>{
    console.log("listening on port", port);
});