import {Widgets} from "blessed"
import {AbstractLibraryInfoWidget} from "./AbstractLibraryInfoWidget"
import {ScreenWidget} from "./ScreenWidget"
import {Logger} from "../Logger"

export class LibraryListWidget extends AbstractLibraryInfoWidget {
  private readonly list: Widgets.ListElement

  constructor(logger: Logger, screen: ScreenWidget, label:string, list: Widgets.ListElement) {
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