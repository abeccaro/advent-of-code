import { Solver } from '../../shared/models/problem';

interface BattleStatus {
    playerHp: number;
    playerMana: number;
    bossHp: number;
    bossDamage: number;
    manaSpent: number;
    shield: number;
    poison: number;
    recharge: number;
}

type SpellName = 'Magic Missile' | 'Drain' | 'Shield' | 'Poison' | 'Recharge';
interface Spell {
    name: SpellName;
    cost: number;
}

export const solver201522: Solver = {
    part1(input: string): number {
        return getOptimalManaSpent(createInitialStatus(input));
    },
    part2(input: string): number {
        return getOptimalManaSpent(createInitialStatus(input), true);
    },
};

function createInitialStatus(input: string): BattleStatus {
    const [bossHp, bossDamage] = input.split('\n').map(row => parseInt(row.split(':')[1], 10));
    return {
        playerHp: 50,
        playerMana: 500,
        bossHp,
        bossDamage,
        manaSpent: 0,
        shield: 0,
        poison: 0,
        recharge: 0,
    };
}

function getCastableSpells(battleStatus: BattleStatus): Spell[] {
    const spells: Spell[] = [];
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

function getOptimalManaSpent(initialStatus: BattleStatus, hardMode = false): number {
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

function simulateTurn(initialStatus: BattleStatus, spell: Spell): BattleStatus {
    const newStatus = { ...initialStatus };

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

function applyEffects(battleStatus: BattleStatus): void {
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
