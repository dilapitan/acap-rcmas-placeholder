const { SEASONAL_DUMMY_DATA } = require('./data')

function getSeasonalDecision(countDistribution) {
  // console.log('countDistribution:', countDistribution)

  const belowNormal = countDistribution['b_normal'][0]
  const wayBelowNormal = countDistribution['wb_normal'][0]
  const aboveNormal = countDistribution['above_normal'][0]

  const IS_DROUGHT =
    (belowNormal !== undefined && belowNormal === 5) ||
    (wayBelowNormal !== undefined && wayBelowNormal === 3)

  const IS_DRY_SPELL =
    (belowNormal !== undefined && belowNormal[0] >= 3) ||
    (wayBelowNormal !== undefined && wayBelowNormal[0] === 2)

  const IS_DRY_CONDITION = belowNormal !== undefined && belowNormal === 2

  const IS_WETTER_CONDITION = aboveNormal !== undefined && aboveNormal >= 3

  if (IS_DROUGHT) return 'Drought'
  if (IS_DRY_SPELL) return 'Dry Spell'
  if (IS_DRY_CONDITION) return 'Dry Condition'
  if (IS_WETTER_CONDITION) return 'Wetter Condition'
  return 'No Risk'
}

function useSeasonalData(data) {
  if (data.length === 0) return {}

  let countDistribution = {
    wb_normal: [],
    b_normal: [],
    above_normal: [],
  }
  let currentCondition = data[0].condition
  let count = 1

  for (let i = 1; i < data.length; i++) {
    if (data[i].condition === currentCondition) {
      count++
    } else {
      countDistribution[currentCondition].push(count)

      currentCondition = data[i].condition
      count = 1
    }
  }

  // Add the last sequence to the countDistribution
  countDistribution[currentCondition].push(count)

  return getSeasonalDecision(countDistribution)
}

function getClimateRisk(recommendationsType) {
  // Assumption here is ONE Climate Risk per Seasonal or TenDay

  switch (recommendationsType) {
    case 'seasonal':
      return useSeasonalData(SEASONAL_DUMMY_DATA)
    default:
      break
  }
}

const result = getClimateRisk('seasonal')
console.log('result:', result)
