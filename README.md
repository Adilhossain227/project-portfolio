# Adil Hossain | Engineering Portfolio

A minimal, responsive, dark themed engineering portfolio built with plain HTML, CSS and JavaScript. It is designed to run on GitHub Pages without a build step or framework.

## Files

- `index.html` is the public portfolio.
- `admin.html` is the project manager.
- `projects.json` contains the project data displayed on the public site.
- `styles.css` and `portfolio.js` control the public site.
- `admin.css` and `admin.js` control the project manager.
- `assets/` is where you can place project images.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `adil-portfolio`.
2. Upload all files and folders in this package to the repository root.
3. Open the repository settings, then Pages.
4. Select deploy from a branch, choose `main` and the `/ (root)` folder, then save.
5. GitHub will provide the public website URL after deployment.

## Add or update projects

1. Open `admin.html` on your published website.
2. Fill in the project title, description and technology stack. Add an image URL or a path to an image in the repository. A source link is optional.
3. Click Add Project. Use Edit or Delete to manage existing entries.
4. Click Export JSON. This downloads an updated `projects.json` file.
5. Replace the existing `projects.json` in your GitHub repository with the downloaded file and commit the change.
6. Refresh the public website after GitHub Pages deploys the update.

The editor also keeps a draft in the current browser using local storage. That draft is not shared between browsers or devices. Export and commit the JSON file to publish changes.

## Image tips

For best results, create an `assets` folder and upload project images there. Use paths such as `assets/underwater-robot.jpg` in the image field. Images should ideally be landscape, around 1600 by 1000 pixels, and compressed to keep the page fast.

## Notes

The project manager is a convenience editor, not an authentication system. It does not write directly to GitHub. The public portfolio reads only `projects.json`, so no credentials or database are required.
