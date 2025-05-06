window.Telegram = {
  WebApp: {
    ready: () => console.log('WebApp ready'),
    setHeaderColor: (color) => console.log('Set header color:', color),
    setBackgroundColor: (color) => console.log('Set background color:', color),
    MainButton: {
      text: 'Main Button',
      show: () => console.log('Show main button'),
      hide: () => console.log('Hide main button'),
      onClick: (cb) => console.log('Main button clicked')
    },
    initData: '',
    initDataUnsafe: {},
    version: '6.0',
    platform: 'web',
    colorScheme: 'light',
    isExpanded: true,
    viewportHeight: window.innerHeight,
    viewportStableHeight: window.innerHeight,
  }
}; 