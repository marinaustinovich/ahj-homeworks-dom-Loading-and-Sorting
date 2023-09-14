function sortAuthomatic(type, to) {
  const thead = document.querySelector('thead');
  const thSort = thead.querySelector(`[${type}]`);
  const tbody = document.querySelector('tbody');
  const rowsArray = Array.from(tbody.rows);

  if (thead.querySelector('.sorted')) {
    thead.querySelector('.sorted').classList.remove('sorted');
  }

  thSort.classList.add('sorted');

  const orderMultiplier = to === 'max' ? 1 : -1;

  const comparators = {
    'data-id': (a, b) => Number(a.getAttribute(type)) - Number(b.getAttribute(type)),
    'data-title': (a, b) => a.getAttribute(type).localeCompare(b.getAttribute(type)),
    'data-year': (a, b) => Number(a.getAttribute(type)) - Number(b.getAttribute(type)),
    'data-imdb': (a, b) => Number(a.getAttribute(type)) - Number(b.getAttribute(type)),
  };

  const compare = (a, b) => orderMultiplier * comparators[type](a, b);
  thSort.setAttribute('data-to', to);

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
      sortAuthomatic(dataAttributes[i], 'min');
      i += 1;
    }, 2000);
  }, 4000);
  setTimeout(() => clearInterval(timerId), 100000);
}
