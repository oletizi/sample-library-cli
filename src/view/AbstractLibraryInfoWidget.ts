import {Colors, Widget} from "./Widget"
import {Widgets} from "blessed"
import {ScreenWidget} from "./ScreenWidget"
import {Logger} from "../Logger"

/**
 * Parent of all interactive panels.
 */
export abstract class AbstractLibraryInfoWidget extends Widget {
  private label: string
  protected constructor(logger: Logger, screen: ScreenWidget, label: string, widget: Widgets.BlessedElement) {
    super(logger, screen, widget)
    this.label = label
    // set up focus and blur behavior
    widget.on('focus', () => {
      widget.style.border.fg = Colors.white
      widget.setLabel(`*${label}*`)
      screen.render()
    })
    widget.on('blur', () => {
      widget.style.border.fg = Colors.gray
      widget.setLabel(` ${label} `)
      screen.render()
    })
  }
}