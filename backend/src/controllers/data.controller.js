// // import { Request, Response } from 'express';
// const { PDFDocument }  = require('pdf-lib');
// const { SentenceTransformer } = require('sentence-transformers');

// const  { Pinecone } = require('@pinecone-database/pinecone');

// const pc = new Pinecone({
//     apiKey  : process.env.PINECONE_API_KEY || "",
// });


// const createEmbeddings = async (req, res) => {
//   try {
//     const namespace = req.body.namespace;
//     const file = req.file ; // Type the file object correctly

//     // Check Pinecone API Key
//     console.log(process.env.PINECONE_API_KEY);

//     const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || "" });

//     // Log all environment variables
//     Object.entries(process.env).forEach(([key, value]) => {
//       console.log(`${key}: ${value}`);
//     });

//     let fileText = "";

//     // Read and extract text from the PDF
//     const pdfDoc = await PDFDocument.load(file.buffer);
//     const numPages = pdfDoc.getPageCount();

//     for (let i = 0; i < numPages; i++) {
//       const page = pdfDoc.getPage(i);
//       const textContent = await page.getTextContent(); // Ensure this is asynchronous
//       fileText += textContent.items.map((item) => item.str).join(" ");
//     }

//     console.log("Text Data-----------------", fileText);

//     // Create embeddings using SentenceTransformer
//     const embeddingsModel = new SentenceTransformer("all-MiniLM-L6-v2");
//     const chunkSize = 500;
//     const chunks = fileText.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];

//     const chunkEmbeddings = [];
//     for (const chunk of chunks) {
//       const embedding = await embeddingsModel.encode(chunk);
//       chunkEmbeddings.push(embedding);
//     }

//     const indexName = namespace;
//     const embeddingDimension = 384; // Fixed size for 'all-MiniLM-L6-v2'

//     if (!(await pc.listIndexes()).includes(indexName)) {
//       await pc.createIndex(indexName, {
//         dimension: embeddingDimension,
//         metric: 'euclidean',
//         cloud: 'aws',
//         region: 'us-east-1',
//       });
//     }

//     const index = pc.Index(indexName);

//     // Prepare vectors with metadata
//     const vectors = chunks.map((chunkText, i) => ({
//       id: `${namespace}_chunk_${i}`,
//       values: chunkEmbeddings[i],
//       metadata: { text: chunkText },
//     }));

//     // Upsert vectors to Pinecone index
//     await index.upsert({ vectors });
//     console.log(`Created embeddings in Pinecone under index: ${namespace}`);

//     res.status(200).send({ message: "Embeddings created and stored successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// };


// module.exports = {createEmbeddings} ;