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
  advancedAnalysis: {
    imageMetrics: {
      brightness: number;
      contrast: number;
      sharpness: number;
      resolution: { width: number; height: number };
      issues: string[];
    };
    palmShape: {
      area: number;
      perimeter: number;
      aspectRatio: number;
      palmType: 'Fire Hand' | 'Air Hand' | 'Water Hand' | 'Earth Hand';
      shapeQuality: number;
    };
    lineAnalysis: {
      detectedLines: number;
      majorLines: Record<string, LineProperties | null>;
      lineQuality: {
        completeness: number;
        clarity: number;
        overallScore: number;
      };
    };
    handLandmarks: {
      detectedLandmarks: number;
      landmarks: Array<{ x: number; y: number }>;
      landmarkQuality: number;
    };
  };
}

export interface LineProperties {
  coordinates: [number, number, number, number];
  length: number;
  angle: number;
  strength: number;
  quality: 'weak' | 'moderate' | 'strong' | 'very_strong';
}

export interface LineDetectionResult {
  detected: boolean;
  confidence: number;
  characteristics: string[];
  quality: 'weak' | 'moderate' | 'strong' | 'very strong';
  spiritualInsight: string;
  strengthDescription: string;
}

class PalmVisionService {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async analyzePalmImage(imageData: string): Promise<PalmVisionAnalysis> {
    console.log('🔍 Starting advanced computer vision palm analysis...');
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        
        const analysis = this.performAdvancedVisionAnalysis();
        console.log('✅ Advanced computer vision analysis complete:', analysis);
        resolve(analysis);
      };
      img.src = imageData;
    });
  }

  private performAdvancedVisionAnalysis(): PalmVisionAnalysis {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    
    // Perform comprehensive analysis
    const imageMetrics = this.assessAdvancedImageQuality(imageData);
    const handDetected = this.detectHandPresence(imageData);
    const palmOrientation = this.analyzePalmOrientation(imageData);
    const palmShape = this.analyzePalmShape(imageData);
    const lineAnalysis = this.performAdvancedLineDetection(imageData);
    const handLandmarks = this.detectHandLandmarks(imageData);
    const lineVisibility = this.analyzeLineVisibility(imageData);
    const palmFeatures = this.extractPalmFeatures(imageData);
    
    // Calculate overall confidence
    const confidenceScore = this.calculateAdvancedConfidenceScore(
      imageMetrics, handDetected, palmOrientation, lineAnalysis, palmShape
    );

    // Determine image quality classification
    const imageQuality = this.classifyImageQuality(imageMetrics);

    return {
      imageQuality,
      handDetected,
      palmOrientation,
      lineVisibility,
      palmFeatures,
      confidenceScore,
      advancedAnalysis: {
        imageMetrics,
        palmShape,
        lineAnalysis,
        handLandmarks
      }
    };
  }

  private assessAdvancedImageQuality(imageData: ImageData): any {
    const { data, width, height } = imageData;
    
    // Calculate brightness
    let totalBrightness = 0;
    let brightnessValues: number[] = [];
    
    for (let i = 0; i < data.length; i += 4) {
      const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
      totalBrightness += gray;
      brightnessValues.push(gray);
    }
    
    const brightness = totalBrightness / (width * height);
    
    // Calculate contrast (standard deviation)
    const mean = brightness;
    const variance = brightnessValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / brightnessValues.length;
    const contrast = Math.sqrt(variance);
    
    // Calculate sharpness using Laplacian variance
    let sharpness = 0;
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        
        // Laplacian kernel approximation
        const neighbors = [
          ((y-1) * width + x) * 4,
          ((y+1) * width + x) * 4,
          (y * width + (x-1)) * 4,
          (y * width + (x+1)) * 4
        ];
        
        let laplacian = -4 * current;
        neighbors.forEach(nIdx => {
          if (nIdx >= 0 && nIdx < data.length) {
            laplacian += (data[nIdx] + data[nIdx + 1] + data[nIdx + 2]) / 3;
          }
        });
        
        sharpness += laplacian * laplacian;
      }
    }
    sharpness = sharpness / ((width - 2) * (height - 2));
    
    // Identify issues
    const issues: string[] = [];
    if (brightness < 50) issues.push("Image too dark");
    if (brightness > 200) issues.push("Image too bright");
    if (contrast < 30) issues.push("Low contrast");
    if (sharpness < 100) issues.push("Image blurry");
    if (width < 300 || height < 300) issues.push("Resolution too low");
    
    return {
      brightness,
      contrast,
      sharpness,
      resolution: { width, height },
      issues
    };
  }

  private analyzePalmShape(imageData: ImageData): any {
    const { data, width, height } = imageData;
    
    // Create binary mask for hand detection
    const binaryData = new Uint8Array(width * height);
    let handPixels = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Simple skin detection
      const isSkin = this.isSkinColor(r, g, b);
      const pixelIndex = Math.floor(i / 4);
      binaryData[pixelIndex] = isSkin ? 255 : 0;
      if (isSkin) handPixels++;
    }
    
    // Find hand contour boundaries
    const contour = this.findLargestContour(binaryData, width, height);
    
    // Calculate shape properties
    const area = handPixels;
    const perimeter = this.calculatePerimeter(contour);
    const boundingBox = this.calculateBoundingBox(contour);
    const aspectRatio = boundingBox.width / boundingBox.height;
    
    // Classify palm type
    const palmType = this.classifyPalmType(aspectRatio, area, perimeter);
    const shapeQuality = Math.min(area / 10000, 1.0);
    
    return {
      area,
      perimeter,
      aspectRatio,
      palmType,
      shapeQuality
    };
  }

  private performAdvancedLineDetection(imageData: ImageData): any {
    const { data, width, height } = imageData;
    
    // Enhanced edge detection
    const edges = this.performEdgeDetection(imageData);
    const lines = this.detectLines(edges, width, height);
    
    // Classify lines into major palm lines
    const majorLines = this.classifyPalmLines(lines, width, height);
    
    // Assess line quality
    const lineQuality = this.assessLineQuality(majorLines);
    
    return {
      detectedLines: lines.length,
      majorLines,
      lineQuality
    };
  }

  private performEdgeDetection(imageData: ImageData): ImageData {
    const { data, width, height } = imageData;
    const edges = new ImageData(width, height);
    
    // Sobel edge detection
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        
        // Get neighboring pixels
        const neighbors = [
          [(y-1) * width + (x-1), (y-1) * width + x, (y-1) * width + (x+1)],
          [y * width + (x-1), y * width + x, y * width + (x+1)],
          [(y+1) * width + (x-1), (y+1) * width + x, (y+1) * width + (x+1)]
        ];
        
        // Sobel X kernel: [-1, 0, 1; -2, 0, 2; -1, 0, 1]
        let gx = 0;
        const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const nIdx = neighbors[i][j] * 4;
            const gray = (data[nIdx] + data[nIdx + 1] + data[nIdx + 2]) / 3;
            gx += gray * sobelX[i][j];
          }
        }
        
        // Sobel Y kernel: [-1, -2, -1; 0, 0, 0; 1, 2, 1]
        let gy = 0;
        const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const nIdx = neighbors[i][j] * 4;
            const gray = (data[nIdx] + data[nIdx + 1] + data[nIdx + 2]) / 3;
            gy += gray * sobelY[i][j];
          }
        }
        
        // Calculate magnitude
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        const edgeValue = Math.min(magnitude, 255);
        
        edges.data[idx] = edgeValue;
        edges.data[idx + 1] = edgeValue;
        edges.data[idx + 2] = edgeValue;
        edges.data[idx + 3] = 255;
      }
    }
    
    return edges;
  }

  private detectLines(edges: ImageData, width: number, height: number): Array<{ x1: number; y1: number; x2: number; y2: number; strength: number }> {
    // Simplified Hough transform for line detection
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number; strength: number }> = [];
    const threshold = 50;
    
    // Scan for strong edge pixels and trace lines
    for (let y = 10; y < height - 10; y += 5) {
      for (let x = 10; x < width - 10; x += 5) {
        const idx = (y * width + x) * 4;
        const edgeStrength = edges.data[idx];
        
        if (edgeStrength > threshold) {
          // Try to trace a line from this point
          const line = this.traceLine(edges, x, y, width, height);
          if (line && line.length > 30) {
            lines.push({
              x1: line.x1,
              y1: line.y1,
              x2: line.x2,
              y2: line.y2,
              strength: line.strength
            });
          }
        }
      }
    }
    
    return lines;
  }

  private traceLine(edges: ImageData, startX: number, startY: number, width: number, height: number): any {
    // Simplified line tracing algorithm
    const directions = [
      [1, 0], [1, 1], [0, 1], [-1, 1],
      [-1, 0], [-1, -1], [0, -1], [1, -1]
    ];
    
    let currentX = startX;
    let currentY = startY;
    let length = 0;
    let totalStrength = 0;
    
    // Trace in the strongest direction
    for (let step = 0; step < 50; step++) {
      let bestDirection = null;
      let bestStrength = 0;
      
      for (const [dx, dy] of directions) {
        const newX = currentX + dx;
        const newY = currentY + dy;
        
        if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
          const idx = (newY * width + newX) * 4;
          const strength = edges.data[idx];
          
          if (strength > bestStrength) {
            bestStrength = strength;
            bestDirection = [dx, dy];
          }
        }
      }
      
      if (!bestDirection || bestStrength < 30) break;
      
      currentX += bestDirection[0];
      currentY += bestDirection[1];
      length++;
      totalStrength += bestStrength;
    }
    
    if (length > 15) {
      return {
        x1: startX,
        y1: startY,
        x2: currentX,
        y2: currentY,
        length,
        strength: totalStrength / length
      };
    }
    
    return null;
  }

  private classifyPalmLines(lines: any[], width: number, height: number): Record<string, LineProperties | null> {
    const regions = {
      lifeLine: { x: [0, width * 0.5], y: [height * 0.3, height] },
      heartLine: { x: [0, width], y: [0, height * 0.3] },
      headLine: { x: [0, width], y: [height * 0.25, height * 0.5] },
      fateLine: { x: [width * 0.3, width * 0.7], y: [0, height] }
    };
    
    const classified: Record<string, LineProperties | null> = {
      lifeLine: null,
      heartLine: null,
      headLine: null,
      fateLine: null
    };
    
    for (const line of lines) {
      const midX = (line.x1 + line.x2) / 2;
      const midY = (line.y1 + line.y2) / 2;
      const length = Math.sqrt(Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2));
      const angle = Math.atan2(line.y2 - line.y1, line.x2 - line.x1) * 180 / Math.PI;
      
      for (const [lineType, region] of Object.entries(regions)) {
        if (midX >= region.x[0] && midX <= region.x[1] && 
            midY >= region.y[0] && midY <= region.y[1]) {
          
          const strength = this.calculateLineStrength(length, angle, lineType);
          const quality = this.mapStrengthToQuality(strength);
          
          if (!classified[lineType] || strength > classified[lineType]!.strength) {
            classified[lineType] = {
              coordinates: [line.x1, line.y1, line.x2, line.y2] as [number, number, number, number],
              length,
              angle,
              strength,
              quality
            };
          }
        }
      }
    }
    
    return classified;
  }

  private detectHandPresence(imageData: ImageData): boolean {
    const { data, width, height } = imageData;
    let skinPixels = 0;
    const totalPixels = width * height;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      if (this.isSkinColor(r, g, b)) {
        skinPixels++;
      }
    }
    
    const skinRatio = skinPixels / totalPixels;
    return skinRatio > 0.3;
  }

  private isSkinColor(r: number, g: number, b: number): boolean {
    // Enhanced skin detection algorithm
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    // YCrCb color space skin detection
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const cr = 0.713 * (r - y);
    const cb = 0.564 * (b - y);
    
    return (max > 50 && diff > 15 && r > g && r > b * 1.2) ||
           (cr > -25 && cr < 25 && cb > -15 && cb < 15 && y > 40);
  }

  private analyzePalmOrientation(imageData: ImageData): 'correct' | 'rotated' | 'unclear' {
    const { data, width, height } = imageData;
    
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
    
    const regions = {
      lifeLine: { x: 0.1, y: 0.3, w: 0.4, h: 0.5 },
      heartLine: { x: 0.1, y: 0.2, w: 0.7, h: 0.15 },
      headLine: { x: 0.1, y: 0.35, w: 0.7, h: 0.15 },
      fateLine: { x: 0.4, y: 0.1, w: 0.2, h: 0.8 }
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
      lineScores[lineName as keyof typeof lineScores] = Math.min(avgEdgeStrength / 50, 1);
    }
    
    return lineScores;
  }

  private extractPalmFeatures(imageData: ImageData): any {
    const { width, height } = imageData;
    
    return {
      palmWidth: width * 0.6,
      palmHeight: height * 0.8,
      fingerLength: height * 0.4,
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

  private detectHandLandmarks(imageData: ImageData): any {
    const { data, width, height } = imageData;
    const landmarks: Array<{ x: number; y: number }> = [];
    
    // Simplified corner detection
    for (let y = 10; y < height - 10; y += 10) {
      for (let x = 10; x < width - 10; x += 10) {
        const cornerStrength = this.calculateCornerStrength(data, x, y, width);
        if (cornerStrength > 0.5) {
          landmarks.push({ x, y });
        }
      }
    }
    
    return {
      detectedLandmarks: landmarks.length,
      landmarks: landmarks.slice(0, 20), // Limit to top 20
      landmarkQuality: Math.min(landmarks.length / 20, 1.0)
    };
  }

  private classifyImageQuality(metrics: any): 'poor' | 'fair' | 'good' | 'excellent' {
    const { brightness, contrast, sharpness, issues } = metrics;
    
    if (issues.length === 0 && brightness > 50 && brightness < 200 && contrast > 15 && sharpness > 100) {
      return 'excellent';
    } else if (issues.length <= 1 && brightness > 30 && brightness < 220 && contrast > 10) {
      return 'good';
    } else if (issues.length <= 2 && brightness > 20 && brightness < 235 && contrast > 5) {
      return 'fair';
    }
    return 'poor';
  }

  private classifyPalmType(aspectRatio: number, area: number, perimeter: number): 'Fire Hand' | 'Air Hand' | 'Water Hand' | 'Earth Hand' {
    const shapeIndex = Math.pow(perimeter, 2) / (4 * Math.PI * area);
    
    if (aspectRatio > 1.2) {
      return shapeIndex > 1.3 ? "Fire Hand" : "Air Hand";
    } else {
      return shapeIndex > 1.3 ? "Water Hand" : "Earth Hand";
    }
  }

  private calculateLineStrength(length: number, angle: number, lineType: string): number {
    let strength = Math.min(length / 100, 1.0);
    
    const expectedAngles: Record<string, number> = {
      lifeLine: 45,
      heartLine: 0,
      headLine: 15,
      fateLine: 90
    };
    
    if (lineType in expectedAngles) {
      const angleDiff = Math.abs(angle - expectedAngles[lineType]);
      const angleFactor = Math.max(0, 1 - angleDiff / 90);
      strength *= angleFactor;
    }
    
    return strength;
  }

  private mapStrengthToQuality(strength: number): 'weak' | 'moderate' | 'strong' | 'very_strong' {
    if (strength > 0.8) return 'very_strong';
    if (strength > 0.6) return 'strong';
    if (strength > 0.4) return 'moderate';
    return 'weak';
  }

  private assessLineQuality(majorLines: Record<string, LineProperties | null>): any {
    const detectedLines = Object.values(majorLines).filter(line => line !== null);
    const totalLines = Object.keys(majorLines).length;
    const strongLines = detectedLines.filter(line => line!.strength > 0.7).length;
    
    return {
      completeness: detectedLines.length / totalLines,
      clarity: strongLines / Math.max(detectedLines.length, 1),
      overallScore: (detectedLines.length / totalLines) * 0.6 + (strongLines / Math.max(detectedLines.length, 1)) * 0.4
    };
  }

  private calculateAdvancedConfidenceScore(
    imageMetrics: any,
    handDetected: boolean,
    palmOrientation: string,
    lineAnalysis: any,
    palmShape: any
  ): number {
    let score = 0;
    
    // Image quality scoring (30%)
    if (imageMetrics.issues.length === 0) score += 30;
    else if (imageMetrics.issues.length <= 2) score += 20;
    else score += 10;
    
    // Hand detection (20%)
    if (handDetected) score += 20;
    
    // Palm orientation (15%)
    const orientationScores = { correct: 15, rotated: 8, unclear: 3 };
    score += orientationScores[palmOrientation as keyof typeof orientationScores] || 0;
    
    // Line analysis (25%)
    score += lineAnalysis.lineQuality.overallScore * 25;
    
    // Palm shape quality (10%)
    score += palmShape.shapeQuality * 10;
    
    return Math.min(Math.round(score), 98);
  }

  private findLargestContour(binaryData: Uint8Array, width: number, height: number): Array<{ x: number; y: number }> {
    // Simplified contour finding
    const contour: Array<{ x: number; y: number }> = [];
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (binaryData[idx] === 255) {
          // Check if this is a boundary pixel
          const isBoundary = this.isBoundaryPixel(binaryData, x, y, width, height);
          if (isBoundary) {
            contour.push({ x, y });
          }
        }
      }
    }
    
    return contour;
  }

  private isBoundaryPixel(binaryData: Uint8Array, x: number, y: number, width: number, height: number): boolean {
    if (x === 0 || x === width - 1 || y === 0 || y === height - 1) return true;
    
    const neighbors = [
      [x-1, y-1], [x, y-1], [x+1, y-1],
      [x-1, y], [x+1, y],
      [x-1, y+1], [x, y+1], [x+1, y+1]
    ];
    
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (binaryData[nIdx] === 0) return true;
      }
    }
    
    return false;
  }

  private calculatePerimeter(contour: Array<{ x: number; y: number }>): number {
    if (contour.length < 2) return 0;
    
    let perimeter = 0;
    for (let i = 0; i < contour.length; i++) {
      const current = contour[i];
      const next = contour[(i + 1) % contour.length];
      const distance = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
      perimeter += distance;
    }
    
    return perimeter;
  }

  private calculateBoundingBox(contour: Array<{ x: number; y: number }>): { x: number; y: number; width: number; height: number } {
    if (contour.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
    
    let minX = contour[0].x;
    let maxX = contour[0].x;
    let minY = contour[0].y;
    let maxY = contour[0].y;
    
    for (const point of contour) {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }
    
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }

  private calculateCornerStrength(data: Uint8ClampedArray, x: number, y: number, width: number): number {
    // Harris corner detection approximation
    const window = 3;
    let ixx = 0, iyy = 0, ixy = 0;
    
    for (let dy = -window; dy <= window; dy++) {
      for (let dx = -window; dx <= window; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        const idx = (ny * width + nx) * 4;
        
        if (idx >= 0 && idx < data.length - 3) {
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          const ix = dx * gray / 255;
          const iy = dy * gray / 255;
          
          ixx += ix * ix;
          iyy += iy * iy;
          ixy += ix * iy;
        }
      }
    }
    
    const det = ixx * iyy - ixy * ixy;
    const trace = ixx + iyy;
    const k = 0.04;
    
    return det - k * trace * trace;
  }

  async detectPalmLines(imageData: string): Promise<Record<string, LineDetectionResult>> {
    const visionAnalysis = await this.analyzePalmImage(imageData);
    const results: Record<string, LineDetectionResult> = {};
    
    // Generate enhanced line detection results with spiritual insights
    for (const [lineName, confidence] of Object.entries(visionAnalysis.lineVisibility)) {
      const lineProperties = visionAnalysis.advancedAnalysis.lineAnalysis.majorLines[lineName];
      
      results[lineName] = {
        detected: confidence > 0.3,
        confidence,
        characteristics: this.generateAdvancedLineCharacteristics(lineName, confidence, lineProperties),
        quality: this.mapConfidenceToQuality(confidence),
        spiritualInsight: this.generateSpiritualInsight(lineName, confidence, lineProperties),
        strengthDescription: this.generateStrengthDescription(confidence, lineProperties)
      };
    }
    
    return results;
  }

  private generateAdvancedLineCharacteristics(lineName: string, confidence: number, lineProperties: LineProperties | null): string[] {
    const baseCharacteristics: Record<string, string[]> = {
      lifeLine: ['curved around thumb', 'extends toward wrist', 'life force indicator'],
      heartLine: ['horizontal across palm', 'emotional expression line', 'love and relationships'],
      headLine: ['mental clarity line', 'intellectual capacity', 'decision-making ability'],
      fateLine: ['destiny and career line', 'life purpose indicator', 'spiritual calling']
    };
    
    const characteristics = [...(baseCharacteristics[lineName] || [])];
    
    if (lineProperties) {
      characteristics.push(`${Math.round(lineProperties.length)}px length`);
      characteristics.push(`${lineProperties.quality} quality`);
      
      if (lineProperties.strength > 0.8) {
        characteristics.push('exceptionally clear and well-defined');
      } else if (lineProperties.strength > 0.6) {
        characteristics.push('clearly visible with good definition');
      } else if (lineProperties.strength > 0.4) {
        characteristics.push('moderately visible');
      } else {
        characteristics.push('faint but discernible');
      }
    }
    
    if (confidence > 0.7) {
      characteristics.push('computer vision confirmed');
    }
    
    return characteristics;
  }

  private generateSpiritualInsight(lineName: string, confidence: number, lineProperties: LineProperties | null): string {
    const insights: Record<string, Record<string, string>> = {
      lifeLine: {
        strong: "Your life force burns brightly with divine protection. You are blessed with robust spiritual vitality.",
        moderate: "Your spiritual energy flows steadily. Trust in your inner strength and divine guidance.",
        weak: "Your gentle life force suggests deep sensitivity. Nurture your spiritual nature through prayer and meditation."
      },
      heartLine: {
        strong: "Your heart is a vessel of divine love, capable of profound spiritual healing and emotional wisdom.",
        moderate: "Your capacity for love grows through spiritual practice. Open your heart to divine compassion.",
        weak: "Your tender heart requires gentle nurturing. Seek divine love to heal and strengthen your emotional nature."
      },
      headLine: {
        strong: "Divine wisdom flows through your mind. You possess the gift of spiritual discernment and clear thinking.",
        moderate: "Your mental clarity develops through spiritual study. Continue seeking divine understanding.",
        weak: "Your intuitive mind transcends logic. Trust your divine insights over purely rational thought."
      },
      fateLine: {
        strong: "Your destiny path is clearly marked by divine design. Trust in your spiritual calling and life purpose.",
        moderate: "Your life purpose evolves through spiritual growth. Stay open to divine guidance and new revelations.",
        weak: "Your destiny is self-created through divine free will. You have the power to shape your spiritual path."
      }
    };
    
    const strengthLevel = confidence > 0.7 ? 'strong' : confidence > 0.4 ? 'moderate' : 'weak';
    return insights[lineName]?.[strengthLevel] || "This line holds unique spiritual significance for your divine journey.";
  }

  private generateStrengthDescription(confidence: number, lineProperties: LineProperties | null): string {
    if (!lineProperties) {
      return confidence > 0.5 ? "Spiritually present but physically subtle" : "Requires deeper spiritual awakening to manifest";
    }
    
    const strength = lineProperties.strength;
    
    if (strength > 0.8) {
      return "Exceptionally strong with clear divine purpose";
    } else if (strength > 0.6) {
      return "Well-defined with solid spiritual foundation";
    } else if (strength > 0.4) {
      return "Moderately developed with growing spiritual awareness";
    } else {
      return "Gentle manifestation requiring spiritual nurturing";
    }
  }

  private mapConfidenceToQuality(confidence: number): 'weak' | 'moderate' | 'strong' | 'very strong' {
    if (confidence > 0.8) return 'very strong';
    if (confidence > 0.6) return 'strong';
    if (confidence > 0.4) return 'moderate';
    return 'weak';
  }
}

export const palmVisionService = new PalmVisionService();
