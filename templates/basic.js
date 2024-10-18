export default function (config) {
    const { title, content, basePath } = config;
    return /* html */`
<!DOCTYPE html>
<html lang="en">
<head>
    <title>801Labs.org: ${title}</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/styles.css" />
</head>
<body>
<header>
    <h2>801Labs.org!!!!!!</h2>
    <ul>
        <li><a href="${basePath}/">Home</a></li>
        <li><a href="${basePath}/contact/">Contact</a></li>
        <li><a href="${basePath}/donate/">Donate</a></li>
    </ul>
</header>
${content}
</body>
</html>
`.trim();
};
