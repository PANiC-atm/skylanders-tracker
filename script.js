// ===== Skylanders Collection Script =====

// ---------- Storage ----------
function saveProgress() {
  const data = {};
  document
    .querySelectorAll('input[type="checkbox"][data-name]')
    .forEach(cb => data[cb.dataset.name] = cb.checked);

  localStorage.setItem('skylanders-progress', JSON.stringify(data));
  updateSets();
  updateCounter();
}

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem('skylanders-progress') || '{}');

  document
    .querySelectorAll('input[type="checkbox"][data-name]')
    .forEach(cb => cb.checked = !!saved[cb.dataset.name]);

  updateSets();
  updateCounter();
}

// ---------- Sets ----------
function updateSets() {
  document.querySelectorAll('.set').forEach(set => {
    const names = set.dataset.set.split(',');
    const complete = names.every(name => {
      const cb = document.querySelector(`input[data-name="${name}"]`);
      return cb && cb.checked;
    });
    set.classList.toggle('complete', complete);
  });
}

// ---------- Counter (PER GAME) ----------
function updateCounter() {
  const counter = document.getElementById('collection-counter');
  const activeTab = document.querySelector('.tab-content.active');
  if (!counter || !activeTab) return;

  const checkboxes = activeTab.querySelectorAll('input[type="checkbox"][data-name]');
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

  counter.textContent = `${checked} / ${total}`;
}

// ---------- Events ----------
document
  .querySelectorAll('input[type="checkbox"][data-name]')
  .forEach(cb => cb.addEventListener('change', saveProgress));

// ---------- Tabs ----------
function showTab(id) {
  document.querySelectorAll('.tab-content')
    .forEach(tab => tab.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  updateCounter();
}

// ---------- Init ----------
loadProgress();
