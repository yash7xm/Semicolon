const express = require('express');
const app = express();
const ejs = require('ejs');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const moment = require('moment');
const session = require('express-session');
let data = '';
let topicIndex=0, subjectIndex=0, unitIndex=0, content;

app.use("/styles", express.static(__dirname + "/styles"));
app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/images", express.static(__dirname + "/images"));

mongoose
  .connect(process.env.MONGO_PROD_URL)
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: '12121212',
  resave: false,
  saveUninitialized: false
}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');



const Sem1 = new mongoose.Schema({
    sem:
      [
        {
          subjects:
            [{
              subjectName: String,
              units:
                [
                  {
                    unitName: String,
                    topics:
                      [
                        {
                          name: String,
                          content: String,
                        },
                      ]
                  },
                ]
            },
            ]
        },
      ]
  })
  
  const Sem1Notes = mongoose.model('Sem1Notes', Sem1);

  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name cannot be blank']
    },
    username: { 
      type: String, 
      unique: true,
      required: [true, 'Username cannot be blank']
    },
    password: {
      type: String,
      required: [true, 'Password cannot be blank']
    },
    score: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Score'
        wpm: {
          type: String
        },
        accuracy: {
          type: String
        }
      }
    ],
    bestScore: {
      type: Number,
      default: 0
    },
    testsTaken: {
      type: Number,
      default: 0
    },
    joined: {
      type: String,
      default: moment().format('MMM Do YY')
    },
    rank: {
      type: Number,
      default: 0
    }
  });
  
  const User = mongoose.model('User', userSchema);

//   const ScoreSchema = new mongoose.Schema([
//     {
//     wpm: String,
//     accuracy: String
//   },
// ]);

//   const Score = mongoose.model('Score', ScoreSchema);
  
  
  async function fetchData() {
    data = await Sem1Notes.find({});
}

app.get('/dog', async (req, res) => {
    res.json(data);
  })


app.get('/read', async (req, res) => {
    res.render('read', {data});
})

app.get('/test', (req, res) => {
    res.render('typing', {content});
})

app.post('/topicType', (req, res) => {
    content = req.body.content;
    res.sendStatus(200);
})

app.get('/topicTest', (req,res) => {
    res.render('typing', {content});
})

app.get('/show', (req, res) => {
    res.render('show', {topicIndex, subjectIndex, unitIndex, data});
})

app.get('/sendNotes', async (req, res) => {
    res.json({ topicIndex, subjectIndex, unitIndex, data });
})

app.post('/showPost', (req, res) => {
    topicIndex = req.body.topicIndex;
    subjectIndex = req.body.subjectIndex;
    unitIndex = req.body.unitIndex;
    console.log(topicIndex, unitIndex, subjectIndex);
    res.sendStatus(200);
})

app.get('/signIn', (req,res) => {
  res.render('auth');
})

app.post('/register', async (req, res) => {
  const { name, username, password } = req.body;
  let flag = false;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    name,
    username,
    password: hash
  });

  try {
    await user.save();
    flag = false;
  } catch (error) {
    if (error.code === 11000) {
      flag = true;
    } else {
      flag = true;
    }
  }
  res.render('auth', { flag});
});

app.post('/signIn', async(req,res) => {
  const { username, password } = req.body;
  let flag2 = true;
  try{
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword){
      req.session.user_id = user._id;
      console.log(user._id)
      flag2 = true;
    }
    else {
      flag2 = false;
    }
    res.render('index');
  } catch (error) {
    flag2 = false;
    res.render('auth', { flag2 });
  }
})

app.post('/updateScore', async (req,res) => {
  const user = await User.findOne({ _id: req.session.user_id });

  const S = req.body.score;
  const A = req.body.accuracy;

  user.score.push({
    wpm: S,
    accuracy: A
  });

  let tests = user.testsTaken;
  tests++;
  user.testsTaken = tests;

  let bestScore = user.bestScore;
  if(S > bestScore)
    user.bestScore = S;

    const users = await User.find({}).sort({ bestScore: -1 });

    let rank = 1;
    for (const user of users) {
      user.rank = rank;
      await user.save();
      rank++;
    }

  await user.save();
  console.log(user);
  res.sendStatus(200);
})


app.get('/userfind', async (req,res) => {
  const user = await User.find({});
  // await User.deleteMany({});
  res.send(user);
})

app.get("/", async(req,res) => {
    res.render('index');
    if(data == '')
    await fetchData();
})

app.listen('8080', () => {
    console.log('listneing');
})