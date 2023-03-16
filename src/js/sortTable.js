function sortAuthomatic(type, to) {
  const thead = document.querySelector('thead');
  const thSort = thead.querySelector(`[${type}]`);
  const tbody = document.querySelector('tbody');
  const rowsArray = Array.from(tbody.rows);

  if (thead.querySelector('.sorted')) {
    thead.querySelector('.sorted').classList.remove('sorted');
  }

  thSort.classList.add('sorted');

  // compare(a, b) сравнивает две строки, нужен для сортировки
  let compare;

  if (to === 'max') {
    switch (type) {
      case 'data-id':
      case 'data-year':
      case 'data-imdb':
        compare = function (a, b) {
          return Number(a.getAttribute(type)) - Number(b.getAttribute(type));
        };
        break;
      case 'data-title':
        compare = function (a, b) {
          return a.getAttribute(type) > b.getAttribute(type) ? 1 : -1;
        };
        break;
      default: break;
    }

    thSort.setAttribute('data-to', 'max');
  } else {
    switch (type) {
      case 'data-id':
      case 'data-year':
      case 'data-imdb':
        compare = function (a, b) {
          return Number(b.getAttribute(type)) - Number(a.getAttribute(type));
        };
        break;
      case 'data-title':
        compare = function (a, b) {
          return a.getAttribute(type) > b.getAttribute(type) ? -1 : 1;
        };
        break;
      default: break;
    }
    thSort.setAttribute('data-to', 'min');
  }

  // сортировка
  rowsArray.sort(compare);
  tbody.append(...rowsArray);
}

export default function sortTable() {
  const dataAttributes = ['data-id', 'data-title', 'data-year', 'data-imdb'];
  let i = 0;

  const timerId = setInterval(() => {
    if (i >= dataAttributes.length) {
      i = 0;
    }

    sortAuthomatic(dataAttributes[i], 'max');

    setTimeout(() => {
      sortAuthomatic(dataAttributes[i]);
      i += 1;
    }, 2000);
  }, 4000);
  setTimeout(() => clearInterval(timerId), 100000);
}
