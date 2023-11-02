

//count down 
const countDown = document.getElementById('count-down')

//data form
const formContainer = document.getElementById('datos')

//button
const btn = document.getElementById('startButton')

//nodes to show the data
const secondsContainer = document.getElementById('segundos')
const minutesContainer = document.getElementById('minutos')
const hoursContainer = document.getElementById('horas')
const habilidadContainer = document.getElementById('nombre-habilidad')
const moduloContainer = document.getElementById('nombre-modulo')
//finish phrases
const finishPhrase = document.querySelector('.finish')
const reloadBtn = document.querySelector('.reload-btn')
//elements inside countdown container

function animateConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
  
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
  
      const particleCount = 50 * (timeLeft / duration);
  
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }


function x(s, m, h) {
    //main base case
    if (s == -1 && m == 0 && h == 0) {
        finishPhrase.classList.remove('disabled')
        reloadBtn.classList.remove('disabled')
        animateConfetti()
        return;
    }

    //first case
    if (s == 0 && m == 0 && h > 0) {
        x(s, 60, h = h - 1)
        m > 9 ? minutesContainer.textContent = m : minutesContainer.textContent = `0${m}`;

        setTimeout(() => {
            h > 9 ? hoursContainer.textContent = h : hoursContainer.textContent = `0${h}`;
        }, 1000);
    }

    //second case
    if (s == 0 && m > 0 && h == 0) {
        x(59, m = m - 1, h)
        setTimeout(() => {
            m > 9 ? minutesContainer.textContent = m : minutesContainer.textContent = `0${m}`;
        }, 1000);

    } else if (s >= 0) {
        setTimeout(() => {
            s > 9 ? secondsContainer.textContent = s : secondsContainer.textContent = `0${s}`;

            x(s = s - 1, m, h)
        }, 1000);
    }
}

btn.onclick = () => {

    
    //Inputs captured
    const habilidad = document.getElementById('habilidad-input').value;
    const modulo = document.getElementById('modulo-input').value;
    const horas = document.getElementById('horas-input').value ? document.getElementById('horas-input').value : 0;
    const minutos = document.getElementById('minutos-input').value ? document.getElementById('minutos-input').value : 0;
    const segundos = document.getElementById('segundos-input').value ? document.getElementById('segundos-input').value : 0;

    //show the counter
    countDown.classList.remove('disabled')
    formContainer.classList.add('disabled')

    //show data
    habilidadContainer.textContent = habilidad;
    moduloContainer.textContent = modulo;

    minutesContainer.textContent = minutos > 9 ? minutos : `0${minutos}`;
    hoursContainer.textContent = horas > 9 ? horas : `0${horas}`;
    secondsContainer.textContent = segundos > 9 ? segundos : `0${segundos}`;
    x(segundos, minutos, horas)


}


reloadBtn.onclick = () => window.location.reload()