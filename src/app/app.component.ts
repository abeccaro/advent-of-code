import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastService } from './shared/services/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
})
export class AppComponent {
    toastMessage: Signal<string>;

    constructor(public readonly toastService: ToastService) {
        this.toastMessage = toastService.message;
    }
}
