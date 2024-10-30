export default function (config) {
  const { title, content, basePath } = config;
  return /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="${basePath}/styles.css" />
    <title>801 Labs: ${title}</title>
  </head>
  <body>
    <header>
      <div id="site-logo"><a href="${basePath}/">Home</a></div>
      <label id="nav-menu-toggle" for="nav-collapse-button">
        <input type="checkbox" id="nav-collapse-button" />
        <div id="nav-menu-icon"></div>
      </label>
      <nav id="nav-bar">
        <ul id="nav-bar-items">
          <li><a href="${basePath}/about/">About</a></li>
          <li><a href="${basePath}/learn/">Learn</a></li>
          <li><a href="${basePath}/get-involved/">Get Involved</a></li>
          <li><a href="${basePath}/nonprofit/">Nonprofit</a></li>
          <li><a href="${basePath}/contact/">Contact Us</a></li>
          <li><a href="${basePath}/donate/" class="nav-donate">Donate ></a></li>
        </ul>
      </nav>
    </header>
    <div class="container">
      ${content}
    </div>
    <footer>
      <div id="footer-content">
        <div id="footer-nav-box socials">
          <h3>Social media links</h3>
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
            <h3><a class="footer-category-link" href="">ABOUT</a></h3>
            <ul>
              <li><a class="footer-subcategory-link" href="">Financial Information</a></li>
              <li><a class="footer-subcategory-link" href="">News</a></li>
            </ul>
          </div>
          <div class="footer-content-block"><a class="footer-category-link" href="">LEARN</a></div>
          <div class="footer-content-block">
            <h3><a class="footer-category-link" href="">GET INVOLVED</a></h3>
            <ul>
              <li><a class="footer-subcategory-link" href="">Event</a></li>
              <li><a class="footer-subcategory-link" href="">Location and Hours</a></li>
              <li><a class="footer-subcategory-link" href="">Hackercamp</a></li>
            </ul>
          </div>
          <div class="footer-content-block"><h3><a class="footer-category-link" href="">NONPROFIT</a></h3></div>
          <div class="footer-content-block"><h3><a class="footer-category-link" href="">CONTACT US</a></h3></div>
        </div>
        <div id="footer-copywrite-block">
          <p class="footer-copy-text">Â© 2024 801Labs.org. All rights reserved.</p>
          <p class="footer-copy-text"><a href="" id="footer-donate-link">Donate ></a></p>
          <p class="footer-copy-text">
            801 Labs hackerspace is a 501(c)(3) that is open to the public! <br />
            353 East 200 South Suite #201, Salt Lake City, UT 84111
          </p>
          <p class="footer-copy-text">
            <a class="footer-link" href="">Code of Conduct</a> | <a class="footer-link" href="">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  </body>
</html>
`.trim();
}
