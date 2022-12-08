import {ScreenWidget} from "./ScreenWidget"
import {LibraryItemWidget} from "./LibraryItemWidget"
import {LibraryListWidget} from "./LibraryListWidget"
import {LoggerWidget} from "./LoggerWidget"
import {Logger} from "../Logger"
import {MenuWidget} from "./MenuWidget"
import {Widget} from "./Widget"
import {Widgets} from "blessed"

/**
 * Manages the layout of the library widgets
 */
export class LibraryInfoLayout {
  private readonly screen: ScreenWidget
  private readonly itemWidget: LibraryItemWidget
  private readonly listWidget: LibraryListWidget
  private readonly loggerView: LoggerWidget
  private readonly logger: Logger
  private readonly mainMenu: MenuWidget
  private currentMenu: MenuWidget
  private blessedLayout: Widgets.LayoutElement

  constructor(logger: Logger,
              screenWidget: ScreenWidget,
              // XXX: this is leaky
              layout: Widgets.LayoutElement,
              listWidget: LibraryListWidget,
              itemWidget: LibraryItemWidget,
              loggerWidget: LoggerWidget, mainMenu: MenuWidget) {
    this.logger = logger
    this.screen = screenWidget
    this.blessedLayout = layout
    this.listWidget = listWidget
    this.itemWidget = itemWidget
    this.loggerView = loggerWidget
    this.mainMenu = this.currentMenu = mainMenu
    //this.hideLogger()
    //this.listWidget.setHeight('100%-' + mainMenu.getHeight())
    this.showLogger().layout()
  }

  layout(): LibraryInfoLayout {
    const visiblePanes: Widget[] = [this.listWidget, this.itemWidget, this.loggerView].filter(pane => pane.isVisible())
    this.blessedLayout.height = `100%-${this.currentMenu.getHeight()}`

    visiblePanes.forEach(pane => {
      // give each pane equal width (percent)
      pane.setWidth(100 / visiblePanes.length + '%')
      // set each pane's height to 100% minus the height of the current menu
      pane.setHeight('100%')
    })
    this.screen.render()
    return this
  }

  toggleLogger(): LibraryInfoLayout {
    this.loggerView.isVisible() ? this.hideLogger() : this.showLogger()
    return this
  }

  showLogger(): LibraryInfoLayout {
    // I'm sure there are more elegant ways to do this. We'll get there. Maybe
    this.loggerView.show()
    this.layout()
    return this
  }

  hideLogger(): LibraryInfoLayout {
    this.loggerView.hide()
    this.layout()
    return this
  }
}