const express = require('express');

const postsRouter = require('./posts/posts-router.js');

const server = express();
      server.use(express.json());
      server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Blog Posts API</h2>
    <p>Welcome to the server . . .</p>
  `);
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`\n ** Server listening on PORT:${PORT} ** \n`);
});
