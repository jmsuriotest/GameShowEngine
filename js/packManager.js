const PackManager = {
    currentPack: null,
    packs: {}
};
PackManager.load = function(pack){
    this.currentPack = pack;
    gameState.questions = [...pack.questions];
}
PackManager.register = function(pack){
    this.packs[pack.id] = pack;
    console.log(`Pack registered: ${pack.title}`);
};
PackManager.get = function(id){
    return this.packs[id];
};
PackManager.load = function(pack){
    if(!pack){
        console.error("Pack not found.");
        return false;
    }
    this.currentPack = pack;
    gameState.questions = [...pack.questions];
    return true;
};

PackManager.populateSelect = function(){
    ui.packSelect.innerHTML = "";
    Object.values(this.packs).forEach(pack=>{
        const option =
            document.createElement("option");
        option.value = pack.id;
        option.textContent = pack.title;
        ui.packSelect.appendChild(option);
    });
}
PackManager.updateInfo = function(){
    const pack =
        this.get(ui.packSelect.value);
    if(!pack) return;
    ui.packDescription.textContent =
        pack.description;
    ui.packVersion.textContent =
        pack.version;
    ui.packQuestions.textContent =
        pack.questions.length;
    ui.packAuthor.textContent =
        pack.author;
}