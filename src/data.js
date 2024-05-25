const TENDAY_DUMMY_DATA = [
  {
    rainfall: 'NO RAIN',
    day_str: '2024/01/15',
    day_format: 'Mon Jan 15',
    day: 1,
  },
  {
    rainfall: 'MODERATE RAINS',
    day_str: '2024/01/16',
    day_format: 'Mon Jan 16',
    day: 2,
  },
  {
    rainfall: 'NO RAIN',
    day_str: '2024/01/17',
    day_format: 'Mon Jan 17',
    day: 3,
  },
  {
    rainfall: 'NO RAIN',
    day_str: '2024/01/18',
    day_format: 'Mon Jan 18',
    day: 4,
  },
  {
    rainfall: 'MODERATE RAINS',
    day_str: '2024/01/19',
    day_format: 'Mon Jan 19',
    day: 5,
  },
  {
    rainfall: 'NO RAIN',
    day_str: '2024/01/20',
    day_format: 'Mon Jan 20',
    day: 6,
  },
  {
    rainfall: 'NO RAIN',
    day_str: '2024/01/21',
    day_format: 'Mon Jan 21',
    day: 7,
  },
  {
    rainfall: 'NO RAIN',
    day_str: '2024/01/22',
    day_format: 'Mon Jan 22',
    day: 8,
  },
  {
    rainfall: 'HEAVY RAINS',
    day_str: '2024/01/23',
    day_format: 'Mon Jan 23',
    day: 9,
  },
  {
    rainfall: 'HEAVY RAINS',
    day_str: '2024/01/24',
    day_format: 'Mon Jan 24',
    day: 10,
  },
]

const SEASONAL_DUMMY_DATA = [
  {
    condition: 'wb_normal',
    mo: 'oct',
    year: 2023,
  },
  {
    condition: 'wb_normal',
    mo: 'nov',
    year: 2023,
  },
  {
    condition: 'wb_normal',
    mo: 'dec',
    year: 2023,
  },
  {
    condition: 'above_normal',
    mo: 'jan',
    year: 2024,
  },
  {
    condition: 'b_normal',
    mo: 'feb',
    year: 2024,
  },
  {
    condition: 'b_normal',
    mo: 'mar',
    year: 2024,
  },
]

module.exports = {
  TENDAY_DUMMY_DATA,
  SEASONAL_DUMMY_DATA,
}
