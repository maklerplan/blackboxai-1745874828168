require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');
const maklerRoutes = require('./routes/maklerRoutes');
