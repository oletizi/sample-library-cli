import {FilesystemLibraryFactory} from "@oletizi/sample-library-manager/dist/LibraryFactory"
import {Library} from "@oletizi/sample-library-manager/dist/Library"
import {LibraryInspectorController} from "./controller/LibraryInspectorController"
import {LibraryListView} from "./view/LibraryListView"
import * as blessed from 'blessed'
import {ScreenView} from "./view/ScreenView"
import {Widgets} from "blessed"

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

    const layout = blessed.layout({
      parent: screen,
      layout: "inline",
      width: '100%',
      height: `100%`
    })

    const listOptions = {
      parent: layout,
      label: ' Left ',
      keys: true,
      style: {
        selected: {bg: 'blue'},
        item: {
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
      blessed.list(listOptions)
    )
    const controller = new LibraryInspectorController(library, screenView, libraryListView)
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