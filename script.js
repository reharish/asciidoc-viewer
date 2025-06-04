document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');
  const asciidoctor = Asciidoctor();

  const renderPreview = () => {
    try {
      const adoc = editor.value;
      const html = asciidoctor.convert(adoc, {
        attributes: { 'source-highlighter': 'highlight.js' }
      });

      // Extract the title and author from the AsciiDoc input
      const lines = adoc.split('\n');
      const title = lines[0].startsWith('= ') ? lines[0].substring(2) : 'Untitled';
      const author = (lines[1] && lines[1].length && !lines[1].startsWith("==") && !lines[1].startsWith(":")) ? lines[1]: '';

      // Create title and author elements
      const titleElement = `<h1>${title}</h1>`;
      const authorElement = `<i>${author}</i>`;

      // Combine title, author, and generated HTML
      preview.innerHTML = titleElement + authorElement +'<hr>'+ html;

      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    } catch (error) {
      preview.innerHTML = `<pre style="color: red;">Error: ${error.message}</pre>`;
    }
  };

  editor.addEventListener('input', renderPreview);

  // Initialize with sample content
  editor.value = `= Sample Document
@reharish

== Bullets

  * BULLET-1
  * BULLET-2

== Image

image::https://avatars.githubusercontent.com/u/58879939?v=4[align="center",width="50%"]

== Table

[options="header",width="50%",align="left"]
|====
| HEADING 1 | HEADING 2
| ROW 1	    | ROW 1
| ROW 2	    | ROW 2
|====


== Source Highlight

[source,c]
------
import os
import random

random.randint(1, 100)
------

`;

  renderPreview();
});
