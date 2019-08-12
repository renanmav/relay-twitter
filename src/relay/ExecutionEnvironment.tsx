const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const ExecutionEnvironment = {
  canUseDOM,
  canUseWorkers: typeof Worker !== "undefined",
  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || (window as any).attachEvent),
  canUseViewport: canUseDOM && !!window.screen,
  isInWorker: !canUseDOM
};

export default ExecutionEnvironment;
