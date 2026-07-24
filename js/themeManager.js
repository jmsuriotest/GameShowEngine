const ThemeManager = {
    currentTheme: "default",
    themes: {}
};

ThemeManager.register = function(theme){
    this.themes[theme.id] = theme;
};
ThemeManager.apply = function(id){
    const theme = this.themes[id];

    console.log("Theme changed to:", ui.themeSelect.value);
    if(!theme){
        console.warn("Unknown theme.");
        return;
    }
    Object.values(this.themes).forEach(t => {
         document.body.classList.remove(t.cssClass);
     });
     document.body.classList.add(theme.cssClass);
    this.currentTheme = id;
    const themeColors = {
        default:"#07131F",
        dark:"#0D1117",
        neon:"#050816",
        christmas:"#10281B",
        halloween:"#140B1D"
    };
    document.getElementById("themeColor").content =
        themeColors[id] || themeColors.default;
    this.currentTheme = id;
    this.save();

    console.table({
        Theme: Storage.get("theme"),
        Pack: Storage.get("pack")
    });
}
ThemeManager.getAll = function(){
    return Object.values(this.themes);
};
ThemeManager.populateSelect = function(){
    ui.themeSelect.innerHTML = "";
    this.getAll().forEach(theme => {
        const option = document.createElement("option");
        option.value = theme.id;
        option.textContent = theme.name;
        ui.themeSelect.appendChild(option);
    });
};
const DARK_THEME = {
    id: "dark",
    name: "🌙 Dark",
    cssClass: "theme-dark"
};
const DEFAULT_THEME = {
    id: "default",
    name: "Classic Blue",
    cssClass: "theme-default"
};
const NEON_THEME = {
    id: "neon",
    name: "✨ Neon",
    cssClass: "theme-neon"
};

const CHRISTMAS_THEME = {
    id: "christmas",
    name: "🎄 Christmas",
    cssClass: "theme-christmas"
};

const HALLOWEEN_THEME = {
    id: "halloween",
    name: "🎃 Halloween",
    cssClass: "theme-halloween"
};
ThemeManager.save = function () {
    Storage.set(
        "theme",
        this.currentTheme
    );
};
ThemeManager.loadSaved = function () {
    const saved = Storage.get("theme");
    if (!saved)
        return false;
    if (!this.themes[saved])
        return false;
    ui.themeSelect.value = saved;
    this.apply(saved);
    return true;
};
ThemeManager.register(DEFAULT_THEME);
ThemeManager.register(DARK_THEME);
ThemeManager.register(NEON_THEME);
ThemeManager.register(CHRISTMAS_THEME);
ThemeManager.register(HALLOWEEN_THEME);
//ThemeManager.apply("default");