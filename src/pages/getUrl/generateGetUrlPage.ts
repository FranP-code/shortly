export default function (metaData: any) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${metaData.title}</title>
        <meta name="description" content="${metaData.description}">
        <meta property="og:image" content="${metaData.image}">
        <meta property="og:url" content="${metaData.url}">
    </head>
    <body>
        <script>
            window.location.href = "${metaData.url}";
        </script>
    </body>
    </html>
    `
}
