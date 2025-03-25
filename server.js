const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.use(bodyParser.json({ limit: '50mb' }));

// Upload file
app.post('/upload', async (req, res) => {
    const { classValue, boardValue, subjectValue, fileName, fileContent } = req.body;

    try {
        const response = await fetch(`https://api.github.com/repos/CompeteX001/sneha-tution-admin/contents/uploads/${classValue}/${boardValue}/${subjectValue}/${fileName}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Upload ${fileName}`,
                content: fileContent,
                branch: 'main'
            })
        });

        const data = await response.json();

        if (data.commit) {
            res.status(200).json({ message: 'File uploaded successfully!' });
        } else {
            res.status(500).json({ message: 'File upload failed. Please try again.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'File upload failed. Please try again.' });
    }
});

// List uploaded files
app.get('/list-uploads', async (req, res) => {
    try {
        const response = await fetch(`https://api.github.com/repos/CompeteX001/sneha-tution-admin/contents/uploads`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error fetching file list. Please try again later.' });
    }
});

// Delete file
app.post('/delete', async (req, res) => {
    const { filePath, fileSHA } = req.body;

    try {
        const response = await fetch(`https://api.github.com/repos/CompeteX001/sneha-tution-admin/contents/${filePath}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Delete ${filePath}`,
                sha: fileSHA,
                branch: 'main'
            })
        });

        if (response.ok) {
            res.status(200).json({ message: 'File deleted successfully!' });
        } else {
            res.status(500).json({ message: 'Failed to delete file. Please try again.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to delete file. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
