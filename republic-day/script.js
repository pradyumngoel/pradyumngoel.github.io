let sourceNum = 2;

document.querySelector('.btn').addEventListener('click', function (e) {
  document.querySelector('.audio-place').insertAdjacentHTML(
    'afterbegin',
    `<audio controls autoplay>
        <source src="img/jan.mp3" type="audio/mpeg" id="jan-gan-man" />
        Your browser does not support the audio element.
    </audio>`
  );

  e.target.classList.remove('flashing');

  const timeout = setInterval(() => {
    setTimeout(() => {
      document.querySelector('.pole').src = `img/costume${sourceNum}.svg`;

      if (sourceNum === 16) {
        document.querySelector('.me-salute').style.display = 'block';

        setTimeout(() => {
          document.querySelector('.me-salute').src = 'img/Me-salute-2.png';
        }, 800);

        clearInterval(timeout);
      }

      sourceNum++;
    }, 10);
  }, 100);

  document.querySelector('.button').style.display = 'none';
});
