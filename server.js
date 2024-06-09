const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Endpoint to get the JSON data
app.get('/data/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'files', req.params.filename);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
        } else {
            res.send(data);
        }
    });
});

// Endpoint to list JSON files
app.get('/list-files', (req, res) => {
    const filesDir = path.join(__dirname, 'files');
    fs.readdir(filesDir, (err, files) => {
        if (err) {
            res.status(500).send('Error listing files');
        } else {
            res.send(files.filter(file => file.endsWith('.json')));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
