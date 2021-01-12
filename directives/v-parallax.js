export default {
  bind(el, binding) {
    const { value, modifiers } = binding;
    const { horizontal } = modifiers;
    const defaultRate = 0;
    const rate = value || defaultRate;
    let ticking = false;

    const callback = timestep => {
      ticking = false;
      const scrolled = window.pageYOffset;
      if (horizontal) {
        el.style.transform = `translate3d(${scrolled * rate}px, 0, 0)`;
      } else {
        el.style.transform = `translate3d(0, ${scrolled * rate}px, 0)`;
      }
    };

    el.handlePrallax = () => {
      if (!ticking) {
        requestAnimationFrame(callback);
        ticking = true;
      }
    };
    window.addEventListener("scroll", el.handlePrallax);
  },
  unbind(el) {
    window.removeEventListener("scroll", el.handlePrallax);
  }
};
