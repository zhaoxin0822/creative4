const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let pages = [];
let id = 0;

app.get('/api/pages', (req, res) => {
  res.send(pages);
});

app.post('/api/pages', (req, res) => {
  id = id + 1;
  let page = {id:id, text:req.body.text, pageNumber:req.body.pageNumber};
  pages.push(page);
  res.send(page);
});

app.delete('/api/pages/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = pages.map(page => { return page.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that page doesn't exist");
    return;
  }
  pages[removeIndex].text = '';
  res.sendStatus(200);
});

app.put('/api/pages/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = pages.map(page => { return page.id; });
  let index = itemsMap.indexOf(id);
  let page = pages[index];
  page.text = req.body.text;
  res.send(page);
});

app.listen(3002, () => console.log('Server listening on port 3002!'))
