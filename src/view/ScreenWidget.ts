import {Widgets} from "blessed"

export class ScreenWidget {
  private readonly screen: Widgets.Screen
  constructor(screen: Widgets.Screen) {
    this.screen = screen
  }

  render() {
    this.screen.render()
  }

  key(keys: string[], listener: (ch: any, key: any) => void): void {
    this.screen.key(keys, listener)
  }
}