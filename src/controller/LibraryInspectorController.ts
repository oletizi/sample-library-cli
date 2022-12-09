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
  private readonly currentInfoViews: InfoView[] = []
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

    // handle moving up and down the node's item list, displaying relevant info in the info pane
    libraryListWidget.on('select item', async (item: Widgets.BlessedElement, index: number) => {
      logger.log(`select item! index: ${index}`)
      await this.updateInfo(this.currentInfoViews[index])
    })
    // handle selection of a node's item list
    // - if it's a node, switch the current view(s) to that node
    libraryListWidget.on('select', async (item: Widgets.BlessedElement, index: number) => {
      try {
        logger.log(`selected! index: ${index}`)

        const nodes = Array.from(this.currentNode.children)
        // this is gross... if the parent is not null, then the first item in the list is the parent.
        if (!this.currentNode.parent.isNull) {
          nodes.unshift(this.currentNode.parent)
        }
        if (index < nodes.length) {
          logger.log(`You selected a NODE!: ${nodes[index].name}`)
          this.currentNode = nodes[index]
          await this.updateList(this.currentNode)
          await this.updateInfo(this.currentInfoViews[0])
        } else {
          logger.log('You selected something NOT a node.')
        }
      } catch (e) {
        logger.log(`${e}`)
      }
    })
    libraryListWidget.focus()
  }

  async updateInfo(infoView: InfoView) {
    try {
      this.libraryItemWidget.setView(infoView)
    } catch (e) {
      this.logger.log(`${e}`)
    }
  }

  async updateList(node: Node) {
    await this.listMutex.runExclusive(() => {
      this.currentInfoViews.length = 0

      if (!node.parent.isNull) {
        // If the current node has a parent, add a '..' in the list to allow navigation up the tree
        // XXX: This seems gross
        const infoView: InfoView = {
          info: () =>  node.parent.path
        }
        infoView.toString = () => {
          return '..'
        }
        this.currentInfoViews.push(infoView)
      }

      for (const child of node.children) {
        this.currentInfoViews.push(new LibraryNodeView(child))
      }
      for (const sample of node.samples) {
        this.currentInfoViews.push(new LibrarySampleView(sample))
      }
      this.libraryListWidget.updateList(this.currentInfoViews)
      this.screenWidget.render()
    })
  }

  render() {
    this.screenWidget.render()
  }
}