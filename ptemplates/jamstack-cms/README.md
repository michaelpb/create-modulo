This is a Modulo.js website created with `create-modulo`

Visit <https://modulojs.org> for documentation on Modulo.js

# Usage

## Without CMS

- Edit the HTML files here to add your own content

- Edit the Markdown files in `articles/` to add article or blog-style content

- Edit the files in `static/` to work on the CSS, JS, and HTML Templates that
  create Modulo Components (including the "x-Page" layout template)


## Using local dev server

Use the following commands:

- `npm start`
    - Will start a "dev server" at https://127.0.0.1:3334/
- `npm run build`
    - Will do a static site build, and output to `build` bundling your
      JavaScript and CSS
    - Note: Until a Modulo DOM implementation is complete, in order to run the
      SSG build you may have to install the `puppeteer` dependency:
        - `npm install puppeteer`


## Using Decap CMS

This "JAMStack CMS" template has Netlify's Decap CMS ready to go! It will
require extra configuration if you want to be able to log in via GitHub and
allow your team-members to make changes without using a terminal or git. Read
more about Decap here:  <https://decapcms.org/>

1. By default, the Decap CMS is configured to use the "local backend" (makes
changes locally). For this to work, you will need to run the following command
in a new terminal:
    - `npx netlify-cms-proxy-server`
    - Note that you will have to keep this process running (e.g. terminal open)
      while you are using the CMS

2. The Decap CMS is available by navigating to `/static/cms/admin`
    - E.g. by default: <https://127.0.0.1:3334/static/cms/admin>
    - Note from here changes will be saved immediately, allowing you to edit
      `articles/` with a preview and rich-text enabled markdown editor, as well
      as upload and manage media files from a user-friendly web-based GUI
      interface

3. Once you are ready to allow teammates to edit content via the user-friendly
CMS, you will need to reconfigure Decap CMS to work with whatever
authentication system you want to use.
    - The Decap CMS is originally by the Netlify web-hosting service, which
      recommends use of GitHub (among others) as an authenticator. Read more on
      configuring this: <https://decapcms.org/docs/github-backend/>



# Publishing checklist

* [ ] To publish, make sure your web-server is serving the `build` directory.
  If you are publishing with GitHub pages, then it cannot be changed to `docs`
  by default, meaning you will need to change the `modulo.json` file to have
  `"output": "build"` instead of `"output": "docs"`

* [ ] **Replace this README with one specific to your project!**
