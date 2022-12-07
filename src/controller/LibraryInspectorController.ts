import {LibraryListView} from '../view/LibraryListView'
import {Library} from "@oletizi/sample-library-manager/dist/Library"
import {ScreenView} from "../view/ScreenView"
import {Node} from "@oletizi/sample-library-manager/dist/Node"
import {LibraryItemView} from "../view/LibraryItemView"
import {Logger} from "../Logger"

export class LibraryInspectorController {
  private readonly library: Library
  private readonly libraryView: LibraryListView
  private readonly screenView: ScreenView
  private readonly libraryInfoView: LibraryItemView
  private readonly logger: Logger

  constructor(logger: Logger, library: Library, screenView: ScreenView, libraryView: LibraryListView, libraryInfoView: LibraryItemView) {
    this.logger = logger
    this.library = library
    this.screenView = screenView
    this.libraryView = libraryView
    this.libraryInfoView = libraryInfoView
    this.updateList(this.library.root)
    this.libraryView.key('tab', () => {libraryInfoView.focus()})
    this.libraryInfoView.key('tab', () => {libraryView.focus()})

    libraryView.focus()
  }

  private updateList(node: Node) {
    const listData: string[] = []
    for (const child of node.children) {
      listData.push(child.name + '/')
    }
    for (const sample of node.samples) {
      listData.push(sample.name)
    }
    this.libraryView.updateList(listData)
  }

  render() {
    this.screenView.render()
  }
}