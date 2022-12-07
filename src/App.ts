import {FilesystemLibraryFactory} from "@oletizi/sample-library-manager/dist/LibraryFactory"
import {Library} from "@oletizi/sample-library-manager/dist/Library"
import {LibraryInspectorController} from "./controller/LibraryInspectorController"
import {LibraryItemView} from "./view/LibraryItemView"
import {LibraryListView} from "./view/LibraryListView"
import * as blessed from 'blessed'
import {ScreenView} from "./view/ScreenView"
import {Widgets} from "blessed"
import Border = Widgets.Border
import {Colors} from "./view/View"

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

    const screenView = new ScreenView(screen)

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
      width: '33%',
      height: '100%',
      content: ''
    }

    const libraryListView: LibraryListView = new LibraryListView(
      logger,
      screenView,
      "Library",
      blessed.list(listOptions)
    )

    const infoOptions: Widgets.BoxOptions = {
      parent: layout,
      top: 0,
      width: '33%',
      height: '100%',
      border: {
        type: 'line',
        fg: Colors.gray,
      },
      content: "I'm the info pane."
    }
    const libraryInfoView: LibraryItemView = new LibraryItemView(logger, screenView, "Info", blessed.box(infoOptions))

    layout.append(logger)

    const controller = new LibraryInspectorController(logger, library, screenView, libraryListView, libraryInfoView)
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