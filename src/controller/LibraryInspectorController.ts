import {LibraryListWidget} from '../view/LibraryListWidget'
import {Library} from "@oletizi/sample-library-manager/dist/Library"
import {ScreenWidget} from "../view/ScreenWidget"
import {Node} from "@oletizi/sample-library-manager/dist/Node"
import {LibraryItemWidget} from "../view/LibraryItemWidget"
import {Logger} from "../Logger"
import {LibraryInfoLayout} from "../view/LibraryInfoLayout"
import {MenuWidget} from "../view/MenuWidget"

export class LibraryInspectorController {
  private readonly library: Library
  private readonly libraryListWidget: LibraryListWidget
  private readonly screenWidget: ScreenWidget
  private readonly libraryItemWidget: LibraryItemWidget
  private readonly logger: Logger
  private readonly libraryInfoLayout: LibraryInfoLayout
  private readonly mainMenuWidget: MenuWidget

  constructor(logger: Logger,
              library: Library,
              screenWidget: ScreenWidget,
              libraryInfoLayout: LibraryInfoLayout,
              libraryListWidget: LibraryListWidget,
              libraryItemWidget: LibraryItemWidget,
              mainMenuWidget: MenuWidget) {
    this.logger = logger
    this.library = library
    this.screenWidget = screenWidget
    this.libraryInfoLayout = libraryInfoLayout
    this.libraryListWidget = libraryListWidget
    this.libraryItemWidget = libraryItemWidget
    this.mainMenuWidget = mainMenuWidget
    this.updateList(this.library.root)
    this.libraryListWidget.key('tab', () => {
      libraryItemWidget.focus()
    })
    this.libraryItemWidget.key('tab', () => {
      libraryListWidget.focus()
    })

    this.screenWidget.key(['f1'], () => {
      this.libraryInfoLayout.toggleLogger()
    })

    libraryListWidget.focus()
  }

  private updateList(node: Node) {
    const listData: string[] = []
    for (const child of node.children) {
      listData.push(child.name + '/')
    }
    for (const sample of node.samples) {
      listData.push(sample.name)
    }
    this.libraryListWidget.updateList(listData)
  }

  render() {
    this.screenWidget.render()
  }
}