// pptx_extract.js
import JSZip from "jszip";
import fs from "fs";
import xml2js from "xml2js";

class PptxTextExtractor {
  /**
   * Extract text from a PPTX file
   * @param {string} filePath - Path to the PPTX file
   * @param {number} slideNumber (optional) - Specific slide number to extract (1-based)
   * @returns {Promise<string>} Extracted text
   * 
   * 
   */

  async extract(filePath, slideNumber = null) {
    this.validateFile(filePath);
    return await this.extractPptxText(filePath, slideNumber);
  }


  async extractPptxText(filePath, slideNumber) {
    try {
      const data = fs.readFileSync(filePath);
      const zip = new JSZip();
      const content = await zip.loadAsync(data);

      const slideFiles = Object.keys(content.files)
        .filter((name) => name.startsWith("ppt/slides/slide"))
        .sort((a, b) => {
          const slideNumberA = parseInt(
            a.replace("ppt/slides/slide", "").replace(".xml", "")
          );
          const slideNumberB = parseInt(
            b.replace("ppt/slides/slide", "").replace(".xml", "")
          );
          return slideNumberA - slideNumberB;
        });

      if (slideNumber) {
        // Extract text from a specific slide
        if (slideNumber > 0 && slideNumber <= slideFiles.length) {
          const slideFile = slideFiles[slideNumber - 1];
          const slideXml = await content.file(slideFile).async("text");
          const result = await xml2js.parseStringPromise(slideXml);

          let slideText = "";
          const shapes =
            result["p:sld"]["p:cSld"][0]["p:spTree"][0]["p:sp"] || [];
          shapes.forEach((shape) => {
            if (shape["p:txBody"]) {
              const textElements = shape["p:txBody"][0]["a:p"] || [];
              textElements.forEach((textElement) => {
                const textRuns = textElement["a:r"] || [];
                textRuns.forEach((textRun) => {
                  const text = textRun["a:t"]?.[0];
                  if (text) {
                    slideText += text.trim() + " ";
                  }
                });
              });
            }
          });
          return slideText.trim();
        } else {
          throw new Error(`Invalid slide number: ${slideNumber}`);
        }
      } else {
        // Extract text from all slides
        const allSlideTexts = [];
        for (let i = 0; i < slideFiles.length; i++) {
          const slideFile = slideFiles[i];
          const slideXml = await content.file(slideFile).async("text");
          const result = await xml2js.parseStringPromise(slideXml);

          let slideText = "";
          const shapes =
            result["p:sld"]["p:cSld"][0]["p:spTree"][0]["p:sp"] || [];
          shapes.forEach((shape) => {
            if (shape["p:txBody"]) {
              const textElements = shape["p:txBody"][0]["a:p"] || [];
              textElements.forEach((textElement) => {
                const textRuns = textElement["a:r"] || [];
                textRuns.forEach((textRun) => {
                  const text = textRun["a:t"]?.[0];
                  if (text) {
                    slideText += text.trim() + " ";
                  }
                });
              });
            }
          });
          allSlideTexts.push(`Slide ${i + 1} Text: ${slideText.trim()}`);
        }
        return allSlideTexts.join("\n");
      }
    } catch (error) {
      console.error("Error extracting text from PPTX:", error);
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
    if (extension !== "pptx") {
      throw new Error(`Unsupported file type: ${extension}`);
    }

    return extension;
  }

  /**
   * Extract text from a PPTX file
   * @param {string} filePath - Path to the document
   * @param {number} slideNumber (optional) - Specific slide number to extract (1-based)
   * @returns {Promise<string>} Extracted text
   */
  async extract(filePath, slideNumber) {
    this.validateFile(filePath);
    return await this.extractPptxText(filePath, slideNumber);
  }
}

export default PptxTextExtractor;