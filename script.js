'use strict';

const gamesTab = document.querySelector('.links-tab-1');
const programsTab = document.querySelector('.links-tab-2');
const storiesTab = document.querySelector('.links-tab-3');

const gamesTabContent = document.querySelector('.content1');
const programsTabContent = document.querySelector('.content2');
const storiesTabContent = document.querySelector('.content3');

const iconHome = document.querySelector('.ion-ios-home');

gamesTab.addEventListener('click', function () {
  gamesTab.classList.remove('links-tab-active');
  programsTab.classList.remove('links-tab-active');
  storiesTab.classList.remove('links-tab-active');

  gamesTab.classList.add('links-tab-active');

  programsTabContent.classList.add('hidden');
  storiesTabContent.classList.add('hidden');
  gamesTabContent.classList.remove('hidden');

  iconHome.classList.remove('hidden-i');
});

programsTab.addEventListener('click', function () {
  gamesTab.classList.remove('links-tab-active');
  programsTab.classList.remove('links-tab-active');
  storiesTab.classList.remove('links-tab-active');

  programsTab.classList.add('links-tab-active');

  gamesTabContent.classList.add('hidden');
  storiesTabContent.classList.add('hidden');
  programsTabContent.classList.remove('hidden');

  iconHome.classList.remove('hidden-i');
});

storiesTab.addEventListener('click', function () {
  gamesTab.classList.remove('links-tab-active');
  programsTab.classList.remove('links-tab-active');

  storiesTab.classList.add('links-tab-active');

  gamesTabContent.classList.add('hidden');
  programsTabContent.classList.add('hidden');
  storiesTabContent.classList.remove('hidden');

  iconHome.classList.remove('hidden-i');
});

iconHome.addEventListener('click', function () {
  gamesTab.classList.remove('links-tab-active');
  programsTab.classList.remove('links-tab-active');

  gamesTabContent.classList.add('hidden');
  programsTabContent.classList.add('hidden');

  iconHome.classList.add('hidden-i');
});
