const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
//creacion y conexcion a db
	mongoose.connect('mongodb://localhost/mevn-database', { useNewUrlParser: true })
		.then(db => console.log('DB esta conectada'))
		.catch(err => console.log(err));

//Configuraciones
	//configuracion para un puerto
	//el segundo parametro es para q la aplicacion tome el puerto q le esta dando el s.o
	app.set('port', process.env.PORT || 3000);

//Middlewares
	//morgan para ver las peticiones http en consola
	app.use(morgan('dev'));

	//antes se debia usar body-parser
	app.use(express.json());

//Rutas
app.use('/api/tasks', require('./routes/tasks'));

//Archivos Estaticos
app.use(express.static (__dirname + '/public'));

app.listen(app.get('port'), () => {
	console.log('Servidor en el Puerto', app.get('port'));
});