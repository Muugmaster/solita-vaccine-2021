const validators = require('../../utils/validators')

describe('validateDate function', () => {
  test('returns false for letters', () => {
    expect(validators.validateDate('notAdate')).toBe(false)
  })

  test('returns false for letters and numbers', () => {
    expect(validators.validateDate('23not2Adate2332')).toBe(false)
  })

  test('returns true for "2021-04-12T11:10:06.473587Z"', () => {
    expect(validators.validateDate('2021-04-12T11:10:06.473587Z')).toBe(true)
  })

  test('returns true for "2021-03-20"', () => {
    expect(validators.validateDate('2021-03-20')).toBe(true)
  })

  test('returns true for "2021-04-12T11:10:06"', () => {
    expect(validators.validateDate('2021-04-12T11:10:06')).toBe(true)
  })

  test('returns false for "asd2021-04s-12T11sa:10:06"', () => {
    expect(validators.validateDate('asd2021-04s-12T11sa:10:06')).toBe(false)
  })

  test('returns false for "202112-04-12T11:10:06"', () => {
    expect(validators.validateDate('202112-04-12T11:10:06')).toBe(false)
  })

  test('returns false for "202112-12T11:10:06"', () => {
    expect(validators.validateDate('202112-12T11:10:06')).toBe(false)
  })
})
