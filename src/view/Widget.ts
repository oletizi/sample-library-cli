import {Widgets} from 'blessed'

import {ScreenWidget} from "./ScreenWidget"
import {Logger} from "../Logger"

export class Colors {
  static readonly default: number = -1
  static readonly black: number = 0
  static readonly red: number = 1
  static readonly green: number = 2
  static readonly yellow: number = 3
  static readonly blue: number = 4
  static readonly magenta: number = 5
  static readonly cyan: number = 6
  static readonly white: number = 7
  static readonly gray: number = 8
  static readonly brightWhite: number = -1
}

export abstract class Widget {
  private readonly screen: ScreenWidget
  private readonly widget: Widgets.BlessedElement
  protected readonly logger: Logger

  protected constructor(logger: Logger, screen: ScreenWidget, widget: Widgets.BlessedElement) {
    this.logger = logger
    this.screen = screen
    this.widget = widget
  }

  public key(keyName: any, listener: any) {
    this.widget.key(keyName, listener)
  }

  // XXX: no idea how to set these types correctly
  public on(eventName: any, listener: any) {
    this.widget.on(eventName, listener)
  }

  public getWidth(): string | number {
    return this.widget.width
  }

  public setWidth(width: string | number) {
    this.widget.width = width
  }

  public getHeight(): string | number {
    return this.widget.height
  }

  public setHeight(height: string | number) {
    this.widget.height = height
  }

  public show() {
    this.widget.show()
  }

  public hide() {
    this.widget.hide()
  }

  public focus() {
    this.widget.focus()
  }

  isVisible() {
    return this.widget.visible
  }
}