# MultiParser

A powerful npm package for parsing text from PowerPoint, PDF, and Word documents. This tool seamlessly extracts text, making it easier to analyze, process, and integrate with your applications.

## Features

- Parse text from PPT, PDF, and DOCX files
- Easy-to-use API
- High performance and accuracy
- Supports multiple file formats
- Lightweight and fast

## Installation

Install the package via npm:

```bash
npm install @xoxoharsh/multiparser
```

## Usage

Here's how to use the package in your project:

- For parsing whole file:

```bash
import Parser from '@xoxoharsh/multiparser';

const parser = new Parser(filePath);

parser.extractAll().then((text) =>{
    console.log(text);
  }).catch((error) => {
    console.error("Error extracting text:", error);
  });
```

- For parsing a particular page:

```bash
import Parser from '@xoxoharsh/multiparser';

const parser = new Parser(filePath);

parser
  .extractPage(pageNo)
  .then((text) => {
    console.log("Page 3 text:", text);
  })
  .catch((error) => {
    console.error("Error extracting text:", error);
  });

 // Currently this feature is not available for word documents
```

## Contributing

We welcome contributions!
