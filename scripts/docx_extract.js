import mammoth from "mammoth";
import fs from "fs";

class DocxTextExtractor {
  /**
   * 
   async extract(filePath) {
    this.validateFile(filePath);
    return await this.extractDocxText(filePath);
   * Extract text from a DOCX file
   * @param {string} filePath - Path to the DOCX file
   * @returns {Promise<string>} Extracted text
   */
  async extract(filePath) {
    this.validateFile(filePath);
    return await this.extractDocxText(filePath);
  }

  async extractDocxText(filePath) {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const { value: text } = await mammoth.extractRawText({
        buffer: fileBuffer,
      });
      return text;
    } catch (error) {
      console.error("Error extracting text from DOCX:", error);
      throw error;
    }
  }

  /**
   * Validate file existence and extension
   * @param {string} filePath - Path to check
   * @returns {string} File extension
   */
  validateFile(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const extension = filePath.split(".").pop().toLowerCase();
    if (extension !== "docx") {
      throw new Error(`Unsupported file type: ${extension}`);
    }

    return extension;
  }

  /**
   * Extract text from a DOCX file
   * @param {string} filePath - Path to the document
   * @returns {Promise<string>} Extracted text
   */
  async extract(filePath) {
    this.validateFile(filePath);
    return await this.extractDocxText(filePath);
  }
}

export default DocxTextExtractor;
