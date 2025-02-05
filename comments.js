//create web server
const express = require('express');
const app = express();
const port = 3000;

//add body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//add database
const db = require('./database.js');

//get all comments
app.get('/comments', (req, res) => {
    db.all('SELECT * FROM comments', (err, rows) => {
        res.json(rows);
    });
});

//get comment by id
app.get('/comments/:id', (req, res) => {
    db.get('SELECT * FROM comments WHERE id = ?', [req.params.id], (err, row) => {
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    });
});

//add comment
app.post('/comments', (req, res) => {
    if (req.body.content) {
        db.run('INSERT INTO comments (content) VALUES (?)', [req.body.content], function(err) {
            res.json({ id: this.lastID });
        });
    } else {
        res.status(400).json({ message: 'Content is required' });
    }
});

//update comment
app.put('/comments/:id', (req, res) => {
    if (req.body.content) {
        db.run('UPDATE comments SET content = ? WHERE id = ?', [req.body.content, req.params.id], function(err) {
            if (this.changes) {
                res.json({ message: 'Comment updated' });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        });
    } else {
        res.status(400).json({ message: 'Content is required' });
    }
});

//delete comment
app.delete('/comments/:id', (req, res) => {
    db.run('DELETE FROM comments WHERE id = ?', [req.params.id], function(err) {
        if (this.changes) {
            res.json({ message: 'Comment deleted' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    });
});

//start web server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});