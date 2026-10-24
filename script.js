const cameraInput = document.getElementById('imageInputCamera');
const galleryInput = document.getElementById('imageInputGallery');
const statusDiv = document.getElementById('status');
const outputArea = document.getElementById('outputArea');
const copyBtn = document.getElementById('copyBtn');

// Function to run OCR on selected image
async function processImage(file) {
  if (!file) return;

  statusDiv.innerText = 'Initializing scanner...';
  outputArea.value = '';

  try {
    // Create OCR worker using Tesseract.js
    const worker = await Tesseract.createWorker('eng');

    statusDiv.innerText = 'Extracting text... Please wait...';
    
    // Recognize text from image
    const ret = await worker.recognize(file);
    
    // Put extracted text into textarea
    outputArea.value = ret.data.text;
    statusDiv.innerText = 'Extraction complete!';
    
    await worker.terminate();
  } catch (error) {
    console.error(error);
    statusDiv.innerText = 'Failed to extract text. Please try another image.';
  }
}

// Listen for Camera upload
cameraInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    processImage(e.target.files[0]);
  }
});

// Listen for Gallery/Screenshot upload
galleryInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    processImage(e.target.files[0]);
  }
});

// Copy button functionality
copyBtn.addEventListener('click', () => {
  if (outputArea.value) {
    navigator.clipboard.writeText(outputArea.value);
    copyBtn.innerText = 'Copied!';
    setTimeout(() => {
      copyBtn.innerText = 'Copy Text';
    }, 2000);
  }
});
