import jsdom from "jsdom";

export default defineEventHandler(async (event) => {
  const width = 648;
  const height = 403;
  let htmlContent: string = makeItXmlCompliant(await $fetch("/spotify"));

  const doc = new jsdom.JSDOM(htmlContent, { contentType: "text/xml" });

  let content = doc.window.document.getElementById("top-tracks").outerHTML;

  event.node.res.setHeader("Content-type", "image/svg+xml");

  return `
  <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="${width}" 
      height="${height}" 
      aria-labelledby="cardTitle" 
      role="img"
  >
      <title id="cardTitle">My last month's top tracks on Spotify</title>
      <foreignObject width="${width}" height="${height}">
          <style>
              ${getStyle()}
          </style>
          <div xmlns="http://www.w3.org/1999/xhtml">
              ${content}
          </div>
      </foreignObject>
  </svg>
  `;
});

function makeItXmlCompliant(content: string) {
  return content
    .replace(/(?:\r\n|\r|\n)/g, "")
    .replaceAll(/<head>.*<\/head>/gm, () => {
      return "";
    })
    .replaceAll(/<script>.*<\/script>/gm, () => {
      return "";
    })
    .replaceAll(/<img(.*?) .*?>/gm, (match: string) => {
      return match.substring(0, match.length - 1) + `/>`;
    });
}

function getStyle() {
  return `
    .title {
        color: #1db954;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tracks-container {
        background-color: #000;
        width: fit-content;
        padding: 15px;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .br {
        display: block;
    }
      
    .number-col {
        min-width: 35px;
        white-space: nowrap;
    }

    .v-center {
        align-self: center;
    }

    .container {
        max-width: 800px;
        background-color: #000;
        color: #b3b3b3;
        font-family: sans-serif;
    }

    .row {
        display: flex;
        flex-flow: row nowrap;
    }

    .row>* {
        padding: 5px;
    }

    .row .small {
        flex: 0 1;
    }

    .row .big {
        flex: 1 1;
    }

    .songTitle {
        color: #fff;
    }

    .songTitle em {
        color: #b3b3b3;
        font-size: 0.8em;
    }
    `;
}
