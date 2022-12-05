import * as blessed from 'blessed'

const COLORS = {
  default: -1,
  black: 0,
  red: 1,
  green: 2,
  yellow: 3,
  blue: 4,
  magenta: 5,
  cyan: 6,
  white: 7,
  gray: 8
}

const screen = blessed.screen({
  smartCSR: true,
})

screen.key(['q', 'C-c'], function () {
  screen.destroy()
  process.exit(0)
})
// capture up arrow
// if (key.name === "up") {}
// screen.on('keypress', function(ch, key){
//   console.log(`ch: ${ch}, key: ${JSON.stringify(key)}`);
// })
screen.title = "I'm the Title"

const bottom = blessed.box({
  width: '100%',
  height: 1,
  bottom: 0,
  content: " I'm the bottom."
})

const layout = blessed.layout({
  parent: screen,
  layout: "inline",
  width: '100%',
  height: `100%-${bottom.height}`
})

const items = ["The first item should be super long so it doesn't fit and spills over on the right and with any luck scrolling works."]
for (let i = 0; i < 100; i++) {
  items.push(`I'm item ${i}`)
}

const left = blessed.list({
  parent: layout,
  label: ' Left ',
  keys: true,
  style: {
    selected: {bg: COLORS.blue},
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
  items: items,
  top: 0,
  left: 0,
  width: '33%',
  height: '100%',
  border: {
    type: 'line',
  },
  content: "I'm the left side."
})
left.focus()

// left.key(['n'], (ch, key) =>{
//   console.log(`ch: ${ch}, key: ${key}`)
// })
const right = blessed.box({
  parent: layout,
  label: ' Right ',
  top: 0,
  width: '33%',
  height: '100%',
  border: {
    type: 'line',
  },
  content: "I'm the right side."
})

const log = blessed.log({
  parent: layout,
  label: ' Log ',
  scrollback: 5000,
  top: 0,
  width: '33%',
  border: 'line'
})
log.log('First log line.')
left.key('tab', () => {
  right.focus()
})
left.on('scroll', () => {
  log.log(`Scroll. scroll: ${left.getScroll()}`)
})
left.on('select', (item, selected) => {
  log.log(`selected: ${selected}`)
})
left.on('focus', () => {
  try {
    left.setLabel('*Left*')
    left.style.border.fg = -1
    screen.render()
  } catch (e) {
    log.log(`${e}`)
  }
})
left.on('blur', () => {
  try {
    left.setLabel(' Left ')
    left.style.border.fg = 'gray'
    screen.render()
  } catch (e) {
    log.log(`${e}`)
  }
})

right.key('tab', () => {
  left.focus()
})
right.on('focus', () => {
  try {
    right.setLabel('*Right*')
    right.style.border.fg = COLORS.default
    screen.render()
  } catch (e) {
    log.log(`${e}`)
  }
})
right.on('blur', () => {
  try {
    right.setLabel(' Right ')
    right.style.border.fg = COLORS.gray
    screen.render()
  } catch (e) {
    log.log(`${e}`)
  }
})

screen.append(bottom)

screen.render()