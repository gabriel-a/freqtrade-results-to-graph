const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
let server;

// Middleware and routes
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/data/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../../files', req.params.filename);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
        } else {
            res.send(data);
        }
    });
});

app.get('/list-files', (req, res) => {
    const filesDir = path.join(__dirname, '../../files');
    fs.readdir(filesDir, (err, files) => {
        if (err) {
            res.status(500).send('Error listing files');
        } else {
            res.send(files.filter(file => file.endsWith('.json')));
        }
    });
});

beforeAll((done) => {
    server = app.listen(3001, () => {
        console.log('Test server running on port 3001');
        done();
    });
});

afterAll((done) => {
    server.close(() => {
        console.log('Test server closed');
        done();
    });
});

describe('Server Endpoints', () => {
    it('should list JSON files', async () => {
        const response = await request(app).get('/list-files');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get JSON data', async () => {
        const response = await request(app).get('/data/example1.json');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should return 500 for non-existing files', async () => {
        const response = await request(app).get('/data/non-existing-file.json');
        expect(response.status).toBe(500);
    });
});
