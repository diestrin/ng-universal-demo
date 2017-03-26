import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core'
import { AppServerModule } from './app.server'
import * as express from 'express';
import {ngExpressEngine} from './express-engine'

// enableProdMode();

const app = express();

app.engine('html', ngExpressEngine({
	baseUrl: 'http://localhost:4200',
	bootstrap: [AppServerModule]
}));

app.set('view engine', 'html');
app.set('views', 'src')

app.get('/', (req, res) => {
	res.render('index', {req});
});

app.get('/lazy', (req, res) => {
	res.render('index', {req});
});

app.listen(8000,() => {
	console.log('listening...')
});
