
import { authenticPalmistryService, AuthenticPalmReading } from './authenticPalmistryService';
import { palmVisionService, PalmVisionAnalysis, LineDetectionResult } from './palmVisionService';

export interface EnhancedPalmReading extends AuthenticPalmReading {
  computerVisionAnalysis: PalmVisionAnalysis;
  lineDetectionResults: Record<string, LineDetectionResult>;
  analysisMethod: 'computer_vision_enhanced' | 'traditional_interpretation';
  accuracyScore: number;
  advancedInsights: {
    palmType: string;
    elementalNature: string;
    spiritualGifts: string[];
    imageQualityAnalysis: string;
    lineQualityReport: string;
    overallConfidence: string;
  };
}

class EnhancedPalmistryService {
  async generateEnhancedPalmReading(imageData: string): Promise<EnhancedPalmReading> {
    console.log('🔮 Starting advanced AI palm analysis with computer vision...');
    
    // Perform computer vision analysis
    const visionAnalysis = await palmVisionService.analyzePalmImage(imageData);
    const lineDetection = await palmVisionService.detectPalmLines(imageData);
    
    console.log('🤖 Advanced computer vision analysis complete:', visionAnalysis);
    console.log('📏 Enhanced line detection results:', lineDetection);
    
    // Generate base reading using authentic service
    const baseReading = authenticPalmistryService.generateAuthenticReading();
    
    // Enhance the reading with advanced computer vision insights
    const enhancedReading = this.enhanceWithAdvancedVisionData(baseReading, visionAnalysis, lineDetection);
    
    console.log('✨ Enhanced reading generated with accuracy:', enhancedReading.accuracyScore);
    
    return enhancedReading;
  }

  private enhanceWithAdvancedVisionData(
    baseReading: AuthenticPalmReading,
    visionAnalysis: PalmVisionAnalysis,
    lineDetection: Record<string, LineDetectionResult>
  ): EnhancedPalmReading {
    
    // Enhance line analysis with advanced computer vision results
    const enhancedMajorLines = {
      lifeLine: this.enhanceAdvancedLineAnalysis(baseReading.majorLines.lifeLine, lineDetection.lifeLine, 'lifeLine', visionAnalysis),
      heartLine: this.enhanceAdvancedLineAnalysis(baseReading.majorLines.heartLine, lineDetection.heartLine, 'heartLine', visionAnalysis),
      headLine: this.enhanceAdvancedLineAnalysis(baseReading.majorLines.headLine, lineDetection.headLine, 'headLine', visionAnalysis),
      fateLine: this.enhanceAdvancedLineAnalysis(baseReading.majorLines.fateLine, lineDetection.fateLine, 'fateLine', visionAnalysis)
    };

    // Calculate advanced accuracy score
    const accuracyScore = this.calculateAdvancedAccuracyScore(visionAnalysis, lineDetection);
    
    // Determine analysis method based on advanced metrics
    const analysisMethod = visionAnalysis.confidenceScore > 0.6 && visionAnalysis.advancedAnalysis.imageMetrics.issues.length <= 1 ? 
      'computer_vision_enhanced' : 'traditional_interpretation';

    // Generate advanced insights
    const advancedInsights = this.generateAdvancedInsights(visionAnalysis, lineDetection, analysisMethod);

    // Enhance overall reading with advanced vision insights
    const enhancedOverallReading = this.enhanceOverallReadingWithAdvancedData(
      baseReading.overallReading, 
      visionAnalysis,
      analysisMethod,
      advancedInsights
    );

    return {
      ...baseReading,
      majorLines: enhancedMajorLines,
      overallReading: enhancedOverallReading,
      computerVisionAnalysis: visionAnalysis,
      lineDetectionResults: lineDetection,
      analysisMethod,
      accuracyScore,
      advancedInsights,
      confidenceScore: Math.max(baseReading.confidenceScore, accuracyScore)
    };
  }

