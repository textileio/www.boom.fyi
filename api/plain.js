const fetch = require('node-fetch');
const fileType = require('file-type');
module.exports = async (req, res) => {
  var parts = req.url.split("/")
  var url = "https://us-west-dev.textile.cafe/bots/id/12D3KooWDqtAwQBq8Eh6FiCGG2E8Y41MEHGNmEMNbAReUCuubadz?link=" + parts[2];
  const response = await fetch(url);
  if (!response.ok) {
    const txt = await response.text();
    res.send(txt)
    return
  }
  const ab = await response.arrayBuffer();

  const ft = fileType(ab)
  if (ft !== undefined) {
    res.setHeader('Content-Type', ft.mime );
  } else {
    res.removeHeader('Content-Type');
  }
  res.send(Buffer.from(ab))
};