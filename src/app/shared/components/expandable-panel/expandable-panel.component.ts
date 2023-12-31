import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'aoc-expandable-panel',
    templateUrl: './expandable-panel.component.html',
    styleUrl: './expandable-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass],
})
export class ExpandablePanelComponent implements AfterViewInit, OnChanges {
    @Input() open = false;
    @Input() title = '';

    @ViewChild('contentPanel', { static: true }) private readonly contentPanel!: ElementRef<HTMLDivElement>;
    animated = false;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['open']) {
            this.updateContentsHeight();
        }
    }

    ngAfterViewInit(): void {
        this.updateContentsHeight();
        this.animated = true;
    }

    toggle() {
        this.open = !this.open;
        this.updateContentsHeight();
    }

    private updateContentsHeight(): void {
        this.contentPanel.nativeElement.style.maxHeight = `${this.open ? this.contentPanel.nativeElement.scrollHeight : 0}px`;
    }
}