  private enhanceAdvancedLineAnalysis(baseLine: any, detection: LineDetectionResult, lineType: string, visionAnalysis: PalmVisionAnalysis): any {
    if (!detection.detected) {
      return {
        ...baseLine,
        quality: 'weak',
        characteristics: [...baseLine.characteristics, 'spiritually present but physically subtle'],
        modernInterpretation: baseLine.modernInterpretation + ' Advanced computer vision analysis suggests this line manifests more in the spiritual realm than the physical. This indicates profound inner development that may not yet be fully expressed in the material world.',
        spiritualInsight: baseLine.spiritualInsight + ' The subtle nature of this line reveals hidden spiritual depths. Your divine gifts in this area are developing through inner work and will manifest more clearly as you continue your spiritual journey.',
        culturalSource: baseLine.culturalSource + ' (Enhanced with Advanced AI Computer Vision)'
      };
    }

    // Get advanced line properties if available
    const lineProperties = visionAnalysis.advancedAnalysis.lineAnalysis.majorLines[lineType];
    
    // Enhanced analysis based on advanced detection
    let advancedInsight = '';
    let qualityEnhancement = '';
    
    if (detection.confidence > 0.8) {
      advancedInsight = ' Advanced AI computer vision confirms exceptional line strength and divine clarity. ';
      qualityEnhancement = 'This represents a highly developed spiritual aspect with strong manifestation in your physical life.';
    } else if (detection.confidence > 0.6) {
      advancedInsight = ' Computer vision analysis validates clear line definition and authentic spiritual development. ';
      qualityEnhancement = 'This shows balanced spiritual growth with good physical manifestation.';
    } else {
      advancedInsight = ' Digital analysis detects moderate spiritual presence with growing manifestation potential. ';
      qualityEnhancement = 'This indicates developing spiritual capacity that will strengthen with continued practice.';
    }

    // Add advanced characteristics from computer vision
    const enhancedCharacteristics = [
      ...baseLine.characteristics,
      ...detection.characteristics,
      detection.strengthDescription
    ];

    // Include palm type influence
    const palmType = visionAnalysis.advancedAnalysis.palmShape.palmType;
    const elementalInfluence = this.getElementalInfluence(palmType, lineType);

    return {
      ...baseLine,
      quality: detection.quality,
      characteristics: enhancedCharacteristics,
      modernInterpretation: baseLine.modernInterpretation + advancedInsight + qualityEnhancement + elementalInfluence,
      spiritualInsight: baseLine.spiritualInsight + ' ' + detection.spiritualInsight,
      culturalSource: baseLine.culturalSource + ' (Enhanced with Advanced AI Computer Vision & Elemental Analysis)',
      advancedMetrics: lineProperties ? {
        length: lineProperties.length,
        angle: lineProperties.angle,
        strength: lineProperties.strength,
        computedQuality: lineProperties.quality
      } : null
    };
  }

  private getElementalInfluence(palmType: string, lineType: string): string {
    const influences: Record<string, Record<string, string>> = {
      'Fire Hand': {
        lifeLine: ' Your Fire Hand nature amplifies this line with passionate life force and dynamic spiritual energy.',
        heartLine: ' Fire element enhances your capacity for intense divine love and transformative emotional experiences.',
        headLine: ' Fire energy brings inspirational thinking and breakthrough spiritual insights.',
        fateLine: ' Fire nature propels you toward bold spiritual leadership and pioneering life purpose.'
      },
      'Air Hand': {
        lifeLine: ' Your Air Hand nature brings intellectual vitality and communicative life force to this line.',
        heartLine: ' Air element creates emotional clarity and the ability to express divine love through wisdom.',
        headLine: ' Air energy enhances mental agility and spiritual communication abilities.',
        fateLine: ' Air nature guides you toward teaching, writing, or sharing spiritual knowledge.'
      },
      'Water Hand': {
        lifeLine: ' Your Water Hand nature flows with intuitive life force and emotional spiritual depth.',
        heartLine: ' Water element deepens your capacity for healing love and empathic spiritual connection.',
        headLine: ' Water energy brings psychic insights and intuitive spiritual understanding.',
        fateLine: ' Water nature draws you toward healing arts and compassionate service.'
      },
      'Earth Hand': {
        lifeLine: ' Your Earth Hand nature grounds this line with practical spiritual wisdom and steady life force.',
        heartLine: ' Earth element creates stable, nurturing love and reliable emotional spiritual support.',
        headLine: ' Earth energy brings practical spiritual application and grounded divine wisdom.',
        fateLine: ' Earth nature guides you toward building lasting spiritual foundations and material manifestation of divine purpose.'
      }
    };
    
    return influences[palmType]?.[lineType] || ' Your elemental nature adds unique spiritual dimensions to this line.';
  }

