export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function createInitialStatus(input) {
        const [bossHp, bossDamage] = input.split('\n').map(row => parseInt(row.split(':')[1], 10));
        return {
            playerHp: 50,
            playerMana: 500,
            bossHp,
            bossDamage,
            manaSpent: 0,
            shield: 0,
            poison: 0,
            recharge: 0
        };
    }

    function getCastableSpells(battleStatus) {
        const spells = [];
        if (battleStatus.playerMana > 53) {
            spells.push({ name: 'Magic Missile', cost: 53 });
        }
        if (battleStatus.playerMana > 73) {
            spells.push({ name: 'Drain', cost: 73 });
        }
        if (battleStatus.playerMana > 113 && battleStatus.shield <= 0) {
            spells.push({ name: 'Shield', cost: 113 });
        }
        if (battleStatus.playerMana > 173 && battleStatus.poison <= 0) {
            spells.push({ name: 'Poison', cost: 173 });
        }
        if (battleStatus.playerMana > 229 && battleStatus.recharge <= 0) {
            spells.push({ name: 'Recharge', cost: 229 });
        }
        return spells;
    }

    function getOptimalManaSpent(initialStatus, hardMode = false) {
        const boundary = [initialStatus];
        let optimalManaSpent = Infinity;

        for (let status = boundary.shift(); status; status = boundary.shift()) {
            if (status.manaSpent > optimalManaSpent || status.playerHp <= 0) {
                continue;
            }
            applyEffects(status);
            if (status.bossHp <= 0) {
                optimalManaSpent = Math.min(status.manaSpent, optimalManaSpent);
                continue;
            }

            const castableSpells = getCastableSpells(status);
            for (const spell of castableSpells) {
                const newStatus = simulateTurn(status, spell);
                if (hardMode) {
                    newStatus.playerHp--;
                }
                boundary.push(newStatus);
            }
        }

        return optimalManaSpent;
    }

    function simulateTurn(initialStatus, spell) {
        const newStatus = Object.assign({}, initialStatus);

        newStatus.playerMana -= spell.cost;
        newStatus.manaSpent += spell.cost;
        switch (spell.name) {
            case 'Magic Missile': {
                newStatus.bossHp -= 4;
                break;
            }
            case 'Drain': {
                newStatus.bossHp -= 2;
                newStatus.playerHp += 2;
                break;
            }
            case 'Shield': {
                newStatus.shield = 6;
                break;
            }
            case 'Poison': {
                newStatus.poison = 6;
                break;
            }
            case 'Recharge': {
                newStatus.recharge = 5;
                break;
            }
        }

        applyEffects(newStatus);
        if (newStatus.bossHp <= 0) {
            return newStatus;
        }

        newStatus.playerHp -= Math.max(1, newStatus.bossDamage - (newStatus.shield > 0 ? 7 : 0));
        return newStatus;
    }

    function applyEffects(battleStatus) {
        if (battleStatus.poison > 0) {
            battleStatus.bossHp -= 3;
        }
        if (battleStatus.recharge > 0) {
            battleStatus.playerMana += 101;
        }

        battleStatus.shield--;
        battleStatus.poison--;
        battleStatus.recharge--;
    }

    function part1(input) {
        return getOptimalManaSpent(createInitialStatus(input));
    }

    function part2(input) {
        return getOptimalManaSpent(createInitialStatus(input), true);
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
