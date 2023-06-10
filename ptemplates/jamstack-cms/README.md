This is a Modulo.js website created with `create-modulo`

Visit <https://modulojs.org> for documentation on Modulo.js

This template has Netlify's Decap CMS ready to go. This allows you and your
teammates to commit changes with a rich text editor, without coding or git
knowledge. More info: <https://decapcms.org/>


# Usage

## Relevant files to edit

- You will mostly work in the `src/` directory

- Edit the Markdown files in `src/articles/` to add article or blog-style
  content (these can also be edited via CMS, see below)

- Edit the files in `src/static/` to work on the CSS, JS, and HTML Templates
  that create Modulo Components (including the "x-Page" layout template)


## Using local dev server

Use the following commands:

- `npm start`
    - Will start a "dev server" at <https://127.0.0.1:3334/>
- `npm run build`
    - Will do a static site build, and output to `build` bundling your
      JavaScript and CSS
    - Note: Until a Modulo DOM implementation is complete, in order to run the
      SSG build you may have to install the `puppeteer` dependency:
        - `npm install puppeteer`
- `npm run startcms`
    - Runs backend for GUI Decap CMS: <https://127.0.0.1:3334/cms/static/admin/>
    - This is intended for local content editing or debugging (NOT a live site)
    - Note: Run this at the same time as `npm start` (e.g. in another terminal)


# Publishing checklist

* [ ] To publish, make sure your web-server is serving the `build` directory.
  If you are publishing with GitHub pages, then it cannot be changed to `docs`
  by default, meaning you will need to change the `modulo.json` file to have
  `"output": "build"` instead of `"output": "docs"`

* [ ] To enable the CMS on the remote server, you will need to reconfigure
  Decap CMS to work with whatever authentication system you want to use. The
  Decap CMS is originally by the Netlify web-hosting service, which recommends
  use of GitHub (among others) as an authenticator. Read more on configuring
  this: <https://decapcms.org/docs/github-backend/>

* [ ] **Replace this README with one specific to your project!**

