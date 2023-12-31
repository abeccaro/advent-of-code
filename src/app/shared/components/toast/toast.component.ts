import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'aoc-toast',
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass],
})
export class ToastComponent implements OnChanges {
    @Input() message?: string;

    internalMessage?: string; // Used to still display the message while closing

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['message'] && !changes['message'].isFirstChange() && this.message) {
            this.internalMessage = this.message;
        }
    }

    onTransitionEnd(evt: TransitionEvent): void {
        const element = evt.target as HTMLElement;
        if (element.classList.contains('hidden')) {
            this.internalMessage = '';
        }
    }
}
