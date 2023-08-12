This is a Modulo.js website created with `create-modulo`

Visit <https://modulojs.org> for documentation on Modulo.js

-----------

Use the following commands:

- `npm start`
    - Will start a "dev server" at https://127.0.0.1:3334/
- `npm run build`
    - Will do a static site build, and output to `www`, automatically bundling
      your JavaScript and CSS
    - Note: Until a Modulo DOM implementation is complete, in order to run the
      automated SSG build you will have to install the `puppeteer` dependency:
        - `npm install puppeteer`
- `npm run help`
    - Show all commands available for modulocli (some of these being still
      experimental and undocumented)

-----------

Publishing checklist:

* [ ] To publish, make sure your web-server is serving the `www` directory.  If
  you are publishing with GitHub pages, then it cannot be changed to `www` by
  default, meaning you will need to change the `modulo.json` file to have
  `"output": "docs"` instead of `"output": "www"`

* [ ] **Replace this README with one specific to your project!**
