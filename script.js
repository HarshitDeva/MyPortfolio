function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

// Create a new file called typing.js
document.addEventListener('DOMContentLoaded', function() {
  const greeting = "Hello, I'm";
  const name = "Harshit Deva";
  const role = "Full Stack Developer";
  
  const greetingElement = document.getElementById('greeting');
  const nameElement = document.getElementById('name');
  const roleElement = document.getElementById('role');
  
  function typeText(element, text, delay) {
      return new Promise(resolve => {
          let currentText = '';
          let index = 0;
          
          function type() {
              if (index < text.length) {
                  currentText += text.charAt(index);
                  element.textContent = currentText;
                  index++;
                  setTimeout(type, 100);
              } else {
                  element.classList.add('cursor');
                  setTimeout(() => {
                      element.classList.remove('cursor');
                      resolve();
                  }, 500);
              }
          }
          
          setTimeout(() => {
              type();
          }, delay);
      });
  }
  
  async function startTyping() {
      await typeText(greetingElement, greeting, 0);
      await typeText(nameElement, name, 100);
      await typeText(roleElement, role, 100);
  }
  
  startTyping();
});