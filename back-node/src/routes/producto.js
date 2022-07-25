const express = require("express");
const router = express.Router();

//Crear producto
router.post("/", async (req, res) => {
  try {
    let producto = new Producto(req.body);
    await producto.save();
    res.send(producto);
  } catch (error) {
    console.log(error);
    resizeBy.status(500).send("Error");
  }
});

module.exports = router;
