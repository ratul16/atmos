// debounceMixin.js
export default {
  data() {
    return {
      debounceTimers: {},
    };
  },
  methods: {
    debounce(func, delay, key = 'default') {
      if (this.debounceTimers[key]) {
        clearTimeout(this.debounceTimers[key]);
      }

      this.debounceTimers[key] = setTimeout(() => {
        func();
        this.debounceTimers[key] = null;
      }, delay);
    },
  },
};


// this.debounce(this.performSearch, 300); // Adjust delay as needed