
let express = require('express');
let app = express();
let url = require('url');
let {Mohex} = require('./mohex.js');

let PASSWORD = 'Xe3KhwHMy3UK86JJM6zfLcLyZuhVCwPUTpHRNrRQcq8SxuefF6Maa99j46HbNyeawXpBnEPCK8eHsEJrMWQuKWsfwWgPjmZJEpA9uzSuFQM48CKRw8dyD6VL';

app.get('/genmove', (req, res) => {
    if (req.query.password != PASSWORD) {
        res.send('Wrong password: ' + req.query.password + '\n');
    } else {
        console.log('req.query: ' + JSON.stringify(req.query));
        console.log('moves: ' + req.query.moves);
        let moves = JSON.parse(req.query.moves);
        let mohex = new Mohex();
        setInterval(
            (() => console.log(JSON.stringify(mohex.log.stdout))),
            1000);
        mohex.playMoves(moves, () =>
            mohex.playComputerMove((move) => {
                res.send(JSON.stringify({ color: mohex.computerColor, move: move}));
                mohex.kill();
            }));
    }
});

app.get('/ping', (req, res) => {
    res.send('pong.')
})

app.use(express.static('assets'));

let PORT = 80;

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT + '!');
});
