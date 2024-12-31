import PdfTextExtractor from "./scripts/pdf_extract.js";
import DocxTextExtractor from "./scripts/docx_extract.js";
import PptxTextExtractor from "./scripts/pptx_extract.js";

class Parser {
  constructor(filePath) {
    this.filePath = filePath;
    console.log("filePath:", filePath);
    this.extension = filePath.split(".").pop().toLowerCase();
    switch (this.extension) {
      case "pdf":
        this.extractor = new PdfTextExtractor();
        console.log("extractor:", this.extractor);
        break;
      case "docx":
        this.extractor = new DocxTextExtractor();
        break;
      case "pptx":
        this.extractor = new PptxTextExtractor();
        break;
      default:
        throw new Error(`Unsupported file type: ${this.extension}`);
    }
  }

  async extractAll() {
    return await this.extractor.extract(this.filePath);
  }

  async extractPage(pageNumber) {
    if (this.extension === "pdf" || this.extension === "pptx") {
      return await this.extractor.extract(this.filePath, pageNumber);
    } else {
      throw new Error(
        "Page extraction is only supported for PDF and pptx files."
      );
    }
  }

  // async extractSlide(slideNumber) {
  //   if (this.extension === "pptx") {
  //     return await this.extractor.extract(this.filePath, slideNumber);
  //   } else {
  //     throw new Error("Slide extraction is only supported for PPTX files.");
  //   }
  // }
}

export default Parser;
