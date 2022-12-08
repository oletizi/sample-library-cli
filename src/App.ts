import {FilesystemLibraryFactory} from "@oletizi/sample-library-manager/dist/LibraryFactory"
import {Library} from "@oletizi/sample-library-manager/dist/Library"
import {LibraryInspectorController} from "./controller/LibraryInspectorController"
import {LibraryItemWidget} from "./view/LibraryItemWidget"
import {LibraryListWidget} from "./view/LibraryListWidget"
import * as blessed from 'blessed'
import {ScreenWidget} from "./view/ScreenWidget"
import {Widgets} from "blessed"
import Border = Widgets.Border
import {Colors} from "./view/Widget"
import {LibraryInfoLayout} from "./view/LibraryInfoLayout"
import {LoggerWidget} from "./view/LoggerWidget"
import {MenuWidget} from "./view/MenuWidget"

export interface App {
  readonly name: string
}

export class FilesystemAppFactory {
  async newApp(path: string, name: string) {
    const library: Library = await new FilesystemLibraryFactory().newLibrary(path, name)
    const screen: Widgets.Screen = blessed.screen({
      smartCSR: true,
    })

    screen.key(['q', 'C-c'], function () {
      screen.destroy()
      process.exit(0)
    })
    screen.title = "I'm the Title"
    //screen.on('keypress', (ch, key) => {console.log(`ch: ${ch}, key: ${JSON.stringify(key)}`)})

    const screenWidget = new ScreenWidget(screen)

    const logger = blessed.log({
      label: ' Log ',
      scrollback: 5000,
      top: 0,
      width: '33%',
      border: 'line'
    })

    const layout = blessed.layout({
      parent: screen,
      layout: "inline",
      width: '100%',
      height: `100%`,
    })

    // XXX: this is declared here b/c the ts compiler doesn't like it to be declared inline.
    const border: Border = {
      type: "line"
    }
    const listOptions = {
      parent: layout,
      border: border,
      keys: true,
      style: {
        selected: {bg: 'blue'},
        item: {
          fg: 'white'
        },
        border: {
          type: 'line',
          fg: 'white'
        },
      },
      scrollable: true,
      scrollbar: {
        ch: ' ',
        style: {
          bg: 'blue'
        }
      },
      top: 0,
      left: 0,
      content: ''
    }

    const libraryListWidget: LibraryListWidget = new LibraryListWidget(
      logger,
      screenWidget,
      "Library",
      blessed.list(listOptions)
    )

    const infoOptions: Widgets.BoxOptions = {
      parent: layout,
      top: 0,
      border: {
        type: 'line',
        fg: Colors.gray,
      },
      content: "I'm the info pane."
    }
    const libraryItemWidget: LibraryItemWidget = new LibraryItemWidget(logger, screenWidget, "Info", blessed.box(infoOptions))

    const mainMenu = blessed.box({
      parent: screen,
      autoCommandKeys: true,
      width: '100%',
      height: 1,
      bottom: 0,
      content: " F1: Show Log "
    })
    const mainMenuWidget: MenuWidget = new MenuWidget(logger, screenWidget, mainMenu)
    layout.append(logger)

    const loggerWidget: LoggerWidget = new LoggerWidget(logger, screenWidget, logger)
    const libraryInfoLayout: LibraryInfoLayout = new LibraryInfoLayout(logger, screenWidget, layout, libraryListWidget, libraryItemWidget, loggerWidget, mainMenuWidget)

    const controller = new LibraryInspectorController(logger, library, screenWidget, libraryInfoLayout, libraryListWidget, libraryItemWidget, mainMenuWidget)
    return new MutableApp(name, controller)
  }
}

export class MutableApp implements App {
  readonly name: string
  private controller: LibraryInspectorController

  start() {
    this.controller.render()
  }

  public constructor(name: string, controller: LibraryInspectorController) {
    this.name = name
    this.controller = controller
  }
}