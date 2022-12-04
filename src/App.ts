export interface App {
  readonly name: string
}

export class AppFactory {
  newApp(name:string) : App {
    return new MutableApp(name)
  }
}

export class MutableApp implements App {
  readonly name: string

  public constructor(name: string) {
    this.name = name
  }

}