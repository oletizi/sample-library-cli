import {Widgets} from "blessed"
import {LibraryInfoView} from "./LibraryInfoView"
import {ScreenView} from "./ScreenView"
import {Logger} from "../Logger"

export class LibraryListView extends LibraryInfoView {
  private readonly list: Widgets.ListElement

  constructor(logger: Logger, screen: ScreenView, label:string, list: Widgets.ListElement) {
    super(logger, screen, label, list)
    this.list = list
  }

  updateList(listData: string[]) {
    this.list.clearItems()
    for (const item of listData) {
      this.list.add(item)
    }
  }

}