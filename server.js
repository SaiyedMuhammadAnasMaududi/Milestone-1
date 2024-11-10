// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to generate PDF
app.post('/generate-pdf', async (req, res) => {
    const { htmlContent } = req.body;

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Set content as the HTML received from the client
        await page.setContent(htmlContent);

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        // Send PDF back as response
        res.contentType("application/pdf");
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Failed to generate PDF');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
