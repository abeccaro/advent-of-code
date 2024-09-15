import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input as RouterInput, OnDestroy, OnInit, signal } from '@angular/core';
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
export class ProblemComponent implements OnDestroy, OnInit {
    @RouterInput() problemYear!: string;
    @RouterInput() problemDay!: string;

    problem?: Problem;

    input = new FormControl<string>('', { nonNullable: true });
    output1 = new FormControl<string | number>('', { nonNullable: true });
    output2 = new FormControl<string | number>('', { nonNullable: true });
    calculating = signal(false);

    private worker?: Worker;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {
        const day = parseInt(this.problemDay, 10);
        this.problem = problems[this.problemYear]?.find(p => p.day === day);
    }

    ngOnDestroy(): void {
        this.worker?.terminate();
    }

    reset(): void {
        this.input.reset();
        this.output1.reset();
        this.output2.reset();
    }

    async solve(): Promise<void> {
        this.output1.reset();
        this.output2.reset();

        if (!this.worker) {
            await this.createAndListenToWorker();
        }

        this.calculating.set(true);
        this.worker?.postMessage(this.input.value.trim());
    }

    private async createAndListenToWorker(): Promise<void> {
        const { solver } = await import(`../workers/${this.problemYear}/${this.problemDay.padStart(2, '0')}.js`);

        this.worker = new Worker(URL.createObjectURL(new Blob([this.extractFunctionString(solver)], { type: 'text/javascript' })));

        this.worker.onmessage = data => {
            if (data.data.part1 !== undefined) {
                this.output1.setValue(data.data.part1);
                this.cdr.markForCheck();
            } else if (data.data.part2 !== undefined) {
                this.output2.setValue(data.data.part2);
                this.calculating.set(false);
            }
        };

        this.worker.onerror = data => {
            console.error(data);
            this.calculating.set(false);
            this.worker?.terminate();
        };
    }

    private extractFunctionString(func: Function): string {
        return func
            .toString()
            .replace(/^[^{]*{\s*/, '') // remove initial "() => {"
            .replace(/\s*}[^}]*$/, '') // remove ending "}"
            .replaceAll('(void 0)', 'this'); // reset this from (void 0)
    }
}
