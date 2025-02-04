const fs = require("fs");
const path = require("path");
const Tesseract = require("tesseract.js");
const { PdfExtractor } = require("pdf-extractor");

const outputDir = "./images";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

/**
 * @module PdfService
 * @description Extracts text from a PDF file by converting it to images and using Optical Character Recognition (OCR).
 */

/**
 * Extracts text from a given PDF file using OCR (Optical Character Recognition).
 * This function first converts the PDF pages into images and then extracts text from them.
 * 
 * @async
 * @function extractTextFromPDF
 * @param {string} pdfPath - The file path of the PDF to extract text from.
 * @returns {string} A Promise that resolves with the extracted text from the PDF.
 *
 */
const extractTextFromPDF = async (pdfPath) => {
  const pdfExtractor = new PdfExtractor(outputDir, {
    viewportScale: (width) => (width > 1600 ? 1600 / width : 1),
    pageRange: [1, 3],
  });

  try {
    await pdfExtractor.parse(pdfPath);
    const files = fs.readdirSync(outputDir);
    let extractedText = "";

    for (const file of files) {
      if (file.endsWith(".png")) {
        const imagePath = path.join(outputDir, file);
        const { data } = await Tesseract.recognize(imagePath, "eng");
        extractedText += `${data.text} `;
      }
    }

    fs.rmSync(outputDir, { recursive: true, force: true });
    fs.rmSync(pdfPath, { force: true });

    return extractedText;
  } catch (error) {
    throw new Error("Error extracting text from PDF: " + error.message);
  }
};

module.exports = extractTextFromPDF;
