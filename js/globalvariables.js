class Global {
  constructor(canvas, pageNum = 1, scale = 1) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.pageNum = pageNum;
    this.scale = scale;
    this.pdfDoc = null;
    this.pageIsRendering = false;
    this.pdfText = "";
    this.pageNumIsPending = null;
    this.shortPreview = false;
  }

  getDoc(filePath, shortPreview) {
    this.shortPreview = shortPreview;
    pdfjsLib.getDocument(filePath).promise.then((doc) => {
      this.pdfDoc = doc;
      this.renderPage();
    });
  }

  renderPage() {
    this.pageIsRendering = true;
    // if (!this.shortPreview) {
    //   this.modalTitle.innerText = `Page ${this.pageNum} of ${this.pdfDoc.numPages}`;
    // }
    //   Get the page
    this.pdfDoc.getPage(this.pageNum).then((page) => {
      //  extracting text from pdf

      page.getTextContent().then((data) => {
        this.pdfText = "";
        data.items.forEach((txtObj) => (this.pdfText += txtObj.str));
      });
      // scale
      const viewport = page.getViewport({ scale: this.scale });
      this.canvas.height = viewport.height;
      this.canvas.width = viewport.width;

      const renderCtx = {
        canvasContext: this.ctx,
        viewport,
      };

      page.render(renderCtx).promise.then(() => {
        this.pageIsRendering = false;
        if (this.pageNumIsPending != null) {
          this.renderPage(this.pageNumIsPending);
          this.pageNumIsPending = null;
        }
      });
    });
  }
}
