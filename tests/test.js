import Parser from "../index.js";
import path from "path";

const __dirname = path.resolve();

const filePath = path.join(__dirname, "tests", "test_pdf.pdf");
const parser = new Parser(filePath);
// Extract all text from the PDF

parser
  .extractAll()

  .then((text) => {
    console.log("Full PDF text:", text);
  })
  .catch((error) => {
    console.error("Error extracting text:", error);
  });

// Extract text from page 3 of the PDF
parser
  .extractPage(3)
  .then((text) => {
    console.log("Page 3 text:", text);
  })
  .catch((error) => {
    console.error("Error extracting text:", error);
  });

// Extract all text from a PPTX file

const pptxFilePath = path.join(__dirname, "tests", "test_ppt.pptx");

const pptxParser = new Parser(pptxFilePath);
pptxParser
  .extractAll()
  .then((text) => {
    console.log("Full PPTX text:", text);
  })
  .catch((error) => {
    console.error("Error extracting text:", error);
  });

// Extract text from page 2 of a PPTX
pptxParser
  .extractPage(2)
  .then((text) => {
    console.log("Page 2 text:", text);
  })
  .catch((error) => {
    console.error("Error extracting text:", error);
  });

// Extract text from a DOCX file
const docxFilePath = path.join(__dirname, "tests", "test_doc.docx");

const docxParser = new Parser(docxFilePath);

docxParser
  .extractAll()
  .then((text) => {
    console.log("Full DOCX text:", text);
  })
  .catch((error) => {
    console.error("Error extracting text:", error);
  });

docxParser
  .extractPage(2)
  .then((text) => {
    console.log("Docx Page 2 text:", text);
  })
  .catch((error) => {
    console.error("Error extracting text:", error);
  });
