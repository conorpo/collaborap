const express = require('express');
const fs = require('fs');
const path = require('path');

const words;
if(process.env.docSplit == "Yes"){
  words = fs.readFileSync(path.join(__dirname,'words.txt'), 'utf8').split("\\");
}else{
  words = fs.readFileSync(path.join(__dirname,'words.txt'), 'utf8').split('\r\n');
}

app.use(express.static(path.join(__dirname,'..', 'public')));

app.get('/api/random_word', (req,res) => {
    const random_word = words[Math.floor(Math.random()*words.length)];
    console.log(words);
    res.send(random_word);
})

const port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log('server started on port ' + port);
});