const library = (() => {
  const collection = document.getElementById('collection');
  const url = ['../rich.pdf', '../fuck.pdf'];

  function renderPreview(bookList) {
    bookList.forEach((book) => {
      // create the Html

      // Create mainDiv
      const mainDiv = document.createElement('div');
      mainDiv.className = 'col-md-3 book-preview-card';
      mainDiv.setAttribute('file-path', book);
      // create cardDiv
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card custom-card shadow rounded-5';

      // create cardBody div

      const cardBodyDiv = document.createElement('div');
      cardBodyDiv.className = 'card-body p-4';

      // create cardCanvas
      const cardCanvas = document.createElement('canvas');

      cardCanvas.className = 'card-img';
      cardCanvas.id = book;

      // create cardTitle

      const cardTitle = document.createElement('h3');

      cardTitle.className = 'card-title';

      // Append HTML

      collection.appendChild(mainDiv);
      mainDiv.appendChild(cardDiv);
      cardDiv.appendChild(cardBodyDiv);
      cardBodyDiv.appendChild(cardCanvas);
      cardCanvas.appendChild(cardTitle);

      const canvas = document.getElementById(book);
      const global = new Global(canvas);
      global.getDoc(book, true);
    });
  }

  renderPreview(url);
})();
