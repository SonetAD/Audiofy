const pdfViewer = (() => {
  const filePath = './../story.pdf',
    modalBody = document.querySelector('.modal-body'),
    newCanvas = document.createElement('canvas');
  newCanvas.id = 'pdf-render';
  modalBody.appendChild(newCanvas);

  const canvas = document.querySelector('#pdf-render'),
    ctx = canvas.getContext('2d');

  const global = new Global('viewer', canvas, 1, 1.5);

  // Getting the document

  global.getDoc(filePath);

  // Check if  page is rendering

  const qPageRendering = (num) => {
    if (global.pageIsRendering) {
      global.pageNumIsPending = num;
    } else {
      global.pageNum = num;
      global.renderPage();
    }
  };

  // Show previous page

  const showPreviousPage = () => {
    if (global.pageNum <= 1) {
      return;
    }
    global.pageNum--;
    qPageRendering(global.pageNum);
  };

  // Show next page

  const showNextPage = () => {
    console.log(global.totalPage);
    if (global.pageNum >= global.pdfDoc.numPages) {
      return;
    }
    global.pageNum++;
    qPageRendering(global.pageNum);
  };

  // Move pages

  document.addEventListener('keypress', (e) => {
    if (e.key.toLowerCase() === 'p') {
      showPreviousPage();
    } else if (e.key.toLowerCase() === 'n') {
      showNextPage();
    }
    e.preventDefault();
  });
})();

// console.log(Global.globalObjects.viewer);
