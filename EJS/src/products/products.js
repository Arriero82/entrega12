const express = require("express");
const { Router } = express;
const Products = require('../products/container/Container');
const products = new Products("../database/file.json");
const router = Router();

router.get('/productos', async (req, res) => {
  const prod = await products.getAll();
  try {
    res.status(200).render('pages/index',{prod})
  } catch (error) {
    res.send([]);
  } 
});

router.post('/', async (req, res) => {      
  const prod = await products.save(req.body);
  try {
    res.status(200).redirect('/productos')
  } catch (error) {
    res.send([])
  }
});

router.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  prod = await products.getById(id);
  try {
    res.status(200).render('main', {layout: 'layout1',prod})
  } catch (error) {
    res.send([]);
  }
});

router.put("/:id", async (req, res) => {
  const prod = await products.edit(req.body);
  const { id } = req.params;
  const prod2 = await products.getById(id);
  const { title, price, thumbnail } = prod2[0];
  res.send(`cambios guardados 
    item: ${title} 
    precio: ${price} 
    thumbnail: ${thumbnail}
    ID# ${id}`);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const prod = await products.deleteById(id);
  res.send(`producto eliminado`);
});

module.exports = router;
