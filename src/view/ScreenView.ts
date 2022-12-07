import {Widgets} from "blessed"

export class ScreenView {
  private readonly screen: Widgets.Screen
  constructor(screen: Widgets.Screen) {
    this.screen = screen
  }

  render() {
    this.screen.render()
  }
}