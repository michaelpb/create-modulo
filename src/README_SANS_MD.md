This is a Modulo.js website created with `create-modulo`

Visit <https://modulojs.org> for documentation on Modulo.js


# Usage

## Relevant files to edit

- You will mostly work in the `src/` directory

- Edit the files in `src/static/` to work on the CSS, JS, and HTML Templates
  that create Modulo Components (including the "x-Page" layout template)

- Edit the files in `src/static/data/links/` to change the page navigation list


## Using local server

Use the following commands:

- `npm start`
    - Starts a simple HTTP server for testing: <http://127.0.0.1:3334/>
- `npm run build`
    - Generates static site build locally in `build/` directory
    - Useful for testing server-side rendering
    - Note: This requires dependencies. It runs `npm install modulocli` first.


# Publishing checklist

Launch your site on any web server that can host static sites, ideally one that
can run a "build step" before serving for "server-side rendering".

* [ ] To publish, make sure your web-host is configured to run `npm run build`
  when code is updated, and serve the `build` directory. Some might work with
  minimal configuration, otherwise you may have to manually build locally.

* [ ] **Replace this README with one specific to your project!**

