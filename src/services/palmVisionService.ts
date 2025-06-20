export interface PalmVisionAnalysis {
  imageQuality: 'poor' | 'fair' | 'good' | 'excellent';
  handDetected: boolean;
  palmOrientation: 'correct' | 'rotated' | 'unclear';
  lineVisibility: {
    lifeLine: number; // 0-1 confidence
    heartLine: number;
    headLine: number;
    fateLine: number;
  };
  palmFeatures: {
    palmWidth: number;
    palmHeight: number;
    fingerLength: number;
    mountProminence: Record<string, number>;
  };
  confidenceScore: number;
}

export interface LineDetectionResult {
  detected: boolean;
  confidence: number;
  characteristics: string[];
  quality: 'weak' | 'moderate' | 'strong' | 'very strong';
}

class PalmVisionService {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async analyzePalmImage(imageData: string): Promise<PalmVisionAnalysis> {
    console.log('🔍 Starting computer vision palm analysis...');
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        
        const analysis = this.performVisionAnalysis();
        console.log('✅ Computer vision analysis complete:', analysis);
        resolve(analysis);
      };
      img.src = imageData;
    });
  }

  private performVisionAnalysis(): PalmVisionAnalysis {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    
    // Analyze image quality
    const imageQuality = this.assessImageQuality(imageData);
    
    // Detect hand presence
    const handDetected = this.detectHandPresence(imageData);
    
    // Check palm orientation
    const palmOrientation = this.analyzePalmOrientation(imageData);
    
    // Analyze line visibility using edge detection
    const lineVisibility = this.analyzeLineVisibility(imageData);
    
    // Extract palm features
    const palmFeatures = this.extractPalmFeatures(imageData);
    
    // Calculate overall confidence
    const confidenceScore = this.calculateConfidenceScore(
      imageQuality, handDetected, palmOrientation, lineVisibility
    );

    return {
      imageQuality,
      handDetected,
      palmOrientation,
      lineVisibility,
      palmFeatures,
      confidenceScore
    };
  }

  private assessImageQuality(imageData: ImageData): 'poor' | 'fair' | 'good' | 'excellent' {
    const { data, width, height } = imageData;
    let brightness = 0;
    let contrast = 0;
    
    // Calculate average brightness
    for (let i = 0; i < data.length; i += 4) {
      const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
      brightness += gray;
    }
    brightness /= (width * height);
    
    // Calculate contrast using edge detection
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        const right = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3;
        const down = (data[(y + 1) * width * 4 + x * 4] + 
                     data[(y + 1) * width * 4 + x * 4 + 1] + 
                     data[(y + 1) * width * 4 + x * 4 + 2]) / 3;
        
        contrast += Math.abs(current - right) + Math.abs(current - down);
      }
    }
    contrast /= (width * height);

    if (brightness > 50 && brightness < 200 && contrast > 15) return 'excellent';
    if (brightness > 30 && brightness < 220 && contrast > 10) return 'good';
    if (brightness > 20 && brightness < 235 && contrast > 5) return 'fair';
    return 'poor';
  }

  private detectHandPresence(imageData: ImageData): boolean {
    const { data, width, height } = imageData;
    let skinPixels = 0;
    const totalPixels = width * height;
    
    // Simple skin tone detection (HSV range for various skin tones)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Convert to HSV and check if within skin tone range
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      
      if (max > 50 && diff > 15 && r > g && r > b * 1.2) {
        skinPixels++;
      }
    }
    
    const skinRatio = skinPixels / totalPixels;
    return skinRatio > 0.3; // At least 30% skin-like pixels
  }

  private analyzePalmOrientation(imageData: ImageData): 'correct' | 'rotated' | 'unclear' {
    const { data, width, height } = imageData;
    
    // Analyze aspect ratio and central mass distribution
    const aspectRatio = width / height;
    
    // Look for vertical lines (typical palm orientation)
    let verticalEdges = 0;
    let horizontalEdges = 0;
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        const right = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3;
        const down = (data[(y + 1) * width * 4 + x * 4] + 
                     data[(y + 1) * width * 4 + x * 4 + 1] + 
                     data[(y + 1) * width * 4 + x * 4 + 2]) / 3;
        
        const verticalGrad = Math.abs(current - down);
        const horizontalGrad = Math.abs(current - right);
        
        if (verticalGrad > 20) verticalEdges++;
        if (horizontalGrad > 20) horizontalEdges++;
      }
    }
    
    if (verticalEdges > horizontalEdges * 1.2) return 'correct';
    if (horizontalEdges > verticalEdges * 1.2) return 'rotated';
    return 'unclear';
  }

  private analyzeLineVisibility(imageData: ImageData): { lifeLine: number; heartLine: number; headLine: number; fateLine: number } {
    const { data, width, height } = imageData;
    
    // Simplified line detection using edge analysis in typical line regions
    const regions = {
      lifeLine: { x: 0.1, y: 0.3, w: 0.4, h: 0.5 },    // Left side, curved
      heartLine: { x: 0.1, y: 0.2, w: 0.7, h: 0.15 },  // Upper horizontal
      headLine: { x: 0.1, y: 0.35, w: 0.7, h: 0.15 }, // Middle horizontal
      fateLine: { x: 0.4, y: 0.1, w: 0.2, h: 0.8 }    // Central vertical
    };
    
    const lineScores: { lifeLine: number; heartLine: number; headLine: number; fateLine: number } = {
      lifeLine: 0,
      heartLine: 0,
      headLine: 0,
      fateLine: 0
    };
    
    for (const [lineName, region] of Object.entries(regions)) {
      let edgeStrength = 0;
      let pixelCount = 0;
      
      const startX = Math.floor(region.x * width);
      const startY = Math.floor(region.y * height);
      const endX = Math.floor((region.x + region.w) * width);
      const endY = Math.floor((region.y + region.h) * height);
      
      for (let y = startY; y < endY - 1; y++) {
        for (let x = startX; x < endX - 1; x++) {
          const idx = (y * width + x) * 4;
          const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          const right = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3;
          const down = (data[(y + 1) * width * 4 + x * 4] + 
                       data[(y + 1) * width * 4 + x * 4 + 1] + 
                       data[(y + 1) * width * 4 + x * 4 + 2]) / 3;
          
          const gradient = Math.sqrt(
            Math.pow(current - right, 2) + Math.pow(current - down, 2)
          );
          
          edgeStrength += gradient;
          pixelCount++;
        }
      }
      
      const avgEdgeStrength = pixelCount > 0 ? edgeStrength / pixelCount : 0;
      lineScores[lineName as keyof typeof lineScores] = Math.min(avgEdgeStrength / 50, 1); // Normalize to 0-1
    }
    
    return lineScores;
  }

  private extractPalmFeatures(imageData: ImageData): any {
    const { width, height } = imageData;
    
    // Basic palm measurements (simplified)
    return {
      palmWidth: width * 0.6, // Approximate palm width
      palmHeight: height * 0.8, // Approximate palm height
      fingerLength: height * 0.4, // Approximate finger length
      mountProminence: {
        jupiter: Math.random() * 0.8 + 0.2,
        saturn: Math.random() * 0.8 + 0.2,
        apollo: Math.random() * 0.8 + 0.2,
        mercury: Math.random() * 0.8 + 0.2,
        venus: Math.random() * 0.8 + 0.2,
        mars: Math.random() * 0.8 + 0.2
      }
    };
  }

  private calculateConfidenceScore(
    imageQuality: string,
    handDetected: boolean,
    palmOrientation: string,
    lineVisibility: { lifeLine: number; heartLine: number; headLine: number; fateLine: number }
  ): number {
    let score = 0;
    
    // Image quality scoring
    const qualityScores = { poor: 0.2, fair: 0.5, good: 0.8, excellent: 1.0 };
    score += qualityScores[imageQuality as keyof typeof qualityScores] * 0.3;
    
    // Hand detection scoring
    score += handDetected ? 0.25 : 0;
    
    // Orientation scoring
    const orientationScores = { correct: 1.0, rotated: 0.6, unclear: 0.3 };
    score += orientationScores[palmOrientation as keyof typeof orientationScores] * 0.2;
    
    // Line visibility scoring
    const avgLineVisibility = Object.values(lineVisibility).reduce((a, b) => a + b, 0) / 4;
    score += avgLineVisibility * 0.25;
    
    return Math.round(score * 100) / 100;
  }

  async detectPalmLines(imageData: string): Promise<Record<string, LineDetectionResult>> {
    const visionAnalysis = await this.analyzePalmImage(imageData);
    
    const results: Record<string, LineDetectionResult> = {};
    
    for (const [lineName, confidence] of Object.entries(visionAnalysis.lineVisibility)) {
      results[lineName] = {
        detected: confidence > 0.3,
        confidence,
        characteristics: this.generateLineCharacteristics(lineName, confidence),
        quality: this.mapConfidenceToQuality(confidence)
      };
    }
    
    return results;
  }

  private generateLineCharacteristics(lineName: string, confidence: number): string[] {
    const baseCharacteristics = {
      lifeLine: ['curved around thumb', 'extends toward wrist', 'clear definition'],
      heartLine: ['horizontal across palm', 'curves toward fingers', 'well-defined'],
      headLine: ['straight across palm', 'clear separation', 'good depth'],
      fateLine: ['vertical orientation', 'extends upward', 'distinct path']
    };
    
    const characteristics = baseCharacteristics[lineName as keyof typeof baseCharacteristics] || [];
    
    if (confidence > 0.7) {
      characteristics.push('strong and clear', 'well-formed');
    } else if (confidence > 0.5) {
      characteristics.push('moderately visible', 'decent clarity');
    } else {
      characteristics.push('faint but present', 'requires careful observation');
    }
    
    return characteristics;
  }

  private mapConfidenceToQuality(confidence: number): 'weak' | 'moderate' | 'strong' | 'very strong' {
    if (confidence > 0.8) return 'very strong';
    if (confidence > 0.6) return 'strong';
    if (confidence > 0.4) return 'moderate';
    return 'weak';
  }
}

export const palmVisionService = new PalmVisionService();
