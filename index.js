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
const cookieParser = require('cookie-parser');
let data = '';
let rdata = '';
let radata = '';
let userData = '';
let sessionId = '';
let topicIndex = 0, subjectIndex = 0, unitIndex = 0, content;

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
app.use(cookieParser());

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
      wpm: {
        type: String
      },
      accuracy: {
        type: String
      },
      date: {
        type: String,
        default: moment().format('YYYY MM DD')
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
  },
  photoNumber: {
    type: Number,
    default: 1
  },
  message: {
    type: String,
    maxlength: 100,
    default: ''
  }
});

const User = mongoose.model('User', userSchema);

const Random = new mongoose.Schema({
  data: [
    {
      content: String
    },
  ]
})

const RandomData = mongoose.model('RandomData', Random);

app.use((req, res, next) => {
  sessionId = req.cookies.userId;
  next();
})

app.post('/everything', async (req, res) => {
  try {
    if (data == '') {
      await fetchData();
    }
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(200);
})

async function fetchData() {
  data = await Sem1Notes.find({});
  radata = await RandomData.find({});
}

app.get('/read', async (req, res) => {
  try {
    if (data == '') {
      await fetchData();
    }
  } catch (error) {
    console.log(error);
  }
  res.render('read', { data, sessionId });
})

app.get('/test', async (req, res) => {
  try {
    if (data == '') {
      await fetchData();
    }
  } catch (error) {
    console.log(error);
  }
  const randomNumber = Math.floor(Math.random() * 15);
  content = radata[0].data[randomNumber].content;
  res.render('typing', { content, sessionId });
})

app.post('/topicType', (req, res) => {
  content = req.body.content;
  res.sendStatus(200);
})

app.get('/topicTest', (req, res) => {
  res.render('typing', { content, sessionId });
})

app.get('/show', async (req, res) => {
  try {
    if (data == '') {
      await fetchData();
    }
  } catch (error) {
    console.log(error);
  }
  res.render('show', { topicIndex, subjectIndex, unitIndex, data, sessionId });
})

app.get('/sendNotes', async (req, res) => {
  res.json({ topicIndex, subjectIndex, unitIndex, data });
})

app.post('/showPost', (req, res) => {
  topicIndex = req.body.topicIndex;
  subjectIndex = req.body.subjectIndex;
  unitIndex = req.body.unitIndex;
  res.sendStatus(200);
})

app.get('/signIn', (req, res) => {
  res.render('auth');
})

app.post('/register', async (req, res) => {
  let { name, username, password } = req.body;
  name = name.replace(/\s+/g, " ").trim();
  username = username.replace(/\s+/g, " ").trim();
  password = password.replace(/\s+/g, " ").trim();
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
  res.render('auth', { flag });
});

app.post('/signIn', async (req, res, next) => {
  const { username, password } = req.body;
  let flag2 = true;
  try {
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      res.cookie('userId', user._id, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      sessionId = res.cookie.userId;
      flag2 = true;
      res.redirect('/');
    }
    else {
      flag2 = false;
      res.render('auth', { flag2 });
    }
  } catch (error) {
    flag2 = false;
    res.render('auth', { flag2 });
  }
})

app.post('/updateScore', async (req, res) => {
  if (sessionId === '') {
    res.sendStatus(200);
    return;
  }
  const user = await User.findOne({ _id: sessionId });

  let S = req.body.score;
  const A = req.body.accuracy;

  if(S == Infinity || S == null) {
    S = 0;
  }

  user.score.push({
    wpm: S,
    accuracy: A
  });

  let tests = user.testsTaken;
  tests++;
  user.testsTaken = tests;

  let bestScore = user.bestScore;
  if (S > bestScore)
    user.bestScore = S;

  await user.save();

  const users = await User.find({}).sort({ bestScore: -1 });

  let rank = 1;
  for (const user of users) {
    user.rank = rank;
    await user.save();
    rank++;
  }

  res.sendStatus(200);
})

app.post('/updateMsg', async (req, res) => {
  try {
    const msg = req.body.Msg;
    userData.message = msg;
    await userData.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating message');
  }
});

app.post('/updateName', async (req, res) => {
  try {
    const name = req.body.Name;
    userData.name = name;
    await userData.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating name');
  }
});

app.post('/updatePhoto', async (req, res) => {
  try {
    const photoNo = req.body.PhotoNumber;
    userData.photoNumber = photoNo;
    await userData.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating name');
  }
});

app.get('/profile', async (req, res) => {
  try {
    userData = await User.findOne({ _id: sessionId });
    const totalUsers = await User.countDocuments();
    res.render('profile', { userData, totalUsers });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/logout', async (req, res) => {
  res.clearCookie('userId');
  sessionId = '';
  res.redirect('/');
});

app.get('/graphData', async (req, res) => {
  res.json(userData);
})

app.get('/leadborad', async (req, res) => {
  const users = await User.find({}).sort({ bestScore: -1 });
  res.json(users);
})

app.get("/", async (req, res) => {
  res.render('index', { sessionId });
  if (data == '')
    await fetchData();
})

app.listen('8080', () => {
  console.log('listening');
})