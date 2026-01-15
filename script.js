// ===== Skylanders Collection Script =====

// Grab everything we need
const allCheckboxes = document.querySelectorAll('input[type="checkbox"][data-name]');
const sets = document.querySelectorAll('.set');
const counter = document.getElementById('collection-counter');

// ---------- Save ----------
function saveProgress() {
  const data = {};
  allCheckboxes.forEach(cb => {
    data[cb.dataset.name] = cb.checked;
  });
  localStorage.setItem('skylanders-progress', JSON.stringify(data));
  updateSets();
  updateCounter();
}

// ---------- Load ----------
function loadProgress() {
  const saved = JSON.parse(localStorage.getItem('skylanders-progress') || '{}');
  allCheckboxes.forEach(cb => {
    cb.checked = !!saved[cb.dataset.name];
  });
  updateSets();
  updateCounter();
}

// ---------- Sets / Trophies ----------
function updateSets() {
  sets.forEach(set => {
    const names = set.dataset.set.split(',');
    const complete = names.every(name => {
      const checkbox = document.querySelector(`input[data-name="${name}"]`);
      return checkbox && checkbox.checked;
    });

    set.classList.toggle('complete', complete);
  });
}

// ---------- Counter ----------
function updateCounter() {
  if (!counter) return;
  const total = allCheckboxes.length;
  const checked = Array.from(allCheckboxes).filter(cb => cb.checked).length;
  counter.textContent = `${checked} / ${total}`;
}

// ---------- Events ----------
allCheckboxes.forEach(cb => {
  cb.addEventListener('change', saveProgress);
});

// ---------- Init ----------
loadProgress();
