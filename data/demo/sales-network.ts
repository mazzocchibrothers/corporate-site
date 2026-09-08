// Sales network readiness — aggregated assessment results.
//
// Aggregates only. The source dashboard runs on individual records —
// one row per assessed person, with a first name and a surname on it —
// and none of them are here: every figure below is a group statistic computed
// once, outside this repository, from data that never entered it.
//
// The rules the numbers obey, asserted by `npm run check:demo-anonymity`:
//   - no strings. Every leaf is a number, so nothing here can read as copy or
//     as a name. The labels these keys stand for live in `messages/`.
//   - every headcount is rounded to the nearest 5, so no count is a fingerprint.
//   - a group carrying a score holds at least 25 people.
//     One job family holds fewer than that and is not broken out, so the
//     family headcounts do not sum to the assessed total.
//   - knowledge-area keys are renamed away from the sector the source names.

export const salesNetwork = {
  funnel: {
    candidates: 190,
    interviews: 180,
    assessed: 185,
    notAssessed: 5,
    conversionPct: 96,
  },
  overview: {
    skillMatchingMean: 54.6,
    skillMatchingMedian: 55.0,
    softMean: 2.9,
    hardMean: 60.3,
    aboveBothPct: 50.8,
    softThreshold: 3,
    hardThreshold: 40,
  },
  bands: {
    belowThreshold: 6.6,
    base: 43.2,
    good: 40.4,
    high: 9.8,
  },
  quadrants: {
    softHighHardHigh: 50.8,
    softHighHardLow: 2.7,
    softLowHardHigh: 43.2,
    softLowHardLow: 3.3,
  },
  families: {
    salesManager: {
      n: 85,
      skillMatching: 55.8,
      soft: 2.8,
      hard: 64.8,
    },
    salesAccount: {
      n: 90,
      skillMatching: 54.0,
      soft: 3.1,
      hard: 56.9,
    },
  },
  soft: {
    strategicThinking: {
      salesManager: 2.5,
    },
    teamManagement: {
      salesManager: 3.0,
    },
    engageInspire: {
      salesManager: 2.3,
    },
    decisionMaking: {
      salesManager: 3.5,
      salesAccount: 3.3,
    },
    influence: {
      salesAccount: 3.0,
    },
    resilience: {
      salesAccount: 3.1,
    },
    drive: {
      salesAccount: 3.0,
    },
  },
  hard: {
    referenceMarket: {
      salesManager: 62.1,
    },
    partnerManagement: {
      salesManager: 68.7,
    },
    offeringPositioning: {
      salesManager: 56.2,
      salesAccount: 45.8,
    },
    networkProfitability: {
      salesManager: 69.3,
    },
    technicalDomainKnowledge: {
      salesManager: 67.9,
      salesAccount: 65.3,
    },
    complexNegotiation: {
      salesAccount: 60.5,
    },
    marketSegmentation: {
      salesAccount: 50.3,
    },
    complexSellingTechniques: {
      salesAccount: 62.6,
    },
  },
  drivers: {
    drive: {
      workWithEnthusiasm: {
        salesAccount: 3.6,
      },
      pursuePersonalDevelopment: {
        salesAccount: 2.3,
      },
      showAmbition: {
        salesAccount: 3.5,
      },
    },
    strategicThinking: {
      anticipateDevelopments: {
        salesManager: 3.3,
      },
      alignStrategies: {
        salesManager: 3.2,
      },
      defineTheVision: {
        salesManager: 2.1,
      },
      validateStrategies: {
        salesManager: 2.3,
      },
    },
    teamManagement: {
      coordinateAction: {
        salesManager: 3.9,
      },
      delegate: {
        salesManager: 2.9,
      },
      takeDecisions: {
        salesManager: 3.2,
      },
      takeResponsibility: {
        salesManager: 3.0,
      },
      crossFunctionalAwareness: {
        salesManager: 2.8,
      },
    },
    engageInspire: {
      superviseBehaviour: {
        salesManager: 2.5,
      },
      coaching: {
        salesManager: 2.9,
      },
      valuePeople: {
        salesManager: 2.5,
      },
      motivatePeople: {
        salesManager: 2.9,
      },
      developPeople: {
        salesManager: 2.6,
      },
      spotTalent: {
        salesManager: 1.5,
      },
    },
    decisionMaking: {
      executePlans: {
        salesManager: 3.8,
        salesAccount: 3.6,
      },
      actWithConfidence: {
        salesManager: 3.5,
        salesAccount: 3.3,
      },
      actOnOwnInitiative: {
        salesManager: 3.6,
        salesAccount: 3.3,
      },
    },
    influence: {
      haveImpact: {
        salesAccount: 3.5,
      },
      frameConversations: {
        salesAccount: 3.7,
      },
      appealToEmotions: {
        salesAccount: 2.4,
      },
    },
    resilience: {
      handlePressure: {
        salesAccount: 3.9,
      },
      balanceWorkAndLife: {
        salesAccount: 2.3,
      },
      stayPositive: {
        salesAccount: 3.5,
      },
    },
  },
} as const;
