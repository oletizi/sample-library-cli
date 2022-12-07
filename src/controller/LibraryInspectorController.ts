import {LibraryListView} from '../view/LibraryListView'
import {Library} from "@oletizi/sample-library-manager/dist/Library"
import {ScreenView} from "../view/ScreenView"
import {Node} from "@oletizi/sample-library-manager/dist/Node"

export class LibraryInspectorController {
  private readonly library: Library
  private readonly libraryView: LibraryListView
  private readonly screenView: ScreenView

  constructor(library: Library, screenView: ScreenView, libraryView: LibraryListView) {
    this.library = library
    this.screenView = screenView
    this.libraryView = libraryView
    this.updateList(this.library.root)
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