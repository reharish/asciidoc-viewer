document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');
  const asciidoctor = Asciidoctor();

  const renderPreview = () => {
    try {
      const adoc = editor.value;
      const html = asciidoctor.convert(adoc);
      preview.innerHTML = html;
    } catch (error) {
      preview.innerHTML = `<pre style="color: red;">Error: ${error.message}</pre>`;
    }
  };

  editor.addEventListener('input', renderPreview);

  // Initialize with sample content
  editor.value = `= Sample Document
Author Name
:toc:

== Introduction

This is a simple AsciiDoc example.

* Bullet 1
* Bullet 2

[source,js]
----
console.log("Hello, AsciiDoc!");
----`;

  renderPreview();
});
