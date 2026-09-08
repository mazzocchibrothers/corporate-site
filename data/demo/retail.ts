// Retail store capability — aggregated assessment results.
//
// Aggregates only. The source dashboard runs on individual records —
// one row per person and one per store, with names, store codes and per-store
// revenue —
// and none of them are here: every figure below is a group statistic computed
// once, outside this repository, from data that never entered it.
//
// The rules the numbers obey, asserted by `npm run check:demo-anonymity`:
//   - no strings. Every leaf is a number, so nothing here can read as copy or
//     as a name. The labels these keys stand for live in `messages/`.
//   - every headcount is rounded to the nearest 5, so no count is a fingerprint.
//   - a group carrying a score holds at least 25 people.
//     Area managers become `area1`…`area5` in a stable order, and the mapping
//     to the five real names is kept nowhere.
//   - the per-area segment mix ships as a share, never as a cell count.

export const retail = {
  population: {
    salesAdvisors: 570,
    storeManagers: 110,
    stores: 130,
    outlets: 20,
    topPerformers: 120,
  },
  overview: {
    aboveThresholdPct: 20.5,
    threshold: 40,
    conversionRate: 10.71,
    salesPerHour: 101,
    potentialKEur: 7920,
  },
  skillDistribution: {
    binWidth: 5,
    distribution: [0.3, 0.1, 2.1, 7.9, 11.3, 17.8, 19.4, 15.3, 11.8, 8.1, 4.0, 1.0, 0.9, 0.0],
  },
  areas: {
    area1: {
      n: 85,
      stores: 25,
      aboveThresholdPct: 13.1,
      conversionRate: 11.22,
      segments: {
        benchmark: 6.0,
        resultWithoutMethod: 35.7,
        skillWithoutResult: 6.0,
        priorityDevelopment: 45.2,
        toActivate: 7.1,
      },
    },
    area2: {
      n: 90,
      stores: 20,
      aboveThresholdPct: 12.4,
      conversionRate: 9.09,
      segments: {
        benchmark: 7.9,
        resultWithoutMethod: 52.8,
        skillWithoutResult: 4.5,
        priorityDevelopment: 32.6,
        toActivate: 2.2,
      },
    },
    area3: {
      n: 135,
      stores: 35,
      aboveThresholdPct: 23.4,
      conversionRate: 11.47,
      segments: {
        benchmark: 16.8,
        resultWithoutMethod: 46.0,
        skillWithoutResult: 6.6,
        priorityDevelopment: 27.7,
        toActivate: 2.9,
      },
    },
    area4: {
      n: 105,
      stores: 25,
      aboveThresholdPct: 25.2,
      conversionRate: 14.08,
      segments: {
        benchmark: 14.6,
        resultWithoutMethod: 35.0,
        skillWithoutResult: 9.7,
        priorityDevelopment: 34.0,
        toActivate: 6.8,
      },
    },
    area5: {
      n: 140,
      stores: 30,
      aboveThresholdPct: 24.5,
      conversionRate: 9.82,
      segments: {
        benchmark: 15.1,
        resultWithoutMethod: 45.3,
        skillWithoutResult: 9.4,
        priorityDevelopment: 28.1,
        toActivate: 2.2,
      },
    },
  },
  seniority: {
    lt3m: {
      n: 50,
      skill: 28.5,
      productKnowledge: 29.2,
      aboveThresholdPct: 15.4,
      relativeSph: 0.87,
    },
    m3to12: {
      n: 40,
      skill: 33.2,
      productKnowledge: 31.9,
      aboveThresholdPct: 21.4,
      relativeSph: 0.97,
    },
    y1to2: {
      n: 50,
      skill: 32.8,
      productKnowledge: 32.7,
      aboveThresholdPct: 20.8,
      relativeSph: 0.98,
    },
    y2to5: {
      n: 140,
      skill: 33.2,
      productKnowledge: 33.7,
      aboveThresholdPct: 26.1,
      relativeSph: 1.02,
    },
    y5to10: {
      n: 65,
      skill: 32.2,
      productKnowledge: 32.3,
      aboveThresholdPct: 25.4,
      relativeSph: 1.02,
    },
    y10to20: {
      n: 140,
      skill: 31.4,
      productKnowledge: 32.6,
      aboveThresholdPct: 18.0,
      relativeSph: 1.06,
    },
    gt20: {
      n: 60,
      skill: 31.1,
      productKnowledge: 31.3,
      aboveThresholdPct: 11.9,
      relativeSph: 1.06,
    },
  },
  context: {
    channel: {
      fullPrice: {
        n: 475,
        skill: 32.3,
        productKnowledge: 32.5,
        aboveThresholdPct: 22.2,
        relativeSph: 1.04,
        areas: {
          customerSalesExcellence: 37.2,
          brandStorytelling: 31.7,
          collaborationTeamContribution: 26.0,
          agilityExecution: 33.9,
          productKnowledge: 32.5,
        },
        stores: 110,
        conversionRate: 11.21,
        unitsPerTicket: 1.75,
        averageTicket: 69.2,
        salesPerHour: 96.9,
        visitsPerDay: 188,
        turnoverPct: 4.0,
      },
      outlet: {
        n: 90,
        skill: 30.1,
        productKnowledge: 31.3,
        aboveThresholdPct: 12.4,
        relativeSph: 1.04,
        areas: {
          customerSalesExcellence: 33.0,
          brandStorytelling: 28.6,
          collaborationTeamContribution: 26.2,
          agilityExecution: 31.4,
          productKnowledge: 31.3,
        },
        stores: 20,
        conversionRate: 9.09,
        unitsPerTicket: 1.81,
        averageTicket: 50.8,
        salesPerHour: 122.4,
        visitsPerDay: 429,
        turnoverPct: 6.5,
      },
    },
    location: {
      mall: {
        n: 445,
        skill: 31.5,
        productKnowledge: 32.1,
        aboveThresholdPct: 19.3,
        relativeSph: 1.03,
        areas: {
          customerSalesExcellence: 36.3,
          brandStorytelling: 30.7,
          collaborationTeamContribution: 25.3,
          agilityExecution: 33.0,
          productKnowledge: 32.1,
        },
        stores: 100,
        conversionRate: 10.44,
        unitsPerTicket: 1.78,
        averageTicket: 67.9,
        salesPerHour: 102.6,
        visitsPerDay: 214,
        turnoverPct: 9.5,
      },
      highStreet: {
        n: 110,
        skill: 33.8,
        productKnowledge: 33.3,
        aboveThresholdPct: 25.5,
        relativeSph: 1.05,
        areas: {
          customerSalesExcellence: 38.2,
          brandStorytelling: 33.1,
          collaborationTeamContribution: 28.9,
          agilityExecution: 35.4,
          productKnowledge: 33.3,
        },
        stores: 30,
        conversionRate: 11.43,
        unitsPerTicket: 1.72,
        averageTicket: 70.1,
        salesPerHour: 90.8,
        visitsPerDay: 175,
        turnoverPct: 0.0,
      },
    },
    tier: {
      tier1: {
        n: 220,
        skill: 31.4,
        productKnowledge: 31.3,
        aboveThresholdPct: 19.5,
        relativeSph: 1.04,
        areas: {
          customerSalesExcellence: 36.3,
          brandStorytelling: 30.4,
          collaborationTeamContribution: 26.0,
          agilityExecution: 32.7,
          productKnowledge: 31.3,
        },
        stores: 40,
        conversionRate: 9.32,
        unitsPerTicket: 1.79,
        averageTicket: 70.7,
        salesPerHour: 112.8,
        visitsPerDay: 306,
        turnoverPct: 13.0,
      },
      tier2: {
        n: 220,
        skill: 32.7,
        productKnowledge: 33.1,
        aboveThresholdPct: 24.9,
        relativeSph: 1.03,
        areas: {
          customerSalesExcellence: 37.4,
          brandStorytelling: 32.1,
          collaborationTeamContribution: 26.8,
          agilityExecution: 34.3,
          productKnowledge: 33.1,
        },
        stores: 55,
        conversionRate: 11.21,
        unitsPerTicket: 1.75,
        averageTicket: 67.8,
        salesPerHour: 97.1,
        visitsPerDay: 190,
        turnoverPct: 0.0,
      },
      tier3: {
        n: 115,
        skill: 31.6,
        productKnowledge: 33.0,
        aboveThresholdPct: 14.0,
        relativeSph: 1.04,
        areas: {
          customerSalesExcellence: 35.7,
          brandStorytelling: 31.5,
          collaborationTeamContribution: 24.8,
          agilityExecution: 33.2,
          productKnowledge: 33.0,
        },
        stores: 35,
        conversionRate: 12.85,
        unitsPerTicket: 1.72,
        averageTicket: 64.9,
        salesPerHour: 87.7,
        visitsPerDay: 123,
        turnoverPct: 0.0,
      },
    },
  },
  topVsRest: {
    n: 120,
    skill: {
      top: 32.8,
      rest: 31.9,
    },
    aboveThresholdPct: {
      top: 23.8,
      rest: 20.1,
    },
    salesPerHour: {
      top: 119.4,
      rest: 100.3,
    },
    relativeSph: {
      top: 1.21,
      rest: 1.0,
    },
    unitsPerTicket: {
      top: 1.71,
      rest: 1.65,
    },
    averageTicket: {
      top: 65.7,
      rest: 63.4,
    },
    areas: {
      customerSalesExcellence: {
        top: 38.2,
        rest: 36.6,
      },
      brandStorytelling: {
        top: 33.1,
        rest: 31.2,
      },
      collaborationTeamContribution: {
        top: 26.8,
        rest: 25.9,
      },
      agilityExecution: {
        top: 33.5,
        rest: 33.7,
      },
      productKnowledge: {
        top: 32.6,
        rest: 32.4,
      },
    },
    seniority: {
      lt3m: {
        top: 0.0,
        rest: 9.7,
      },
      m3to12: {
        top: 7.4,
        rest: 7.8,
      },
      y1to2: {
        top: 9.0,
        rest: 8.7,
      },
      y2to5: {
        top: 24.6,
        rest: 26.2,
      },
      y5to10: {
        top: 10.7,
        rest: 12.9,
      },
      y10to20: {
        top: 32.0,
        rest: 23.1,
      },
      gt20: {
        top: 14.8,
        rest: 9.0,
      },
    },
    skillPValue: 0.442,
  },
  segments: {
    benchmark: 12.5,
    resultWithoutMethod: 42.3,
    skillWithoutResult: 7.2,
    priorityDevelopment: 31.8,
    toActivate: 6.3,
  },
  correlations: {
    seniorityToKpi: 0.18,
    seniorityToSkill: -0.01,
    storeSkillToConversion: 0.08,
    nStores: 125,
    individualSkillToSales: 0.06,
    nIndividuals: 455,
  },
} as const;
