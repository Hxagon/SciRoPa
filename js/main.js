console.debug('START');

class SciRoPa {
    constructor() {
        if (!localStorage.getItem('gameId')) {
            console.debug('New game created');
            // Create Game-ID
            this.gameId = Math.random().toString(36).substr(2, 10);
            localStorage.setItem("gameId", this.gameId);
            document.getElementById('gameId').value = this.gameId;
        } else {
            console.debug('Game loaded');
            document.getElementById('gameId').value = localStorage.getItem('gameId');
        }

        this.player2Weapons = ['weaponPlayer2Rock', 'weaponPlayer2Paper', 'weaponPlayer2Scissors'];
    }

    setupPlayer2Weapons() {
        const player2Weapons = this.getPlayer2Weapons();
        const weaponPicker = Math.floor(Math.random() * player2Weapons.length);
        console.debug('Player2 weapon: ', player2Weapons[weaponPicker]);
        selectWeapon(player2Weapons[weaponPicker]);
    }

    getPlayer1Weapon() {
        return this.player1Weapon;
    }

    setPlayer1Weapon(player1Weapon) {
        this.player1Weapon = player1Weapon;
    }

    getPlayer2Weapons() {
        return this.player2Weapons;
    }
}

const sciRoPa = new SciRoPa();

function newGame() {
    localStorage.removeItem('gameId');
    location.reload();
}

function fight() {
    console.debug('Fight started');
    sciRoPa.getPlayer2Weapons().forEach((player2Weapon) => {
        unselectWeapon(player2Weapon);
    });

    sciRoPa.setupPlayer2Weapons();

}

function chooseWeapon(weaponId) {
    if (weaponId === sciRoPa.getPlayer1Weapon()) {
        return;
    }

    if (sciRoPa.getPlayer1Weapon()) {
        unselectWeapon(sciRoPa.getPlayer1Weapon());
    }

    sciRoPa.setPlayer1Weapon(weaponId);
    console.debug('Player1 weapon: ' + sciRoPa.getPlayer1Weapon());
    selectWeapon(weaponId);
}

function selectWeapon(elementId) {
    document.getElementById(elementId).style = 'background-color: gray;';
}

function unselectWeapon(elementId) {
    document.getElementById(elementId).style = 'background-color: none;';
}
