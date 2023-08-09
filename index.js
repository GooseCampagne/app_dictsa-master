const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');


//middleware
app.use(express.json());
app.use(cors());

// BD
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'dictsa_app'
});

// MENSAJE DE CONEXION EN LA CONSOLA
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});


//RUTA PARA EL LOGIN
app.post('/login', (req, res) => {
  const { workerid, pass } = req.body;
  console.log(workerid, pass);

  const query = `SELECT privilege, Nombre, workerid FROM users WHERE workerid = ? AND pass = ?`;
  connection.query(query, [workerid, pass], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else if (results.length > 0) {
      const { privilege, Nombre, workerid } = results[0];
      
      if (privilege === 'admin') {
        res.status(200).json({ privilege: 'admin', Nombre, workerid });
        
      } else if (privilege === 'user') {
        res.status(200).json({ privilege: 'user',Nombre, workerid });
      
      } else if (privilege === 'rh') {
        res.status(200).json({ privilege: 'rh', Nombre, workerid });
      
      } else {
        res.status(401).send('Credenciales inválidas');
      }
    } else {
      res.status(401).send('Credenciales inválidas');
    }
  });
});

//seleccionar los usuarios para cuando se cree la obra

 app.get('/users', (req, res) => {
   const query = `SELECT workerid, nombre, apellido_paterno, apellido_materno FROM users WHERE privilege = 'user'`;
   connection.query(query, (error, results) => {
     if (error) {
       console.error('Error al ejecutar la consulta:', error);
       res.status(500).send('Error al procesar la solicitud');
    } else {
      res.json(results);
     }
  });
});


//este era para el mensaje de bienvenida pero no lo usamos hasta que no lo arregle

// app.get('/welcome', (req, res) => {
//   const query = `SELECT nombre, apellido_paterno, apellido_materno FROM users WHERE privilege = 'rh'`;
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error al ejecutar la consulta:', error);
//       res.status(500).send('Error al procesar la solicitud');
//     } else {
//       res.json(results);
//     }
//   });
// });



app.get('/usuario-profile', (req, res) => {
  const workerid = req.query.workerid; // obtiene el workerid
  const query = `SELECT Nombre, Apellido_paterno, Apellido_materno, workerid FROM users WHERE workerid = '${workerid}'`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.json(results);
    }
  });
});

// muestra las obras en las cards de homescreen
app.get('/obras', (req, res) => {
  const query = `SELECT codigo_obra, id_obra, nombre_obra, encargado, fecha_inicio, fecha_cierre, status FROM obras`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.json(results);
    }
  });
});

//agregar obra
app.post('/agregar-obra', (req, res) => {
  const { codigo_obra, nombre_obra, encargado, fecha_inicio, fecha_cierre, status } = req.body;
  // Verificar si ya existe un registro con el mismo codigo_obra
  const query = 'SELECT * FROM obras WHERE codigo_obra = ?';
  connection.query(query, [codigo_obra], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else if (results.length > 0) {
      // devuelve mensaje
      res.status(409).send('El código de obra ya existe');
    } else {
      //si no se duplica se sigue
      const insertQuery = 'INSERT INTO obras (codigo_obra, nombre_obra, encargado, fecha_inicio, fecha_cierre, status) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(insertQuery, [codigo_obra, nombre_obra, encargado, fecha_inicio, fecha_cierre, status], (insertError, insertResult) => {
        if (insertError) {
          console.error('Error al insertar el registro:', insertError);
          res.status(500).send('Error al procesar la solicitud');
        } else {
          //no hace falta decir que hace
          res.status(200).send('Registro agregado correctamente');
        }
      });
    }
  });
});



//por el momento no sirve pero lo que se busca es hacer que al momento de pulsar la obra te mande a sus avances con el id_obra

app.get('/avances', (req, res) => {
  const obraId = req.query.id_obra; // obtiene el id_obra
  const query = `SELECT id_avance, id_obra, dia_semana, material, cantidad, resultados, observaciones, id_obra, tarea FROM avances WHERE id_obra = ${obraId}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.json(results);
    }
  });
});

app.get('/incidencias-admin', (req, res) => {
  const obraId = req.query.id_obra;
  const query = `SELECT dia, fecha, nombre, cod, num, id_obra FROM asistencia WHERE id_obra= ${obraId}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.json(results);
    }
  });
});

 // Hace la consulta para obtener las cards filtradas por workerid, es diferente al del admin porque el admin si puede ver todas
app.get('/cards', (req, res) => {
  const workerid = req.query.workerid;
  const query = 'SELECT codigo_obra, id_obra, nombre_obra, encargado, fecha_inicio, fecha_cierre, status FROM obras WHERE encargado = ?';
  connection.query(query, [workerid], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.status(200).json(results);
    }
  });
});

// Agregar avance con el id_obra //residente
app.post('/agregar-avance', (req, res) => {
  const { id_obra, dia_semana, material, cantidad, resultados, observaciones, horometro1, horometro2, tarea } = req.body;

  const insertQuery = 'INSERT INTO avances (id_obra, dia_semana, material, cantidad, resultados, observaciones, horometro1, horometro2, tarea) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(insertQuery, [id_obra, dia_semana, material, cantidad, resultados, observaciones, horometro1, horometro2, tarea], (insertError, insertResult) => {
    if (insertError) {
      console.error('Error al insertar el avance:', insertError);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.status(200).send('Avance agregado correctamente');
    }
  });
});

