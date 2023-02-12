const pdfViewer = (() => {
  const url = './../story.pdf';
  const canvas = document.getElementById('pdf-render'),
    topBar = document.getElementById('top-bar'),
    ctx = canvas.getContext('2d');

  const global = new Global('viewer', canvas);

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
    if (global.pageNum >= global.pdfDoc.numPages) {
      return;
    }
    global.pageNum++;
    qPageRendering(global.pageNum);
  };

  // Getting the document
  global.getDoc(url);

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

console.log(Global.globalObjects.viewer);
