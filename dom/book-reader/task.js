const book = document.getElementById('book');
const sizeLinks = document.querySelectorAll('.book__control_font-size .font-size');

sizeLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    sizeLinks.forEach(l => l.classList.remove('font-size_active'));
    link.classList.add('font-size_active');
    book.classList.remove('book_fs-small', 'book_fs-big');
    const size = link.dataset.size;
    if (size === 'small') {
      book.classList.add('book_fs-small');
    } else if (size === 'big') {
      book.classList.add('book_fs-big');
    }
  });
});

function setActive(links, current) {
  links.forEach(l => l.classList.remove('color_active'));
  current.classList.add('color_active');
}

const textColorLinks = document.querySelectorAll('.book__control_color .color');

textColorLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    setActive(textColorLinks, link);
    book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');
    const color = link.dataset.textColor;
    if (color) {
      book.classList.add(`book_color-${color}`);
    }
  });
});

const bgColorLinks = document.querySelectorAll('.book__control_background .color');

bgColorLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    setActive(bgColorLinks, link);
    book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');
    const color = link.dataset.bgColor;
    if (color) {
      book.classList.add(`book_bg-${color}`);
    }
  });
});