import {Widgets} from "blessed"

export class LibraryListView {
  private readonly list: Widgets.ListElement

  constructor(list: Widgets.ListElement) {
    this.list = list
  }

  updateList(listData: string[]) {
    this.list.clearItems()
    for (const item of listData) {
      this.list.add(item)
    }
  }

  focus() {
    this.list.focus()
  }
}