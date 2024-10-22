// JavaScript to handle the form and signature pad
const form = document.getElementById('attendance-form');
const canvas = document.getElementById('signature-canvas');
const submitBtn=document.getElementById('submit-btn');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// Signature drawing logic
const getPointerPosition = (event) => {
  const rect = canvas.getBoundingClientRect(); // Get canvas position relative to viewport
  if (event.touches && event.touches[0]) {
    // For touch events
    return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top
    };
  } else {
    // For mouse events
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
};

// Mouse events
canvas.addEventListener('mousedown', () => {
  isDrawing = true;
});

canvas.addEventListener('mousemove', (event) => {
  if (isDrawing) {
    const position = getPointerPosition(event);
    ctx.lineWidth = 0.2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A1172';
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.beginPath();
});

// Touch events
canvas.addEventListener('touchstart', (event) => {
  isDrawing = true;
  event.preventDefault(); // Prevent scrolling while drawing
});

canvas.addEventListener('touchmove', (event) => {
  if (isDrawing) {
    const position = getPointerPosition(event);
    ctx.lineWidth = 0.2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0A1172';
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
  }
  event.preventDefault(); // Prevent scrolling while drawing
});

canvas.addEventListener('touchend', () => {
  isDrawing = false;
  ctx.beginPath();
  event.preventDefault();
});

// Clear signature button
document.getElementById('clear-signature').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});



submitBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  

// Handle form submission


  // Collect form data
  const myname = document.getElementById('name').value;
  const myorganization = document.getElementById('organization').value;
  const mydesignation = document.getElementById('designation').value;
  const myemail = document.getElementById('email').value;
  const myphone = document.getElementById('phone').value;


  // Capture the signature as a data URL
  const signature = canvas.toDataURL();

  // Display the submitted data
  document.getElementById('display-name').textContent = myname;
  document.getElementById('display-organization').textContent = myorganization;
  document.getElementById('display-designation').textContent = mydesignation;
  document.getElementById('display-email').textContent = myemail;
  document.getElementById('display-phone').textContent = myphone;
  document.getElementById('display-signature').src = signature;
  
  // Show the submitted data section
  

});
