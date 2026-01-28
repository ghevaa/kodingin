// ========================================
// Kodingin - Branching Flowchart Animation
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initFlowchartAnimation();
  initSmoothScroll();
  initNavbarScroll();
});

// ========================================
// Branching Flowchart Animation
// ========================================
function initFlowchartAnimation() {
  const nodes = document.querySelectorAll('.flow-node');
  const connectors = document.querySelectorAll('.flow-connector');

  // Define animation sequence with step groups
  // Steps: 1=Kodingin, 2=Building, 3=Tech branches (all 3), 4=WWW, 5=Online
  const stepSequence = [
    { nodes: ['node-kodingin'], connectors: [0] },
    { nodes: ['node-building'], connectors: [1] },
    { nodes: ['node-nextjs', 'node-php', 'node-sql'], connectors: [2] },
    { nodes: ['node-www'], connectors: [3] },
    { nodes: ['node-online'], connectors: [] }
  ];

  let currentStep = 0;
  const stepDuration = 1000;
  const pauseAtEnd = 1500;

  function resetAll() {
    nodes.forEach(node => {
      node.classList.remove('active', 'completed');
    });
    connectors.forEach(connector => {
      connector.classList.remove('active', 'completed');
    });
  }

  function updateFlowchart() {
    // Mark all previous steps as completed
    for (let i = 0; i < currentStep; i++) {
      const step = stepSequence[i];
      step.nodes.forEach(nodeClass => {
        const node = document.querySelector(`.${nodeClass}`);
        if (node) {
          node.classList.remove('active');
          node.classList.add('completed');
        }
      });
      step.connectors.forEach(connectorIdx => {
        if (connectors[connectorIdx]) {
          connectors[connectorIdx].classList.remove('active');
          connectors[connectorIdx].classList.add('completed');
        }
      });
    }

    // Mark current step as active
    if (currentStep < stepSequence.length) {
      const step = stepSequence[currentStep];
      step.nodes.forEach(nodeClass => {
        const node = document.querySelector(`.${nodeClass}`);
        if (node) {
          node.classList.add('active');
        }
      });
      step.connectors.forEach(connectorIdx => {
        if (connectors[connectorIdx]) {
          connectors[connectorIdx].classList.add('active');
        }
      });
    }
  }

  function animateStep() {
    updateFlowchart();

    currentStep++;

    if (currentStep <= stepSequence.length) {
      setTimeout(animateStep, stepDuration);
    } else {
      // All steps complete, pause then restart
      setTimeout(() => {
        currentStep = 0;
        resetAll();
        setTimeout(animateStep, 300);
      }, pauseAtEnd);
    }
  }

  // Start the animation
  setTimeout(animateStep, 500);
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
  observer.observe(card);
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
  });
}
