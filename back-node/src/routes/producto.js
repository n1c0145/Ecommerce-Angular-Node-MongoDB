const express = require("express");
const router = express.Router();
const Producto = require("../models/Producto");

//Crear producto
router.post("/", async (req, res) => {
  try {
    let producto = new Producto(req.body);
    await producto.save();
    res.status(201);
    res.json({ status: "Created" });
  } catch (error) {
    res.status(500).send({message:'error'});
  }
});

// Obtener productos

router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).send({message:'error'});
  }
});

//Actualizar productos

router.put("/:id", async (req, res) => {
  try {
    const { nombre, categoria, ubicacion, precio } = req.body;
    let producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({ msg: "No existe el producto" });
    }
    producto.nombre = nombre;
    producto.categoria = categoria;
    producto.ubicacion = ubicacion;
    producto.precio = precio;

    producto = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      producto,
      { new: true }
    );
    res.status(200);
    res.json({ status: "Updated" });
  } catch (error) {
    res.status(500).send({message:'error'});
  }
});

//Obtener un producto

router.get("/:id", async (req, res) => {
  try {
    let producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({ msg: "No existe el producto" });
    }
    res.status(200);
    res.json(producto);
  } catch (error) {
    res.status(500).send({message:'error'});
  }
});

//Eliminar Producto

router.delete("/:id", async (req, res) => {
  try {
    let producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({ msg: "No existe el producto" });
    }
    await Producto.findOneAndRemove({ _id: req.params.id });
    res.status(200);
    res.json({ status: "Deleted" });  } catch (error) {
    res.status(500).send({message:'error'});
  }
});

module.exports = router;
