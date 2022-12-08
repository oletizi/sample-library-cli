import {Widgets} from "blessed"
import {AbstractLibraryInfoWidget} from "./AbstractLibraryInfoWidget"
import {ScreenWidget} from "./ScreenWidget"
import {Logger} from "../Logger"
import {InfoView} from "./InfoView"

export class LibraryItemWidget extends AbstractLibraryInfoWidget {
  private infoBox: Widgets.BoxElement

  constructor(logger: Logger, screen: ScreenWidget, label: string, infoBox: Widgets.BoxElement) {
    super(logger, screen, label, infoBox)
    this.infoBox = infoBox
  }

  setView(view: InfoView) {
    this.infoBox.content = view.info()
    this.render()
  }
}