  private calculateAdvancedAccuracyScore(
    visionAnalysis: PalmVisionAnalysis,
    lineDetection: Record<string, LineDetectionResult>
  ): number {
    let score = 0;
    
    // Advanced image quality scoring (25%)
    const imageMetrics = visionAnalysis.advancedAnalysis.imageMetrics;
    if (imageMetrics.issues.length === 0) {
      score += 25;
    } else if (imageMetrics.issues.length <= 1) {
      score += 20;
    } else if (imageMetrics.issues.length <= 2) {
      score += 15;
    } else {
      score += 10;
    }
    
    // Hand detection and palm shape analysis (20%)
    if (visionAnalysis.handDetected) {
      score += 10;
      // Bonus for palm shape quality
      score += visionAnalysis.advancedAnalysis.palmShape.shapeQuality * 10;
    }
    
    // Palm orientation accuracy (10%)
    const orientationBonus = {
      correct: 10,
      rotated: 6,
      unclear: 3
    };
    score += orientationBonus[visionAnalysis.palmOrientation];
    
    // Advanced line detection quality (25%)
    const lineQuality = visionAnalysis.advancedAnalysis.lineAnalysis.lineQuality;
    score += lineQuality.overallScore * 25;
    
    // Hand landmarks detection (10%)
    const landmarkQuality = visionAnalysis.advancedAnalysis.handLandmarks.landmarkQuality;
    score += landmarkQuality * 10;
    
    // Overall computer vision confidence (10%)
    score += visionAnalysis.confidenceScore * 0.1;
    
    return Math.min(Math.round(score), 99); // Cap at 99% to maintain humility
  }

  private generateAdvancedInsights(
    visionAnalysis: PalmVisionAnalysis,
    lineDetection: Record<string, LineDetectionResult>,
    analysisMethod: string
  ): any {
    const palmShape = visionAnalysis.advancedAnalysis.palmShape;
    const imageMetrics = visionAnalysis.advancedAnalysis.imageMetrics;
    const lineAnalysis = visionAnalysis.advancedAnalysis.lineAnalysis;
    
    // Determine spiritual gifts based on palm type and line quality
    const spiritualGifts = this.identifyAdvancedSpiritualGifts(palmShape, lineDetection);
    
    // Generate elemental nature description
    const elementalNature = this.describeElementalNature(palmShape.palmType);
    
    // Create image quality analysis
    const imageQualityAnalysis = this.generateImageQualityReport(imageMetrics);
    
    // Generate line quality report
    const lineQualityReport = this.generateLineQualityReport(lineAnalysis, lineDetection);
    
    // Overall confidence assessment
    const overallConfidence = this.generateConfidenceAssessment(visionAnalysis.confidenceScore, analysisMethod);
    
    return {
      palmType: palmShape.palmType,
      elementalNature,
      spiritualGifts,
      imageQualityAnalysis,
      lineQualityReport,
      overallConfidence
    };
  }

