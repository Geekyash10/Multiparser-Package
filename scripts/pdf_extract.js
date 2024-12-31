// DocumentTextExtractor.js (original file with minor refactoring)
import { PDFExtract } from "pdf.js-extract";
import fs from "fs";

class PdfTextExtractor {
  constructor() {
    this.pdfExtract = new PDFExtract();
  }

  async extract(filePath, pageNumber = null) {
    return await this.extractPdfText(filePath, pageNumber);
  }

  async extractPdfText(filePath, pageNumber) {
    console.log("filePath:", filePath);
    try {
      const data = await this.pdfExtract.extract(filePath, {});

      if (pageNumber) {
        const currentPage = data.pages[pageNumber - 1];
        if (currentPage) {
          return currentPage.content.map((item) => item.str).join(" ");
        } else {
          throw new Error(`Invalid page number: ${pageNumber}`);
        }
      } else {
        const fullText = data.pages
          .map((page) => page.content.map((item) => item.str).join(" "))
          .join("\n\n");
        return fullText;
      }
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw error;
    }
  }
}

export default PdfTextExtractor;
