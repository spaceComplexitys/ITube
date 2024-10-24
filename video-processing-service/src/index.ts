// //import express from 'express';
// import express, { Request, Response } from 'express';
// import { 
//   uploadProcessedVideo,
//   downloadRawVideo,
//   deleteRawVideo,
//   deleteProcessedVideo,
//   convertVideo,
//   setupDirectories
// } from './storage';

// // Create the local directories for videos
// setupDirectories();

// const app: express.Application = express();
// app.use(express.json());

// // Process a video file from Cloud Storage into 360p
// app.post('/process-video', async (req: Request, res: Response): Promise<Response> => {

//     // Get the bucket and filename from the Cloud Pub/Sub message
//     let data;
//     try {
//       const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
//       data = JSON.parse(message);
//       if (!data.name) {
//         throw new Error('Invalid message payload received.');
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(400).send('Bad Request: missing filename.');
//     }

//     const inputFileName = data.name;
//     const outputFileName = `processed-${inputFileName}`;

//     // Download the raw video from Cloud Storage
//     await downloadRawVideo(inputFileName);

//     // Process the video into 360p
//     try {
//       await convertVideo(inputFileName, outputFileName);
//     } catch (err) {
//       await Promise.all([
//         deleteRawVideo(inputFileName),
//         deleteProcessedVideo(outputFileName)
//       ]);
//       return res.status(500).send('Processing failed');
//     }

//     // Upload the processed video to Cloud Storage
//     await uploadProcessedVideo(outputFileName);

//     await Promise.all([
//       deleteRawVideo(inputFileName),
//       deleteProcessedVideo(outputFileName)
//     ]);

//     return res.status(200).send('Processing finished successfully');
//   });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


import express, { Request, Response } from 'express';

import { 
  uploadProcessedVideo,
  downloadRawVideo,
  deleteRawVideo,
  deleteProcessedVideo,
  convertVideo,
  setupDirectories
} from './storage';

// Create the local directories for videos
setupDirectories();

const app = express();
app.use(express.json());

// Define a type for the request body
interface PubSubRequestBody {
  message: {
    data: string;
  };
}

// Process a video file from Cloud Storage into 360p
app.post('/process-video', async (req: Request<{}, {}, PubSubRequestBody>, res: Response): Promise<void> => {
  // Get the bucket and filename from the Cloud Pub/Sub message
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
    const data = JSON.parse(message);

    if (!data.name) {
 
      res.status(400).send('Bad Request: missing filename.');
      return;
    }

    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;

    // Download the raw video from Cloud Storage
    await downloadRawVideo(inputFileName);

    // Process the video into 360p
    try { 
      await convertVideo(inputFileName, outputFileName);
    } catch (err) {
      console.error('Error during video conversion:', err);
      await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
      ]);
      res.status(500).send('Processing failed');
      return; // Ensure the function stops here if there's an error
    }

    // Upload the processed video to Cloud Storage
    await uploadProcessedVideo(outputFileName);

    // Cleanup
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName)
    ]);

    res.status(200).send('Processing finished successfully');
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(400).send('Bad Request: invalid payload or processing error.');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});