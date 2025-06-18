
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConsciousnessAssessment from '@/components/ConsciousnessAssessment';
import BiometricIntegration from '@/components/BiometricIntegration';
import PersonalizedLearning from '@/components/PersonalizedLearning';
import { Brain, Activity, Target, TrendingUp, Award, Zap } from 'lucide-react';

interface AssessmentResults {
  overallLevel: number;
  categoryScores: Record<string, number>;
  strengths: string[];
  growthAreas: string[];
  recommendations: string[];
}

const AdvancedFeaturesPage: React.FC = () => {
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);
  const [activeTab, setActiveTab] = useState('assessment');

  const handleAssessmentComplete = (results: AssessmentResults) => {
    setAssessmentResults(results);
    // Auto-switch to personalized learning after assessment
    setTimeout(() => setActiveTab('personalized'), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Advanced Consciousness Features
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionary AI-powered tools for accelerated leadership consciousness development
          </p>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-blue-600/50 hover:border-blue-400 transition-colors">
            <CardHeader className="text-center">
              <Brain className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <CardTitle className="text-xl text-white">Consciousness Assessment</CardTitle>
              <CardDescription className="text-gray-400">
                Comprehensive evaluation of your leadership consciousness level
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-green-600/50 hover:border-green-400 transition-colors">
            <CardHeader className="text-center">
              <Activity className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <CardTitle className="text-xl text-white">Biometric Integration</CardTitle>
              <CardDescription className="text-gray-400">
                Real-time nervous system tracking and optimization
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-purple-600/50 hover:border-purple-400 transition-colors">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <CardTitle className="text-xl text-white">Personalized Learning</CardTitle>
              <CardDescription className="text-gray-400">
                AI-powered content curation for optimal development
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Results Summary */}
        {assessmentResults && (
          <Card className="bg-gradient-to-r from-yellow-900/20 to-amber-800/20 border-yellow-600/50 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-yellow-400 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Your Leadership Consciousness Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    Level {assessmentResults.overallLevel}
                  </div>
                  <div className="text-sm text-yellow-200">Consciousness Level</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">
                    {assessmentResults.strengths.length}
                  </div>
                  <div className="text-sm text-green-200">Strength Areas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">
                    {assessmentResults.growthAreas.length}
                  </div>
                  <div className="text-sm text-blue-200">Growth Opportunities</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">
                    {assessmentResults.recommendations.length}
                  </div>
                  <div className="text-sm text-purple-200">AI Recommendations</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-gray-600">
            <TabsTrigger 
              value="assessment" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Brain className="w-4 h-4 mr-2" />
              Assessment
            </TabsTrigger>
            <TabsTrigger 
              value="biometric" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              Biometric
            </TabsTrigger>
            <TabsTrigger 
              value="personalized" 
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Target className="w-4 h-4 mr-2" />
              AI Learning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6">
            <ConsciousnessAssessment 
              onComplete={handleAssessmentComplete}
              isStandalone={false}
            />
          </TabsContent>

          <TabsContent value="biometric" className="space-y-6">
            <BiometricIntegration />
          </TabsContent>

          <TabsContent value="personalized" className="space-y-6">
            <PersonalizedLearning />
          </TabsContent>
        </Tabs>

        {/* Integration Benefits */}
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-600 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center flex items-center justify-center gap-2">
              <Zap className="w-8 h-8 text-yellow-400" />
              Revolutionary Integration Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto" />
                <h3 className="text-white font-semibold">40% Faster Development</h3>
                <p className="text-gray-400 text-sm">
                  AI-powered personalization accelerates consciousness development
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <Activity className="w-8 h-8 text-blue-400 mx-auto" />
                <h3 className="text-white font-semibold">Real-time Optimization</h3>
                <p className="text-gray-400 text-sm">
                  Biometric feedback provides instant nervous system insights
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <Brain className="w-8 h-8 text-purple-400 mx-auto" />
                <h3 className="text-white font-semibold">Precision Targeting</h3>
                <p className="text-gray-400 text-sm">
                  Focus on exactly what moves the needle for your development
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedFeaturesPage;
