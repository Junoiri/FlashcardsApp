const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const extractText = require("../extractor");

const router = express.Router();
router.use(fileUpload());

const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

/**
 * @swagger
 * /extract-text:
 *   post:
 *     summary: Uploads a PDF and extracts text from it
 *     tags: [PDF Extraction]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: pdfFile
 *         type: file
 *         required: true
 *         description: The PDF file to extract text from
 *     responses:
 *       200:
 *         description: Successfully extracted text
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */
router.post("/extract-text", async (req, res) => {
  if (!req.files || !req.files.pdfFile) {
    return res.status(400).json({ error: "No PDF file uploaded." });
  }

  const pdfFile = req.files.pdfFile;
  const pdfPath = path.join(__dirname, "..", uploadsDir, pdfFile.name);

  pdfFile.mv(pdfPath, async (err) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const extractedText = await extractText(pdfPath);
      res.json({ text: extractedText });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

module.exports = router;
