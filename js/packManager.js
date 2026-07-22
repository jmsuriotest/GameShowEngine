const PackManager = {
    currentPack: null,
    packs: {}
};
PackManager.load = function(pack){
    this.currentPack = pack;
    gameState.questions = [...pack.questions];
     // Update browser title
    document.title = pack.title;
}
PackManager.register = function(pack){
    this.packs[pack.id] = pack;
    console.log(`Pack registered: ${pack.title}`);
};
PackManager.get = function(id){
    return this.packs[id];
};
PackManager.load = function(pack){
    if(!this.validate(pack)){
        console.error("Invalid game pack.");
        return false;
    }
    this.currentPack = pack;
    gameState.questions = [...pack.questions];
    return true;
}

PackManager.populateSelect = function(){
    ui.packSelect.innerHTML = "";
    this.getAll().forEach(pack=>{
        const option = document.createElement("option");
        option.value = pack.id;
        option.textContent =
        `${pack.title} (${pack.questions.length})`;
        ui.packSelect.appendChild(option);
    });
    if(ui.packSelect.options.length){
        ui.packSelect.selectedIndex = 0;
        this.updateInfo();
    }
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
    if(pack.questions.length===0){
        alert("This pack has no questions.");
        return false;
    }
    if (pack.questions.length > 0) {
        ui.startGameBtn.disabled = false;
    } else {
        ui.startGameBtn.disabled = true;
    }
}
PackManager.getAll = function(){
    return Object.values(this.packs);
}
PackManager.validate = function(pack){
    if(!pack)
        return false;
    if(!Array.isArray(pack.questions))
        return false;
    if(!pack.id)
        return false;
    if(!pack.title)
        return false;
    return true;
}