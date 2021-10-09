const express = require('express');
const router = express.Router();//Metodo router,nos creara un objeto para poder definir rutas 

const mysqlConnection  = require('../database.js');//importanto, para poder obtener datos,actualizar, etc



// GET all the employees
router.get('/', (req, res) => {
 
    mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

 // GET an employe
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM employees WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });

  // INSERT An Employe
router.post('/', (req, res) => {
  const {id, name, salary} = req.body;
  console.log(id, name, salary);
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Empleado Guardado'});
    } else {
      console.log(err);
    }
  });

});
//update employe information
router.put('/:id', (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Empleado Actualizado'});
    } else {
      console.log(err);
    }
  });
});

// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Empleado Eliminado'});
    } else {
      console.log(err);
    }
  });
});
  

  module.exports = router;//exportando la constante
