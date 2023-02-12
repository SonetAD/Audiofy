const library = (() => {
  const canvas = document.getElementById('book-preview');
  const global = new Global('preview', canvas);

  const url = './../story.pdf';
  global.getDoc(url);
})();

console.log(document.getElementById('dropdownMenueLink').value);
