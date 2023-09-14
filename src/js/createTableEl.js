import data from './data.json';

function generateHeader() {
  const tr = document.createElement('tr');

  ['id', 'title', 'year', 'imdb'].forEach((text) => {
    const th = document.createElement('th');
    th.setAttribute(`data-${text}`, text);
    th.textContent = text;
    tr.appendChild(th);
  });

  return tr;
}

function generateRow({
  id, title, year, imdb,
}) {
  const tr = document.createElement('tr');
  const formattedImdb = imdb.toFixed(2);

  tr.setAttribute('data-id', id);
  tr.setAttribute('data-title', title);
  tr.setAttribute('data-year', year);
  tr.setAttribute('data-imdb', formattedImdb);

  const contents = [id, title, year, `imdb: ${formattedImdb}`];
  contents.forEach((content) => {
    const td = document.createElement('td');
    td.textContent = content;
    tr.appendChild(td);
  });

  return tr;
}

export default function createTableEl() {
  const { films } = data;
  const container = document.querySelector('#films-container');

  if (!(container instanceof HTMLElement)) {
    throw new Error('container is not HTMLElement');
  }

  const tableContainer = document.createElement('div');
  tableContainer.classList.add('table-container');

  const table = document.createElement('table');
  table.setAttribute('data-id', 'table');
  table.classList.add('table_sort');

  const theadEl = document.createElement('thead');
  theadEl.setAttribute('data-id', 'thead');
  theadEl.appendChild(generateHeader());
  theadEl.classList.add('table-tile');

  const tbodyEl = document.createElement('tbody');
  tbodyEl.setAttribute('data-id', 'tbody');
  films.forEach((film) => {
    tbodyEl.appendChild(generateRow(film));
  });

  table.appendChild(theadEl);
  table.appendChild(tbodyEl);
  tableContainer.appendChild(table);
  container.appendChild(tableContainer);
}
