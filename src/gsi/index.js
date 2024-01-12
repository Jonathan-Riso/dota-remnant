import express from 'express';
import { DOTA2GSI } from 'dotagsi';

const app = express();
const GSI = new DOTA2GSI();

app.use(express.urlencoded({extended:true}));
app.use(express.raw({limit:'10Mb', type: 'application/json' }));

app.post('/', (req, res) => {
    const text = req.body.toString().replace(/"(player|owner)":([ ]*)([0-9]+)/gm, '"$1": "$3"').replace(/(player|owner):([ ]*)([0-9]+)/gm, '"$1": "$3"');
    const data = JSON.parse(text);
    // console.log(data)
    GSI.digest(data);
    res.sendStatus(200);
});

GSI.on('data', dota2 => {
    console.log(dota2.map.radiant_win_chance);
});

app.listen(4000);