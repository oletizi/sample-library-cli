import {Node} from "@oletizi/sample-library-manager/dist/Node"
import {Sample} from "@oletizi/sample-library-manager/dist/Sample"

export interface InfoView {
  info(): string
}

export class LibrarySampleView implements InfoView {
  private readonly sample: Sample
  constructor(sample: Sample) {
    this.sample = sample
  }
  toString(): string {
    return this.sample.name
  }
  info(): string {
    return `I'm the sample info for sample: ${this.toString()}`
  }
}

export class LibraryNodeView implements InfoView {
  private node: Node

  constructor(node: Node) {
    this.node = node
  }

  toString(): string {
    return this.node.name + '/'
  }

  info(): string {
    return `I'm the library node info for node ${this.toString()}!`
  }
}