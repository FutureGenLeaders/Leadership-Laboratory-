
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Brain, Shield, Quote, Lightbulb } from 'lucide-react';

interface WisdomTeaching {
  id: string;
  quote: string;
  author: string;
  era: string;
  tradition: string;
  context: string;
  application: string;
  category: 'conflict' | 'decision' | 'burnout' | 'nervous-system' | 'general';
  practicalExercise: string;
}

const WISDOM_LIBRARY: WisdomTeaching[] = [
  {
    id: 'rumi-flow',
    quote: "Try not to resist the changes that come your way. Instead, let life live through you.",
    author: "Rumi",
    era: "13th Century",
    tradition: "Sufi Mysticism",
    context: "This teaching comes from Rumi's understanding that resistance to change creates suffering, while flowing with life's natural rhythms brings peace and effectiveness.",
    application: "In leadership conflicts, instead of resisting opposing viewpoints, practice receiving them fully before responding. This creates space for creative solutions.",
    category: "conflict",
    practicalExercise: "When facing a challenging situation today, pause and ask: 'How can I flow with this rather than resist it?' Notice the difference in your body and decision-making."
  },
  {
    id: 'marcus-aurelius-mind',
    quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    era: "2nd Century CE",
    tradition: "Stoic Philosophy",
    context: "Written in 'Meditations' while leading the Roman Empire through plague and war, this reflects the Stoic principle of internal sovereignty.",
    application: "Before making any important decision, ground yourself in what you can actually control - your thoughts, responses, and choices - rather than trying to control outcomes.",
    category: "decision",
    practicalExercise: "For each stressful situation today, identify: What is within my control? What is outside my control? Focus energy only on what you can influence."
  },
  {
    id: 'buddha-discernment',
    quote: "Believe nothing, no matter where you read it or who said it, unless it agrees with your own reason and common sense.",
    author: "Buddha",
    era: "5th Century BCE",
    tradition: "Buddhism",
    context: "From the Kalama Sutta, this teaching emphasizes developing inner wisdom rather than blind faith in external authorities.",
    application: "In leadership decisions, balance data and advice with your own inner knowing. Trust your developed judgment while remaining open to learning.",
    category: "decision",
    practicalExercise: "Before your next major decision, sit quietly and ask your inner wisdom: 'What feels most aligned with truth?' Notice what arises beyond just logical analysis."
  },
  {
    id: 'rumi-self-change',
    quote: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
    author: "Rumi",
    era: "13th Century",
    tradition: "Sufi Mysticism",
    context: "Reflects the maturation from external focus to internal development as the path to real impact.",
    application: "Instead of trying to fix your team's problems directly, model the consciousness and behavior you want to see. Your internal state influences everything around you.",
    category: "burnout",
    practicalExercise: "Identify one thing you've been trying to change in others. Today, focus on embodying that quality yourself. Notice how this shifts the dynamic."
  },
  {
    id: 'lao-tzu-leadership',
    quote: "The best leader is one the people hardly know exists. When the work is done, they say, 'We did it ourselves.'",
    author: "Lao Tzu",
    era: "6th Century BCE",
    tradition: "Taoism",
    context: "From the Tao Te Ching, describing wu wei leadership - effortless action that empowers others.",
    application: "Focus on creating conditions for your team's success rather than being the visible hero. Your nervous system regulation creates space for others to shine.",
    category: "nervous-system",
    practicalExercise: "In your next team interaction, practice being completely present without needing to add value or solve problems. Simply hold space and notice what emerges."
  },
  {
    id: 'confucius-self-reflection',
    quote: "When we see men of worth, we should think of equaling them; when we see men of a contrary character, we should turn inwards and examine ourselves.",
    author: "Confucius",
    era: "5th Century BCE",
    tradition: "Confucianism",
    context: "Teaching on using others as mirrors for self-development rather than judgment.",
    application: "When team members trigger you, use it as information about your own development edges rather than focusing on changing them.",
    category: "conflict",
    practicalExercise: "Notice who triggers you today. Ask: 'What quality in them am I rejecting in myself?' or 'What quality do they have that I need to develop?'"
  }
];

