// jsdom can't play media; give tests a silent player so autoplaying pronunciation doesn't error.
if (typeof window !== 'undefined') {
  window.HTMLMediaElement.prototype.play = () => Promise.resolve()
  window.HTMLMediaElement.prototype.pause = () => {}
}
