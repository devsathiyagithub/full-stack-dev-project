var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyparser.json());


app.listen('3000', () => {
    console.log('server is running... port 3000');
})
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kanban'
});
db.connect((err) => {
    if (err) throw err;
    else {
        console.log('database connected ... sucesafully');
    }
});

app.post('/boards', (req, res) => {
    let sql = ` INSERT INTO Title(title) VALUES('${req.body.title}')`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const sql2 = `SELECT * FROM Title  ORDER BY id DESC LIMIT 1`;
        db.query(sql2, (err, out) => {

            res.status(201).json({
                "msg": out

            });
        })
    });


});



app.put('/boards/:id', (req, res) => {

    if (req.body.stage > 3) {
        res.status(400).json({
            "msg": "no requirements for the response Body"
        });
    }

    else {
        let sql = `UPDATE Title SET  stage = '${req.body.stage}' WHERE id = '${req.params.id}'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            const sql2 = `SELECT * FROM Title  ORDER BY id DESC LIMIT 1`;
            db.query(sql2, (err, result) => {
                if (err) throw err;
                db.query(sql2, (err, out) => {

                    res.status(200).json({
                        "msg": out
                    });
                })
            });
        })
    }
})


//use postman 
//routes --- localhost:3000//boards
//routes --- localhost:3000//boards/1









