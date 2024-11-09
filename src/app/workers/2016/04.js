export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);

    function reverseString(string) {
        return string.split('').reverse().join('');
    }

    function parse(input) {
        return input.split('\n').map(line => {
            const [lastToken, ...letters] = reverseString(line).split('-');
            const [id, checksum] = reverseString(lastToken).split(new RegExp(/[\[\]]/), 2);
            return {
                id: parseInt(id, 10),
                checksum,
                letters: reverseString(letters.join('-'))
            };
        });
    }

    function isValidRoom(room) {
        const counters = {};
        for (const letter of room.letters) {
            if (letter === '-') {
                continue;
            }
            counters[letter] = counters[letter] ? counters[letter] + 1 : 1;
        }

        const checksum = Object.entries(counters).sort(([letter1, count1], [letter2, count2]) => {
            if (count1 > count2) {
                return -1;
            }
            if (count1 < count2) {
                return 1;
            }
            return letter1 > letter2;
        }).slice(0, 5).map(([letter]) => letter).join('');

        return checksum === room.checksum;
    }

    function decrypt(room) {
        return room.letters.split('').map(letter => {
            if (letter === '-') {
                return ' ';
            }
            return String.fromCharCode(97 + (letter.charCodeAt(0) - 97 + room.id) % 26);
        }).join('');
    }

    function part1(input) {
        return parse(input).filter(isValidRoom).reduce((sum, { id }) => sum + id, 0);
    }

    function part2(input) {
        // filtering for valid rooms takes about 2/3 of the time and is not needed for my input, but it should be for the problem
        // description, so I'll keep it
        return parse(input).filter(isValidRoom).find(room => decrypt(room).includes('northpole')).id;
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
