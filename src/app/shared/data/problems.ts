import { solver201501 } from '../../solvers/2015/01';
import { solver201502 } from '../../solvers/2015/02';
import { solver201503 } from '../../solvers/2015/03';
import { solver201504 } from '../../solvers/2015/04';
import { solver201505 } from '../../solvers/2015/05';
import { solver201506 } from '../../solvers/2015/06';
import { solver201507 } from '../../solvers/2015/07';
import { solver201508 } from '../../solvers/2015/08';
import { solver201509 } from '../../solvers/2015/09';
import { solver201510 } from '../../solvers/2015/10';
import { solver201511 } from '../../solvers/2015/11';
import { solver201512 } from '../../solvers/2015/12';
import { solver201513 } from '../../solvers/2015/13';
import { solver201514 } from '../../solvers/2015/14';
import { solver201515 } from '../../solvers/2015/15';
import { solver201516 } from '../../solvers/2015/16';
import { solver201517 } from '../../solvers/2015/17';
import { solver201518 } from '../../solvers/2015/18';
import { solver201519 } from '../../solvers/2015/19';
import { Problem } from '../models/problem';

export const problems: Record<string, Problem[]> = {
    2015: [
        {
            day: 1,
            name: 'Not Quite Lisp',
            solver: solver201501,
        },
        {
            day: 2,
            name: 'I Was Told There Would Be No Math',
            solver: solver201502,
        },
        {
            day: 3,
            name: 'Perfectly Spherical Houses in a Vacuum',
            solver: solver201503,
        },
        {
            day: 4,
            name: 'The Ideal Stocking Stuffer',
            solver: solver201504,
        },
        {
            day: 5,
            name: "Doesn't He Have Intern-Elves For This?",
            solver: solver201505,
        },
        {
            day: 6,
            name: 'Probably a Fire Hazard',
            solver: solver201506,
        },
        {
            day: 7,
            name: 'Some Assembly Required',
            solver: solver201507,
        },
        {
            day: 8,
            name: 'Matchsticks',
            solver: solver201508,
        },
        {
            day: 9,
            name: 'All in a Single Night',
            solver: solver201509,
        },
        {
            day: 10,
            name: 'Elves Look, Elves Say',
            solver: solver201510,
        },
        {
            day: 11,
            name: 'Corporate Policy',
            solver: solver201511,
        },
        {
            day: 12,
            name: 'JSAbacusFramework.io',
            solver: solver201512,
        },
        {
            day: 13,
            name: 'Knights of the Dinner Table',
            solver: solver201513,
        },
        {
            day: 14,
            name: 'Reindeer Olympics',
            solver: solver201514,
        },
        {
            day: 15,
            name: 'Science for Hungry People',
            solver: solver201515,
        },
        {
            day: 16,
            name: 'Aunt Sue',
            solver: solver201516,
        },
        {
            day: 17,
            name: 'No Such Thing as Too Much',
            solver: solver201517,
        },
        {
            day: 18,
            name: 'Like a GIF For Your Yard',
            solver: solver201518,
        },
        {
            day: 19,
            name: 'Medicine for Rudolph',
            solver: solver201519,
        },
    ],
};
