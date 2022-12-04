import {App, AppFactory} from "../src/App"

test('Basic App tests', () => {
  const appName: string = "the app name"
  const app: App = new AppFactory().newApp(appName)
  expect(app).toBeDefined()
  expect(app.name).toBe(appName)
})