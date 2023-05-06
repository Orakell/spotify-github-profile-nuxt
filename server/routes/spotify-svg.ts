import jsdom from "jsdom";

export default defineEventHandler(async (event) => {
  const doc = new jsdom.JSDOM(await $fetch("/spotify"));

  let content = doc.window.document.getElementById("top-tracks").outerHTML;

  // todo: remove this later. dirty fix to avoid "tag mismatch" error with xml
  content = content.replace('alt="spotify logo">', 'alt="spotify logo"/>');

  event.node.res.setHeader("Content-type", "image/svg+xml");

  return `
  <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="510" 
      height="1185" 
      aria-labelledby="cardTitle" 
      role="img"
  >
      <title id="cardTitle">My last month's top tracks on Spotify</title>
      <foreignObject width="510" height="1185">
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
