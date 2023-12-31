import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'aoc-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink],
})
export class FooterComponent {
    constructor(private readonly toastService: ToastService) {}

    copyEmail(): void {
        // separated into variables to prevent spam
        const mail = 'alex.becks';
        const domain = 'hotmail.it';
        navigator.clipboard
            .writeText(`${mail}@${domain}`)
            .catch(() => this.toastService.displayMessage('There was an error while trying to copy email to clipboard'));
        this.toastService.displayMessage('Copied email address to clipboard');
    }
}
