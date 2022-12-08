import {Widget} from "./Widget"
import {ScreenWidget} from "./ScreenWidget"
import {Logger} from "../Logger"
import {Widgets} from "blessed"

export class LoggerWidget extends Widget {
  constructor(logger: Logger, screen: ScreenWidget, widget: Widgets.BlessedElement) {
    super(logger, screen, widget)
  }
}