export const solver = () => {
    importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);
    importScripts('https://cdn.jsdelivr.net/npm/md5-jkmyers@0.0.1/md5.min.js');

    function part1(input) {
        let password = '';

        for (let i = 0; password.length < 8; i++) {
            const hash = md5(`${input}${i}`);
            if (hash.startsWith('00000')) {
                password += hash.charAt(5);
            }
        }

        return password;
    }

    function part2(input) {
        let password = Array(8).fill('_');
        let found = 0;

        for (let i = 0; found < password.length; i++) {
            const hash = md5(`${input}${i}`);
            if (hash.startsWith('00000')) {
                const pos = parseInt(hash[5], 10);
                if (!isNaN(pos) && password[pos] === '_') {
                    password[pos] = hash[6];
                    found++;
                }
            }
        }

        return password.join('');
    }

    this.onmessage = (evt) => calculate(part1, part2, evt.data);
};
