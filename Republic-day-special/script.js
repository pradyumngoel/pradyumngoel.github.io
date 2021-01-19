'use strict';

document.querySelector('button').addEventListener('click', function () {
  document.querySelector('.flag').classList.remove('hidden');

  document.querySelector('.rope').classList.add('hidden');
  document.querySelector('.salute').classList.remove('hidden');
});
