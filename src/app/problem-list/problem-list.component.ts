import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpandablePanelComponent } from '../shared/components/expandable-panel/expandable-panel.component';
import { problems } from '../shared/data/problems';

@Component({
    templateUrl: './problem-list.component.html',
    styleUrl: './problem-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ExpandablePanelComponent, RouterModule],
})
export class ProblemListComponent {
    readonly problems = problems;
    readonly years = Object.keys(problems).reverse();
}
