const pdfViewer = (() => {
  const modalPlaceholder = document.getElementById("modal-place-holder");

  const bookPreviewCard = document.querySelectorAll(".book-preview-card");
  bookPreviewCard.forEach((targetedBook) => {
    targetedBook.addEventListener("click", (e) => {
      const filePath = targetedBook.getAttribute("file-path");
      let randomId = "";

      for (let i = 0; i < filePath.length; i++) {
        let c = filePath[i];
        if (c !== "." && c !== "/") {
          randomId += c;
        }
      }
      modalPlaceholder.innerHTML = "";
      const bgColors = [
        "bg-primary",
        "bg-info",
        "bg-secondary",
        "bg-danger",
        "bg-success",
        "bg-warning",
      ];
      var randBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

      const modal = `

<!-- Modal -->
<div class="modal fade ${randBgColor}" id=${randomId} tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
          <div class="modal-body text-center" id="pdf-render-page">
          <canvas id='pdf-render'></canvas>
          </div>
      <div id='play-status' role='button' class=" m-4 text-dark text-center">
      <i class="fa-solid fa-play fa-2x "></i>
      </div>
    </div>
  </div>
</div>
      `;

      e.target.setAttribute("data-bs-toggle", "modal");
      e.target.setAttribute("data-bs-target", `#${randomId}`);
      modalPlaceholder.innerHTML = modal;

      const canvas = document.querySelector("#pdf-render");

      const global = new Global(canvas, 1, 1.5);
      // Getting the document
      global.getDoc(filePath);

      // create tts

      let tts = new TTS(global.pdfText);
      setInterval(() => {
        if (tts.isEnded) {
          tts = new TTS(global.pdfText);
          tts.speak();
          if (!global.pdfText) {
            showNextPage();
          }
          global.pdfText = "";
        }
      }, 1000);

      let checkIfPlaying = true;
      const playStatus = document.querySelector("#play-status");

      playStatus.innerHTML = `
    <i id='pause' class="fa-solid fa-pause fa-2x"></i>
          `;
      checkIfPlaying = false;
      playStatus.addEventListener("click", (e) => {
        if (checkIfPlaying) {
          playStatus.innerHTML = `
    <i id='pause' class="fa-solid fa-pause fa-2x"></i>
          `;
          checkIfPlaying = false;
          tts.resume();
        } else {
          playStatus.innerHTML = `

        <i id='play' class="fa-solid fa-play fa-2x "></i>
          `;
          checkIfPlaying = true;
          tts.pause();
        }
      });

      // Test

      // Check if  page is rendering

      function qPageRendering(num) {
        if (global.pageIsRendering) {
          global.pageNumIsPending = num;
        } else {
          global.pageNum = num;
          global.renderPage();
        }
      }

      // Show previous page

      function showPreviousPage() {
        if (global.pageNum <= 1) {
          return;
        }
        global.pageNum--;
        qPageRendering(global.pageNum);
      }

      // Show next page

      function showNextPage() {
        if (global.pageNum >= global.pdfDoc.numPages) {
          return;
        }
        global.pageNum++;
        qPageRendering(global.pageNum);
      }

      // Move pages

      document.addEventListener("keypress", (e) => {
        if (e.key.toLowerCase() === "p") {
          showPreviousPage();
        } else if (e.key.toLowerCase() === "n") {
          showNextPage();
        }
        e.preventDefault();
      });
      e.preventDefault();
    });
  });
})();

document.addEventListener("click", reloadPage);
document.addEventListener("keydown", reloadPage);

function reloadPage(e) {
  console.log(e.target.className);
  console.log("fuck");
  if (e.target.className.includes("modal fade") || e.keyCode === 27) {
    location.href = "index.html";
  }
  e.preventDefault();
}
