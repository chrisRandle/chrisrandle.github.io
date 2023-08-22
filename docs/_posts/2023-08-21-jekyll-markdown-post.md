---
layout: post
---

Markdown is a text-to-HTML tool. Markdown allows you to write using an easy-to-read and easy-to-write plain text format, which can be easily converted to valid HTML.

### Post things in Jekyll using markdown

#### The setup

- Create the _posts directory in the root directory of the jekyll project.
- Create a top level html file
  - For this github pages project it's called notes.html
  - The html file will serve as a notes navigation source otherwise individual posts are difficult to find, as they are placed under a /YYYY/MM/DD directory.
  ```
    --- 
    layout: default
    title: Notes
    ---
    <h1 class="basic">Latest Notes</h1>

    <ul>
      {% for post in site.posts %}
      <li>
        <h2 class="basic"><a href="{{ post.url }}">{{ post.title }}</a></h2>
      </li>
      {% endfor %}
    </ul>
  ```
- Create a new layout in the _layouts directory
  - The layout post.html extends the default.html layout, using a font matter yaml header. This way the header, top navigation and social-media buttons are included on all posts.
  ```
    ---
    layout: default
    --- 
  
    <h1 class="basic">{{ page.title }}</h1>
    <p class="basic">{{ page.date | date_to_string }}</p>

    <div class="basic">
      {{ content }}
    </div>
  ```
  - This site uses the basic css class just to make the text white.
  - The page.date and page.title is extrapolated from the name of the post markdown file.
  - The content is the actual markdown from the post itself.
- Update the _data/navigation.yaml to include a new navigation item called Notes
  - Notes will be just a link to the top level notes.html file and serve as the gateway into the Notes page.
  ```
  - name: Notes
  link: /notes
  ```

#### Posting

- Create a post in the _posts directory
  - A post must follow a defined naming convention 'YYYY-MM-DD-title-with-dashes.md'
  - The post automaticaly appears in the Notes page, the title is converted to cammelcase and dashes in the title will be replaced with spaces.
- Utilize Markdown to create a note
  - A good website to see markdown syntax is [DaringFireball Markdown Syntax](https://daringfireball.net/projects/markdown/syntax)
