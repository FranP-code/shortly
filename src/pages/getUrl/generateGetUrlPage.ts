export default function (metaData: any, url: string) {
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
            window.location.href = "${url}";
        </script>
    </body>
    </html>
    `
}
