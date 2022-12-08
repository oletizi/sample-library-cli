import {LibraryListWidget} from '../view/LibraryListWidget'
import {Library} from "@oletizi/sample-library-manager/dist/Library"
import {ScreenWidget} from "../view/ScreenWidget"
import {Node} from "@oletizi/sample-library-manager/dist/Node"
import {LibraryItemWidget} from "../view/LibraryItemWidget"
import {Logger} from "../Logger"
import {LibraryInfoLayout} from "../view/LibraryInfoLayout"
import {MenuWidget} from "../view/MenuWidget"
import {Widgets} from "blessed"
import {Mutex} from 'async-mutex'
import {InfoView, LibraryNodeView, LibrarySampleView} from "../view/InfoView"

export class LibraryInspectorController {
  private readonly library: Library
  private readonly libraryListWidget: LibraryListWidget
  private readonly screenWidget: ScreenWidget
  private readonly libraryItemWidget: LibraryItemWidget
  private readonly logger: Logger
  private readonly libraryInfoLayout: LibraryInfoLayout
  private readonly mainMenuWidget: MenuWidget
  private currentNode: Node
  private readonly currentListData: InfoView[] = []
  private readonly listMutex = new Mutex()

  constructor(logger: Logger,
              library: Library,
              screenWidget: ScreenWidget,
              libraryInfoLayout: LibraryInfoLayout,
              libraryListWidget: LibraryListWidget,
              libraryItemWidget: LibraryItemWidget,
              mainMenuWidget: MenuWidget) {
    this.logger = logger
    this.library = library
    this.currentNode = library.root
    this.screenWidget = screenWidget
    this.libraryInfoLayout = libraryInfoLayout
    this.libraryListWidget = libraryListWidget
    this.libraryItemWidget = libraryItemWidget
    this.mainMenuWidget = mainMenuWidget
    this.updateList(this.library.root).catch(e => logger.log(e))
    this.libraryListWidget.key('tab', () => {
      libraryItemWidget.focus()
    })
    this.libraryItemWidget.key('tab', () => {
      libraryListWidget.focus()
    })

    this.screenWidget.key(['f1'], () => {
      this.libraryInfoLayout.toggleLogger()
    })

    libraryListWidget.on('select item', async (item: Widgets.BlessedElement, index: number) => {
      try {
        logger.log(`select item! index: ${index}`)
        this.libraryItemWidget.setView(this.currentListData[index])
      } catch (e) {
        logger.log(`${e}`)
      }
    })

    libraryListWidget.focus()
  }

  async updateList(node: Node) {
    await this.listMutex.runExclusive(() => {
      this.currentListData.length = 0
      for (const child of node.children) {
        this.currentListData.push(new LibraryNodeView(child))
      }
      for (const sample of node.samples) {
        this.currentListData.push(new LibrarySampleView(sample))
      }
      this.libraryListWidget.updateList(this.currentListData)
      this.screenWidget.render()
    })
  }

  render() {
    this.screenWidget.render()
  }
}