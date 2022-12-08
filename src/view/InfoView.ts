import {Node} from "@oletizi/sample-library-manager/dist/Node"
import {Sample} from "@oletizi/sample-library-manager/dist/Sample"
import {MediaStreamMeta, SampleMeta} from "@oletizi/sample-library-manager/dist/SampleMeta"

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
    return new SampleMetaInfoView(this.sample.meta).info()
  }
}

class SampleMetaInfoView implements InfoView {
  private readonly sampleMeta: SampleMeta

  constructor(sampleMeta: SampleMeta) {
    this.sampleMeta = sampleMeta
  }

  info(): string {
    return "Keywords: " + Array.from(this.sampleMeta.keywords).join(',')
      + '\n' + new MediaStreamsInfoView(this.sampleMeta.streams).info()
  }
}

class MediaStreamsInfoView implements InfoView {
  private readonly streams: ReadonlyArray<MediaStreamMeta>

  constructor(streams: ReadonlyArray<MediaStreamMeta>) {
    this.streams = streams
  }

  info(): string {
    return this.streams.map((streamMeta: MediaStreamMeta) => new MediaStreamInfoView(streamMeta).info()).join('\n')
  }
}

class MediaStreamInfoView implements InfoView {
  private streamMeta: MediaStreamMeta

  constructor(streamMeta: MediaStreamMeta) {
    this.streamMeta = streamMeta
  }

  info(): string {
    return `Sample Rate: ${this.streamMeta.sampleRate}`
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