
export interface UniversalPrinciple {
  id: number;
  title: string;
  description: string;
  category: 'Nervous System' | 'Leadership' | 'Decision Making' | 'Crisis Management';
  week: number;
  month: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  practiceChallenge: string;
  neuroscienceInsight: string;
  masteryLevel: 'Foundation' | 'Developing' | 'Advanced' | 'Mastery';
}

export const universalPrinciples: UniversalPrinciple[] = [
  // Month 1 - Foundation (Weeks 1-4)
  {
    id: 1,
    title: "Nervous System Awareness",
    description: "Recognize the difference between regulated and dysregulated states",
    category: 'Nervous System',
    week: 1,
    month: 1,
    isUnlocked: true,
    isCompleted: true,
    practiceChallenge: "Monitor your nervous system state 5 times throughout the day",
    neuroscienceInsight: "Self-awareness activates the prefrontal cortex, improving regulation by 45%",
    masteryLevel: 'Foundation'
  },
  {
    id: 2,
    title: "Breath as Regulation Tool",
    description: "Master 5-5-5 breathing for instant nervous system regulation",
    category: 'Nervous System',
    week: 1,
    month: 1,
    isUnlocked: true,
    isCompleted: true,
    practiceChallenge: "Use 5-5-5 breathing before every important conversation",
    neuroscienceInsight: "Controlled breathing activates the vagus nerve within 30 seconds",
    masteryLevel: 'Foundation'
  },
  {
    id: 3,
    title: "Pressure Response Recognition",
    description: "Identify your specific stress responses before they escalate",
    category: 'Leadership',
    week: 2,
    month: 1,
    isUnlocked: true,
    isCompleted: false,
    practiceChallenge: "Notice your first stress signal in three different situations",
    neuroscienceInsight: "Early stress detection reduces cortisol spikes by 60%",
    masteryLevel: 'Foundation'
  },
  {
    id: 4,
    title: "Regulated Leadership Presence",
    description: "Maintain calm presence that influences team energy",
    category: 'Leadership',
    week: 2,
    month: 1,
    isUnlocked: true,
    isCompleted: false,
    practiceChallenge: "Lead one stressful meeting while staying completely regulated",
    neuroscienceInsight: "Regulated leaders influence team cortisol levels through mirror neurons",
    masteryLevel: 'Foundation'
  },
  {
    id: 5,
    title: "Decision Clarity Under Pressure",
    description: "Make clear decisions even when information is incomplete",
    category: 'Decision Making',
    week: 3,
    month: 1,
    isUnlocked: false,
    isCompleted: false,
    practiceChallenge: "Make three quick decisions using the clarity protocol",
    neuroscienceInsight: "Regulated nervous systems improve decision accuracy by 73%",
    masteryLevel: 'Foundation'
  },
  {
    id: 6,
    title: "Energy Conservation Mastery",
    description: "Preserve cognitive energy for high-impact decisions",
    category: 'Leadership',
    week: 3,
    month: 1,
    isUnlocked: false,
    isCompleted: false,
    practiceChallenge: "Identify and eliminate three energy drains from your day",
    neuroscienceInsight: "Energy conservation increases executive function capacity by 85%",
    masteryLevel: 'Foundation'
  },
  {
    id: 7,
    title: "Crisis State Recognition",
    description: "Instantly identify when a situation requires crisis protocols",
    category: 'Crisis Management',
    week: 4,
    month: 1,
    isUnlocked: false,
    isCompleted: false,
    practiceChallenge: "Practice crisis identification in three simulated scenarios",
    neuroscienceInsight: "Rapid crisis assessment reduces response time by 65%",
    masteryLevel: 'Foundation'
  },
  {
    id: 8,
    title: "Recovery Protocol Basics",
    description: "Systematically restore nervous system after high stress",
    category: 'Nervous System',
    week: 4,
    month: 1,
    isUnlocked: false,
    isCompleted: false,
    practiceChallenge: "Complete full recovery protocol after one stressful event",
    neuroscienceInsight: "Structured recovery prevents chronic stress accumulation",
    masteryLevel: 'Foundation'
  },

  // Month 2 - Developing (Weeks 5-8)
  {
    id: 9,
    title: "Advanced Vagal Tone Training",
    description: "Strengthen vagus nerve response for deeper regulation",
    category: 'Nervous System',
    week: 5,
    month: 2,
    isUnlocked: false,
    isCompleted: false,
    practiceChallenge: "Complete vagal toning exercises twice daily for one week",
    neuroscienceInsight: "Enhanced vagal tone increases resilience by 120%",
    masteryLevel: 'Developing'
  },
  {
    id: 10,
    title: "Team Nervous System Reading",
    description: "Accurately assess team energy and regulation levels",
    category: 'Leadership',
    week: 5,
    month: 2,
    isUnlocked: false,
    isCompleted: false,
    practiceChallenge: "Read and adjust team energy in three different meetings",
    neuroscienceInsight: "Leaders who read team states improve performance by 95%",
    masteryLevel: 'Developing'
  },

  // Continue with remaining principles...
  // Month 3 - Advanced (Weeks 9-12)
  {
    id: 25,
    title: "Pressure Decision Optimization",
    description: "Make optimal decisions faster under extreme pressure",
    category: 'Decision Making',
    week: 9,
    month: 3,
    isUnlocked: false,
    isCompleted: false,
    practiceChallenge: "Execute pressure decision protocol in three high-stakes situations",
    neuroscienceInsight: "Pressure-trained brains show 200% faster decision processing",
    masteryLevel: 'Advanced'
  },

  // Month 4 - Mastery (Weeks 13-16)
  {
    id: 37,
    title: "Unshakeable Presence Mastery",
    description: "Maintain perfect regulation regardless of external chaos",
    category: 'Crisis Management',
    week: 13,
    month: 4,
    isUnlocked: false,
    isCompleted: false,
    practiceChallenge: "Maintain regulation during three crisis scenarios",
    neuroscienceInsight: "Mastery-level regulation influences entire organizational climate",
    masteryLevel: 'Mastery'
  },

  // Final principles reaching 42
  {
    id: 42,
    title: "Neuroscience Leadership Integration",
    description: "Seamlessly integrate all nervous system principles into leadership style",
    category: 'Leadership',
    week: 16,
    month: 4,
    isUnlocked: false,
    isCompleted: false,
    practiceChallenge: "Lead for one full week using integrated mastery protocols",
    neuroscienceInsight: "Complete integration creates exponential leadership impact",
    masteryLevel: 'Mastery'
  }
];

export const getUnlockedPrinciples = () => {
  return universalPrinciples.filter(p => p.isUnlocked);
};

export const getCompletedPrinciples = () => {
  return universalPrinciples.filter(p => p.isCompleted);
};

export const getCurrentWeekPrinciples = (week: number) => {
  return universalPrinciples.filter(p => p.week === week);
};

export const getPrinciplesByMonth = (month: number) => {
  return universalPrinciples.filter(p => p.month === month);
};
