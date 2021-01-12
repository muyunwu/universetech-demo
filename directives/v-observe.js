export default {
  bind(el, binding) {
    const { arg, value } = binding;
    const userOptions = arg || {};
    const options = {
      rootMargin: "0px",
      threshold: 0,
      ...userOptions
    };
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && typeof value === "function") {
          const unobserve = () => observer.unobserve(el);
          value({ entry, observer, unobserve });
        }
      });
    };
    el.observer = new IntersectionObserver(callback, options);
    el.observer.observe(el);
  },
  unbind(el) {
    el.observer.disconnect();
  }
};
