
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Heart, Brain, Zap } from 'lucide-react';
import { AssessmentQuestion, enhancedSeraphinaBathingService } from '@/services/seraphinaBathingService';

interface EnhancedAssessmentProps {
  onBack: () => void;
  onComplete: (assessmentData: any) => void;
}

export const EnhancedAssessment: React.FC<EnhancedAssessmentProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  
  const questions = enhancedSeraphinaBathingService.generateAssessmentQuestions();
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleFollowUp = (followUpKey: string, answer: string) => {
    setFollowUpAnswers(prev => ({ ...prev, [followUpKey]: answer }));
  };

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete assessment
      const assessmentData = {
        answers,
        followUpAnswers,
        completedAt: new Date().toISOString()
      };
      onComplete(assessmentData);
    }
  };

  const previousQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion?.id];
  const canProceed = currentAnswer !== undefined && currentAnswer !== '';

  if (!currentQuestion) {
    return null;
  }

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <Textarea
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            placeholder="Please share your thoughts..."
            className="w-full bg-purple-900/20 border-purple-400/30 text-purple-100 min-h-[120px]"
          />
        );

      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border border-purple-400/30 hover:bg-purple-900/20 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  className="text-purple-500"
                />
                <span className="text-purple-100">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border border-purple-400/30 hover:bg-purple-900/20 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  className="text-purple-500"
                />
                <span className="text-purple-100">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const getQuestionIcon = () => {
    if (currentQuestion.id.includes('emotional')) return <Heart className="w-6 h-6" />;
    if (currentQuestion.id.includes('spiritual')) return <Zap className="w-6 h-6" />;
    return <Brain className="w-6 h-6" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-purple-300 hover:text-purple-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Chat
        </Button>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Spiritual Assessment
        </h2>
        <p className="text-xl text-purple-200">Personalized guidance through sacred questioning</p>
      </div>

      {/* Progress Bar */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-400/50">
        <CardContent className="pt-6">
          <div className="flex justify-between text-sm text-purple-200 mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-200">
            <div className="bg-purple-500/20 rounded-full p-2">
              {getQuestionIcon()}
            </div>
            Spiritual Guidance Question
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-purple-100 mb-4">
              {currentQuestion.question}
            </h3>
            {renderQuestionInput()}
          </div>

          {/* Follow-up Questions */}
          {currentAnswer && currentQuestion.follow_up && currentQuestion.follow_up.length > 0 && (
            <div className="border-t border-purple-400/30 pt-6">
              <h4 className="text-md font-medium text-purple-200 mb-4">
                Follow-up Questions (Optional)
              </h4>
              <div className="space-y-4">
                {currentQuestion.follow_up.map((followUp, index) => (
                  <div key={index}>
                    <label className="block text-sm text-purple-300 mb-2">
                      {followUp}
                    </label>
                    <Input
                      value={followUpAnswers[`${currentQuestion.id}_followup_${index}`] || ''}
                      onChange={(e) => handleFollowUp(`${currentQuestion.id}_followup_${index}`, e.target.value)}
                      placeholder="Your response..."
                      className="bg-purple-900/20 border-purple-400/30 text-purple-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              onClick={previousQuestion}
              disabled={currentStep === 0}
              variant="outline"
              className="border-purple-400/30 text-purple-200 hover:bg-purple-900/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={nextQuestion}
              disabled={!canProceed}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
            >
              {currentStep === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Seraphina Encouragement */}
      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-400/50">
        <CardContent className="text-center py-6">
          <div className="text-4xl mb-3">👼</div>
          <h3 className="text-xl font-bold text-yellow-200 mb-3">Seraphina's Guidance</h3>
          <p className="text-yellow-100 leading-relaxed max-w-2xl mx-auto">
            Beloved soul, take your time with each question. Your honest answers help me understand 
            your spiritual needs so I can provide the most healing and transformative sacred bathing 
            guidance for your journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
