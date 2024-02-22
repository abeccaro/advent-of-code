import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Input as RouterInput } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { problems } from '../shared/data/problems';
import { Problem } from '../shared/models/problem';

@Component({
    templateUrl: './problem.component.html',
    styleUrl: './problem.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule, NgIf],
})
export class ProblemComponent implements OnInit {
    @RouterInput() problemYear!: string;
    @RouterInput() problemDay!: string;

    problem?: Problem;

    input = new FormControl<string>('', { nonNullable: true });
    output1 = new FormControl<string | number>('', { nonNullable: true });
    output2 = new FormControl<string | number>('', { nonNullable: true });

    ngOnInit() {
        const day = parseInt(this.problemDay, 10);
        this.problem = problems[this.problemYear]?.find(p => p.day === day);
    }

    reset(): void {
        this.input.reset();
        this.output1.reset();
        this.output2.reset();
    }

    solve(): void {
        console.time('1');
        this.output1.setValue(this.problem?.solver?.part1?.(this.input.value.trim()) ?? '');
        console.timeEnd('1');
        console.time('2');
        this.output2.setValue(this.problem?.solver?.part2?.(this.input.value.trim()) ?? '');
        console.timeEnd('2');
    }
}
