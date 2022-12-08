import {Logger} from "../Logger"
import {Widget} from "./Widget"
import {ScreenWidget} from "./ScreenWidget"
import {Widgets} from "blessed"

export class MenuWidget extends Widget {
  constructor(logger: Logger, screen: ScreenWidget, widget: Widgets.BlessedElement) {
    super(logger, screen, widget)
  }
}