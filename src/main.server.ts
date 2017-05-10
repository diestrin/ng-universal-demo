import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { join } from 'path';
import * as express from 'express';
import { enableProdMode } from '@angular/core'
import { ngExpressEngine } from '@nguniversal/express-engine'
import { platformServer, renderModuleFactory } from '@angular/platform-server'

import { AppServerModule } from './app.server'

enableProdMode();

const app = express();

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use(express.static(join(__dirname, '../dist/browser'), { index: false }));

app.get('/', (req, res) => {
	res.render('index', {req});
});

app.get('/lazy', (req, res) => {
	res.render('index', {req});
});

app.listen(8000,() => {
	console.log('http://localhost:8000/ listening...')
});