// Ruta para agregar un usuario rh
app.post('/agregar-usuario', (req, res) => {
  const { workerid, nombre, Apellido_paterno, Apellido_materno, pass, privilege } = req.body;

  // Verificar que se proporcionen todos los campos requeridos
  if (!workerid || !nombre || !Apellido_paterno || !Apellido_materno || !pass || !privilege) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Consulta para agregar el usuario a la base de datos
  const query = 'INSERT INTO users (workerid, nombre, Apellido_paterno, Apellido_materno, pass, privilege) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [workerid, nombre, Apellido_paterno, Apellido_materno, pass, privilege], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.status(200).send('Usuario agregado exitosamente');
    }
  });
});

//usuarios para rh

app.get('/usuarios-registrados', (req, res) => {
  const query = `SELECT workerid, nombre, Apellido_paterno, Apellido_materno, pass, privilege FROM users`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.json(results);
    }
  });
});


app.get('/obtener-usuario', (req, res) => {
  const workerid = req.query.workerid;
  const query = `SELECT Nombre, Apellido_paterno, Apellido_materno, pass, privilege FROM users WHERE workerid = '${workerid}'`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.json(results);
    }
  });
});


app.put('/editar-usuario/:workerid', (req, res) => {
  const { workerid } = req.params;
  const { nombre, Apellido_paterno, Apellido_materno, pass, privilege } = req.body;
  const query = `
    UPDATE users 
    SET 
      nombre = '${nombre}', 
      Apellido_paterno = '${Apellido_paterno}', 
      Apellido_materno = '${Apellido_materno}', 
      pass = '${pass}', 
      privilege = '${privilege}'
    WHERE 
      workerid = '${workerid}'
  `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.send('Usuario editado exitosamente');
    }
  });
});

//borrar usuario dependiendo de su workerid
app.delete('/delete-user/:workerid', (req, res) => {
  const workerid = req.params.workerid;

  // Verificar que se proporcione el workerid
  if (!workerid) {
    return res.status(400).json({ error: 'El workerid es requerido' });
  }

  // Consulta para eliminar el usuario de la base de datos
  const query = 'DELETE FROM users WHERE workerid = ?';
  connection.query(query, [workerid], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      if (results.affectedRows > 0) {
        res.status(200).send('Usuario eliminado exitosamente');
      } else {
        res.status(404).send('No se encontró ningún usuario con el workerid proporcionado');
      }
    }
  });
});



// app.post('/agregar-incidencia', (req, res) => {
//   const { obra, workerid } = req.body;
//   // Verificar que se proporcionen todos los campos requeridos
//   if (!obra || !workerid) {
//     return res.status(400).json({ error: 'Todos los campos son requeridos' });
//   }
//   // Consulta para agregar la incidencia a la base de datos
//   const query = 'INSERT INTO incidencias (obra, workerid) VALUES (?, ?)';
//   connection.query(query, [obra, workerid], (error, results) => {
//     if (error) {
//       console.error('Error al ejecutar la consulta:', error);
//       res.status(500).send('Error al procesar la solicitud');
//     } else {
//       res.status(200).send('Incidencia agregada exitosamente');
//     }
//   });
// });

// muestra las obras en las cards de incidencias
// app.get('/incidencias', (req, res) => {
//   const query = `SELECT * FROM incidencias`;
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error al ejecutar la consulta:', error);
//       res.status(500).send('Error al procesar la solicitud');
//     } else {
//       res.json(results);
//     }
//   });
// });

// Ruta para agregar los datos de asistencia
app.post('/asistencias', (req, res) => {
  const { dia, fecha, nombre, cod, num, id_obra } = req.body;

  // Consulta SQL para insertar los datos de asistencia en la base de datos
  const query = `INSERT INTO asistencia (dia, fecha, nombre, cod, num, id_obra) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [dia, fecha, nombre, cod, num, id_obra];

  // Ejecutar la consulta en la base de datos
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al insertar los datos de asistencia:', err);
      res.status(500).json({ error: 'Error al insertar los datos de asistencia' });
    } else {
      res.status(200).json({ message: 'Datos de asistencia agregados exitosamente' });
    }
  });
});

app.put('/usuario-profile/:workerid', (req, res) => {
  const workerid = req.params.workerid;
  const newPassword = req.body.pass;

  const query = 'UPDATE users SET pass = ? WHERE workerid = ?';
  connection.query(query, [newPassword, workerid], (error, results) => {
    if (error) {
      console.error('Error al actualizar el campo pass:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.status(200).send('Campo pass actualizado exitosamente');
    }
  });
});


app.get('/actividades', (req, res) => {
  const obraId = req.query.id_obra;
  const query = `SELECT actividad, cantidad, unidad FROM actividades WHERE id_obra= ${obraId}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.json(results);
    }
  });
});

// Puerto, este dejalo asi
const PORT = 3000;

// solo manda el mensaje a la consola 
app.listen(PORT, () => {
  console.log(`Servidor alojado en el puerto ${PORT}`);
});