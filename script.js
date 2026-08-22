    // --- ACCESSIBLE MOBILE MENU TOGGLE ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');


    function toggleMenu(forceClose = false) {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      const open = forceClose ? false : !isExpanded;
     
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navMenu.classList.toggle('open', open);
    }


    navToggle.addEventListener('click', () => toggleMenu());


    // Close mobile drawer when any link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(true));
    });


    // --- ACCESSIBLE MODAL LOGIC WITH FOCUS TRAP ---
    const modal = document.getElementById('specsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSpecText = document.getElementById('modalSpecText');
    const closeBtn = document.getElementById('closeModalBtn');
    const openButtons = document.querySelectorAll('.open-modal-btn');
    let triggerButton = null; // Remembers which button opened the modal for keyboard return


    function openModal(title, specText, sourceBtn) {
      triggerButton = sourceBtn;
      modalTitle.textContent = title;
      modalSpecText.textContent = specText;
     
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
     
      // Focus the close button immediately for screen-reader & keyboard navigation
      setTimeout(() => closeBtn.focus(), 50);
    }


    function closeModal() {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
     
      // Return keyboard focus to the card button that opened the dialog
      if (triggerButton) {
        triggerButton.focus();
      }
    }


    openButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title');
        const specText = btn.getAttribute('data-spec');
        openModal(title, specText, btn);
      });
    });


    closeBtn.addEventListener('click', closeModal);


    // Close modal when clicking outside the dialog window
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });


    // --- ACCESSIBILITY KEYBOARD CONTROLS (ESCAPE KEY) ---
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close modal if open
        if (modal.getAttribute('aria-hidden') === 'false') {
          closeModal();
        }
        // Close mobile menu if open
        if (navToggle.getAttribute('aria-expanded') === 'true') {
          toggleMenu(true);
          navToggle.focus();
        }
      }
    });