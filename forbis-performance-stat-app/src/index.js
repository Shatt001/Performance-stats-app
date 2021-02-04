import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import AppRouter from './routers/AppRoute'
import 'normalize.css/normalize.css';
import Approuter from './routers/AppRouter';
import './styles/styles.scss'

ReactDOM.render(<Approuter />, document.getElementById('app'))


