const port = 8000;
// const express = require('express');
import express, { query } from 'express';
// const cors = require('cors');
import cors from 'cors';
// const axios = require('axios');
import axios from 'axios';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.json('hi');
});

app.get('/distortions', async (req, res) => {
	console.log(req.query.sentence);
	const response = await axios.post(
		'https://api.openai.com/v1/completions',
		{
			prompt: `create a numbered list of titles of cognitive distortions can be found in this sentence: "${req.query.sentence}"`,
			model: 'text-curie-001',
			max_tokens: 1050,
			n: 1,
			stop: ['{}'],
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CHAT_GPT_API_KEY}`,
			},
		}
	);

	console.log(response.data.choices);
	res.json(response.data.choices);
});

app.listen(port, () => console.log('Server is listening on port ' + port));