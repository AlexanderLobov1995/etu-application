// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import '@angular/http';
import '@angular/router';

import 'rxjs/Rx';

import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js';

import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';


registerLocaleData(localeDe);
platformBrowserDynamic().bootstrapModule(AppModule);
