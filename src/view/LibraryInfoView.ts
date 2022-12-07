import {Colors, View} from "./View"
import {Widgets} from "blessed"
import {ScreenView} from "./ScreenView"
import {Logger} from "../Logger"

/**
 * Parent of all interactive panels.
 */
export abstract class LibraryInfoView extends View {
  private label: string
  protected constructor(logger: Logger, screen: ScreenView, label: string, widget: Widgets.BlessedElement) {
    super(logger, screen, widget)
    this.label = label
    // set up focus and blur behavior
    widget.on('focus', () => {
      logger.log(`FOCUS: ${label}`)
      widget.border.fg = Colors.brightWhite
      widget.setLabel(`*${label}*`)
      screen.render()
    })
    widget.on('blur', () => {
      logger.log(`BLUR: ${label}`)
      widget.border.fg = Colors.gray
      widget.setLabel(` ${label} `)
      screen.render()
    })
  }
}