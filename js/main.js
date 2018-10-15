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

        this.availableWeapons = ['weaponPlayer2Rock', 'weaponPlayer2Paper', 'weaponPlayer2Scissors'];
    }

    setupPlayer2Weapon() {
        const getAvailableWeapons = this.getAvailableWeapons();
        const weaponPicker = Math.floor(Math.random() * getAvailableWeapons.length);
        console.debug('Player2 weapon: ', getAvailableWeapons[weaponPicker]);
        selectWeapon(getAvailableWeapons[weaponPicker]);
        this.setPlayer2Weapon(getAvailableWeapons[weaponPicker]);
    }

    getPlayer1Weapon() {
        return this.player1Weapon;
    }

    setPlayer1Weapon(player1Weapon) {
        this.player1Weapon = player1Weapon;
    }

    getPlayer2Weapon() {
        return this.player2Weapon;
    }

    setPlayer2Weapon(player2Weapon) {
        this.player2Weapon = player2Weapon;
    }

    getAvailableWeapons() {
        return this.availableWeapons;
    }

    calculateScores() {
        const weaponScores =
        {
            'weaponPlayer1Scissors': {
                'weaponPlayer2Rock': -1,
                'weaponPlayer2Paper': 1,
                'weaponPlayer2Scissors': 0
            },
            'weaponPlayer1Rock': {
                'weaponPlayer2Paper': -1,
                'weaponPlayer2Scissors': 1,
                'weaponPlayer2Rock': 0
            },
            'weaponPlayer1Paper': {
                'weaponPlayer2Scissors': -1,
                'weaponPlayer2Rock': 1,
                'weaponPlayer2Paper': 0
            }
        };

        const scoreObject = this.pickWeaponScores(weaponScores, [this.getPlayer1Weapon()]);
        const player2WeaponScores = scoreObject[this.getPlayer1Weapon()];
        const player2WeaponScore = player2WeaponScores[this.getPlayer2Weapon()];
        console.debug('player2WeaponScore', player2WeaponScore);

        if (player2WeaponScore === 0) {
            return 'Draw';
        } else if (player2WeaponScore < 0) {
            return 'CPU Win';
        } else {
            return 'You Win';
        }
    }

    pickWeaponScores(obj, keys) {
        return keys.map(k => k in obj ? {[k]: obj[k]} : {})
            .reduce((res, o) => Object.assign(res, o), {});
    }
}

const sciRoPa = new SciRoPa();

function newGame() {
    localStorage.removeItem('gameId');
    location.reload();
}

function fight() {
    if (!sciRoPa.getPlayer1Weapon()) {
        console.debug('Weapon for Player1 is missing');
        return;
    }
    console.debug('Fight started');

    //Unselect weapons from previous fight
    sciRoPa.getAvailableWeapons().forEach((player2Weapon) => {
        unselectWeapon(player2Weapon);
    });

    sciRoPa.setupPlayer2Weapon();
    console.log('winner: ' + sciRoPa.calculateScores());
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
