
// Test file for palm scanner edge function
// Run with: deno run --allow-net test.ts

const TEST_BASE64_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

async function testPalmScanner() {
  console.log('Testing palm scanner edge function...');
  
  try {
    const response = await fetch('http://localhost:54321/functions/v1/palm-scanner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95emJtd3pueHdzZmhhanZpYWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDI2MzcsImV4cCI6MjA2MDk3ODYzN30.ig0-A78kSPOM3UBd_bxfekPmDTWTV_e4fHAFBZCSXVA'
      },
      body: JSON.stringify({
        image: TEST_BASE64_IMAGE,
        analysisType: 'spiritual'
      })
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('✅ Test passed! Palm analysis successful');
      console.log('Confidence score:', result.analysis.confidenceScore);
      console.log('Image quality:', result.analysis.imageQuality);
    } else {
      console.log('❌ Test failed:', result.error);
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Test error cases
async function testErrorCases() {
  console.log('\nTesting error cases...');
  
  // Test missing image
  try {
    const response = await fetch('http://localhost:54321/functions/v1/palm-scanner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95emJtd3pueHdzZmhhanZpYWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDI2MzcsImV4cCI6MjA2MDk3ODYzN30.ig0-A78kSPOM3UBd_bxfekPmDTWTV_e4fHAFBZCSXVA'
      },
      body: JSON.stringify({
        analysisType: 'basic'
      })
    });

    const result = await response.json();
    console.log('Missing image test - Status:', response.status);
    console.log('Missing image test - Response:', result.error);

  } catch (error) {
    console.error('Error in missing image test:', error);
  }

  // Test invalid image format
  try {
    const response = await fetch('http://localhost:54321/functions/v1/palm-scanner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95emJtd3pueHdzZmhhanZpYWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDI2MzcsImV4cCI6MjA2MDk3ODYzN30.ig0-A78kSPOM3UBd_bxfekPmDTWTV_e4fHAFBZCSXVA'
      },
      body: JSON.stringify({
        image: 'invalid-image-data',
        analysisType: 'basic'
      })
    });

    const result = await response.json();
    console.log('Invalid format test - Status:', response.status);
    console.log('Invalid format test - Response:', result.error);

  } catch (error) {
    console.error('Error in invalid format test:', error);
  }
}

// Run tests
if (import.meta.main) {
  await testPalmScanner();
  await testErrorCases();
}
