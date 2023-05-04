require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const mysql = require('mysql');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
//app.use(bodyParser({extended: true}))
// Using the json and urlencoded middlewares
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

//get movie from back end
app.get("/api/get",(req,res)=>{
  const  sqlSelect = "SELECT * FROM movie__review";
  db.query(sqlSelect ,(error,result)=>{
 res.send(result);
  } )  
})


app.post('/api/insert',(req,res)=>{
  const movieName = req.body.movieName;
  const movieReview =req.body.movieReview;
  const  sqlInsert = "INSERT INTO movie__review (movieName , movieReview) VALUES (?,?)";
 db.query(sqlInsert ,[movieName,movieReview],(error,result)=>{

 } )
});

app.delete("/api/delete/:movieName", (req,res)=>{
  const name = req.params.movieName;
  const sqlDelete ="DELETE FROM  movie__review WHERE movieName = ?";
  db.query(sqlDelete,name,(err,result)=>{
    if(err) console.log(err)
  });
});

app.put("/api/update", (req,res)=>{
  const name = req.body.movieName;
  const review = req.body.movieReview;

  const sqlUpdate ="UPDATE movie__review SET  movieReview = ? WHERE movieName = ?";
  db.query(sqlUpdate, [ review,name ] , (err,result)=>{
    if(err) console.log(err)
    else{
      res.send("updated susseccifully")
    }
  });
});



  

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});
