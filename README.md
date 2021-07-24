# rehype-shiki

[**rehype**][rehype] plugin to apply syntax highlighting on code blocks with [**shiki**][shiki]. This plugin was based upon [**rehype-highlight**][rehype-highlight].

## Install

With [npm](https://npmjs.org) do:

```
npm install vweevers/rehype-shiki
```

_This is a temporary fork of [`rsclarke/rehype-shiki`](https://github.com/rsclarke/rehype-shiki) with updated dependencies._

## Usage

Say `example.html` looks as follows:

```html
<h1>Hello World!</h1>

<pre><code class="language-js">var name = "World";
console.warn("Hello, " + name + "!")</code></pre>
```

...and `example.js` like this:

```js
import { toVFile } from 'to-vfile'
import rehype from 'rehype'
import shiki from 'rehype-shiki'

rehype()
  .data('settings', { fragment: true })
  .use(shiki)
  .process(toVFile.readSync('example.html'), function (err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
example.html: no issues found
<h1>Hello World!</h1>

<pre style="background: #2e3440"><code class="language-js"><span style="color: #81A1C1">var</span><span style="color: #D8DEE9FF"> </span><span style="color: #D8DEE9">name</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">=</span><span style="color: #D8DEE9FF"> </span><span style="color: #ECEFF4">"</span><span style="color: #A3BE8C">World</span><span style="color: #ECEFF4">"</span><span style="color: #81A1C1">;</span>
<span style="color: #8FBCBB">console</span><span style="color: #ECEFF4">.</span><span style="color: #88C0D0">warn</span><span style="color: #D8DEE9FF">(</span><span style="color: #ECEFF4">"</span><span style="color: #A3BE8C">Hello, </span><span style="color: #ECEFF4">"</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">+</span><span style="color: #D8DEE9FF"> </span><span style="color: #D8DEE9">name</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">+</span><span style="color: #D8DEE9FF"> </span><span style="color: #ECEFF4">"</span><span style="color: #A3BE8C">!</span><span style="color: #ECEFF4">"</span><span style="color: #D8DEE9FF">)</span>
</code></pre>

```

## API

### `rehype().use(shiki[, options])`

Apply syntax highlighting to `pre > code` using [**shiki**][shiki]; which tokenises the code block and new [**hast**][hast] nodes are subsequently created from (using this plugin).

Configure the language by using the `language-foo` class on the `code` element.  For example;

```html
<pre><code class="language-js">console.log("Hello world!")</code></pre>
```

This is in respect to the [mdast-util-to-hast code handler](https://github.com/syntax-tree/mdast-util-to-hast/blob/master/lib/handlers/code.js).

[Shiki][shiki] does not perform language detection, if unknown, this plugin falls back to the theme's background and text colour (chosen as `settings.foreground` from the theme file).

#### `options`

##### `options.theme`

`string`, default: `'nord'` - Name of shiki theme to use, otherwise path to theme file for it to load.

##### `options.useBackground`

`boolean`, default: `true` - Whether to apply the background theme colour to the `pre` element.

## License

[MIT][license] © [@rsclarke][rsclarke]

<!-- Definitions -->

[rehype]: https://github.com/rehypejs/rehype
[shiki]: https://github.com/octref/shiki
[rehype-highlight]: https://github.com/rehypejs/rehype-highlight
[hast]: https://github.com/syntax-tree/hast
[license]: LICENSE
[rsclarke]: https://rsclarke.dev