  private identifyAdvancedSpiritualGifts(palmShape: any, lineDetection: Record<string, LineDetectionResult>): string[] {
    const gifts: string[] = [];
    
    // Elemental gifts based on palm type
    const elementalGifts: Record<string, string> = {
      'Fire Hand': 'Divine inspiration and spiritual leadership abilities',
      'Air Hand': 'Spiritual communication and teaching gifts',
      'Water Hand': 'Emotional healing and empathic spiritual abilities',
      'Earth Hand': 'Grounding energy and practical spiritual wisdom'
    };
    
    gifts.push(elementalGifts[palmShape.palmType] || 'Unique spiritual sensitivity');
    
    // Gifts based on line strength
    const strongLines = Object.entries(lineDetection)
      .filter(([_, detection]) => detection.confidence > 0.7)
      .map(([lineName, _]) => lineName);
    
    if (strongLines.includes('lifeLine')) {
      gifts.push('Exceptional spiritual vitality and divine protection');
    }
    if (strongLines.includes('heartLine')) {
      gifts.push('Profound capacity for divine love and emotional healing');
    }
    if (strongLines.includes('headLine')) {
      gifts.push('Clear spiritual wisdom and divine discernment');
    }
    if (strongLines.includes('fateLine')) {
      gifts.push('Strong connection to divine purpose and spiritual destiny');
    }
    
    // Overall line quality bonus
    const detectedLines = Object.values(lineDetection).filter(detection => detection.detected).length;
    if (detectedLines >= 3) {
      gifts.push('Exceptional spiritual clarity and multi-dimensional divine connection');
    }
    
    return gifts.length > 0 ? gifts : ['Developing spiritual awareness and divine sensitivity'];
  }

  private describeElementalNature(palmType: string): string {
    const descriptions: Record<string, string> = {
      'Fire Hand': 'Your Fire elemental nature burns with passionate spiritual energy, divine inspiration, and transformative power. You are called to spiritual leadership and breakthrough experiences.',
      'Air Hand': 'Your Air elemental nature flows with intellectual spirituality, divine communication gifts, and the ability to bridge earthly and heavenly wisdom through words and teaching.',
      'Water Hand': 'Your Water elemental nature moves with deep emotional spirituality, healing gifts, and profound empathic connection to the divine flow of universal love.',
      'Earth Hand': 'Your Earth elemental nature grounds with practical spirituality, manifestation abilities, and the sacred gift of bringing divine wisdom into tangible, lasting form.'
    };
    
    return descriptions[palmType] || 'Your unique elemental nature carries special spiritual gifts waiting to be discovered and developed.';
  }

  private generateImageQualityReport(imageMetrics: any): string {
    const { brightness, contrast, sharpness, issues, resolution } = imageMetrics;
    
    let report = `Computer vision analysis processed ${resolution.width}x${resolution.height} resolution image. `;
    
    if (issues.length === 0) {
      report += 'Excellent image quality with optimal brightness, contrast, and sharpness enables precise spiritual analysis. ';
    } else if (issues.length <= 2) {
      report += `Good image quality with minor considerations: ${issues.join(', ')}. Analysis remains highly reliable. `;
    } else {
      report += `Image quality challenges detected: ${issues.join(', ')}. Spiritual interpretation remains valid through divine guidance. `;
    }
    
    report += `Technical metrics: ${Math.round(brightness)} brightness, ${Math.round(contrast)} contrast, ${Math.round(sharpness)} sharpness.`;
    
    return report;
  }

