import {Colors} from "../../src/view/Widget"

test('Test colors', () => {
  expect(Colors.brightWhite).toBe(-1)
  expect(Colors.default).toBe(-1)
  expect(Colors.black).toBe(0)
  expect(Colors.red).toBe(1)
  expect(Colors.green).toBe(2)
  expect(Colors.yellow).toBe(3)
  expect(Colors.blue).toBe(4)
  expect(Colors.magenta).toBe(5)
  expect(Colors.cyan).toBe(6)
  expect(Colors.white).toBe(7)
  expect(Colors.gray).toBe(8)
})
