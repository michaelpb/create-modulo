This is a Modulo.js website created with `create-modulo`

Visit <https://modulojs.org> for documentation on Modulo.js

-----------

- Edit the HTML files here to add your own content

- Edit the Markdown files in `articles/` to add article or blog-style content

- Edit the files in `static/` to work on the CSS, JS, and HTML Templates that
  create Modulo Components (including the "x-Page" layout template)


-----------

Use the following commands:

- `npm start`
    - Will start a "dev server" at https://127.0.0.1:3334/
- `npm run build`
    - Will do a static site build, and output to `build`, automatically
      bundling your JavaScript and CSS
    - Note: Until a Modulo DOM implementation is complete, in order to run the
      automated SSG build you will have to install the `puppeteer` dependency:
        - `npm install puppeteer`

-----------

Publishing checklist:

* [ ] To publish, make sure your web-server is serving the `build` directory.
  If you are publishing with GitHub Pages, then it cannot be changed to `docs`
  by default, meaning you will need to change the `modulo.json` file to have
  `"output": "docs"` instead of `"output": "build"`

* [ ] **Replace this README with one specific to your project!**