  private generateLineQualityReport(lineAnalysis: any, lineDetection: Record<string, LineDetectionResult>): string {
    const { detectedLines, lineQuality } = lineAnalysis;
    const completeness = Math.round(lineQuality.completeness * 100);
    const clarity = Math.round(lineQuality.clarity * 100);
    
    let report = `Advanced line detection identified ${detectedLines} total line segments with ${completeness}% completeness and ${clarity}% clarity. `;
    
    const detectedMajorLines = Object.entries(lineDetection)
      .filter(([_, detection]) => detection.detected)
      .map(([name, _]) => name);
    
    if (detectedMajorLines.length >= 3) {
      report += `Major lines (${detectedMajorLines.join(', ')}) show strong spiritual manifestation. `;
    } else if (detectedMajorLines.length >= 2) {
      report += `Primary lines (${detectedMajorLines.join(', ')}) indicate developing spiritual expression. `;
    } else {
      report += 'Subtle line presence suggests deep inner spiritual development transcending physical manifestation. ';
    }
    
    const strongestLine = Object.entries(lineDetection)
      .reduce((strongest, [name, detection]) => 
        detection.confidence > strongest.confidence ? { name, confidence: detection.confidence } : strongest,
        { name: '', confidence: 0 }
      );
    
    if (strongestLine.confidence > 0.7) {
      report += `The ${strongestLine.name} shows exceptional spiritual development with ${Math.round(strongestLine.confidence * 100)}% computer vision confidence.`;
    }
    
    return report;
  }

  private generateConfidenceAssessment(confidenceScore: number, analysisMethod: string): string {
    const percentage = Math.round(confidenceScore * 100);
    
    let assessment = `Analysis confidence: ${percentage}% using ${analysisMethod === 'computer_vision_enhanced' ? 'advanced AI computer vision' : 'traditional spiritual interpretation'} methods. `;
    
    if (percentage >= 80) {
      assessment += 'Exceptional technical validation confirms authentic spiritual insights with high reliability.';
    } else if (percentage >= 60) {
      assessment += 'Strong technical foundation supports reliable spiritual interpretation and divine guidance.';
    } else if (percentage >= 40) {
      assessment += 'Moderate technical confidence balanced with traditional spiritual wisdom provides meaningful insights.';
    } else {
      assessment += 'Primary guidance flows through spiritual channels with technical validation as supportive confirmation.';
    }
    
    return assessment;
  }

  private enhanceOverallReadingWithAdvancedData(
    baseReading: string,
    visionAnalysis: PalmVisionAnalysis,
    analysisMethod: string,
    advancedInsights: any
  ): string {
    let enhancedReading = baseReading;
    
    // Add computer vision validation
    const visionInsight = analysisMethod === 'computer_vision_enhanced' ?
      ` Advanced AI computer vision analysis with ${visionAnalysis.advancedAnalysis.imageMetrics.issues.length === 0 ? 'excellent' : 'good'} image quality confirms ${visionAnalysis.handDetected ? 'clear palm presence' : 'subtle spiritual manifestation'} with ${Math.round(visionAnalysis.confidenceScore * 100)}% technical confidence.` :
      ' This reading draws from traditional palmistry wisdom enhanced with spiritual intuition and computer vision validation.';
    
    // Add elemental nature insight
    const elementalInsight = ` Your ${visionAnalysis.advancedAnalysis.palmShape.palmType} reveals ${advancedInsights.elementalNature.slice(0, 100)}...`;
    
    // Add strongest spiritual gift
    const primaryGift = advancedInsights.spiritualGifts[0] || 'developing spiritual awareness';
    const giftInsight = ` The divine has blessed you with ${primaryGift.toLowerCase()}, which computer vision analysis particularly validates through your palm's unique characteristics.`;
    
    // Add technical validation
    const lineQuality = visionAnalysis.advancedAnalysis.lineAnalysis.lineQuality.overallScore;
    const technicalValidation = lineQuality > 0.7 ?
      ' Advanced line detection algorithms confirm exceptional spiritual development with strong physical manifestation.' :
      lineQuality > 0.4 ?
      ' Computer vision validates developing spiritual characteristics with growing physical expression.' :
      ' While technical analysis shows subtle physical manifestation, the spiritual dimensions revealed through traditional wisdom are profound and authentic.';
    
    enhancedReading += visionInsight + elementalInsight + giftInsight + technicalValidation;
    
    return enhancedReading;
  }
}

export const enhancedPalmistryService = new EnhancedPalmistryService();
