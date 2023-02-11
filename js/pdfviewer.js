const url = './../story.pdf';
let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null,
  scale = 1.5,
  pdfText = [];
const canvas = document.getElementById('pdf-render'),
  topBar = document.getElementById('top-bar'),
  ctx = canvas.getContext('2d');
const renderPage = (num) => {
  pageIsRendering = true;
  topBar.innerHTML = `<h1>Page ${num} of ${pdfDoc.numPages}</h1>`;
  //   Get the page

  pdfDoc.getPage(num).then((page) => {
    //  extracting text from pdf

    page.getTextContent().then((data) => {
      data.items.forEach((txtObj) => pdfText.push(txtObj.str));
    });
    // scale
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport,
    };

    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;
      if (pageNumIsPending != null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });
  });
};

// Check if  page is rendering

const qPageRendering = (num) => {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
};

// Show previous page

const showPreviousPage = () => {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  qPageRendering(pageNum);
};

// Show next page

const showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  qPageRendering(pageNum);
};

// Getting the document
pdfjsLib.getDocument(url).promise.then((doc) => {
  pdfDoc = doc;
  renderPage(pageNum);
});

// Move pages

document.addEventListener('keypress', (e) => {
  if (e.key.toLowerCase() === 'p') {
    showPreviousPage();
  } else if (e.key.toLowerCase() === 'n') {
    showNextPage();
  }
  e.preventDefault();
});
