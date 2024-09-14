export const solver = () => {
    importScripts(`${self.location.origin}/workers/utilities.js`);

    const weapons = [
        { cost: 8, damage: 4, armor: 0 },
        { cost: 10, damage: 5, armor: 0 },
        { cost: 25, damage: 6, armor: 0 },
        { cost: 40, damage: 7, armor: 0 },
        { cost: 74, damage: 8, armor: 0 }
    ];

    const armors = [
        { cost: 13, damage: 0, armor: 1 },
        { cost: 31, damage: 0, armor: 2 },
        { cost: 53, damage: 0, armor: 3 },
        { cost: 75, damage: 0, armor: 4 },
        { cost: 102, damage: 0, armor: 5 }
    ];

    const rings = [
        { cost: 25, damage: 1, armor: 0 },
        { cost: 50, damage: 2, armor: 0 },
        { cost: 100, damage: 3, armor: 0 },
        { cost: 20, damage: 0, armor: 1 },
        { cost: 40, damage: 0, armor: 2 },
        { cost: 80, damage: 0, armor: 3 }
    ];

    function parseBossStats(input) {
        const [hp, damage, armor] = input.split('\n').map(row => parseInt(row.split(':')[1], 10));
        return { hp, damage, armor };
    }

    function combineEquipment() {
        const equipmentCombinations = [];

        for (const weapon of weapons) {
            for (const armor of [null, ...armors]) {
                for (const ringSelection of [[], ...combinations(rings, 1), ...combinations(rings, 2)]) {
                    const equipment = [weapon, ...ringSelection];
                    if (armor) {
                        equipment.push(armor);
                    }
                    equipmentCombinations.push(equipment);
                }
            }
        }

        return equipmentCombinations;
    }

    function playerWins(player, enemy) {
        const attacksToKillBoss = Math.ceil(enemy.hp / Math.max(1, player.damage - enemy.armor));
        // as the player and the enemy alternate turns with player going first the enemy will attack the same number of
        // times as the player minus one
        const damageTaken = (attacksToKillBoss - 1) * Math.max(1, enemy.damage - player.armor);
        return damageTaken < player.hp;
    }

    function optimalCost(enemy, equipmentChoices, playerWin, optimization) {
        let optimalCost = optimization === 'min' ? Infinity : -Infinity;
        for (const equipChoice of equipmentChoices) {
            const totalCost = equipChoice.reduce((cost, item) => cost + item.cost, 0);
            if ((optimization === 'min' && totalCost >= optimalCost) || (optimization === 'max' && totalCost <= optimalCost)) {
                continue;
            }

            const player = {
                hp: 100,
                damage: equipChoice.reduce((damage, item) => damage + item.damage, 0),
                armor: equipChoice.reduce((armor, item) => armor + item.armor, 0)
            };

            if (playerWins(player, enemy) === playerWin) {
                optimalCost = totalCost;
            }
        }

        return optimalCost;
    }

    function part1(input) {
        const boss = parseBossStats(input);
        const equipChoices = combineEquipment();
        return optimalCost(boss, equipChoices, true, 'min');
    }

    function part2(input) {
        const boss = parseBossStats(input);
        const equipChoices = combineEquipment();
        return optimalCost(boss, equipChoices, false, 'max');
    }
};
