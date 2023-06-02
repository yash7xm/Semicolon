const express = require('express');
const app = express();
const ejs = require('ejs');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
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

app.get("*", async(req,res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
    if(data == '')
    await fetchData();
})

app.listen('8080', () => {
    console.log('listneing');
})