import {Widgets} from "blessed"
import {LibraryInfoView} from "./LibraryInfoView"
import {ScreenView} from "./ScreenView"
import {Logger} from "../Logger"

export class LibraryItemView extends LibraryInfoView {
  private boxElement: Widgets.BoxElement

  constructor(logger: Logger, screen: ScreenView, label: string, boxElement: Widgets.BoxElement) {
    super(logger, screen, label, boxElement)
    this.boxElement = boxElement
  }

}