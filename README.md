# under-a-rock.org

Static retro-style website scaffold for a climbing project focused on shirts, zines, holds, blogs, and photo pages.

## Local development

Run a local server:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Main pages

- `index.html` home + site map + retro button strip
- `zines.html` zine products with order links
- `shirts.html` shirt products with order links
- `funnies.html` comic/joke section
- `blogs.html` blog index + template links
- `rocks.html` hold products + photo page links
- `buddies.html` community links

## Merch order workflow

- `order.html` contains a form that creates a prefilled email draft to `orders@under-a-rock.org`.
- Product links on zine/shirt/rock pages pass an item code into the form automatically.

## Content templates

- `blog-template.html` copy this to create new posts
- `photo-template.html` copy this to create new photo pages
- `blog-bishop-weekend-001.html` sample blog post
- `photo-granite-session-001.html` sample photo page

## Assets

- `assets/button-underarock.svg`
- `assets/button-beta.svg`
- `assets/button-holds.svg`
- `assets/divider-zigzag.svg`

Add future photo files under `assets/photos/` and reference them from photo pages.
