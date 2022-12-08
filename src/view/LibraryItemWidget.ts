import {Widgets} from "blessed"
import {AbstractLibraryInfoWidget} from "./AbstractLibraryInfoWidget"
import {ScreenWidget} from "./ScreenWidget"
import {Logger} from "../Logger"

export class LibraryItemWidget extends AbstractLibraryInfoWidget {
  private boxElement: Widgets.BoxElement

  constructor(logger: Logger, screen: ScreenWidget, label: string, boxElement: Widgets.BoxElement) {
    super(logger, screen, label, boxElement)
    this.boxElement = boxElement
  }

}