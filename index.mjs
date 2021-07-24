'use strict'

import shiki from 'shiki'
import { visit } from 'unist-util-visit'
import hastToString from 'hast-util-to-string'
import { u } from 'unist-builder'

export default attacher

function attacher (options) {
  options = options || {}

  const theme = options.theme || 'nord'
  const useBackground = options.useBackground == null ? true : !!options.useBackground

  return transformer

  async function transformer (tree) {
    const highlighter = await shiki.getHighlighter({ theme })

    visit(tree, 'element', function (node, index, parent) {
      if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
        return
      }

      if (useBackground) {
        addStyle(parent, 'background: ' + highlighter.getBackgroundColor())
      }

      const lang = codeLanguage(node)

      if (!lang) {
        // Unknown language, fall back to a foreground colour
        addStyle(node, 'color: ' + highlighter.getForegroundColor())
        return
      }

      const tokens = highlighter.codeToThemedTokens(hastToString(node), lang)
      const tree = tokensToHast(tokens)

      node.children = tree
    })
  }
}

function tokensToHast (lines) {
  const tree = []

  for (const line of lines) {
    if (line.length === 0) {
      tree.push(u('text', '\n'))
    } else {
      for (const token of line) {
        tree.push(
          u(
            'element',
            {
              tagName: 'span',
              properties: { style: 'color: ' + token.color }
            },
            [u('text', token.content)]
          )
        )
      }

      tree.push(u('text', '\n'))
    }
  }

  // Remove the last \n
  tree.pop()

  return tree
}

function addStyle (node, style) {
  const props = node.properties || {}
  const styles = props.style || []
  styles.push(style)
  props.style = styles
  node.properties = props
}

function codeLanguage (node) {
  const className = node.properties.className || []
  let value

  for (const element of className) {
    value = element

    if (value.slice(0, 9) === 'language-') {
      return value.slice(9)
    }
  }

  return null
}
