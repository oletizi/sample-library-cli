import {MutableApp} from "../../src/App"
import {mock} from "jest-mock-extended"
import {LibraryInspectorController} from "../../src/controller/LibraryInspectorController"

test('Basic AppFactory tests', () => {
  const controller: LibraryInspectorController = mock<LibraryInspectorController>()

  const appName: string = "the app name"
  const app = new MutableApp(appName, controller)
  expect(app).toBeDefined()
  expect(app.name).toBe(appName)
})