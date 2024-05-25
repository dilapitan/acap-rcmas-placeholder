const { SEASONAL_DUMMY_DATA, TENDAY_DUMMY_DATA } = require("./data");

function getSeasonalDecision(countDistribution) {
  // console.log('countDistribution:', countDistribution)

  const belowNormal =
    countDistribution.length > 0
      ? Math.max(...countDistribution["b_normal"])
      : undefined;
  const wayBelowNormal =
    countDistribution.length > 0
      ? Math.max(...countDistribution["wb_normal"])
      : undefined;
  const aboveNormal =
    countDistribution.length > 0
      ? Math.max(...countDistribution["above_normal"])
      : undefined;

  const IS_DROUGHT =
    (belowNormal !== undefined && belowNormal === 5) ||
    (wayBelowNormal !== undefined && wayBelowNormal === 3);

  const IS_DRY_SPELL =
    (belowNormal !== undefined && belowNormal[0] >= 3) ||
    (wayBelowNormal !== undefined && wayBelowNormal[0] === 2);

  const IS_DRY_CONDITION = belowNormal !== undefined && belowNormal === 2;

  const IS_WETTER_CONDITION = aboveNormal !== undefined && aboveNormal >= 3;

  if (IS_DROUGHT) return "Drought";
  if (IS_DRY_SPELL) return "Dry Spell";
  if (IS_DRY_CONDITION) return "Dry Condition";
  if (IS_WETTER_CONDITION) return "Wetter Condition";
  return "No Risk";
}

function getTenDayDecision(countDistribution) {
  console.log("countDistribution:", countDistribution);

  const flooding_submergence_3M =
    countDistribution.length > 0
      ? Math.max(...countDistribution["MODERATE RAINS"])
      : undefined;
  const flooding_submergence_2H =
    countDistribution.length > 0
      ? Math.max(...countDistribution["HEAVY RAINS"])
      : undefined;
  const dry_condition =
    countDistribution.length > 0
      ? Math.max(...countDistribution["NO RAIN"])
      : undefined;

  const IS_FLOODING_SUBMERGENCE_3M =
    flooding_submergence_3M !== undefined && flooding_submergence_3M >= 3;

  const IS_FLOODING_SUBMERGENCE_2H =
    flooding_submergence_2H !== undefined && flooding_submergence_2H >= 2;

  const IS_DRY_CONDITION = dry_condition !== undefined && dry_condition === 10;

  if (IS_FLOODING_SUBMERGENCE_3M) return "Flooding/Submergence 3M";
  if (IS_FLOODING_SUBMERGENCE_2H) return "Flooding/Submergence 2H";
  if (IS_DRY_CONDITION) return "Dry Condition";
  return "No Risk";
}

function useSeasonalData(data) {
  if (data.length === 0) return {};

  let countDistribution = {
    wb_normal: [],
    b_normal: [],
    above_normal: [],
  };
  let currentCondition = data[0].condition;
  let count = 1;

  for (let i = 1; i < data.length; i++) {
    if (data[i].condition === currentCondition) {
      count++;
    } else {
      countDistribution[currentCondition].push(count);

      currentCondition = data[i].condition;
      count = 1;
    }
  }

  // Add the last sequence to the countDistribution
  countDistribution[currentCondition].push(count);

  return getSeasonalDecision(countDistribution);
}

function useTenDay(data) {
  if (data.length === 0) return {};

  let countDistribution = {
    "NO RAIN": [],
    "MODERATE RAINS": [],
    "HEAVY RAINS": [],
    "LIGHT RAINS": [],
  };

  let currentRainfall = data[0].rainfall;
  let count = 1;

  for (let i = 1; i < data.length; i++) {
    if (data[i].rainfall === currentRainfall) {
      count++;
    } else {
      countDistribution[currentRainfall].push(count);

      currentRainfall = data[i].rainfall;
      count = 1;
    }
  }

  // Add the last sequence to the countDistribution
  countDistribution[currentRainfall].push(count);

  return getTenDayDecision(countDistribution);
}

function getClimateRisk(recommendationsType) {
  // Assumption here is ONE Climate Risk per Seasonal or TenDay

  switch (recommendationsType) {
    case "seasonal":
      return useSeasonalData(SEASONAL_DUMMY_DATA);
    case "tenday":
      return useTenDay(TENDAY_DUMMY_DATA);
    default:
      break;
  }
}

const result = getClimateRisk("tenday");
console.log("result:", result);