const CATEGORY_ICONS = {
  'conflict': Shield,
  'decision': Brain,
  'burnout': Heart,
  'nervous-system': BookOpen,
  'general': Lightbulb
};

const CATEGORY_COLORS = {
  'conflict': 'bg-red-500/20 text-red-400 border-red-500/50',
  'decision': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'burnout': 'bg-green-500/20 text-green-400 border-green-500/50',
  'nervous-system': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  'general': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
};

interface AncientWisdomIntegrationProps {
  focusCategory?: 'conflict' | 'decision' | 'burnout' | 'nervous-system';
  showDailyWisdom?: boolean;
}

const AncientWisdomIntegration: React.FC<AncientWisdomIntegrationProps> = ({ 
  focusCategory, 
  showDailyWisdom = true 
}) => {
  const [selectedWisdom, setSelectedWisdom] = useState<WisdomTeaching | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const getFilteredWisdom = () => {
    if (focusCategory) {
      return WISDOM_LIBRARY.filter(wisdom => wisdom.category === focusCategory);
    }
    return WISDOM_LIBRARY;
  };

  const getTodaysWisdom = () => {
    // Simple algorithm to get consistent "daily" wisdom
    const today = new Date().getDate();
    return WISDOM_LIBRARY[today % WISDOM_LIBRARY.length];
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const todaysWisdom = getTodaysWisdom();
  const wisdomToShow = getFilteredWisdom();

  return (
    <div className="space-y-6">
      {/* Today's Featured Wisdom */}
      {showDailyWisdom && (
        <Card className="bg-gradient-to-r from-yellow-900/20 to-amber-800/20 border-yellow-600/50">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-400 flex items-center gap-2">
              <Quote className="w-6 h-6" />
              Today's Ancient Wisdom
            </CardTitle>
            <CardDescription className="text-yellow-200">
              Daily guidance from timeless teachers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <blockquote className="text-lg text-yellow-100 italic font-medium border-l-4 border-yellow-400 pl-4">
              "{todaysWisdom.quote}"
            </blockquote>
            <div className="flex items-center gap-2">
              <Badge className={CATEGORY_COLORS[todaysWisdom.category]}>
                {todaysWisdom.category.replace('-', ' ')}
              </Badge>
              <span className="text-yellow-300 font-semibold">
                — {todaysWisdom.author}
              </span>
              <span className="text-yellow-400 text-sm">
                ({todaysWisdom.era})
              </span>
            </div>
            <div className="bg-yellow-800/20 p-3 rounded-lg">
              <h4 className="text-yellow-300 font-semibold mb-1">Today's Practice:</h4>
              <p className="text-yellow-100 text-sm">{todaysWisdom.practicalExercise}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wisdom Library */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Ancient Wisdom Library</h3>
        <div className="grid gap-4">
          {wisdomToShow.map((wisdom) => {
            const IconComponent = CATEGORY_ICONS[wisdom.category];
            const isExpanded = expandedCards.has(wisdom.id);
            
            return (
              <Card key={wisdom.id} className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${CATEGORY_COLORS[wisdom.category]}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{wisdom.author}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {wisdom.era} • {wisdom.tradition}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={CATEGORY_COLORS[wisdom.category]}>
                      {wisdom.category.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <blockquote className="text-lg text-gray-200 italic border-l-4 border-gray-600 pl-4">
                    "{wisdom.quote}"
                  </blockquote>
                  
                  {isExpanded && (
                    <div className="space-y-4 border-t border-gray-700 pt-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Historical Context</h4>
                        <p className="text-gray-300 text-sm">{wisdom.context}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-2">Leadership Application</h4>
                        <p className="text-gray-300 text-sm">{wisdom.application}</p>
                      </div>
                      
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <h4 className="text-yellow-400 font-semibold mb-1">Practical Exercise</h4>
                        <p className="text-gray-300 text-sm">{wisdom.practicalExercise}</p>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={() => toggleExpanded(wisdom.id)}
                    className="w-full"
                  >
                    {isExpanded ? 'Show Less' : 'Explore Teaching'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AncientWisdomIntegration;
