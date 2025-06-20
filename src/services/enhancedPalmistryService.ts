
import { authenticPalmistryService, AuthenticPalmReading } from './authenticPalmistryService';
import { palmVisionService, PalmVisionAnalysis, LineDetectionResult } from './palmVisionService';

export interface EnhancedPalmReading extends AuthenticPalmReading {
  computerVisionAnalysis: PalmVisionAnalysis;
  lineDetectionResults: Record<string, LineDetectionResult>;
  analysisMethod: 'computer_vision_enhanced' | 'traditional_interpretation';
  accuracyScore: number;
}

class EnhancedPalmistryService {
  async generateEnhancedPalmReading(imageData: string): Promise<EnhancedPalmReading> {
    console.log('🔮 Starting enhanced AI palm analysis...');
    
    // Perform computer vision analysis
    const visionAnalysis = await palmVisionService.analyzePalmImage(imageData);
    const lineDetection = await palmVisionService.detectPalmLines(imageData);
    
    console.log('🤖 Computer vision analysis complete:', visionAnalysis);
    console.log('📏 Line detection results:', lineDetection);
    
    // Generate base reading using authentic service
    const baseReading = authenticPalmistryService.generateAuthenticReading();
    
    // Enhance the reading with computer vision insights
    const enhancedReading = this.enhanceWithVisionData(baseReading, visionAnalysis, lineDetection);
    
    console.log('✨ Enhanced reading generated with accuracy:', enhancedReading.accuracyScore);
    
    return enhancedReading;
  }

  private enhanceWithVisionData(
    baseReading: AuthenticPalmReading,
    visionAnalysis: PalmVisionAnalysis,
    lineDetection: Record<string, LineDetectionResult>
  ): EnhancedPalmReading {
    
    // Adjust line analysis based on computer vision results
    const enhancedMajorLines = {
      lifeLine: this.enhanceLineAnalysis(baseReading.majorLines.lifeLine, lineDetection.lifeLine),
      heartLine: this.enhanceLineAnalysis(baseReading.majorLines.heartLine, lineDetection.heartLine),
      headLine: this.enhanceLineAnalysis(baseReading.majorLines.headLine, lineDetection.headLine),
      fateLine: this.enhanceLineAnalysis(baseReading.majorLines.fateLine, lineDetection.fateLine)
    };

    // Calculate accuracy score based on vision confidence
    const accuracyScore = this.calculateAccuracyScore(visionAnalysis, lineDetection);
    
    // Determine analysis method
    const analysisMethod = visionAnalysis.confidenceScore > 0.6 ? 
      'computer_vision_enhanced' : 'traditional_interpretation';

    // Enhance overall reading with vision insights
    const enhancedOverallReading = this.enhanceOverallReading(
      baseReading.overallReading, 
      visionAnalysis,
      analysisMethod
    );

    return {
      ...baseReading,
      majorLines: enhancedMajorLines,
      overallReading: enhancedOverallReading,
      computerVisionAnalysis: visionAnalysis,
      lineDetectionResults: lineDetection,
      analysisMethod,
      accuracyScore,
      confidenceScore: Math.max(baseReading.confidenceScore, accuracyScore)
    };
  }

  private enhanceLineAnalysis(baseLine: any, detection: LineDetectionResult): any {
    if (!detection.detected) {
      return {
        ...baseLine,
        quality: 'weak',
        characteristics: [...baseLine.characteristics, 'faint or interrupted'],
        modernInterpretation: baseLine.modernInterpretation + ' Note: Line shows minimal visibility, suggesting dormant potential.',
        spiritualInsight: baseLine.spiritualInsight + ' The subtle nature of this line indicates hidden strengths waiting to be awakened.'
      };
    }

    // Enhance based on detection confidence
    const qualityBoost = detection.confidence > 0.8 ? 
      'Computer vision confirms exceptional line strength and clarity.' :
      detection.confidence > 0.6 ?
      'AI analysis validates clear line definition and good formation.' :
      'Digital analysis detects moderate line presence with room for development.';

    return {
      ...baseLine,
      quality: detection.quality,
      characteristics: [...baseLine.characteristics, ...detection.characteristics],
      modernInterpretation: baseLine.modernInterpretation + ` ${qualityBoost}`,
      culturalSource: baseLine.culturalSource + ' (Enhanced with AI Computer Vision)'
    };
  }

  private calculateAccuracyScore(
    visionAnalysis: PalmVisionAnalysis,
    lineDetection: Record<string, LineDetectionResult>
  ): number {
    let score = 0;
    
    // Base score from vision analysis confidence
    score += visionAnalysis.confidenceScore * 40;
    
    // Image quality bonus
    const qualityBonus = {
      excellent: 20,
      good: 15,
      fair: 10,
      poor: 0
    };
    score += qualityBonus[visionAnalysis.imageQuality];
    
    // Hand detection bonus
    if (visionAnalysis.handDetected) score += 15;
    
    // Palm orientation bonus
    const orientationBonus = {
      correct: 15,
      rotated: 8,
      unclear: 3
    };
    score += orientationBonus[visionAnalysis.palmOrientation];
    
    // Line detection bonus
    const detectedLines = Object.values(lineDetection).filter(line => line.detected).length;
    score += (detectedLines / 4) * 10; // Up to 10 points for all lines detected
    
    return Math.min(Math.round(score), 98); // Cap at 98% to maintain humility
  }

  private enhanceOverallReading(
    baseReading: string,
    visionAnalysis: PalmVisionAnalysis,
    analysisMethod: string
  ): string {
    const visionInsight = analysisMethod === 'computer_vision_enhanced' ?
      ` Advanced AI computer vision analysis confirms ${visionAnalysis.imageQuality} image quality and detects ${visionAnalysis.handDetected ? 'clear palm presence' : 'subtle palm features'} with ${Math.round(visionAnalysis.confidenceScore * 100)}% technical confidence.` :
      ' This reading draws primarily from traditional palmistry wisdom, enhanced with spiritual intuition.';

    const lineInsight = Object.entries(visionAnalysis.lineVisibility)
      .filter(([_, confidence]) => confidence > 0.6)
      .map(([line, _]) => line)
      .join(' and ');

    const technicalAddition = lineInsight ? 
      ` The computer vision analysis particularly highlights strong ${lineInsight} formations, confirming the spiritual insights revealed through traditional methods.` :
      ' While some palm features require deeper spiritual interpretation beyond technological analysis, the authentic wisdom traditions provide profound guidance.';

    return baseReading + visionInsight + technicalAddition;
  }
}

export const enhancedPalmistryService = new EnhancedPalmistryService();
