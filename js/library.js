const library = (() => {
  const canvas = document.getElementById('book-preview');
  const global = new Global('preview', canvas, (scale = 1));

  const url = './../story.pdf';
  global.getDoc(url);
})();
