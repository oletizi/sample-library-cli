#!/usr/bin/env ts-node
import {FilesystemAppFactory} from "../../src/App"

new FilesystemAppFactory().newApp('./test/data/library/multi-level', 'the app').then((app) => {
  app.start()
})
