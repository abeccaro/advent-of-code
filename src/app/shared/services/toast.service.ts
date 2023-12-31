import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private static readonly displayTime = 5e3;

    private internalMessage = signal('');

    message = this.internalMessage.asReadonly();

    private timeoutRef?: ReturnType<typeof setTimeout>;

    displayMessage(message: string): void {
        clearTimeout(this.timeoutRef);

        this.internalMessage.set(message);

        this.timeoutRef = setTimeout(() => {
            this.internalMessage.set('');
            this.timeoutRef = undefined;
        }, ToastService.displayTime);
    }
}
