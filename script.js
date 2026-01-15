<script>
  /* ===== Tab Switching ===== */
  function showTab(id) {
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');

    updateCounter();
  }

  /* ===== Checkboxes ===== */
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"][data-name]');

  function saveProgress() {
    const data = {};
    allCheckboxes.forEach(cb => data[cb.dataset.name] = cb.checked);
    localStorage.setItem('skylanders-progress', JSON.stringify(data));
    updateSets();
    updateCounter();
  }

  function loadProgress() {
    const saved = JSON.parse(localStorage.getItem('skylanders-progress') || '{}');
    allCheckboxes.forEach(cb => cb.checked = !!saved[cb.dataset.name]);
    updateSets();
    updateCounter();
  }

  /* ===== Sets ===== */
  const sets = document.querySelectorAll('.set');

  function updateSets() {
    const collected = Array.from(allCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.name);

    sets.forEach(set => {
      const required = set.dataset.set.split(',');
      const complete = required.every(name => collected.includes(name));
      set.classList.toggle('complete', complete);
    });
  }

  /* ===== COUNTER (THIS WAS MISSING) ===== */
  function updateCounter() {
    const counter = document.getElementById('collection-counter');
    const activeContent = document.querySelector('.content.active');
    if (!counter || !activeContent) return;

    const boxes = activeContent.querySelectorAll('input[type="checkbox"][data-name]');
    const total = boxes.length;
    const checked = Array.from(boxes).filter(b => b.checked).length;

    counter.textContent = `${checked} / ${total}`;
  }

  /* ===== Init ===== */
  allCheckboxes.forEach(cb => cb.addEventListener('change', saveProgress));
  loadProgress();
</script>
