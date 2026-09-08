// Cross-country talent map — aggregated assessment results.
//
// Aggregates only. The source dashboard runs on individual records —
// one row per participant, with a name and a manager on it —
// and none of them are here: every figure below is a group statistic computed
// once, outside this repository, from data that never entered it.
//
// The rules the numbers obey, asserted by `npm run check:demo-anonymity`:
//   - no strings. Every leaf is a number, so nothing here can read as copy or
//     as a name. The labels these keys stand for live in `messages/`.
//   - every headcount is rounded to the nearest 5, so no count is a fingerprint.
//   - a group carrying a score holds at least 25 people.
//     The eight countries ship as three buckets. The two largest stand on
//     their own and clear the floor; the remaining six are pooled, because
//     three of them held fewer than ten people. None is named: the list of
//     countries would identify the customer on its own.
//   - the industry-specific function name is generalised as
//     `technicalSpecialist`.

export const crossCountry = {
  population: {
    invited: 390,
    evaluated: 345,
    evaluatedPct: 88.4,
  },
  skillMatching: {
    mean: 40.4,
    median: 39.8,
    min: 0.8,
    max: 88.8,
    threshold: 40,
    binWidth: 10,
    distribution: [1.5, 7.0, 18.6, 24.1, 22.7, 14.5, 7.8, 2.6, 1.2, 0.0],
  },
  competencies: {
    vision: {
      mean: 2.62,
      bands: {
        veryPoor: 21.2,
        belowAverage: 21.8,
        adequate: 35.8,
        good: 17.4,
        excellent: 3.8,
      },
    },
    openness: {
      mean: 2.51,
      bands: {
        veryPoor: 16.6,
        belowAverage: 41.0,
        adequate: 30.5,
        good: 10.2,
        excellent: 1.7,
      },
    },
    leadership: {
      mean: 2.69,
      bands: {
        veryPoor: 7.6,
        belowAverage: 44.2,
        adequate: 31.7,
        good: 14.0,
        excellent: 2.6,
      },
    },
    accountability: {
      mean: 2.64,
      bands: {
        veryPoor: 15.7,
        belowAverage: 31.4,
        adequate: 37.5,
        good: 13.7,
        excellent: 1.7,
      },
    },
  },
  framework: {
    marketAwareness: {
      mean: 2.62,
      bands: {
        veryPoor: 21.2,
        belowAverage: 21.8,
        adequate: 35.8,
        good: 17.4,
        excellent: 3.8,
      },
    },
    customerCentricApproach: {
      mean: 2.63,
      bands: {
        veryPoor: 14.2,
        belowAverage: 33.4,
        adequate: 31.1,
        good: 15.7,
        excellent: 5.5,
      },
    },
    customerRelationshipManagement: {
      mean: 2.33,
      bands: {
        veryPoor: 32.6,
        belowAverage: 22.7,
        adequate: 34.3,
        good: 7.6,
        excellent: 2.9,
      },
    },
    communicationInfluence: {
      mean: 2.35,
      bands: {
        veryPoor: 22.1,
        belowAverage: 39.2,
        adequate: 28.5,
        good: 9.9,
        excellent: 0.3,
      },
    },
    emotionalIntelligence: {
      mean: 2.88,
      bands: {
        veryPoor: 9.9,
        belowAverage: 24.1,
        adequate: 30.8,
        good: 27.3,
        excellent: 7.8,
      },
    },
    negotiation: {
      mean: 3.26,
      bands: {
        veryPoor: 7.8,
        belowAverage: 13.4,
        adequate: 33.4,
        good: 29.4,
        excellent: 16.0,
      },
    },
    relationshipBuilding: {
      mean: 2.62,
      bands: {
        veryPoor: 18.0,
        belowAverage: 36.6,
        adequate: 27.6,
        good: 11.9,
        excellent: 5.8,
      },
    },
    solutionsOriented: {
      mean: 2.72,
      bands: {
        veryPoor: 20.3,
        belowAverage: 22.1,
        adequate: 34.3,
        good: 19.8,
        excellent: 3.5,
      },
    },
    digitalTools: {
      mean: 2.47,
      bands: {
        veryPoor: 28.2,
        belowAverage: 34.0,
        adequate: 22.1,
        good: 10.5,
        excellent: 5.2,
      },
    },
  },
  drivers: {
    vision: {
      monitoringMarkets: 2.69,
      identifyingOpportunities: 3.11,
      anticipatingTrends: 2.07,
    },
    openness: {
      focusingOnCustomers: 3.92,
      settingQualityStandards: 2.49,
      workingSystematically: 2.69,
      maintainingQualityProcesses: 2.21,
      maintainingProductivity: 1.82,
      applyingTechnicalExpertise: 2.74,
      developingTechnicalExpertise: 1.87,
      usingTechnology: 2.36,
    },
    leadership: {
      speakingFluently: 2.38,
      explainingConcepts: 2.38,
      articulatingKeyPoints: 2.35,
      publicSpeaking: 2.17,
      projectingCredibility: 2.19,
      respondingToTheAudience: 2.66,
      showingConsideration: 3.31,
      showingEmpathy: 3.19,
      stabilisingEmotions: 3.24,
      toleratingCriticism: 1.92,
      managingConflict: 2.75,
      promotingIdeas: 3.72,
      gainingAgreement: 3.28,
      navigatingPolitics: 2.78,
      buildingRelationships: 3.82,
      developingNetworks: 2.93,
      relatingAcrossLevels: 2.32,
      understandingOthers: 3.18,
      listeningToOthers: 2.19,
      consultingOthers: 1.98,
      supportingOthers: 2.41,
      caringForOthers: 2.11,
    },
    accountability: {
      learningQuickly: 2.99,
      acceptingNewIdeas: 2.91,
      thinkingQuickly: 2.14,
      supportingOrganisationalLearning: 1.84,
      evaluatingInformation: 3.38,
      testingAssumptions: 3.14,
      producingSolutions: 2.99,
      formingJudgements: 2.88,
      demonstratingSystemsThinking: 2.52,
      adaptingToSituations: 2.56,
      gatheringInformation: 2.49,
      adaptingInterpersonalStyle: 2.17,
      managingAmbiguity: 2.32,
    },
  },
  countryGroups: {
    primary: {
      n: 260,
      skillMatching: 39.6,
    },
    secondary: {
      n: 30,
      skillMatching: 44.8,
    },
    others: {
      n: 55,
      skillMatching: 41.8,
    },
  },
  mobility: {
    veryWilling: 7.3,
    willing: 6.2,
    openToConsidering: 53.7,
    somewhatReluctant: 11.0,
    notInterested: 21.8,
  },
  preferredAreas: {
    sales: 60.7,
    technicalSpecialist: 56.2,
    marketing: 38.1,
    operations: 5.1,
    hr: 4.2,
    finance: 0.6,
  },
  growth: {
    crossFunctional: 32.2,
    deepenExpertise: 34.2,
    teamManagement: 28.0,
    noPreference: 5.6,
  },
} as const;
