export default function (config) {
  const { title, content, basePath } = config;
  return /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="${basePath}/styles.css" />
    <title>801 Labs: ${title}</title>
  </head>
  <body>
    <header>
      <div id="header-content">
        <div id="site-logo"><a href="${basePath}/">Home</a></div>
        <label id="nav-menu-toggle" for="nav-collapse-button">
          <input type="checkbox" id="nav-collapse-button" />
          <span id="nav-menu-icon"></span>
        </label>
        <nav id="nav-bar">
          <ul id="nav-bar-items">
            <li><a href="${basePath}/about/">About</a></li>
            <li><a href="${basePath}/blog/">Blog</a></li>
            <li><a href="${basePath}/get-involved/">Get Involved</a></li>
            <li><a href="${basePath}/contact/">Contact Us</a></li>
            <li><a href="${basePath}/donate/" class="nav-donate">Donate &gt;</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="container">
      ${content}
    </div>
    <footer>
      <div id="footer-content">
        <div id="footer-nav-box socials">
          <h3 class="special-alt-text">Social media links</h3>
          <ul id="svg-link-list">
            <li><a class="svg-footer-link" id="svg-discord" href="https://discord.gg/uRSthurdPY">discord</a></li>
            <li><a class="svg-footer-link" id="svg-twitter" href="https://twitter.com/801labs">twitter</a></li>
            <li><a class="svg-footer-link" id="svg-meetup" href="https://www.meetup.com/801labs/">meetup</a></li>
            <li><a class="svg-footer-link" id="svg-youtube" href="https://www.youtube.com/c/801LabsSaltLakeCity">youtube</a></li>
            <li><a class="svg-footer-link" id="svg-github" href="https://github.com/801labs/">github</a></li>
          </ul>
        </div>
        <div id="footer-nav-box">
          <div class="footer-content-block">
            <h3><a class="footer-category-link" href="">ABOUT</a>
            </h3><span>|</span>
            <h3><a class="footer-category-link" href="">BLOG</a>
            </h3><span>|</span>
            <h3><a class="footer-category-link" href="">GET INVOLVED</a>
            </h3><span>|</span>
            <h3><a class="footer-category-link" href="">CONTACT US</a></h3>
          </div>
          <div class="footer-divider"></div>
        <div id="footer-copy-block">
          <p class="footer-copy-text">© 2024 801Labs.org. All rights reserved.</p>
          <p class="footer-copy-text">
            801 Labs hackerspace is a 501(c)(3) that is open to the public!
          </p>
          <p class="footer-copy-text">
            353 East 200 South Suite #201, Salt Lake City, UT 84111
          </p>
          <p class="footer-copy-text bottom-links">
            <a class="footer-link" href="#">Code of Conduct</a><span>|</span><a class="footer-link" href="#">Terms</a><span>|</span><a class="footer-link" href="#">Donate ></a>
          </p>
        </div>
      </div>
    </footer>
  </body>
</html>
`.trim();
}
