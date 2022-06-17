const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

// This is a little hacky. If you change the light or dark in _config.yaml, also change it
// here. I could not figure out how to read site... variables here.
baseTheme = 'light'

// https://derekkedziora.com/blog/dark-mode-revisited -- hack :) to keep theme persistent
// Make sure change of theme persists across pages.
persistentTheme = sessionStorage.getItem('jtdPersistentTheme');
if(persistentTheme && (persistentTheme !==  baseTheme)) {
    jtd.setTheme(persistentTheme);
}


if (jtd.getTheme() === 'dark') {
    toggleDarkMode.textContent = 'Night 🌙';
} else {
    toggleDarkMode.textContent = 'Day ☀️';
}

jtd.addEvent(toggleDarkMode, 'click', function(){
    if (jtd.getTheme() === 'dark') {
        jtd.setTheme('light');
        sessionStorage.setItem('jtdPersistentTheme', 'light');
        toggleDarkMode.textContent = 'Day ☀️';
    } else {
        jtd.setTheme('dark');
        sessionStorage.setItem('jtdPersistentTheme', 'dark');
        toggleDarkMode.textContent = 'Night 🌙';
    }
});